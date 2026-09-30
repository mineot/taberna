<template>
  <section
    ref="carouselElement"
    class="tbi-carousel"
    role="region"
    aria-roledescription="carousel"
    :aria-label="`Carousel: page ${selectedPage + 1} of ${Math.max(totalPages, 1)}`"
    @mouseenter="hoverPaused = true"
    @mouseleave="hoverPaused = false"
    @focusin="focusPaused = true"
    @focusout="onFocusOut"
  >
    <div class="content">
      <button
        v-if="totalPages > 1"
        type="button"
        class="btn"
        aria-label="Previous page"
        @click="goToPage(selectedPage - 1)"
      >
        <ChevronLeft :size="40" aria-hidden="true" />
      </button>

      <div class="body">
        <div ref="trackElement" class="track" :style="trackStyle">
          <slot></slot>
        </div>
      </div>

      <button
        v-if="totalPages > 1"
        type="button"
        class="btn"
        aria-label="Next page"
        @click="goToPage(selectedPage + 1)"
      >
        <ChevronRight :size="40" aria-hidden="true" />
      </button>
    </div>

    <div v-if="totalPages > 1" class="footer">
      <button
        v-if="normalizedInterval > 0"
        type="button"
        class="pause"
        :aria-label="playbackEnabled ? 'Pause carousel' : 'Play carousel'"
        @click="togglePlayback"
      >
        <Pause v-if="playbackEnabled" :size="20" aria-hidden="true" />
        <Play v-else :size="20" aria-hidden="true" />
      </button>

      <div v-if="isDesktop" class="paginator">
        <button
          v-for="page in totalPages"
          :key="page"
          type="button"
          class="dot"
          :class="{ current: page - 1 === selectedPage }"
          :aria-label="`Page ${page}`"
          :aria-current="page - 1 === selectedPage ? 'page' : undefined"
          @click="goToPage(page - 1)"
        ></button>
      </div>

      <span v-else class="page-count" :aria-label="`Page ${selectedPage + 1} of ${totalPages}`">
        {{ selectedPage + 1 }}/{{ totalPages }}
      </span>

      <div
        v-if="normalizedInterval > 0"
        class="counter"
        role="timer"
        :aria-label="
          paused
            ? `Carousel paused with ${remainingSeconds} seconds remaining`
            : `${remainingSeconds} seconds until next page`
        "
      >
        <span>{{ remainingSeconds }}s</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight, Pause, Play } from '@lucide/vue';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';

const props = defineProps({
  totalPerPage: {
    type: Number,
    required: false,
    default: 3,
  },
  interval: {
    type: Number,
    required: false,
    default: 3000,
  },
});

const carouselElement = ref<HTMLElement>();
const trackElement = ref<HTMLElement>();

const currentPage = ref(0);
const focusPaused = ref(false);
const hoverPaused = ref(false);
const isDesktop = ref(false);
const itemCount = ref(0);
const reducedMotion = ref(false);
const remainingSeconds = ref(0);
const playbackMode = ref<'auto' | 'paused' | 'playing'>('auto');

let mounted = false;
let deadline = 0;
let pendingDelay = 0;
let timer: ReturnType<typeof setTimeout> | undefined;
let desktopQuery: MediaQueryList | undefined;
let motionQuery: MediaQueryList | undefined;
let itemsObserver: MutationObserver | undefined;

const normalizedTotalPerPage = computed(() => {
  if (!Number.isFinite(props.totalPerPage)) return 1;
  return Math.max(1, Math.floor(props.totalPerPage));
});

const normalizedInterval = computed(() => {
  if (!Number.isFinite(props.interval)) return 0;
  return Math.max(0, props.interval);
});

const itemsPerPage = computed(() => (isDesktop.value ? normalizedTotalPerPage.value : 1));

const totalPages = computed(() => Math.ceil(itemCount.value / itemsPerPage.value));

const selectedPage = computed(() => {
  if (totalPages.value <= 1) return 0;
  return Math.min(currentPage.value, totalPages.value - 1);
});

const playbackEnabled = computed(
  () => playbackMode.value === 'playing' || (playbackMode.value === 'auto' && !reducedMotion.value),
);

const paused = computed(
  () => !playbackEnabled.value || ((hoverPaused.value || focusPaused.value) && playbackMode.value !== 'playing'),
);

const trackStyle = computed(
  () =>
    ({
      '--tbi-limit': String(normalizedTotalPerPage.value),
      '--tbi-page': String(selectedPage.value),
    }) as CSSProperties,
);

function cancelTimer() {
  clearTimeout(timer);
  timer = undefined;
}

function updateCountdown() {
  pendingDelay = Math.max(0, deadline - performance.now());
  remainingSeconds.value = Math.ceil(pendingDelay / 1000);
}

function tick() {
  updateCountdown();

  if (pendingDelay === 0) {
    goToPage(selectedPage.value + 1);
    return;
  }

  const untilNextSecond = pendingDelay - (remainingSeconds.value - 1) * 1000;
  timer = setTimeout(tick, Math.max(1, untilNextSecond));
}

function restartTimer() {
  cancelTimer();

  pendingDelay = mounted && totalPages.value > 1 ? normalizedInterval.value : 0;
  remainingSeconds.value = Math.ceil(pendingDelay / 1000);

  if (!paused.value) resumeTimer();
}

