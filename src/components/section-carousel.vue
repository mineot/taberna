<template>
  <div
    ref="carouselRoot"
    class="flex min-w-0 flex-col pt-6"
    role="group"
    :aria-label="ariaLabel"
    @mouseenter="pauseInteraction"
    @mouseleave="resumeInteraction"
    @focusin="pauseInteraction"
    @focusout="handleFocusOut"
  >
    <div class="flex min-w-0 items-center gap-3">
      <button
        v-if="showButtons && hasMultiplePages"
        class="app-carousel-btn"
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
        v-if="showButtons && hasMultiplePages"
        class="app-carousel-btn"
        aria-label="Next slide"
        @click="next"
      >
        <ChevronRight :size="20" />
      </button>
    </div>

    <div
      v-if="(showDots && hasMultiplePages) || showPlaybackControl"
      class="mt-4 flex items-center justify-center gap-2"
    >
      <template v-if="showDots && hasMultiplePages">
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
      </template>
      <button
        v-if="showPlaybackControl"
        class="app-carousel-btn relative ml-2"
        :aria-label="userPaused ? 'Play carousel' : 'Pause carousel'"
        @click="togglePlayback"
      >
        <svg
          class="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
          viewBox="0 0 36 36"
          aria-hidden="true"
        >
          <circle
            class="app-carousel-progress-track fill-none"
            cx="18"
            cy="18"
            r="16"
            pathLength="100"
            stroke-width="2"
          />
          <circle
            class="app-carousel-progress fill-none"
            cx="18"
            cy="18"
            r="16"
            pathLength="100"
            stroke-width="2"
            stroke-linecap="round"
            stroke-dasharray="100"
            :stroke-dashoffset="100 - playbackProgress"
            data-testid="carousel-progress"
          />
        </svg>
        <Play v-if="userPaused" :size="16" />
        <Pause v-else :size="16" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { ChevronLeft, ChevronRight, Pause, Play } from '@lucide/vue';
import type { CarouselConfig } from '../types/config';

const props = defineProps<{
  slides: string[];
  config: CarouselConfig;
}>();

const currentIndex = ref(0);
const currentPage = ref(0);
const isSmallScreen = ref(false);
const prefersReducedMotion = ref(false);
const documentHidden = ref(false);
const interactionPaused = ref(false);
const userPaused = ref(false);
const playbackProgress = ref(0);
const carouselRoot = ref<HTMLElement | null>(null);
let timer: ReturnType<typeof setTimeout> | null = null;
let progressTimer: ReturnType<typeof setInterval> | null = null;
let remainingTime = 0;
let timerStartedAt = 0;
let breakpointMql: MediaQueryList | null = null;
let motionMql: MediaQueryList | null = null;

function onBreakpointChange(e: MediaQueryListEvent | MediaQueryList) {
  isSmallScreen.value = !e.matches;
}

function onMotionPreferenceChange(e: MediaQueryListEvent | MediaQueryList) {
  prefersReducedMotion.value = e.matches;
  refreshTimer();
}

function onVisibilityChange() {
  documentHidden.value = document.hidden;
  refreshTimer();
}

const autoPlay = computed(() => props.config.autoPlay !== false);
const interval = computed(() => {
  const configured = props.config.interval ?? 5000;
  return Number.isFinite(configured) && configured >= 1000 ? configured : 5000;
});
const showButtons = computed(() => props.config.buttons !== false);
const showDots = computed(() => props.config.dots !== false);
const itemsPerView = computed(() => {
  const configured = props.config.itemsPerView ?? 1;
  const valid =
    Number.isFinite(configured) && configured >= 1 ? Math.floor(configured) : 1;
  const clamped = Math.min(valid, Math.max(props.slides.length, 1));
  return isSmallScreen.value ? 1 : clamped;
});
const isSingleView = computed(() => itemsPerView.value <= 1);

const maxPage = computed(
  () => Math.ceil(props.slides.length / itemsPerView.value) - 1,
);

const totalDots = computed(() =>
  props.slides.length === 0
    ? 0
    : isSingleView.value
      ? props.slides.length
      : Math.ceil(props.slides.length / itemsPerView.value),
);
const hasMultiplePages = computed(() => totalDots.value > 1);
const showPlaybackControl = computed(
  () => autoPlay.value && hasMultiplePages.value && !prefersReducedMotion.value,
);

