<template>
  <div
    v-if="!localeLoaded || !loaded"
    class="app-background flex min-h-screen flex-col items-center justify-center gap-6 p-8"
  >
    <div class="flex w-full max-w-2xl flex-col gap-4">
      <div class="skeleton h-10 w-3/4 rounded"></div>
      <div class="skeleton h-6 w-1/2 rounded"></div>
      <div class="mt-4 flex flex-col gap-3">
        <div class="skeleton h-4 w-full rounded"></div>
        <div class="skeleton h-4 w-5/6 rounded"></div>
        <div class="skeleton h-4 w-4/6 rounded"></div>
      </div>
      <div class="skeleton mt-4 h-48 w-full rounded"></div>
    </div>
  </div>

  <div
    v-else-if="error"
    class="app-background flex min-h-screen items-center justify-center"
  >
    <p class="app-accent">{{ error }}</p>
  </div>

  <div
    v-else
    class="app-background app-text flex min-h-screen flex-col font-sans"
  >
    <header
      class="app-border app-background-header sticky top-0 z-50 border-b backdrop-blur"
    >
      <div class="app-container flex items-center justify-between py-4">
        <div class="flex items-center gap-3">
          <router-link
            to="/"
            class="app-title app-accent-hover app-duration flex items-center gap-3"
          >
            <img
              v-if="config?.site.image"
              :src="config.site.image"
              :alt="config.site.title"
              class="app-logo app-duration md:h-12 md:w-12"
            />
            <h1 v-if="config?.site.title" :key="locale" class="app-title-text text-3xl md:text-5xl">
              {{ config?.site.title }}
            </h1>
          </router-link>
        </div>
        <div class="flex items-center gap-4">
          <nav v-if="hasMenu" class="hidden gap-6 md:flex">
            <template v-for="item in config?.menu" :key="item.label">
              <router-link
                v-if="item.route"
                :to="item.route"
                class="hover:app-accent app-duration transition-colors"
              >
                {{ item.label }}
              </router-link>
              <router-link
                v-else-if="item.href?.startsWith('#')"
                :to="'/' + item.href"
                class="hover:app-accent app-duration transition-colors"
              >
                {{ item.label }}
              </router-link>
              <a
                v-else-if="item.href"
                :href="item.href"
                class="hover:app-accent app-duration transition-colors"
              >
                {{ item.label }}
              </a>
            </template>
          </nav>
          <div v-if="hasMultipleLangs" class="hidden gap-1 text-lg md:flex">
            <button
              v-for="lang in available"
              :key="lang"
              class="app-flag-btn"
              :class="
                locale === lang
                  ? 'grayscale-0'
                  : 'opacity-50 grayscale hover:opacity-100'
              "
              @click="switchLocale(lang)"
            >
              {{ flags[lang] }}
            </button>
          </div>
          <button
            v-if="hasHamburger"
            class="app-icon-btn md:hidden"
            @click="toggleMenu"
          >
            <Menu :size="24" />
          </button>
        </div>
      </div>
    </header>

    <Teleport to="body">
      <Transition name="backdrop">
        <div v-if="menuOpen" class="app-backdrop" @click="closeMenu" />
      </Transition>
      <Transition name="sidebar">
        <aside v-if="menuOpen" class="app-sidebar">
          <div
            class="app-border flex items-center justify-between border-b px-6 py-4"
          >
            <router-link
              to="/"
              class="app-title app-accent-hover app-duration flex items-center gap-3"
              @click="closeMenu"
            >
              <img
                v-if="config?.site.image"
                :src="config.site.image"
                :alt="config.site.title"
                class="app-logo"
              />
              <h2 v-if="config?.site.title" class="app-title-text text-3xl">
                {{ config?.site.title }}
              </h2>
            </router-link>
            <button class="app-icon-btn" @click="closeMenu">
              <X :size="24" />
            </button>
          </div>
          <nav v-if="hasMenu" class="flex flex-col gap-1 px-6 py-4">
            <template v-for="item in config?.menu" :key="item.label">
              <router-link
                v-if="item.route"
                :to="item.route"
                class="app-nav-link"
                @click="closeMenu"
              >
                {{ item.label }}
              </router-link>
              <router-link
                v-else-if="item.href?.startsWith('#')"
                :to="'/' + item.href"
                class="app-nav-link"
                @click="closeMenu"
              >
                {{ item.label }}
              </router-link>
              <a
                v-else-if="item.href"
                :href="item.href"
                class="app-nav-link"
                @click="closeMenu"
              >
                {{ item.label }}
              </a>
            </template>
          </nav>
          <div
            v-if="hasMultipleLangs"
            class="app-border mt-auto border-t px-6 py-4"
          >
            <div class="flex gap-2 text-lg">
              <button
                v-for="lang in available"
                :key="lang"
                class="app-flag-btn"
                :class="
                  locale === lang
                    ? 'grayscale-0'
                    : 'opacity-50 grayscale hover:opacity-100'
                "
                @click="switchLocale(lang)"
              >
                {{ flags[lang] }}
              </button>
            </div>
          </div>
        </aside>
      </Transition>
    </Teleport>

    <main class="app-container flex flex-1 flex-col gap-12 py-12">
      <router-view />
    </main>

    <footer class="app-footer">
      <div v-if="footerHtml" class="app-container app-footer-content" v-html="footerHtml" />
      <div
        class="app-border mt-6 flex w-full flex-col items-center gap-2 border-t pt-6 md:flex-row md:justify-between"
      >
        <p>{{ config?.footer.ownership }}</p>
        <p>
          Powered by
          <a
            href="https://github.com/mineot/taberna"
            target="_blank"
            rel="noopener"
            class="app-accent hover:app-accent-hover app-duration transition-colors"
            >Mineot</a
          >
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';
@reference "./style.css"

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
  background-color: var(--color-primary-700);
}

