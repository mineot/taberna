<template>
  <div
    v-if="error"
    class="app-background flex min-h-screen items-center justify-center"
  >
    <p class="app-error">{{ error }}</p>
  </div>

  <div
    v-else-if="!localeLoaded || loading || !loaded"
    class="app-background flex min-h-screen flex-col items-center justify-center gap-6 p-8"
  >
    <div class="flex w-full max-w-2xl flex-col gap-4">
      <div class="app-skeleton skeleton h-10 w-3/4 rounded"></div>
      <div class="app-skeleton skeleton h-6 w-1/2 rounded"></div>
      <div class="mt-4 flex flex-col gap-3">
        <div class="app-skeleton skeleton h-4 w-full rounded"></div>
        <div class="app-skeleton skeleton h-4 w-5/6 rounded"></div>
        <div class="app-skeleton skeleton h-4 w-4/6 rounded"></div>
      </div>
      <div class="app-skeleton skeleton mt-4 h-48 w-full rounded"></div>
    </div>
  </div>

  <div
    v-else
    class="app-background app-text flex min-h-screen flex-col font-sans"
  >
    <header
      class="app-border app-header sticky top-0 z-50 border-b backdrop-blur"
    >
      <div class="container flex items-center justify-between py-4">
        <div class="flex items-center gap-3">
          <router-link to="/" class="app-title flex items-center gap-3">
            <img
              v-if="config?.site.image"
              :src="config.site.image"
              :alt="config.site.title"
              class="app-logo"
            />
            <h1
              v-if="config?.site.title"
              :key="locale"
              class="app-title-adjustment"
            >
              {{ config?.site.title }}
            </h1>
          </router-link>
        </div>
        <div class="flex items-center gap-4">
          <nav
            v-if="hasMenu && !hasTooManyMenuItems"
            class="hidden gap-6 md:flex"
          >
            <template v-for="item in config?.menu" :key="item.label">
              <router-link
                v-if="item.route"
                :to="item.route"
                class="app-header-link transition-colors"
              >
                {{ item.label }}
              </router-link>
              <router-link
                v-else-if="item.href?.startsWith('#')"
                :to="'/' + item.href"
                class="app-header-link transition-colors"
              >
                {{ item.label }}
              </router-link>
              <a
                v-else-if="item.href && isSafeHref(item.href)"
                :href="item.href"
                target="_blank"
                rel="noopener noreferrer"
                class="app-header-link transition-colors"
              >
                {{ item.label }}
              </a>
            </template>
          </nav>
          <div
            v-if="hasMultipleLangs && !hasTooManyMenuItems"
            class="hidden md:block"
          >
            <router-link to="/languages" class="flag-btn text-2xl">
              {{ flags[locale] }}
            </router-link>
          </div>
          <button
            v-if="hasHamburger"
            class="app-header-link cursor-pointer transition-colors"
            :class="hasTooManyMenuItems ? '' : 'md:hidden'"
            aria-label="Menu"
            :aria-expanded="menuOpen"
            @click="toggleMenu"
          >
            <Menu :size="24" />
          </button>
        </div>
      </div>
    </header>

    <Teleport to="body">
      <Transition name="backdrop">
        <div
          v-if="menuOpen"
          class="app-backdrop fixed inset-0 z-60 backdrop-blur-sm"
          @click="closeMenu"
        />
      </Transition>
      <Transition name="sidebar">
        <aside
          v-if="menuOpen"
          ref="sidebar"
          class="app-sidebar fixed top-0 right-0 z-70 flex h-full w-72 flex-col shadow-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          @keydown="handleMenuKeydown"
        >
          <div
            class="app-border flex shrink-0 items-center justify-between border-b px-6 py-4"
          >
            <router-link
              to="/"
              class="app-title flex items-center gap-3"
              @click="closeMenu"
            >
              <img
                v-if="config?.site.image"
                :src="config.site.image"
                :alt="config.site.title"
                class="app-logo"
              />
              <h2
                v-if="config?.site.title"
                class="app-title-adjustment text-3xl"
              >
                {{ config?.site.title }}
              </h2>
            </router-link>
            <button
              ref="closeMenuButton"
              class="app-icon-btn app-header-link cursor-pointer transition-colors"
              aria-label="Close menu"
              @click="closeMenu"
            >
              <X :size="24" />
            </button>
          </div>
          <div class="flex flex-1 flex-col overflow-y-auto">
            <nav v-if="hasMenu" class="flex flex-col gap-1 px-6 py-4">
              <template v-for="item in config?.menu" :key="item.label">
                <router-link
                  v-if="item.route"
                  :to="item.route"
                  class="app-sidebar-link sidebar-link"
                  @click="closeMenu"
                >
                  {{ item.label }}
                </router-link>
                <router-link
                  v-else-if="item.href?.startsWith('#')"
                  :to="'/' + item.href"
                  class="app-sidebar-link sidebar-link"
                  @click="closeMenu"
                >
                  {{ item.label }}
                </router-link>
                <a
                  v-else-if="item.href && isSafeHref(item.href)"
                  :href="item.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="app-sidebar-link sidebar-link"
                  @click="closeMenu"
                >
                  {{ item.label }}
                </a>
              </template>
            </nav>
          </div>
          <div
            v-if="hasMultipleLangs"
            class="app-border shrink-0 border-t px-6 py-4"
          >
            <router-link
              to="/languages"
              class="app-sidebar-link sidebar-link flex items-center gap-3 text-xl"
              @click="closeMenu"
            >
              <span class="text-2xl">{{ flags[locale] }}</span>
              <span>{{ locale }}</span>
            </router-link>
          </div>
        </aside>
      </Transition>
    </Teleport>

    <main class="container flex flex-1 flex-col gap-12 py-12">
      <router-view />
    </main>

    <footer
      class="app-footer flex flex-col items-center border-t px-6 py-6 text-sm"
    >
      <div v-if="footerHtml" class="container" v-html="footerHtml" />
      <div
        class="app-border mt-6 flex w-full flex-col items-center gap-2 border-t pt-4 text-xs md:flex-row md:justify-between"
      >
        <p>{{ config?.footer.ownership }}</p>
        <p>
          Powered by
          <a
            href="https://github.com/mineot/taberna"
            target="_blank"
            rel="noopener"
            class="app-powered app-duration transition-colors"
            >Mineot</a
          >
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Menu, X } from '@lucide/vue';
import { useConfig } from './composables/useConfig';
import { useLocale } from './composables/useLocale';
import { useMarkdown } from './composables/useMarkdown';
import { isSafeExternalHref } from './utils/links';
import { setMetaDescription } from './utils/meta';

