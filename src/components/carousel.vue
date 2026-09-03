<template>
  <div
    ref="carouselElement"
    class="carousel"
    role="region"
    aria-roledescription="carousel"
    :aria-label="`Carousel: page ${selectedPage + 1} of ${Math.max(totalPages, 1)}`"
    @mouseenter="hoverPaused = true"
    @mouseleave="hoverPaused = false"
    @focusin="focusPaused = true"
    @focusout="handleFocusOut"
  >
    <div class="carousel-content">
      <button
        v-if="totalPages > 1"
        type="button"
        class="carousel-navigation-button"
        aria-label="Previous page"
        @click="previousPage"
      >
        <ChevronLeft aria-hidden="true" />
      </button>

      <div class="carousel-viewport">
        <div ref="itemsContainer" class="carousel-track" :style="trackStyle">
          <slot />
        </div>
      </div>

      <button
        v-if="totalPages > 1"
        type="button"
        class="carousel-navigation-button"
        aria-label="Next page"
        @click="nextPage"
      >
        <ChevronRight aria-hidden="true" />
      </button>
    </div>

    <div v-if="totalPages > 1" class="carousel-controls">
      <button
        v-if="normalizedDelay > 0"
        type="button"
        class="carousel-playback-button"
        :aria-label="playbackEnabled ? 'Pause carousel' : 'Play carousel'"
        @click="togglePlayback"
      >
        <Pause v-if="playbackEnabled" aria-hidden="true" />
        <Play v-else aria-hidden="true" />
      </button>

      <div class="carousel-pagination">
        <button
          v-for="page in totalPages"
          :key="page"
          type="button"
          class="carousel-page-button"
          :aria-label="`Page ${page}`"
          :aria-current="page - 1 === selectedPage ? 'page' : undefined"
          :data-active="page - 1 === selectedPage ? '' : undefined"
          @click="goToPage(page - 1)"
        />
      </div>

      <div
        v-if="timerVisible && normalizedDelay > 0"
        class="carousel-timer"
        role="timer"
        :aria-label="
          paused
            ? `Carousel paused with ${remainingSeconds} seconds remaining`
            : `${remainingSeconds} seconds until next page`
        "
      >
        <ClockFading aria-hidden="true" />
        <span>{{ remainingSeconds }}s</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronLeft,
  ChevronRight,
  ClockFading,
  Pause,
  Play,
} from '@lucide/vue';

import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type CSSProperties,
} from 'vue';

const props = withDefaults(
  defineProps<{
    limit?: number;
    delay?: number;
    showTimer?: boolean | string;
  }>(),
  {
    limit: 1,
    delay: 5000,
    showTimer: true,
  },
);

const carouselElement = ref<HTMLElement>();
const currentPage = ref(0);
const focusPaused = ref(false);
const hoverPaused = ref(false);
const itemCount = ref(0);
const itemsContainer = ref<HTMLElement>();
const mediumScreen = ref(false);
const remainingSeconds = ref(0);
const reducedMotion = ref(false);
const userPaused = ref(false);
const userPlaying = ref(false);

let timer: ReturnType<typeof setTimeout> | undefined;
let countdownTimer: ReturnType<typeof setInterval> | undefined;
let breakpointQuery: MediaQueryList | undefined;
let reducedMotionQuery: MediaQueryList | undefined;
let itemsObserver: MutationObserver | undefined;
let mounted = false;
let countdownDeadline = 0;
let remainingDelay = 0;

function normalizeLimit(limit: number): number {
  if (!Number.isFinite(limit)) return 1;
  return Math.max(1, Math.floor(limit));
}

function normalizeDelay(delay: number): number {
  if (!Number.isFinite(delay)) return 0;
  return Math.max(0, delay);
}

const normalizedLimit = computed(() => normalizeLimit(props.limit));
const normalizedDelay = computed(() => normalizeDelay(props.delay));

const effectiveLimit = computed(() =>
  mediumScreen.value ? normalizedLimit.value : 1,
);

const timerVisible = computed(
  () => props.showTimer !== false && props.showTimer !== 'false',
);

const playbackEnabled = computed(
  () => userPlaying.value || (!userPaused.value && !reducedMotion.value),
);

