<template>
  <div>
    <div class="flex items-center justify-center pb-[192.38px]">
      <div class="mx-auto">
        <div
          :class="['grid', cards.length === 1 ? 'place-items-center' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4', 'gap-[30px]']">
          <template v-if="productsStore.isLoading">
            <!-- product-cards-skeleton component -->
            <product-cards-skeleton v-for="n in 4" :key="n" />
          </template>

          <template v-else>
            <TransitionGroup name="fade">
              <!-- product-card component -->
              <product-card v-for="card in cards" :key="card.id" :product="card" />
            </TransitionGroup>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const productsStore = useProductsStore()

onMounted(() => {
  productsStore.fetchProducts()
})

const cards = computed(() => productsStore.filteredProducts)
</script>

<style scoped>
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