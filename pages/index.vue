<template>
  <div>
    <div class="mt-[70px] sm:mt-[100px] md:mt-[188.84px] text-center">
      <p class="font-700 text-[24px] md:text-[32px] uppercase text-[#282830]">Ranges</p>
      <div class="w-[30px] md:w-[50px] h-[1px] bg-[#CE190A] mt-3 mx-auto"></div>
    </div>

    <div
      class="flex flex-col items-center md:flex-row md:flex-wrap md:items-start gap-6 mt-[30px] md:mt-[65.12px] justify-start">
      <!-- Usage Intensity -->
      <card-filter title="Usage Intensity" type="steps" :labels="['Low', '', 'Medium', '', 'High']"
        v-model:currentStepIndex="usageIntensityStep" />

      <!-- Transport Distance -->
      <card-filter title="Transport Distance" type="steps" :labels="['Short', '', 'Medium', '', 'Long']"
        v-model:currentStepIndex="transportDistanceStep" />

      <!-- Load Capacity -->
      <card-filter title="Load Capacity" type="slider" v-model:minValue="minKg" v-model:maxValue="maxKg" />
    </div>

    <!-- Display Filters -->
    <div class="my-[20px] md:my-[34.24px]">
      <display-filters />
    </div>

    <!-- Product Cards -->
    <div class="mt-[20px] md:mt-[37.68px]">
      <products-list />
    </div>
  </div>
</template>

<script lang="ts" setup>
const productsStore = useProductsStore()

const usageIntensityStep = ref<number | null>(null)
const transportDistanceStep = ref<number | null>(null)

onMounted(() => {
  productsStore.fetchProducts()
  productsStore.fetchFilters()
})

watch(usageIntensityStep, (val) => {
  productsStore.updateSelectedFilter("usageIntensity", val)
})

watch(transportDistanceStep, (val) => {
  productsStore.updateSelectedFilter("transportDistance", val)
})

const minKg = ref(0)
const maxKg = ref(12000)

watch([minKg, maxKg], ([min, max]) => {
  productsStore.updateSelectedFilter('loadCapacityMin', min)
  productsStore.updateSelectedFilter('loadCapacityMax', max)
})
</script>