const activeDot = computed(() =>
  isSingleView.value ? currentIndex.value : currentPage.value,
);

const slideWidth = computed(() => `calc(100% / ${itemsPerView.value})`);

const ariaLabel = computed(() => {
  const current = isSingleView.value ? currentIndex.value : currentPage.value;
  const total = totalDots.value;
  return `Carousel: ${total > 0 ? current + 1 : 0}/${total}`;
});

function prev() {
  if (!hasMultiplePages.value) return;

  if (isSingleView.value) {
    currentIndex.value =
      (currentIndex.value - 1 + props.slides.length) % props.slides.length;
  } else {
    currentPage.value =
      (currentPage.value - 1 + totalDots.value) % totalDots.value;
  }
  resetTimer();
}

function next() {
  if (!hasMultiplePages.value) return;

  advance();
  resetTimer();
}

function advance() {
  if (!hasMultiplePages.value) return;

  if (isSingleView.value) {
    currentIndex.value = (currentIndex.value + 1) % props.slides.length;
  } else {
    currentPage.value = (currentPage.value + 1) % totalDots.value;
  }
}

function goTo(dotIndex: number) {
  if (isSingleView.value) {
    currentIndex.value = dotIndex;
  } else {
    currentPage.value = Math.min(dotIndex, maxPage.value);
  }
  resetTimer();
}

function startTimer() {
  clearTimers();
  if (
    autoPlay.value &&
    hasMultiplePages.value &&
    !prefersReducedMotion.value &&
    !documentHidden.value &&
    !interactionPaused.value &&
    !userPaused.value
  ) {
    if (remainingTime <= 0 || remainingTime > interval.value) {
      remainingTime = interval.value;
    }

    timerStartedAt = Date.now();
    timer = setTimeout(() => {
      clearTimers();
      advance();
      remainingTime = interval.value;
      playbackProgress.value = 0;
      startTimer();
    }, remainingTime);
    progressTimer = setInterval(updateProgress, 50);
  }
}

function updateProgress() {
  const currentRemaining = Math.max(
    0,
    remainingTime - (Date.now() - timerStartedAt),
  );
  playbackProgress.value =
    ((interval.value - currentRemaining) / interval.value) * 100;
}

function clearTimers() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  if (progressTimer) {
    clearInterval(progressTimer);
    progressTimer = null;
  }
}

function pauseTimer() {
  if (timer) {
    remainingTime = Math.max(0, remainingTime - (Date.now() - timerStartedAt));
    playbackProgress.value =
      ((interval.value - remainingTime) / interval.value) * 100;
  }
  clearTimers();
}

function refreshTimer() {
  pauseTimer();
  startTimer();
}

function resetTimer() {
  clearTimers();
  remainingTime = interval.value;
  playbackProgress.value = 0;
  startTimer();
}

function pauseInteraction() {
  interactionPaused.value = true;
  pauseTimer();
}

function resumeInteraction() {
  interactionPaused.value = false;
  startTimer();
}

function handleFocusOut(event: FocusEvent) {
  if (
    event.relatedTarget instanceof Node &&
    carouselRoot.value?.contains(event.relatedTarget)
  ) {
    return;
  }
  resumeInteraction();
}

function togglePlayback() {
  userPaused.value = !userPaused.value;
  refreshTimer();
}

onMounted(() => {
  breakpointMql = window.matchMedia('(min-width: 768px)');
  motionMql = window.matchMedia('(prefers-reduced-motion: reduce)');
  remainingTime = interval.value;
  onBreakpointChange(breakpointMql);
  prefersReducedMotion.value = motionMql.matches;
  documentHidden.value = document.hidden;
  breakpointMql.addEventListener('change', onBreakpointChange);
  motionMql.addEventListener('change', onMotionPreferenceChange);
  document.addEventListener('visibilitychange', onVisibilityChange);
  startTimer();
});

onBeforeUnmount(() => {
  breakpointMql?.removeEventListener('change', onBreakpointChange);
  motionMql?.removeEventListener('change', onMotionPreferenceChange);
  document.removeEventListener('visibilitychange', onVisibilityChange);
  clearTimers();
});

watch([autoPlay, interval, () => props.slides.length, itemsPerView], () => {
  currentIndex.value = 0;
  currentPage.value = 0;
  resetTimer();
});
</script>
