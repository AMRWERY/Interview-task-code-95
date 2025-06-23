<template>
  <div>
    <div class="flex items-center justify-center pb-[192.38px]">
      <div class="container mx-auto">
        <div
          :class="['grid', cards.length === 1 ? 'place-items-center' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4', 'gap-[30px]']">
          <template v-if="productsStore.isLoading">
            <product-cards-skeleton v-for="n in 4" :key="n" />
          </template>

          <template v-else>
            <TransitionGroup name="fade" mode="out-in"
              :class="['grid', cards.length === 1 ? 'place-items-center' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4', 'gap-[30px]']">
              <div v-for="card in cards" :key="card.id"
                class="bg-white rounded-xl custom-shadow py-5 text-center w-[326px] min-h-[390px] gap-2.5">
                <img :src="card.featured_image" alt="product" class="w-[195.93px] h-[195.93px] object-contain mx-auto">
                <h3 class="text-base font-500 text-[#CE190A] mt-5 uppercase">{{ card.name }}</h3>
                <p class="text-[#282830] mt-2.5 font-500 text-sm">{{ card.code }}</p>
                <p class="text-[#282830] mt-2.5 font-500 text-sm uppercase">capacity: <span class="text-[#CE190A]">{{
                  getCapacity(card)
                    }}</span></p>

                <button
                  class="mt-4 bg-[#CE190A] text-white w-[161px] h-[48px] rounded-[18px] hover:bg-red-600 uppercase text-sm font-700">viewproduct</button>
              </div>
            </TransitionGroup>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from "@/types/products";

const productsStore = useProductsStore()

onMounted(() => {
  productsStore.fetchProducts()
})

const cards = computed(() => productsStore.filteredProducts)

const getCapacity = (product: Product) => {
  const cap = product.numericTypes?.find(n => n.name.toLowerCase().includes('capacity'))
  return cap ? `${Number(cap.value).toFixed(0)} Kg` : 'N/A'
}
</script>

<style scoped>
.custom-shadow {
  box-shadow: 0px 0px 4px 0px #00000059;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(1rem);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>