const paused = computed(
  () =>
    !playbackEnabled.value ||
    ((hoverPaused.value || focusPaused.value) && !userPlaying.value),
);

const totalPages = computed(() =>
  Math.ceil(itemCount.value / effectiveLimit.value),
);

const selectedPage = computed(() => {
  if (totalPages.value === 0) return 0;
  return Math.min(currentPage.value, totalPages.value - 1);
});

const trackStyle = computed(
  () =>
    ({
      '--carousel-desktop-item-width': `${100 / normalizedLimit.value}%`,
      '--carousel-desktop-gap-offset': `${
        (normalizedLimit.value - 1) / normalizedLimit.value
      }rem`,
      '--carousel-track-offset': `calc(-${selectedPage.value * 100}% - ${selectedPage.value}rem)`,
    }) as CSSProperties,
);

function clearScheduledTimers() {
  if (timer !== undefined) {
    clearTimeout(timer);
    timer = undefined;
  }

  if (countdownTimer !== undefined) {
    clearInterval(countdownTimer);
    countdownTimer = undefined;
  }
}

function clearTimer() {
  clearScheduledTimers();

  remainingDelay = 0;
  remainingSeconds.value = 0;
}

function updateCountdown() {
  remainingDelay = Math.max(0, countdownDeadline - Date.now());
  remainingSeconds.value = Math.max(0, Math.ceil(remainingDelay / 1000));
}

function startTimer(delay: number) {
  clearScheduledTimers();

  remainingDelay = delay;
  countdownDeadline = Date.now() + delay;
  updateCountdown();
  countdownTimer = setInterval(updateCountdown, 250);

  timer = setTimeout(() => {
    currentPage.value = (selectedPage.value + 1) % totalPages.value;
    scheduleNextPage();
  }, delay);
}

function updateItemAccessibility() {
  const container = itemsContainer.value;
  if (!container) return;

  const firstVisibleItem = selectedPage.value * effectiveLimit.value;
  const lastVisibleItem = firstVisibleItem + effectiveLimit.value;

  Array.from(container.children).forEach((item, index) => {
    const element = item as HTMLElement;
    const visible = index >= firstVisibleItem && index < lastVisibleItem;

    element.hidden = false;
    element.inert = !visible;

    if (visible) {
      element.removeAttribute('aria-hidden');
    } else {
      element.setAttribute('aria-hidden', 'true');
    }
  });
}

function updateItems() {
  const container = itemsContainer.value;
  if (!container) return;

  const previousItemCount = itemCount.value;
  itemCount.value = container.children.length;

  if (previousItemCount !== itemCount.value) {
    currentPage.value = selectedPage.value;
    scheduleNextPage();
  }

  updateItemAccessibility();
}

function scheduleNextPage() {
  clearTimer();

  const delay = normalizedDelay.value;
  if (!mounted || delay === 0 || totalPages.value <= 1) return;

  remainingDelay = delay;
  remainingSeconds.value = Math.ceil(delay / 1000);

  if (!paused.value) startTimer(delay);
}

function pauseTimer() {
  if (timer !== undefined) {
    updateCountdown();
    clearScheduledTimers();
  }
}

function resumeTimer() {
  if (!mounted || normalizedDelay.value === 0 || totalPages.value <= 1) {
    return;
  }

  if (remainingDelay <= 0) {
    scheduleNextPage();
    return;
  }

  startTimer(remainingDelay);
}

function togglePlayback() {
  if (playbackEnabled.value) {
    userPaused.value = true;
    userPlaying.value = false;
  } else {
    userPaused.value = false;
    userPlaying.value = true;
  }
}

function handleFocusOut(event: FocusEvent) {
  const nextTarget = event.relatedTarget;

  if (
    nextTarget instanceof Node &&
    carouselElement.value?.contains(nextTarget)
  ) {
    return;
  }

  focusPaused.value = false;
}

function previousPage() {
  if (totalPages.value <= 1) return;
  currentPage.value =
    (selectedPage.value - 1 + totalPages.value) % totalPages.value;
  scheduleNextPage();
}

function nextPage() {
  if (totalPages.value <= 1) return;
  currentPage.value = (selectedPage.value + 1) % totalPages.value;
  scheduleNextPage();
}

