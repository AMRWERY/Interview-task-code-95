<template>
  <div>
    <div class="flex items-center justify-center">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-[7px]">
          <div v-for="(tag, index) in tags" :key="index"
            class="flex items-center bg-white border-2 border-[#CE190A] rounded-[5px] w-[237px] h-[49px] justify-center">
            <span class="text-[#CE190A] text-sm font-400 capitalize">{{ tag.label }}</span>
            <button @click="removeTag(index)" class="ml-2 text-[#CE190A] hover:text-red-700 flex items-center">
              <icon name="material-symbols:close-small-rounded" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const tags = ref([
  { label: 'transport distance: short' },
  { label: 'usage intensity: medium' },
  { label: 'load capacity: 12000 Kg' }
])

const removeTag = (index: number) => {
  tags.value.splice(index, 1)
}
</script>