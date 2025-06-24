<template>
  <div>
    <div class="bg-white rounded-xl custom-shadow py-5 text-center w-[326px] min-h-[390px] gap-2.5">
      <img :src="product.featured_image" alt="product" class="w-[195.93px] h-[195.93px] object-contain mx-auto" />
      <h3 class="text-base font-500 text-[#CE190A] mt-5 uppercase">{{ product.name }}</h3>
      <p class="text-[#282830] mt-2.5 font-500 text-sm">{{ product.code }}</p>
      <p class="text-[#282830] mt-2.5 font-500 text-sm uppercase">
        capacity:
        <span class="text-[#CE190A]">{{ capacity }}</span>
      </p>
      
      <button
        class="mt-4 bg-[#CE190A] text-white w-[161px] h-[48px] rounded-[18px] hover:bg-red-600 uppercase text-sm font-700">
        viewproduct
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from '@/types/products'

const props = defineProps<{
  product: Product
}>()

const capacity = computed(() => {
  const cap = props.product.numericTypes?.find(n =>
    n.name.toLowerCase().includes('capacity')
  )
  return cap ? `${Number(cap.value)}` : 'N/A'
})
</script>

<style scoped>
.custom-shadow {
  box-shadow: 0px 0px 4px 0px #00000059;
}
</style>