function goToPage(page: number) {
  currentPage.value = page;
  scheduleNextPage();
}

watch(
  () => props.delay,
  () => scheduleNextPage(),
);

watch(paused, (isPaused) => {
  if (isPaused) {
    pauseTimer();
  } else {
    resumeTimer();
  }
});

watch(effectiveLimit, (limit, previousLimit) => {
  const firstVisibleItem = currentPage.value * previousLimit;

  currentPage.value = Math.floor(firstVisibleItem / limit);
  scheduleNextPage();
});

watch([selectedPage, effectiveLimit], updateItemAccessibility, {
  flush: 'post',
});

onMounted(() => {
  mounted = true;
  breakpointQuery = window.matchMedia('(min-width: 48rem)');
  mediumScreen.value = breakpointQuery.matches;
  breakpointQuery.addEventListener('change', updateBreakpoint);
  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  reducedMotion.value = reducedMotionQuery.matches;
  reducedMotionQuery.addEventListener('change', updateReducedMotion);
  itemsObserver = new MutationObserver(updateItems);

  if (itemsContainer.value) {
    itemsObserver.observe(itemsContainer.value, { childList: true });
  }

  void nextTick(updateItems);
});

onBeforeUnmount(() => {
  mounted = false;
  breakpointQuery?.removeEventListener('change', updateBreakpoint);
  reducedMotionQuery?.removeEventListener('change', updateReducedMotion);
  itemsObserver?.disconnect();
  clearTimer();
});

function updateBreakpoint(event: MediaQueryListEvent) {
  mediumScreen.value = event.matches;
}

function updateReducedMotion(event: MediaQueryListEvent) {
  reducedMotion.value = event.matches;
}
</script>

<style>
@reference '@/style.css';

twc-carousel {
  @apply block w-full min-w-0;
}

.carousel {
  @apply app-gap-md flex w-full min-w-0 flex-col;
}

.carousel-content {
  @apply flex w-full min-w-0 items-center gap-2;
}

.carousel-navigation-button {
  @apply app-padding-sm focus-visible:app-focus-ring shrink-0 cursor-pointer;
  color: var(--carousel-button-color);

  &:hover {
    @media (hover: hover) {
      color: var(--carousel-button-hover);
    }
  }

  &:active {
    color: var(--carousel-button-active);
  }
}

.carousel-playback-button {
  @apply app-padding-sm focus-visible:app-focus-ring shrink-0 cursor-pointer rounded-full;
  color: var(--carousel-button-color);

  &:hover {
    @media (hover: hover) {
      color: var(--carousel-button-hover);
    }
  }

  &:active {
    color: var(--carousel-button-active);
  }
}

.carousel-viewport {
  @apply min-w-0 flex-1 overflow-hidden;
}

.carousel-track {
  --carousel-item-gap-offset: 0rem;
  --carousel-item-width: 100%;

  @apply flex w-full gap-4 ease-in-out;
  @apply motion-reduce:transition-none;

  transition-duration: var(--carousel-duration);
  transition-property: transform;
  transform: translateX(var(--carousel-track-offset, 0));

  @media (width >= 48rem) {
    --carousel-item-gap-offset: var(--carousel-desktop-gap-offset);
    --carousel-item-width: var(--carousel-desktop-item-width);
  }

  > * {
    min-width: 0;
    flex: 0 0 calc(var(--carousel-item-width) - var(--carousel-item-gap-offset));
  }
}

.carousel-controls {
  @apply flex items-center justify-center gap-2;
}

.carousel-pagination {
  @apply flex items-center gap-2;
}

.carousel-page-button {
  @apply focus-visible:app-focus-ring h-3 w-3 cursor-pointer rounded-full bg-transparent;

  border-color: var(--carousel-dot-border-color);
  border-style: var(--carousel-dot-border-style);
  border-width: var(--carousel-dot-border-size);

  &[data-active] {
    background-color: var(--carousel-dot-active);
  }
}

.carousel-timer {
  @apply flex items-center gap-1 tabular-nums;
  color: var(--carousel-timer-color);

  > svg {
    @apply h-4 w-4;
  }
}
</style>
