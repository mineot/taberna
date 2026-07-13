<template>
  <div
    class="flex min-w-0 flex-col pt-6"
    role="group"
    :aria-label="ariaLabel"
    @mouseenter="pause"
    @mouseleave="resume"
  >
    <div class="flex min-w-0 items-center gap-3">
      <button
        v-if="showButtons && slides.length > 1"
        class="carousel-btn"
        aria-label="Previous slide"
        @click="prev"
      >
        <ChevronLeft :size="20" />
      </button>

      <div class="min-h-[120px] flex-1 overflow-hidden">
        <template v-if="isSingleView">
          <div class="relative min-h-[120px]">
            <div
              v-for="(html, i) in slides"
              :key="i"
              class="transition-opacity duration-500 ease-in-out"
              :class="
                i === currentIndex
                  ? 'relative z-10 opacity-100'
                  : 'pointer-events-none absolute inset-0 z-0 opacity-0'
              "
            >
              <div class="prose prose-invert max-w-none" v-html="html" />
            </div>
          </div>
        </template>

        <template v-else>
          <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentPage * 100}%)` }"
          >
            <div
              v-for="(html, i) in slides"
              :key="i"
              class="min-w-0 flex-shrink-0 overflow-hidden px-2"
              :style="{ width: slideWidth }"
            >
              <div class="prose prose-invert" v-html="html" />
            </div>
          </div>
        </template>
      </div>

      <button
        v-if="showButtons && slides.length > 1"
        class="carousel-btn"
        aria-label="Next slide"
        @click="next"
      >
        <ChevronRight :size="20" />
      </button>
    </div>

    <div
      v-if="showDots && slides.length > 1"
      class="mt-4 flex items-center justify-center gap-2"
    >
      <button
        v-for="(_, i) in totalDots"
        :key="i"
        class="h-2 w-2 rounded-full transition-all duration-300"
        :class="
          i === activeDot ? 'app-dot-active scale-125' : 'app-dot-inactive'
        "
        :aria-label="`Slide ${i + 1}`"
        :aria-current="i === activeDot ? 'true' : undefined"
        @click="goTo(i)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { ChevronLeft, ChevronRight } from '@lucide/vue';
import type { CarouselConfig } from '../types/config';

const props = defineProps<{
  slides: string[];
  config: CarouselConfig;
}>();

const currentIndex = ref(0);
const currentPage = ref(0);
const isSmallScreen = ref(false);
let timer: ReturnType<typeof setInterval> | null = null;
let mql: MediaQueryList | null = null;

function onBreakpointChange(e: MediaQueryListEvent | MediaQueryList) {
  isSmallScreen.value = !e.matches;
}

const autoPlay = computed(() => props.config.autoPlay !== false);
const interval = computed(() => props.config.interval ?? 5000);
const showButtons = computed(() => props.config.buttons !== false);
const showDots = computed(() => props.config.dots !== false);
const itemsPerView = computed(() => {
  const configured = props.config.itemsPerView ?? 1;
  return isSmallScreen.value ? 1 : configured;
});
const isSingleView = computed(() => itemsPerView.value <= 1);

const maxPage = computed(
  () => Math.ceil(props.slides.length / itemsPerView.value) - 1,
);

const totalDots = computed(() =>
  isSingleView.value
    ? props.slides.length
    : Math.ceil(props.slides.length / itemsPerView.value),
);

const activeDot = computed(() =>
  isSingleView.value ? currentIndex.value : currentPage.value,
);

const slideWidth = computed(() => `calc(100% / ${itemsPerView.value})`);

const ariaLabel = computed(() => {
  const current = isSingleView.value ? currentIndex.value : currentPage.value;
  const total = totalDots.value;
  return `Carousel: ${current + 1}/${total}`;
});

function prev() {
  if (isSingleView.value) {
    currentIndex.value =
      (currentIndex.value - 1 + props.slides.length) % props.slides.length;
  } else {
    currentPage.value = Math.max(currentPage.value - 1, 0);
  }
}

function next() {
  if (isSingleView.value) {
    currentIndex.value = (currentIndex.value + 1) % props.slides.length;
  } else {
    currentPage.value = Math.min(currentPage.value + 1, maxPage.value);
  }
}

function goTo(dotIndex: number) {
  if (isSingleView.value) {
    currentIndex.value = dotIndex;
  } else {
    currentPage.value = Math.min(dotIndex, maxPage.value);
  }
}

function startTimer() {
  stopTimer();
  if (autoPlay.value && props.slides.length > 1) {
    timer = setInterval(next, interval.value);
  }
}

function stopTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

function pause() {
  stopTimer();
}

function resume() {
  startTimer();
}

onMounted(() => {
  mql = window.matchMedia('(min-width: 768px)');
  onBreakpointChange(mql);
  mql.addEventListener('change', onBreakpointChange);
  startTimer();
});

onBeforeUnmount(() => {
  mql?.removeEventListener('change', onBreakpointChange);
  stopTimer();
});

watch(
  () => props.slides.length,
  () => {
    currentIndex.value = 0;
    currentPage.value = 0;
    startTimer();
  },
);
</script>

<style scoped>
@reference 'tailwindcss';
@reference '../style.css';

.carousel-btn {
  @apply app-text-muted hover:app-accent app-duration app-carousel-btn-bg flex flex-shrink-0 cursor-pointer items-center justify-center rounded-full p-2 transition-colors;
}
</style>
