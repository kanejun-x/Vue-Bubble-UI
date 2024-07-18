<script setup lang="ts">
import BubbleUi, { type BubbleUiProps } from '@/lib/BubbleUi.vue'

const options: BubbleUiProps = {
  size: 200,
  minSize: 20,
  gutter: 16,
  numCols: 6,
  fringeWidth: 100,
  yRadius: 200,
  xRadius: 200,
  cornerRadius: 100,
  showGuides: true,
  compact: false,
  gravitation: 0
}

type Company = {
  symbol: string
  name: string
  backgroundColor: string
  textColor: 'white' | 'black'
}
const companies: Company[] = [
  { symbol: 'MMM', name: '3M Company', backgroundColor: '#EE1B2D', textColor: 'white' },
  { symbol: 'ABT', name: 'Abbott Laboratories', backgroundColor: '#0096D7', textColor: 'white' },
  { symbol: 'ABBV', name: 'AbbVie Inc.', backgroundColor: '#00003A', textColor: 'white' },
  { symbol: 'ABMD', name: 'ABIOMED Inc', backgroundColor: '#F0F3FA', textColor: 'black' },
  { symbol: 'ACN', name: 'Accenture plc', backgroundColor: '#A100FF', textColor: 'white' },
  { symbol: 'ATVI', name: 'Activision Blizzard', backgroundColor: '#000000', textColor: 'white' },
  { symbol: 'ADBE', name: 'Adobe Inc.', backgroundColor: '#ED1C24', textColor: 'white' },
  { symbol: 'AAP', name: 'Advance Auto Parts', backgroundColor: '#EB1B2A', textColor: 'white' },
  { symbol: 'AES', name: 'AES Corp', backgroundColor: '#000000', textColor: 'white' },
  { symbol: 'AFL', name: 'AFLAC Inc', backgroundColor: '#00A7E1', textColor: 'white' },
  { symbol: 'A', name: 'Agilent Technologies Inc', backgroundColor: '#008FFE', textColor: 'white' },
  { symbol: 'ALK', name: 'Alaska Air Group Inc', backgroundColor: '#00426A', textColor: 'white' },
  { symbol: 'ALB', name: 'Albemarle Corp', backgroundColor: '#008676', textColor: 'white' },
  { symbol: 'ALGN', name: 'Align Technology', backgroundColor: '#47433E', textColor: 'white' },
  { symbol: 'ALLE', name: 'Allegion', backgroundColor: '#FF661E', textColor: 'black' },
  { symbol: 'LNT', name: 'Alliant Energy Corp', backgroundColor: '#0886C8', textColor: 'white' },
  { symbol: 'ALL', name: 'Allstate Corp', backgroundColor: '#0076B8', textColor: 'white' },
  { symbol: 'MO', name: 'Altria Group Inc', backgroundColor: '#000000', textColor: 'white' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', backgroundColor: '#000000', textColor: 'white' },
  { symbol: 'AEE', name: 'Ameren Corp', backgroundColor: '#F0F3FA', textColor: 'black' }
]
</script>

<template>
  <div :style="{ width: '100vw', height: '100vh' }">
    <bubble-ui :items="companies" :options="options">
      <template #item="{ item, bubble }">
        <div class="companyBubble" :style="{ backgroundColor: `${item.backgroundColor}d0` }">
          <div class="companyContainer" :style="{ opacity: bubble.bubbleSize }">
            <img :src="`./companyLogos/${item.symbol}.svg`" />
            <p class="companyName" :style="{ color: item.textColor }">
              {{ item.name }}
            </p>
            <p class="companySymbol" :style="{ color: item.textColor }">
              {{ item.symbol }}
            </p>
          </div>
        </div>
      </template>
    </bubble-ui>
  </div>
</template>

<style scoped>
.companyBubble {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 200px;
  height: 200px;
  transition: opacity 0.1s ease;
}

.companyBubble:hover {
  opacity: 0.5;
}

.companyContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: opacity 0.1s ease;
  pointer-events: none;
}

.companyName {
  text-align: center;
  font-size: 14pt;
  margin: 0 0 6px 0;
  font-weight: 1000;
  max-width: 150px;
}

.companySymbol {
  font-size: 14pt;
  margin: 0 0 5px 0;
  max-width: 100px;
  opacity: 0.5;
}

img {
  width: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
}
</style>
