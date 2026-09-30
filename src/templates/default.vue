<template>
  <section class="tbi-app-layout">
    <header>
      <div>
        <slot name="header-brand"></slot>
      </div>

      <nav>
        <slot name="header-nav"></slot>
      </nav>

      <Menu :class="{ 'toogle-menu': !props.hideToggleMenu, hidden: props.hideToggleMenu }" @click="onShowSidebar" />
    </header>

    <main>
      <slot></slot>
    </main>

    <footer>
      <div class="content">
        <div class="topbar">
          <div>
            <slot name="footer-brand"></slot>
          </div>

          <div>
            <slot name="footer-complement"></slot>
          </div>
        </div>

        <div>
          <slot name="footer-body"></slot>
        </div>
      </div>

      <div class="copyrigth">
        <div>
          <slot name="footer-copyright"></slot>
        </div>

        <a href="https://github.com/mineot/" target="_blank">
          <span>Powered by Mineot</span>
        </a>
      </div>
    </footer>
  </section>

  <div :class="['tbi-app-layout-backdrop', 'tbu-backdrop', { hide: hideSidebar }]" @click="onHideSidebar"></div>

  <aside :class="['tbi-app-layout-sidebar', { hide: hideSidebar }]">
    <header>
      <div>
        <slot name="sidebar-brand" :close="onHideSidebar"></slot>
      </div>

      <button class="tbu-asset-link" @click="onHideSidebar">
        <X />
      </button>
    </header>

    <main>
      <slot name="sidebar-body" :close="onHideSidebar"></slot>
    </main>

    <footer>
      <slot name="sidebar-footer" :close="onHideSidebar"></slot>
    </footer>
  </aside>
</template>

<script setup lang="ts">
import { Menu, X } from '@lucide/vue';
import { ref } from 'vue';

const props = defineProps({
  hideToggleMenu: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const hideSidebar = ref<boolean>(true);

function onShowSidebar() {
  hideSidebar.value = false;
}

function onHideSidebar() {
  hideSidebar.value = true;
}
</script>

<style scoped>
@reference "@/style.css";

.tbi-app-layout {
  @apply flex-1;
  @apply flex flex-col gap-2;
  @apply tbu-duration;

  > header {
    @apply sticky top-0 z-10 backdrop-blur-xs;
    @apply flex flex-nowrap items-center justify-between gap-2;
    @apply tbu-container tbu-block tbu-border-bottom;
    @apply tbu-secondary-bg-opaque tbu-texture;

    > nav {
      @apply hidden md:flex;
      @apply flex-1 items-center justify-end gap-1;
    }

    .toogle-menu {
      @apply block md:hidden;
      @apply tbu-asset-link;
    }
  }

  > main {
    @apply flex-1;
    @apply tbu-container py-1;
  }

  > footer {
    @apply flex flex-col gap-6;
    @apply tbu-container tbu-block tbu-border-top;
    @apply tbu-secondary-bg-opaque tbu-texture;

    > .content {
      @apply flex flex-col gap-4;

      > .topbar {
        @apply flex flex-col items-center justify-between gap-4 md:flex-row;
      }
    }

    > .copyrigth {
      @apply flex flex-col items-center justify-between gap-2 pt-2 md:flex-row;
      @apply tbu-secondary-text tbu-border-top text-xs;

      > a {
        @apply tbu-duration underline;

        &:hover {
          @apply tbu-asset-text;
        }
      }
    }
  }
}

.tbi-app-layout-backdrop {
  &.hide {
    @apply hidden;
  }
}

.tbi-app-layout-sidebar {
  @apply fixed flex flex-col;
  @apply top-0 left-0 h-screen w-max;
  @apply tbu-duration transform transition-transform;
  @apply tbu-secondary-bg tbu-texture tbu-border-right;
  z-index: var(--z-sidebar);

  > header {
    @apply flex gap-8 p-4 whitespace-nowrap;
    @apply tbu-border-bottom;
    @apply items-center justify-between;
  }

  > main {
    @apply flex-1 space-y-1 p-4;
  }

  > footer {
    @apply p-4 whitespace-nowrap;
    @apply tbu-border-top;
  }

  &.hide {
    @apply -translate-x-full;
  }
}
</style>
