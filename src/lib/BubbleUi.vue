<script setup lang="ts" generic="T">
import { computed, onMounted, onUnmounted, ref, toRefs } from 'vue'

export interface BubbleUiProps {
  size?: number
  minSize?: number
  gutter?: number
  numCols?: number
  fringeWidth?: number
  yRadius?: number
  xRadius?: number
  cornerRadius?: number
  showGuides?: boolean
  compact?: boolean
  gravitation?: number
  shape?: 'ellipse' | 'custom'
}

const defaultOptions: Required<BubbleUiProps> = {
  size: 200,
  minSize: 20,
  gutter: 16,
  numCols: 6,
  fringeWidth: 100,
  yRadius: 200,
  xRadius: 200,
  cornerRadius: 100,
  showGuides: false,
  compact: false,
  gravitation: 0,
  shape: 'custom'
}

const props = defineProps<{
  items: T[]
  options?: BubbleUiProps
}>()
const propsRefs = toRefs(props)

const activeOptions = ref<Required<BubbleUiProps>>({
  ...defaultOptions,
  ...propsRefs.options.value,
  numCols: Math.min(
    propsRefs.options.value?.numCols ?? defaultOptions.numCols,
    propsRefs.items.value.length
  )
})
const minProportion = computed(() => activeOptions.value.minSize / activeOptions.value.size)

const verticalPadding = computed(
  () =>
    `calc(50% - ${
      activeOptions.value.yRadius +
      activeOptions.value.size / 2 -
      (activeOptions.value.cornerRadius * (1.414 - 1)) / 1.414
    }px)`
)
const horizontalPadding = computed(
  () =>
    `calc(50% - ${
      activeOptions.value.xRadius +
      activeOptions.value.size / 2 -
      (activeOptions.value.cornerRadius * (1.414 - 1)) / 1.414
    }px)`
)

const rows = computed(() => {
  const rowsData: (T | null)[][] = []
  let colsRemaining = 0
  let evenRow = true
  for (const item of propsRefs.items.value) {
    if (colsRemaining == 0) {
      colsRemaining = evenRow ? activeOptions.value.numCols - 1 : activeOptions.value.numCols
      evenRow = !evenRow
      rowsData.push([])
    }
    rowsData[rowsData.length - 1].push(item)
    colsRemaining--
  }
  if (rowsData.length > 1) {
    if (rowsData[rowsData.length - 1].length % 2 == rowsData[rowsData.length - 2].length % 2) {
      rowsData[rowsData.length - 1].push(null) // dummy bubble
    }
  }
  return rowsData
})

const scrollable = ref<HTMLElement>()
const scrollTop = ref(0)
const scrollLeft = ref(0)

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement
  if (target) {
    scrollTop.value = target.scrollTop
    scrollLeft.value = target.scrollLeft
  }
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  scrollable.value?.scrollTo(
    (scrollable.value.scrollWidth - scrollable.value.clientWidth) / 2,
    (scrollable.value.scrollHeight - scrollable.value.clientHeight) / 2
  )
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const interpolate = (
  actualMin: number,
  actualMax: number,
  val: number,
  targetMin: number,
  targetMax: number
) => {
  return ((val - actualMin) / (actualMax - actualMin)) * (targetMax - targetMin) + targetMin
}

