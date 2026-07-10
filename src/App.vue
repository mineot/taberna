<template>
  <Header />
  <main>
    <Panel>
      <div>
        <h2 class="text-2xl sm:text-4xl">Marina Müller Pires</h2>
        <h3 class="text-secondary-dark text-base sm:text-lg">
          Educadora Parental
        </h3>
        <p class="mt-6 text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos ex
          eaque distinctio iure magni itaque asperiores, quaerat eum reiciendis
          possimus dolor? Nisi alias odio ab incidunt, culpa veniam harum.
        </p>
        <p class="mt-2 text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos ex
          eaque distinctio iure magni itaque asperiores, quaerat eum reiciendis
          possimus dolor? Nisi alias odio ab incidunt, culpa veniam harum.
        </p>
      </div>
      <img src="https://placehold.co/350x500" alt="No Image" />
    </Panel>
    <Panel dark>
      <img src="https://placehold.co/400x280" alt="No Image" />
      <div>
        <h2 class="text-2xl sm:text-4xl">Informações Gerais</h2>
        <p class="mt-4 text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos ex
          eaque distinctio iure magni itaque asperiores, quaerat eum reiciendis
          possimus dolor? Nisi alias odio ab incidunt, culpa veniam harum.
        </p>
        <p class="mt-2 text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos ex
          eaque distinctio iure magni itaque asperiores, quaerat eum reiciendis
          possimus dolor? Nisi alias odio ab incidunt, culpa veniam harum.
        </p>
        <p class="mt-2 text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos ex
          eaque distinctio iure magni itaque asperiores, quaerat eum reiciendis
          possimus dolor? Nisi alias odio ab incidunt, culpa veniam harum.
        </p>
        <p class="mt-2 text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos ex
          eaque distinctio iure magni itaque asperiores, quaerat eum reiciendis
          possimus dolor? Nisi alias odio ab incidunt, culpa veniam harum.
        </p>
        <p class="mt-2 text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos ex
          eaque distinctio iure magni itaque asperiores, quaerat eum reiciendis
          possimus dolor? Nisi alias odio ab incidunt, culpa veniam harum.
        </p>
        <p class="mt-2 text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos ex
          eaque distinctio iure magni itaque asperiores, quaerat eum reiciendis
          possimus dolor? Nisi alias odio ab incidunt, culpa veniam harum.
        </p>
      </div>
    </Panel>
    <Panel dark>
      <div>
        <h2 class="text-2xl sm:text-4xl">Outras Informações</h2>
        <p class="mt-4 text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos ex
          eaque distinctio iure magni itaque asperiores, quaerat eum reiciendis
          possimus dolor? Nisi alias odio ab incidunt, culpa veniam harum.
        </p>
        <p class="mt-2 text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos ex
          eaque distinctio iure magni itaque asperiores, quaerat eum reiciendis
          possimus dolor? Nisi alias odio ab incidunt, culpa veniam harum.
        </p>
        <p class="mt-2 text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos ex
          eaque distinctio iure magni itaque asperiores, quaerat eum reiciendis
          possimus dolor? Nisi alias odio ab incidunt, culpa veniam harum.
        </p>
        <p class="mt-2 text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos ex
          eaque distinctio iure magni itaque asperiores, quaerat eum reiciendis
          possimus dolor? Nisi alias odio ab incidunt, culpa veniam harum.
        </p>
        <p class="mt-2 text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos ex
          eaque distinctio iure magni itaque asperiores, quaerat eum reiciendis
          possimus dolor? Nisi alias odio ab incidunt, culpa veniam harum.
        </p>
        <p class="mt-2 text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos ex
          eaque distinctio iure magni itaque asperiores, quaerat eum reiciendis
          possimus dolor? Nisi alias odio ab incidunt, culpa veniam harum.
        </p>
      </div>
      <img src="https://placehold.co/400x280" alt="No Image" />
    </Panel>
    <Panel dark>
      <div class="flex flex-col gap-4">
        <div class="flex flex-nowrap gap-4">
          <div class="flex flex-nowrap items-center gap-4">
            <ShoppingCart :size="35" />
            <div class="truncate text-2xl">Ferramenta</div>
          </div>
          <div class="flex flex-nowrap items-center gap-4">
            <ShoppingCart :size="35" />
            <div class="truncate text-2xl">Ferramenta</div>
          </div>
        </div>
        <div class="flex flex-nowrap gap-4">
          <div class="flex flex-nowrap items-center gap-4">
            <ShoppingCart :size="35" />
            <div class="truncate text-2xl">Ferramenta</div>
          </div>
          <div class="flex flex-nowrap items-center gap-4">
            <ShoppingCart :size="35" />
            <div class="truncate text-2xl">Ferramenta</div>
          </div>
        </div>
      </div>
      <div>
        <h2 class="text-2xl sm:text-4xl">Ferramentas</h2>
        <p class="mt-4 text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos ex
          eaque distinctio iure magni itaque asperiores, quaerat eum reiciendis
          possimus dolor? Nisi alias odio ab incidunt, culpa veniam harum.
        </p>
        <p class="mt-2 text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos ex
          eaque distinctio iure magni itaque asperiores, quaerat eum reiciendis
          possimus dolor? Nisi alias odio ab incidunt, culpa veniam harum.
        </p>
      </div>
    </Panel>
    <Panel>Testemunhos</Panel>
    <Panel dark>Rodapé</Panel>
  </main>
</template>

<script setup lang="ts">
import Header from './components/header/index.vue';
import Panel from './components/panel.vue';
import { ShoppingCart } from '@lucide/vue';
</script>
