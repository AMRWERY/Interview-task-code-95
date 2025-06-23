<template>
  <div>
    <header class="flex px-4 md:px-[60px] sm:px-6 bg-white min-h-[101px] tracking-wide relative z-50">
      <div class="flex flex-wrap items-center gap-5 w-full mx-auto">
        <nuxt-link to="">
          <img src="/public/toyota-logo.jpg" alt="toyota-logo" class="w-[144.76px] h-[47.82px]" />
        </nuxt-link>

        <div id="collapseMenu" v-show="isMenuOpen" :class="[
          'lg:!flex lg:ml-auto max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50',
          isMenuOpen ? 'max-lg:block' : 'max-lg:hidden'
        ]">
          <button id="toggleClose" @click="isMenuOpen = false"
            class="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border border-gray-200 cursor-pointer">
            <icon name="material-symbols:close-small-rounded" class="text-black" />
          </button>

          <ul
            class="lg:flex gap-12 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li class="mb-6 hidden max-lg:block">
              <nuxt-link to="">
                <img src="/public/toyota-logo.jpg" alt="toyota-logo" class="w-[144.76px] h-[47.82px]" />
              </nuxt-link>
            </li>
            <li class="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3">
              <nuxt-link to=""
                class="hover:text-blue-700 text-[#282830] font-400 block text-lg uppercase cursor-pointer">Products</nuxt-link>
            </li>
            <li class="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3">
              <nuxt-link to=""
                class="hover:text-blue-700 text-[#282830] font-400 block text-lg uppercase cursor-pointer">Services</nuxt-link>
            </li>
            <li class="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3">
              <nuxt-link to=""
                class="hover:text-blue-700 text-[#282830] font-400 block text-lg uppercase cursor-pointer">Training</nuxt-link>
            </li>
            <li class="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3">
              <nuxt-link to=""
                class="hover:text-blue-700 text-[#282830] font-400 block text-lg uppercase cursor-pointer">About
                Us</nuxt-link>
            </li>
            <li class="max-lg:py-3 px-3 flex md:mr-[65px]">
              <icon name="iconamoon:search" class="w-[18px] h-[18px] hidden lg:block mt-1" />
              <div v-if="isMenuOpen" class="lg:hidden relative w-full">
                <input type="text" v-model="searchQuery" placeholder="Search..."
                  class="w-full py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-700" />
                <icon name="iconamoon:search"
                  class="w-[18px] h-[18px] absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </li>
          </ul>
        </div>

        <div class="flex items-center max-lg:ml-auto space-x-4">
          <button
            class="text-[15px] rounded-[18px] font-medium text-white bg-[#CE190A] hover:bg-red-600 cursor-pointer w-[136px] h-[48px]">Get
            Quote
          </button>

          <button id="toggleOpen" class="lg:hidden cursor-pointer" @click="isMenuOpen = true">
            <icon name="material-symbols:menu" class="w-7 h-7" />
          </button>
        </div>
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
const isMenuOpen = ref(false)
const searchQuery = ref('')
</script>