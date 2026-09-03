<template>
  <Teleport to="body">
    <Transition name="sidebar">
      <aside
        v-if="props.visible"
        ref="sidebarElement"
        class="sidebar"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        tabindex="-1"
        @keydown="handleKeydown"
      >
        <div class="sidebar-brand">
          <Brand @click="closeMenu" />
          <IconButton icon="CLOSE" label="Close menu" @click="closeMenu" />
        </div>

        <div class="sidebar-items">
          <Navigator vertical :hidden="false" @click="closeMenu" />
        </div>

        <Language complete @click="closeMenu" />
      </aside>
    </Transition>

    <Backdrop :visible="props.visible" @close="closeMenu" />
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';
import Backdrop from '@layout/backdrop.vue';
import Brand from '@component/brand.vue';
import IconButton from '@widget/icon-button.vue';
import Language from '@widget/language.vue';
import Navigator from '@widget/navigator.vue';

const props = defineProps({
  visible: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(['close']);
const sidebarElement = ref<HTMLElement>();

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

let applicationRoot: HTMLElement | null = null;
let applicationWasInert = false;
let applicationHadInertAttribute = false;
let modalActive = false;
let previousBodyOverflow = '';
let previouslyFocusedElement: HTMLElement | null = null;

const closeMenu = () => {
  emit('close');
};

function focusableElements(): HTMLElement[] {
  return Array.from(
    sidebarElement.value?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ??
      [],
  );
}

async function activateModal() {
  if (modalActive) return;

  modalActive = true;
  previouslyFocusedElement =
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
  previousBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';

  applicationRoot = document.getElementById('app');
  applicationWasInert = applicationRoot?.inert ?? false;
  applicationHadInertAttribute =
    applicationRoot?.hasAttribute('inert') ?? false;

  if (applicationRoot) {
    applicationRoot.inert = true;
    applicationRoot.setAttribute('inert', '');
  }

  await nextTick();

  if (!props.visible || !modalActive) return;

  const closeButton = sidebarElement.value?.querySelector<HTMLElement>(
    'button[aria-label="Close menu"]',
  );
  closeButton?.focus();

  if (!closeButton) sidebarElement.value?.focus();
}

function deactivateModal(restoreFocus = true) {
  if (!modalActive) return;

  document.body.style.overflow = previousBodyOverflow;

  if (applicationRoot) {
    applicationRoot.inert = applicationWasInert;

    if (applicationHadInertAttribute) {
      applicationRoot.setAttribute('inert', '');
    } else {
      applicationRoot.removeAttribute('inert');
    }
  }

  const focusTarget = previouslyFocusedElement;
  applicationRoot = null;
  modalActive = false;
  previouslyFocusedElement = null;

  if (restoreFocus && focusTarget?.isConnected) focusTarget.focus();
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault();
    event.stopPropagation();
    closeMenu();
    return;
  }

  if (event.key !== 'Tab') return;

  const elements = focusableElements();

  if (elements.length === 0) {
    event.preventDefault();
    sidebarElement.value?.focus();
    return;
  }

  const firstElement = elements[0];
  const lastElement = elements.at(-1);

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement?.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement?.focus();
  }
}

watch(
  () => props.visible,
  (visible) => {
    if (visible) {
      void activateModal();
    } else {
      deactivateModal();
    }
  },
  { immediate: true },
);

onBeforeUnmount(() => deactivateModal());
</script>

<style>
@reference '@/style.css';

.sidebar-enter-active,
.sidebar-leave-active {
  @apply app-duration;
  transition-property: transform;
}

.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(100%);
}

.sidebar {
  @apply border-l shadow-xl;
  @apply flex flex-col gap-8 p-4;
  @apply fixed top-0 right-0 z-60 h-full w-72;

  background-color: var(--sidebar-background-color);
  background-image: var(--sidebar-texture);
  background-repeat: repeat;
  border-color: var(--sidebar-border-color);
  border-style: var(--sidebar-border-style);
  border-width: var(--sidebar-border-size);
}

.sidebar-brand {
  @apply flex flex-row items-center justify-between;
}

.sidebar-items {
  @apply flex-1 overflow-y-auto pr-2;
}
</style>