import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue';

const { config, loaded, loading, error, loadConfig } = useConfig();

const {
  locale,
  loaded: localeLoaded,
  flags,
  available,
  loadLocale,
} = useLocale();

const { fetchMarkdown } = useMarkdown();

const menuOpen = ref(false);
const footerHtml = ref('');
const sidebar = ref<HTMLElement | null>(null);
const closeMenuButton = ref<HTMLButtonElement | null>(null);
let previousFocus: HTMLElement | null = null;
let previousBodyOverflow = '';
let footerRequest = 0;

const hasMenu = computed(() => (config.value?.menu?.length ?? 0) > 0);
const hasTooManyMenuItems = computed(
  () => (config.value?.menu?.length ?? 0) > 4,
);
const hasMultipleLangs = computed(() => available.value.length > 1);
const hasHamburger = computed(() => hasMenu.value || hasMultipleLangs.value);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function closeMenu() {
  menuOpen.value = false;
}

function isSafeHref(href: string): boolean {
  return isSafeExternalHref(href);
}

function handleMenuKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeMenu();
    return;
  }

  if (event.key !== 'Tab' || !sidebar.value) return;

  const focusable = Array.from(
    sidebar.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
  const first = focusable[0];
  const last = focusable.at(-1);

  if (!first || !last) {
    event.preventDefault();
    return;
  }

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

async function loadFooter() {
  const requestId = ++footerRequest;

  if (!config.value?.footer.contentFile || !locale.value) {
    footerHtml.value = '';
    return;
  }
  try {
    const html = await fetchMarkdown(
      `/content/${locale.value}/${config.value.footer.contentFile}`,
    );
    if (requestId === footerRequest) footerHtml.value = html;
  } catch {
    if (requestId === footerRequest) footerHtml.value = '';
  }
}

onMounted(async () => {
  await loadLocale();
  await loadConfig(locale.value);
});

watch([config, locale], async ([newConfig]) => {
  if (newConfig?.site.title) {
    document.title = newConfig.site.title;
  }
  if (newConfig?.site.description) {
    setMetaDescription(newConfig.site.description);
  }
  await loadFooter();
});

watch(menuOpen, async (isOpen) => {
  if (isOpen) {
    previousFocus = document.activeElement as HTMLElement | null;
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    await nextTick();
    closeMenuButton.value?.focus();
    return;
  }

  document.body.style.overflow = previousBodyOverflow;
  await nextTick();
  previousFocus?.focus();
  previousFocus = null;
});

onBeforeUnmount(() => {
  document.body.style.overflow = previousBodyOverflow;
});
</script>

<style scoped>
@reference 'tailwindcss';
@reference "./style.css"

.app-footer-content :deep(a) {
  @apply app-text-subtle underline transition-colors duration-300;
}

.container {
  @apply mx-auto w-full max-w-4xl px-6;
}

.flag-btn {
  @apply app-duration cursor-pointer transition-all hover:scale-110;
}

.sidebar-link {
  @apply app-duration rounded-lg px-3 py-2 transition-colors;
}

.app-footer-content :deep(a:hover) {
  @apply app-text-emphasis;
}

.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.3s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(100%);
}
</style>

<style>
@reference './style.css';

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

.skeleton {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.z-60 {
  z-index: 60;
}

.z-70 {
  z-index: 70;
}
</style>
