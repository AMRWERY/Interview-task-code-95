<template>
  <div>
    <div class="flex items-center justify-center pb-6">
      <div class="container mx-auto">
        <div
          :class="['grid', cards.length === 1 ? 'place-items-center' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4', 'gap-[30px]']">
          <div v-for="card in cards" :key="card.id"
            class="bg-white rounded-xl custom-shadow py-5 text-center w-[326px] min-h-[390px] gap-2.5">
            <img :src="card.image" alt="product" class="w-[195.93px] h-[195.93px] object-contain mx-auto">
            <h3 class="text-base font-500 text-[#CE190A] mt-5 uppercase">{{ card.title }}</h3>
            <p class="text-[#282830] mt-2.5 font-500 text-sm">{{ card.subtitle }}</p>
            <p class="text-[#282830] mt-2.5 font-500 text-sm uppercase">capacity: <span class="text-[#CE190A]">{{
              card.capacity
                }}</span></p>

            <button
              class="mt-4 bg-[#CE190A] text-white w-[161px] h-[48px] rounded-[18px] hover:bg-red-600 uppercase text-sm font-700">viewproduct</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const cards = ref([
  { id: 1, image: 'https://justfields.com/storage/projects/7M5rV059/image%207.png', title: 'reach trucks', subtitle: 'OSE250', capacity: '5511 LBS' },
  { id: 2, image: 'https://justfields.com/storage/projects/7M5rV059/image%207.png', title: 'reach trucks', subtitle: 'OSE250', capacity: '5511 LBS' },
  { id: 3, image: 'https://justfields.com/storage/projects/7M5rV059/image%207.png', title: 'reach trucks', subtitle: 'OSE250', capacity: '5511 LBS' },
  { id: 4, image: 'https://justfields.com/storage/projects/7M5rV059/image%207.png', title: 'reach trucks', subtitle: 'OSE250', capacity: '5511 LBS' },
])
</script>

<style scoped>
.custom-shadow {
  box-shadow: 0px 0px 4px 0px #00000059;
}
</style>