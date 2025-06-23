<template>
  <div>
    <div class="mt-[188.84px] text-center">
      <p class="font-700 text-[32px] uppercase text-[#282830]">Ranges</p>
      <div class="w-[50px] h-[1px] bg-[#CE190A] mt-3 mx-auto"></div>
    </div>

    <div class="flex flex-wrap gap-6 mt-[65.12px] justify-center md:justify-start">
      <card-filter title="Usage Intensity" type="steps" :labels="['Low', '', 'Medium', '', 'High']" />

      <card-filter title="Transport Distance" type="steps" :labels="['Short', '', 'Medium', '', 'Long']" />

      <card-filter title="Load Capacity" type="slider" />
    </div>

    <div class="mt-[37.68px]">
      <product-cards />
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>