<template>
  <div>
    <div class="flex items-center justify-center" v-if="filterTags.length">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-[7px]">
          <div v-for="tag in filterTags" :key="tag.key"
            class="flex items-center bg-white border-2 border-[#CE190A] rounded-[5px] w-[237px] h-[49px] justify-center">
            <span class="text-[#CE190A] text-sm font-400 capitalize">{{ tag.label }}</span>
            <button @click="removeTag(tag.key)" class="ml-2 text-[#CE190A] hover:text-red-700 flex items-center">
              <icon name="material-symbols:close-small-rounded" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const productsStore = useProductsStore()

const filterTags = computed(() => productsStore.activeFilterTags)

const removeTag = (key: string) => {
  switch (key) {
    case 'usageIntensity':
      productsStore.updateSelectedFilter('usageIntensity', null)
      break
    case 'transportDistance':
      productsStore.updateSelectedFilter('transportDistance', null)
      break
    case 'loadCapacity':
      productsStore.updateSelectedFilter('loadCapacityMin', 0)
      productsStore.updateSelectedFilter('loadCapacityMax', 12000)
      break
  }
}
</script>