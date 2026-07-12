<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { Menu, X } from '@lucide/vue';
import { useConfig } from './composables/useConfig';
import { useLocale } from './composables/useLocale';
import { useMarkdown } from './composables/useMarkdown';

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
const markdownContent = ref<Map<string, string[]>>(new Map());

const hasMenu = computed(() => (config.value?.menu?.length ?? 0) > 0);
const hasMultipleLangs = computed(() => available.value.length > 1);
const hasHamburger = computed(() => hasMenu.value || hasMultipleLangs.value);

async function loadMarkdownFiles() {
  if (!config.value) return;

  const newMap = new Map<string, string[]>();
  for (const section of config.value.sections) {
    if (section.contentFile) {
      const results = await Promise.all(
        section.contentFile.map((file) =>
          fetchMarkdown(`/content/${locale.value}/${file}`),
        ),
      );
      newMap.set(section.id, results);
    }
  }
  markdownContent.value = newMap;
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function closeMenu() {
  menuOpen.value = false;
}

function switchLocale(lang: string) {
  setLocale(lang);
  closeMenu();
}

onMounted(async () => {
  await loadLocale();
  await loadConfig(locale.value);
  await loadMarkdownFiles();
});

watch(locale, async (newLocale) => {
  await loadConfig(newLocale);
  await loadMarkdownFiles();
});

watch(config, (newConfig) => {
  if (newConfig?.site.title) {
    document.title = newConfig.site.title;
  }
});
</script>

<template>
  <div
    v-if="!localeLoaded || !loaded"
    class="bg-primary-900 flex min-h-screen flex-col items-center justify-center gap-6 p-8"
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
    class="bg-primary-900 flex min-h-screen items-center justify-center"
  >
    <p class="text-secondary-400">{{ error }}</p>
  </div>

  <div
    v-else
    class="bg-primary-900 text-primary-100 flex min-h-screen flex-col font-sans"
  >
    <header
      class="border-primary-700 bg-primary-900/95 sticky top-0 z-50 border-b backdrop-blur"
    >
      <div
        class="mx-auto flex max-w-4xl items-center justify-between px-6 py-4"
      >
        <div class="flex items-center gap-3">
          <img
            v-if="config?.site.image"
            :src="config.site.image"
            :alt="config.site.title"
            class="h-8 w-8 min-h-5 min-w-5 rounded-full object-cover md:h-12 md:w-12 app-duration"
          />
          <h1
            :key="locale"
            class="font-fancy text-secondary-400 app-duration text-3xl leading-[0] md:text-5xl"
          >
            {{ config?.site.title }}
          </h1>
        </div>
        <div class="flex items-center gap-4">
          <nav v-if="hasMenu" class="hidden gap-6 md:flex">
            <a
              v-for="item in config?.menu"
              :key="item.href"
              :href="item.href"
              class="hover:text-secondary-400 app-duration transition-colors"
            >
              {{ item.label }}
            </a>
          </nav>
          <div v-if="hasMultipleLangs" class="hidden gap-1 text-lg md:flex">
            <button
              v-for="lang in available"
              :key="lang"
              class="app-duration cursor-pointer transition-all hover:scale-110"
              :class="
                locale === lang
                  ? 'grayscale-0'
                  : 'grayscale opacity-50 hover:opacity-100'
              "
              @click="setLocale(lang)"
            >
              {{ flags[lang] }}
            </button>
          </div>
          <button
            v-if="hasHamburger"
            class="text-primary-200 hover:text-secondary-400 app-duration cursor-pointer transition-colors md:hidden"
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
          class="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm md:hidden"
          @click="closeMenu"
        />
      </Transition>
      <Transition name="sidebar">
        <aside
          v-if="menuOpen"
          class="bg-primary-900 text-primary-100 fixed top-0 right-0 z-70 flex h-full w-72 flex-col shadow-xl md:hidden"
        >
          <div
            class="border-primary-700 flex items-center justify-between border-b px-6 py-4"
          >
            <div class="flex items-center gap-3">
              <img
                v-if="config?.site.image"
                :src="config.site.image"
                :alt="config.site.title"
                class="h-8 w-8 min-h-5 min-w-5 rounded-full object-cover"
              />
              <h2 class="font-fancy text-secondary-400 text-3xl leading-[0]">
                {{ config?.site.title }}
              </h2>
            </div>
            <button
              class="text-primary-200 hover:text-secondary-400 app-duration cursor-pointer transition-colors"
              @click="closeMenu"
            >
              <X :size="24" />
            </button>
          </div>
          <nav v-if="hasMenu" class="flex flex-col gap-1 px-6 py-4">
            <a
              v-for="item in config?.menu"
              :key="item.href"
              :href="item.href"
              class="text-primary-100 hover:bg-primary-800 hover:text-secondary-400 app-duration rounded-lg px-3 py-2 transition-colors"
              @click="closeMenu"
            >
              {{ item.label }}
            </a>
          </nav>
          <div v-if="hasMultipleLangs" class="border-primary-700 mt-auto border-t px-6 py-4">
            <div class="flex gap-2 text-lg">
              <button
                v-for="lang in available"
                :key="lang"
                class="app-duration cursor-pointer transition-all hover:scale-110"
                :class="
                  locale === lang
                    ? 'grayscale-0'
                    : 'grayscale opacity-50 hover:opacity-100'
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

    <main
      class="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-6 py-12"
    >
      <section
        v-for="section in config?.sections"
        :key="section.id"
        :id="section.id"
        class="flex flex-col gap-4 md:flex-row md:gap-8"
        :class="[
          section.invert ? 'md:flex-row-reverse' : '',
          {
            'md:items-start': section.imagePosition === 'top',
            'md:items-center':
              !section.imagePosition || section.imagePosition === 'center',
            'md:items-end': section.imagePosition === 'bottom',
          },
        ]"
      >
        <div class="flex-1">
          <h2 class="text-2xl font-bold">{{ section.title }}</h2>
          <p v-if="section.subtitle" class="text-secondary-400 mt-1">
            {{ section.subtitle }}
          </p>

          <div
            v-if="section.contentFile && markdownContent.get(section.id)"
            class="mt-4 flex flex-col gap-6 md:flex-row"
          >
            <div
              v-for="(html, i) in markdownContent.get(section.id)"
              :key="i"
              class="prose prose-invert max-w-none flex-1"
              v-html="html"
            />
          </div>

          <div
            v-else-if="section.content"
            class="mt-4 flex flex-col gap-6 md:flex-row"
          >
            <p
              v-for="(item, i) in section.content"
              :key="i"
              class="text-primary-300 flex-1 leading-relaxed"
            >
              {{ item }}
            </p>
          </div>
        </div>
        <img
          v-if="section.image"
          :src="section.image"
          :alt="section.title"
          class="w-full rounded-lg object-cover md:w-1/2"
          :class="{
            'object-top': section.imagePosition === 'top',
            'object-center':
              !section.imagePosition || section.imagePosition === 'center',
            'object-bottom': section.imagePosition === 'bottom',
          }"
        />
      </section>
    </main>

    <footer
      class="border-primary-700 bg-primary-950 text-primary-400 border-t py-6 text-center"
    >
      <p>{{ config?.footer.text }}</p>
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
