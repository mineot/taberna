<template>
  <div class="tbu-container tbu-block tbu-secondary-bg">
    <button @click="open">Open</button>
    <tbc-sidebar :visible="visible" @close="close">
      <div slot="header">🚀 Meu App Admin</div>
      <div slot="footer">v4.0.0-ready</div>
      <div>
        <a
          href="#"
          class="flex items-center gap-3 rounded-lg px-4 py-3 whitespace-nowrap transition-colors hover:bg-slate-800"
        >
          <span>🏠</span> <span>Dashboard</span>
        </a>
        <a
          href="#"
          class="flex items-center gap-3 rounded-lg px-4 py-3 whitespace-nowrap transition-colors hover:bg-slate-800"
        >
          <span>📊</span> <span>Relatórios Avançados de Vendas</span>
        </a>
        <a
          href="#"
          class="flex items-center gap-3 rounded-lg px-4 py-3 whitespace-nowrap transition-colors hover:bg-slate-800"
        >
          <span>⚙️</span> <span>Configurações</span>
        </a>
      </div>
    </tbc-sidebar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);

function open() {
  visible.value = true;
}

function close() {
  visible.value = false;
}
</script>

<!-- <Skeleton :visible="showSkeleton" />
<BootstrapError
  v-if="bootstrapStatus === 'error'"
  :message="bootstrapError?.message ?? 'Failed to initialize application'"
  @retry="initialize"
/>
<Container :visible="showContent" /> -->

<!-- <script setup lang="ts">
// import { computed, ref, watch } from 'vue';
// import { storeToRefs } from 'pinia';
// import { useConfigStore } from '@store/config.store.ts';
// import { useLanguageStore } from '@store/language.store.ts';
// import {
//   readDocumentMetadata,
//   syncDocumentMetadata,
// } from '@util/document.util';
// import BootstrapError from '@layout/bootstrap-error.vue';
// import Container from '@layout/container.vue';
// import Skeleton from '@layout/skeleton.vue';

// const configStore = useConfigStore();
// const languageStore = useLanguageStore();
// const { config } = storeToRefs(configStore);
// const { locale } = storeToRefs(languageStore);
// const { loadConfiguration } = configStore;
// const { loadLanguage } = languageStore;

// type BootstrapStatus = 'error' | 'loading' | 'ready';

// const bootstrapError = ref<Error>();
// const bootstrapStatus = ref<BootstrapStatus>('loading');
// const showContent = computed(() => bootstrapStatus.value === 'ready');
// const showSkeleton = computed(() => bootstrapStatus.value === 'loading');
// const documentFallback = readDocumentMetadata();

// watch(
//   [locale, config],
//   ([language, currentConfig]) => {
//     syncDocumentMetadata(
//       {
//         description: currentConfig?.description,
//         language,
//         title: currentConfig?.title,
//       },
//       documentFallback,
//     );
//   },
//   { immediate: true },
// );

// async function initialize() {
//   bootstrapError.value = undefined;
//   bootstrapStatus.value = 'loading';

//   try {
//     await loadLanguage();
//     await loadConfiguration();
//     bootstrapStatus.value = 'ready';
//   } catch (error) {
//     bootstrapError.value =
//       error instanceof Error ? error : new Error('Unknown bootstrap error');
//     bootstrapStatus.value = 'error';
//   }
// }

// void initialize();
</script> -->