function pauseTimer() {
  if (timer === undefined) return;

  updateCountdown();
  cancelTimer();
}

function resumeTimer() {
  if (!mounted || normalizedInterval.value === 0 || totalPages.value <= 1) return;

  cancelTimer();
  deadline = performance.now() + (pendingDelay || normalizedInterval.value);
  tick();
}

function togglePlayback() {
  playbackMode.value = playbackEnabled.value ? 'paused' : 'playing';
}

function onFocusOut(event: FocusEvent) {
  const nextTarget = event.relatedTarget;

  if (nextTarget instanceof Node && carouselElement.value?.contains(nextTarget)) return;

  focusPaused.value = false;
}

function goToPage(page: number) {
  if (totalPages.value <= 1) return;

  currentPage.value = ((page % totalPages.value) + totalPages.value) % totalPages.value;
  restartTimer();
}

function updateItemsAccessibility() {
  const track = trackElement.value;
  if (!track) return;

  const firstVisible = selectedPage.value * itemsPerPage.value;
  const lastVisible = firstVisible + itemsPerPage.value;

  for (let index = 0; index < track.children.length; index++) {
    const element = track.children[index] as HTMLElement;
    const visible = index >= firstVisible && index < lastVisible;

    if (element.inert !== !visible) element.inert = !visible;

    if (visible) {
      if (element.hasAttribute('aria-hidden')) element.removeAttribute('aria-hidden');
    } else if (element.getAttribute('aria-hidden') !== 'true') {
      element.setAttribute('aria-hidden', 'true');
    }
  }
}

function updateItems() {
  const track = trackElement.value;
  if (!track) return;

  const previousItemCount = itemCount.value;
  itemCount.value = track.children.length;

  currentPage.value = selectedPage.value;

  if (previousItemCount !== itemCount.value) restartTimer();

  updateItemsAccessibility();
}

function updateDesktopQuery(event: MediaQueryListEvent) {
  isDesktop.value = event.matches;
}

function updateMotionQuery(event: MediaQueryListEvent) {
  reducedMotion.value = event.matches;
}

watch(normalizedInterval, restartTimer);

watch(paused, (isPaused) => (isPaused ? pauseTimer() : resumeTimer()));

watch(itemsPerPage, (limit, previousLimit) => {
  const firstVisibleItem = currentPage.value * previousLimit;

  currentPage.value = Math.floor(firstVisibleItem / limit);
  restartTimer();
});

watch([selectedPage, itemsPerPage], updateItemsAccessibility, { flush: 'post' });

onMounted(() => {
  mounted = true;

  desktopQuery = window.matchMedia('(min-width: 48rem)');
  isDesktop.value = desktopQuery.matches;
  desktopQuery.addEventListener('change', updateDesktopQuery);

  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  reducedMotion.value = motionQuery.matches;
  motionQuery.addEventListener('change', updateMotionQuery);

  itemsObserver = new MutationObserver(updateItems);

  if (trackElement.value) itemsObserver.observe(trackElement.value, { childList: true });

  void nextTick(updateItems);
});

onBeforeUnmount(() => {
  mounted = false;

  desktopQuery?.removeEventListener('change', updateDesktopQuery);
  motionQuery?.removeEventListener('change', updateMotionQuery);
  itemsObserver?.disconnect();

  cancelTimer();
});
</script>

<style>
@reference "@/style.css";

.tbi-carousel {
  @apply flex flex-col gap-4;

  > .content {
    @apply flex flex-row items-center gap-4;

    > .btn {
      @apply shrink-0 cursor-pointer border-none bg-transparent p-0;
      @apply tbu-asset-link;
      @apply focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current;
    }

    > .body {
      @apply min-w-0 flex-1 overflow-hidden;

      > .track {
        --tbi-items: 1;
        --tbi-gap: 0rem;

        @apply flex w-full;
        @apply tbu-duration;
        gap: var(--tbi-gap);
        transition-property: none;
        transform: translateX(calc(-1 * var(--tbi-page, 0) * 100% - var(--tbi-page, 0) * var(--tbi-gap)));

        @media (prefers-reduced-motion: no-preference) {
          transition-property: transform;
        }

        @media (width >= 48rem) {
          --tbi-items: var(--tbi-limit, 1);
          --tbi-gap: 1rem;
        }

        > * {
          @apply min-w-0;
          flex: 0 0 calc((100% - (var(--tbi-items) - 1) * var(--tbi-gap)) / var(--tbi-items));
        }
      }
    }
  }

  > .footer {
    @apply flex flex-row items-center justify-center gap-4;

    > .pause {
      @apply shrink-0 cursor-pointer border-none bg-transparent p-0;
      @apply tbu-asset-link;
      @apply focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current;
    }

    > .paginator {
      @apply flex flex-row items-center gap-4;

      > .dot {
        @apply block h-3 w-3 cursor-pointer rounded-full border-none bg-transparent p-0;
        @apply focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current;
        background-color: var(--carousel-dot);

        &.current {
          background-color: var(--carousel-dot-active);
        }
      }
    }

    > .page-count {
      @apply tabular-nums;
    }

    > .counter {
      @apply tabular-nums;
      color: var(--carousel-counter);
    }
  }
}
</style>
