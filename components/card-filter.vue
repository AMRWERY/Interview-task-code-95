<template>
    <div>
        <div class="bg-[#EFEFF0] p-[18px] rounded-[5px] w-[335.42px] h-[155.82px]">
            <div class="flex items-center mb-4">
                <h3 class="text-sm font-400 text-[#282830] capitalize mr-[11.00px]">{{ title }}</h3>
                <icon name="mingcute:question-fill" class="w-[19px] h-[19px] text-[#CE190A]" />
            </div>

            <ol v-if="type === 'steps'"
                class="relative flex gap-8 before:absolute before:-mt-px before:h-0.5 before:w-full before:rounded-full before:bg-gray-200 justify-between mt-[22.03px]">
                <li class="relative -mt-3 flex flex-col items-center gap-1" v-for="(label, i) in labels" :key="i">
                    <div class="w-[28.36px] h-[28.36px] rounded-full mb-[14.12px] cursor-pointer"
                        :class="{ 'bg-[#CE190A]': i === currentStepIndex, 'bg-[#DFDFDF]': i !== currentStepIndex }"
                        @click="selectStep(i)"></div>
                    <span class="text-[14.18px] text-[#282830] font-400 font-sans">{{ label }}</span>
                </li>
            </ol>

            <div v-else-if="type === 'slider'">
                <div ref="sliderTrackRef" class="slider-track-container relative mt-[21.53px]"
                    @mousedown="handleTrackClick">
                    <div class="base-track"></div>

                    <div class="filled-track" :style="{ left: filledTrackLeft, width: filledTrackWidth }"></div>
                    <div class="slider-thumb min-thumb" :style="{ left: minThumbLeft }"
                        @mousedown="startDrag($event, 'min')"></div>
                    <div class="slider-thumb max-thumb" :style="{ left: maxThumbLeft }"
                        @mousedown="startDrag($event, 'max')"></div>
                </div>
                <div class="flex items-center justify-between text-sm text-gray-700 mt-[17px]">
                    <div
                        class="rounded-[4.18px] w-[101.17px] h-[40.13px] border border-[#282830] py-[12.7px] px-[10.03px] font-400 text-[13.38px] flex items-center">
                        {{ formatKg(minRange) }}</div>
                    <span class="w-[6.69px] text-[#282830]">-</span>
                    <div
                        class="rounded-[4.18px] w-[101.17px] h-[40.13px] border border-[#282830] py-[12.7px] px-[10.03px] font-400 text-[13.38px] flex items-center">
                        {{ formatKg(maxRange) }}</div>
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
    currentStepIndex?: number | null
    minValue?: number
    maxValue?: number
}>()

const emit = defineEmits(['update:currentStepIndex', 'update:minValue', 'update:maxValue']);

const selectStep = (index: number) => {
    emit('update:currentStepIndex', index);
};

const minRange = ref(0)
const maxRange = ref(12000)

const sliderTrackRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const activeThumb = ref<'min' | 'max' | null>(null)
const sliderWidth = ref(0)
const thumbWidth = 20.07

const minVal = 0
const maxVal = 12000

const valueToPx = (value: number) => {
    if (!sliderWidth.value) return 0;
    const percentage = (value - minVal) / (maxVal - minVal);
    return percentage * sliderWidth.value;
}

const pxToValue = (pixels: number) => {
    if (!sliderWidth.value) return minVal;
    const constrainedPixels = Math.max(0, Math.min(pixels, sliderWidth.value));
    const percentage = constrainedPixels / sliderWidth.value;
    return Math.round(percentage * (maxVal - minVal) + minVal);
}

const minThumbLeft = computed(() => {
    return `${valueToPx(minRange.value) - (thumbWidth / 2)}px`;
});

const maxThumbLeft = computed(() => {
    return `${valueToPx(maxRange.value) - (thumbWidth / 2)}px`;
});

const filledTrackLeft = computed(() => {
    return `${valueToPx(minRange.value)}px`;
});

const filledTrackWidth = computed(() => {
    return `${valueToPx(maxRange.value) - valueToPx(minRange.value)}px`;
});

const startDrag = (event: MouseEvent, thumb: 'min' | 'max') => {
    isDragging.value = true;
    activeThumb.value = thumb;
    event.preventDefault();
    window.addEventListener('mousemove', handleDragging);
    window.addEventListener('mouseup', stopDrag);
};

const handleDragging = (event: MouseEvent) => {
    if (!isDragging.value || !sliderTrackRef.value) return;
    const trackRect = sliderTrackRef.value.getBoundingClientRect();
    let mouseX = event.clientX - trackRect.left;
    mouseX = Math.max(0, Math.min(mouseX, sliderWidth.value));
    let newValue = pxToValue(mouseX);
    if (activeThumb.value === 'min') {
        minRange.value = Math.min(newValue, maxRange.value);
    } else if (activeThumb.value === 'max') {
        maxRange.value = Math.max(newValue, minRange.value);
    }
};

const stopDrag = () => {
    isDragging.value = false;
    activeThumb.value = null;
    emit('update:minValue', minRange.value)
    emit('update:maxValue', maxRange.value)
    window.removeEventListener('mousemove', handleDragging);
    window.removeEventListener('mouseup', stopDrag);
};

const handleTrackClick = (event: MouseEvent) => {
    if (!sliderTrackRef.value || event.target !== sliderTrackRef.value) return;
    const trackRect = sliderTrackRef.value.getBoundingClientRect();
    let mouseX = event.clientX - trackRect.left;
    mouseX = Math.max(0, Math.min(mouseX, sliderWidth.value));
    const clickedValue = pxToValue(mouseX);
    const minDiff = Math.abs(clickedValue - minRange.value);
    const maxDiff = Math.abs(clickedValue - maxRange.value);
    if (minDiff <= maxDiff) {
        minRange.value = Math.min(clickedValue, maxRange.value);
    } else {
        maxRange.value = Math.max(clickedValue, minRange.value);
    }
};

const formatKg = (val: number) => `${val} Kg`

onMounted(() => {
    if (sliderTrackRef.value) {
        sliderWidth.value = sliderTrackRef.value.clientWidth;
    }
});

onUnmounted(() => {
    window.removeEventListener('mousemove', handleDragging);
    window.removeEventListener('mouseup', stopDrag);
});
</script>

<style scoped>
.slider-track-container {
    width: 100%;
    height: 20.07px;
    cursor: pointer;
    user-select: none;
    touch-action: none;
}

.base-track {
    position: absolute;
    width: 100%;
    height: 10px;
    background-color: #f4b9b9;
    border-radius: 5px;
    top: 50%;
    transform: translateY(-50%);
}

.filled-track {
    position: absolute;
    height: 10px;
    background-color: #CE190A;
    border-radius: 5px;
    top: 50%;
    transform: translateY(-50%);
}

.slider-thumb {
    position: absolute;
    height: 20.07px;
    width: 20.07px;
    border-radius: 50%;
    background: #CE190A;
    border: 3.34px solid white;
    box-shadow: 0 0 0 2px white;
    cursor: grab;
    top: 50%;
    transform: translateY(-50%);
    z-index: 50;
}
</style>