<template>
    <div>
        <div class="bg-[#EFEFF0] p-[18px] rounded-[5px] w-[335.42px] h-[155.82px]">
            <div class="flex items-center mb-4">
                <h3 class="text-sm font-400 text-[#282830] capitalize mr-[11.00px]">{{ title }}</h3>
                <icon name="mingcute:question-fill" class="w-[19px] h-[19px] text-[#CE190A]" />
            </div>

            <ol v-if="type === 'steps'"
                class="relative flex gap-8 before:absolute before:-mt-px before:h-0.5 before:w-full before:rounded-full before:bg-gray-200 justify-between mt-[21.53px]">
                <li class="relative -mt-3 flex flex-col items-center gap-1" v-for="(label, i) in labels" :key="i">
                    <div class="w-[28.36px] h-[28.36px] rounded-full bg-[#DFDFDF] mb-[14.12px]"></div>
                    <span class="text-[14.18px] text-[#282830] font-400 font-sans">{{ label }}</span>
                </li>
            </ol>

            <div v-else-if="type === 'slider'">
                <input type="range" class="w-full custom-range" min="0" max="12000" :value="min"
                    @input="handleSliderChange" />
                <div class="flex items-center justify-between text-sm text-gray-700 mt-[17px]">
                    <div
                        class="rounded-[4.18px] w-[101.17px] h-[40.13px] border border-[#282830] py-[12.7px] px-[10.03px] font-400 text-[13.38px]">
                        {{ formatKg(min) }}</div>
                    <span class="w-[6.69px] text-[#282830]">-</span>
                    <div
                        class="rounded-[4.18px] w-[101.17px] h-[40.13px] border border-[#282830] py-[12.7px] px-[10.03px] font-400 text-[13.38px]">
                        {{ formatKg(max) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    title: string
    type: 'steps' | 'slider'
    labels?: string[]
    min?: number
    max?: number
}>()

const min = ref(0)
const max = ref(12000)

const handleSliderChange = (e: Event) => {
    const val = (e.target as HTMLInputElement).value
    min.value = Number(val)
}

const formatKg = (val: number) => `${val} Kg`
</script>

<style scoped>
.custom-range {
    -webkit-appearance: none;
    height: 10px;
    background-color: #f4b9b9;
    border-radius: 5px;
    outline: none;
    transition: background 0.3s;
}

.custom-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20.07px;
    width: 20.07px;
    border-radius: 50%;
    background: #CE190A;
    border: 3.34px solid white;
    box-shadow: 0 0 0 2px white;
    cursor: pointer;
    margin-top: -4px;
}

.custom-range::-moz-range-thumb {
    height: 18px;
    width: 18px;
    border-radius: 50%;
    background: #CE190A;
    border: 2px solid white;
    box-shadow: 0 0 0 2px #CE190A;
    cursor: pointer;
}
</style>