const getBubbleSize = (row: number, col: number) => {
  const yOffset =
    (activeOptions.value.size + activeOptions.value.gutter) * 0.866 * row -
    activeOptions.value.size +
    (activeOptions.value.cornerRadius * (1.414 - 1)) / 1.414 -
    (activeOptions.value.yRadius - activeOptions.value.size)
  //  - activeOptions.cornerRadius / 1.414;
  const xOffset =
    (activeOptions.value.size + activeOptions.value.gutter) * col +
    ((activeOptions.value.numCols - rows.value[row].length) *
      (activeOptions.value.size + activeOptions.value.gutter)) /
      2 -
    activeOptions.value.size +
    (activeOptions.value.cornerRadius * (1.414 - 1)) / 1.414 -
    (activeOptions.value.xRadius - activeOptions.value.size)
  // - activeOptions.cornerRadius / 1.414;
  const dy = yOffset - scrollTop.value
  const dx = xOffset - scrollLeft.value
  const distance = Math.sqrt(dx * dx + dy * dy)
  // let theta = Math.atan(dy / dx);
  // if (dx < 0) theta += Math.PI;
  let out = {
    bubbleSize: 1,
    translateX: 0,
    translateY: 0,
    distance: distance
  }
  let distanceFromEdge = 0
  let isInCornerRegion = false
  if (Math.abs(dx) <= activeOptions.value.xRadius && Math.abs(dy) <= activeOptions.value.yRadius) {
    // inner square
    if (
      Math.abs(dy) > activeOptions.value.yRadius - activeOptions.value.cornerRadius &&
      Math.abs(dx) > activeOptions.value.xRadius - activeOptions.value.cornerRadius
    ) {
      // in corner region
      const distToInnerCorner = Math.sqrt(
        Math.pow(Math.abs(dy) - activeOptions.value.yRadius + activeOptions.value.cornerRadius, 2) +
          Math.pow(Math.abs(dx) - activeOptions.value.xRadius + activeOptions.value.cornerRadius, 2)
      )
      if (distToInnerCorner > activeOptions.value.cornerRadius) {
        // outside inner radius
        distanceFromEdge = distToInnerCorner - activeOptions.value.cornerRadius
        isInCornerRegion = true
      }
    }
  } else if (
    Math.abs(dx) <= activeOptions.value.xRadius + activeOptions.value.fringeWidth &&
    Math.abs(dy) <= activeOptions.value.yRadius + activeOptions.value.fringeWidth
  ) {
    // outer square
    if (
      Math.abs(dy) > activeOptions.value.yRadius - activeOptions.value.cornerRadius &&
      Math.abs(dx) > activeOptions.value.xRadius - activeOptions.value.cornerRadius
    ) {
      // in corner region
      isInCornerRegion = true
      const distToInnerCorner = Math.sqrt(
        Math.pow(Math.abs(dy) - activeOptions.value.yRadius + activeOptions.value.cornerRadius, 2) +
          Math.pow(Math.abs(dx) - activeOptions.value.xRadius + activeOptions.value.cornerRadius, 2)
      )
      distanceFromEdge = distToInnerCorner - activeOptions.value.cornerRadius
      // distanceFromEdge = Math.min(
      //   distToInnerCorner - activeOptions.cornerRadius,
      //   activeOptions.fringeWidth
      // );
    } else {
      distanceFromEdge = Math.max(
        Math.abs(dx) - activeOptions.value.xRadius,
        Math.abs(dy) - activeOptions.value.yRadius
      )
    }
  } else {
    // outside outer square
    isInCornerRegion =
      Math.abs(dy) > activeOptions.value.yRadius - activeOptions.value.cornerRadius &&
      Math.abs(dx) > activeOptions.value.xRadius - activeOptions.value.cornerRadius
    if (isInCornerRegion) {
      const distToInnerCorner = Math.sqrt(
        Math.pow(Math.abs(dy) - activeOptions.value.yRadius + activeOptions.value.cornerRadius, 2) +
          Math.pow(Math.abs(dx) - activeOptions.value.xRadius + activeOptions.value.cornerRadius, 2)
      )
      distanceFromEdge = distToInnerCorner - activeOptions.value.cornerRadius
    } else {
      distanceFromEdge = Math.max(
        Math.abs(dx) - activeOptions.value.xRadius,
        Math.abs(dy) - activeOptions.value.yRadius
      )
    }
  }

  out.bubbleSize = interpolate(
    0,
    activeOptions.value.fringeWidth,
    Math.min(distanceFromEdge, activeOptions.value.fringeWidth),
    1,
    minProportion.value
  )

  //handle magnitudes

  const translationMag = activeOptions.value.compact
    ? (activeOptions.value.size - activeOptions.value.minSize) / 2
    : 0
  const interpolatedTranslationMag = interpolate(
    0,
    activeOptions.value.fringeWidth,
    distanceFromEdge,
    0,
    translationMag
  )

  if (distanceFromEdge > 0 && distanceFromEdge <= activeOptions.value.fringeWidth) {
    out.translateX = interpolatedTranslationMag
    out.translateY = interpolatedTranslationMag
  } else if (distanceFromEdge - activeOptions.value.fringeWidth > 0) {
    const extra =
      (Math.max(
        0,
        distanceFromEdge - activeOptions.value.fringeWidth - activeOptions.value.size / 2
      ) *
        activeOptions.value.gravitation) /
      10
    out.translateX = translationMag + extra
    out.translateY = translationMag + extra
  }

  if (isInCornerRegion) {
    const cornerDx = Math.abs(dx) - activeOptions.value.xRadius + activeOptions.value.cornerRadius
    const cornerDy = Math.abs(dy) - activeOptions.value.yRadius + activeOptions.value.cornerRadius
    let theta = Math.atan(-cornerDy / cornerDx)
    if (dx > 0) {
      if (dy > 0) {
        theta *= -1
      }
    } else {
      if (dy > 0) {
        theta += Math.PI
      } else {
        theta += Math.PI - 2 * theta
      }
    }
    out.translateX *= -Math.cos(theta)
    out.translateY *= -Math.sin(theta)
  } else if (
    Math.abs(dx) > activeOptions.value.xRadius ||
    Math.abs(dy) > activeOptions.value.yRadius
  ) {
    if (Math.abs(dx) > activeOptions.value.xRadius) {
      out.translateX *= -Math.sign(dx)
      out.translateY = 0
    } else {
      out.translateY *= -Math.sign(dy)
      out.translateX = 0
    }
  }

  return out
}
</script>
<template>
  <div
    :style="{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }"
  >
    <div class="container">
      <div class="scrollable" ref="scrollable" @scroll="handleScroll">
        <div class="horizontalSpacer" :style="{ height: verticalPadding }"></div>
        <div
          class="rowContainer"
          :style="{
            width: `${activeOptions.size * activeOptions.numCols + activeOptions.gutter * activeOptions.numCols}px`,
            paddingLeft: horizontalPadding,
            paddingRight: horizontalPadding
          }"
        >
          <div
            v-for="(row, i) in rows"
            :key="i"
            class="row"
            :style="{
              marginTop: `${
                i > 0
                  ? activeOptions.size * -0.134 + activeOptions.gutter * 0.866 // .134 is sqrt(3) - 1
                  : 0
              }px`
            }"
          >
            <div
              v-for="(comp, j) in row"
              :key="j"
              class="bubbleContainer"
              :style="{
                width: `${activeOptions.size}px`,
                height: `${activeOptions.size}px`,
                marginRight: `${activeOptions.gutter / 2}px`,
                marginLeft: `${activeOptions.gutter / 2}px`,
                transform: `translateX(${getBubbleSize(i, j).translateX}px) translateY(${getBubbleSize(i, j).translateY}px) scale(${getBubbleSize(i, j).bubbleSize})`
              }"
            >
              <div v-if="comp">
                <slot name="item" v-bind="{ item: comp, bubble: getBubbleSize(i, j) }"></slot>
              </div>
              <div v-else></div>
            </div>
          </div>
        </div>
        <div class="horizontalSpacer" :style="{ height: verticalPadding }"></div>
      </div>

      <div v-if="activeOptions.showGuides" class="guideContainer">
        <div
          class="guide"
          :style="{
            height: `${activeOptions.yRadius * 2}px`,
            width: `${activeOptions.xRadius * 2}px`,
            borderRadius:
              activeOptions.shape === 'ellipse' ? '50%' : `${activeOptions.cornerRadius}px`
          }"
        ></div>
        <div
          class="guide"
          :style="{
            height: `${(activeOptions.yRadius + activeOptions.fringeWidth) * 2}px`,
            width: `${(activeOptions.xRadius + activeOptions.fringeWidth) * 2}px`,
            borderRadius:
              activeOptions.shape == 'ellipse'
                ? '50%'
                : `${activeOptions.cornerRadius + activeOptions.fringeWidth}px`
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollable::-webkit-scrollbar {
  display: none;
}

.horizontalSpacer {
  position: relative;
  height: 50%;
  width: 100%;
}

.rowContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 50%;
  padding-right: 50%;
  box-sizing: content-box;
}

.row {
  display: flex;
  flex-direction: row;
}

.bubbleContainer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.bubble {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* overflow: hidden; */
}

.bubble > * {
  width: 100% !important;
  height: 100%;
}

.guideContainer {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
}

.guide {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(0, 0, 0, 0.12);
}

.scrollable {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: scroll !important;
  scroll-padding: 100px 0 0 100px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