.app-footer-content :deep(a) {
  @apply app-text-subtle underline transition-colors duration-300;
}

.app-footer-content :deep(a:hover) {
  @apply app-accent;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style>
.z-60 {
  z-index: 60;
}

.z-70 {
  z-index: 70;
}
</style>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Menu, X } from '@lucide/vue';
import { useConfig } from './composables/useConfig';
import { useLocale } from './composables/useLocale';
import { useMarkdown } from './composables/useMarkdown';

const router = useRouter();
const { config, loaded, error, loadConfig } = useConfig();

const {
  locale,
  loaded: localeLoaded,
  flags,
  available,
  loadLocale,
  setLocale,
} = useLocale();

const { fetchMarkdown } = useMarkdown();

const menuOpen = ref(false);
const footerHtml = ref('');

const hasMenu = computed(() => (config.value?.menu?.length ?? 0) > 0);
const hasMultipleLangs = computed(() => available.value.length > 1);
const hasHamburger = computed(() => hasMenu.value || hasMultipleLangs.value);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function closeMenu() {
  menuOpen.value = false;
}

async function switchLocale(lang: string) {
  setLocale(lang);
  closeMenu();
  await loadConfig(lang);
  if (router.currentRoute.value.path !== '/') {
    router.push('/');
  }
}

async function loadFooter() {
  if (!config.value?.footer.contentFile || !locale.value) {
    footerHtml.value = '';
    return;
  }
  try {
    footerHtml.value = await fetchMarkdown(
      `/content/${locale.value}/${config.value.footer.contentFile}`,
    );
  } catch {
    footerHtml.value = '';
  }
}

onMounted(async () => {
  await loadLocale();
  await loadConfig(locale.value);
});

watch(locale, async (newLocale) => {
  await loadConfig(newLocale);
});

watch(config, async (newConfig) => {
  if (newConfig?.site.title) {
    document.title = newConfig.site.title;
  }
  await loadFooter();
});
</script>
