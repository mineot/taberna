<template>
  <div
    class="flex w-full flex-col gap-4"
    @mouseenter="pauseCarousel"
    @mouseleave="resumeCarousel"
  >
    <div class="flex w-full items-center gap-2">
      <button
        v-if="totalPages > 1"
        type="button"
        class="shrink-0 cursor-pointer"
        aria-label="Previous page"
        @click="previousPage"
      >
        <ChevronLeft aria-hidden="true" />
      </button>

      <div class="min-w-0 flex-1 overflow-hidden">
        <div
          ref="itemsContainer"
          class="carousel-track flex w-full gap-4 transition-transform duration-500 ease-in-out [--carousel-item-gap-offset:0rem] [--carousel-item-width:100%] motion-reduce:transition-none md:[--carousel-item-gap-offset:var(--carousel-desktop-gap-offset)] md:[--carousel-item-width:var(--carousel-desktop-item-width)]"
          :style="trackStyle"
        >
          <slot />
        </div>
      </div>

      <button
        v-if="totalPages > 1"
        type="button"
        class="shrink-0 cursor-pointer"
        aria-label="Next page"
        @click="nextPage"
      >
        <ChevronRight aria-hidden="true" />
      </button>
    </div>

    <div v-if="totalPages > 1" class="flex items-center justify-center gap-2">
      <div class="flex items-center gap-2">
        <button
          v-for="page in totalPages"
          :key="page"
          type="button"
          :class="[
            'h-3 w-3 cursor-pointer rounded-full border',
            page - 1 === selectedPage ? 'bg-current' : 'bg-transparent',
          ]"
          :aria-label="`Page ${page}`"
          :aria-current="page - 1 === selectedPage ? 'page' : undefined"
          :data-active="page - 1 === selectedPage ? '' : undefined"
          @click="goToPage(page - 1)"
        />
      </div>

      <div
        v-if="timerVisible && normalizedDelay > 0"
        class="flex items-center gap-1 tabular-nums"
        role="timer"
        :aria-label="
          paused
            ? `Carousel paused with ${remainingSeconds} seconds remaining`
            : `${remainingSeconds} seconds until next page`
        "
      >
        <Pause v-if="paused" class="h-4 w-4" aria-hidden="true" />
        <ClockFading v-else class="h-4 w-4" aria-hidden="true" />
        <span>{{ remainingSeconds }}s</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight, ClockFading, Pause } from '@lucide/vue';
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

const currentPage = ref(0);
const itemCount = ref(0);
const itemsContainer = ref<HTMLElement>();
const mediumScreen = ref(false);
const paused = ref(false);
const remainingSeconds = ref(0);
let timer: ReturnType<typeof setTimeout> | undefined;
let countdownTimer: ReturnType<typeof setInterval> | undefined;
let breakpointQuery: MediaQueryList | undefined;
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
      transform: `translateX(calc(-${selectedPage.value * 100}% - ${selectedPage.value}rem))`,
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

function pauseCarousel() {
  if (paused.value) return;
  paused.value = true;

  if (timer !== undefined) {
    updateCountdown();
    clearScheduledTimers();
  }
}

function resumeCarousel() {
  if (!paused.value) return;
  paused.value = false;

  if (!mounted || normalizedDelay.value === 0 || totalPages.value <= 1) {
    return;
  }

  if (remainingDelay <= 0) {
    scheduleNextPage();
    return;
  }

  startTimer(remainingDelay);
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
  itemsObserver = new MutationObserver(updateItems);

  if (itemsContainer.value) {
    itemsObserver.observe(itemsContainer.value, { childList: true });
  }

  void nextTick(updateItems);
});

onBeforeUnmount(() => {
  mounted = false;
  breakpointQuery?.removeEventListener('change', updateBreakpoint);
  itemsObserver?.disconnect();
  clearTimer();
});

function updateBreakpoint(event: MediaQueryListEvent) {
  mediumScreen.value = event.matches;
}
</script>

<style>
.carousel-track > * {
  min-width: 0;
  flex: 0 0 calc(var(--carousel-item-width) - var(--carousel-item-gap-offset));
}
</style>
