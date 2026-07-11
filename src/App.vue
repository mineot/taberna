<template>
  <Header />
  <main>
    <Panel>
      <template #left>
        <Text title="Marina Müller Pires" subtitle="Educadora Parental">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos
            ex eaque distinctio iure magni itaque asperiores, quaerat eum
            reiciendis possimus dolor? Nisi alias odio ab incidunt, culpa veniam
            harum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos
            ex eaque distinctio iure magni itaque asperiores, quaerat eum
            reiciendis possimus dolor? Nisi alias odio ab incidunt, culpa veniam
            harum.
          </p>
        </Text>
      </template>
      <template #right>
        <div class="flex justify-center">
          <img src="https://placehold.co/350x400" alt="No Image" />
        </div>
      </template>
    </Panel>
    <Panel dark>
      <template #left>
        <div class="flex justify-center">
          <img src="https://placehold.co/400x280" alt="No Image" />
        </div>
      </template>
      <template #right>
        <Text title="Informações Gerais">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos
            ex eaque distinctio iure magni itaque asperiores, quaerat eum
            reiciendis possimus dolor? Nisi alias odio ab incidunt, culpa veniam
            harum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos
            ex eaque distinctio iure magni itaque asperiores, quaerat eum
            reiciendis possimus dolor? Nisi alias odio ab incidunt, culpa veniam
            harum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos
            ex eaque distinctio iure magni itaque asperiores, quaerat eum
            reiciendis possimus dolor? Nisi alias odio ab incidunt, culpa veniam
            harum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos
            ex eaque distinctio iure magni itaque asperiores, quaerat eum
            reiciendis possimus dolor? Nisi alias odio ab incidunt, culpa veniam
            harum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos
            ex eaque distinctio iure magni itaque asperiores, quaerat eum
            reiciendis possimus dolor? Nisi alias odio ab incidunt, culpa veniam
            harum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos
            ex eaque distinctio iure magni itaque asperiores, quaerat eum
            reiciendis possimus dolor? Nisi alias odio ab incidunt, culpa veniam
            harum.
          </p>
        </Text>
      </template>
    </Panel>
    <Panel dark>
      <template #left>
        <Text title="Outras Informações">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos
            ex eaque distinctio iure magni itaque asperiores, quaerat eum
            reiciendis possimus dolor? Nisi alias odio ab incidunt, culpa veniam
            harum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos
            ex eaque distinctio iure magni itaque asperiores, quaerat eum
            reiciendis possimus dolor? Nisi alias odio ab incidunt, culpa veniam
            harum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos
            ex eaque distinctio iure magni itaque asperiores, quaerat eum
            reiciendis possimus dolor? Nisi alias odio ab incidunt, culpa veniam
            harum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos
            ex eaque distinctio iure magni itaque asperiores, quaerat eum
            reiciendis possimus dolor? Nisi alias odio ab incidunt, culpa veniam
            harum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos
            ex eaque distinctio iure magni itaque asperiores, quaerat eum
            reiciendis possimus dolor? Nisi alias odio ab incidunt, culpa veniam
            harum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos
            ex eaque distinctio iure magni itaque asperiores, quaerat eum
            reiciendis possimus dolor? Nisi alias odio ab incidunt, culpa veniam
            harum.
          </p>
        </Text>
      </template>
      <template #right>
        <div class="flex justify-center">
          <img src="https://placehold.co/400x280" alt="No Image" />
        </div>
      </template>
    </Panel>
    <Panel dark>
      <template #left>
        <div class="flex flex-wrap gap-4">
          <img src="/sample-logo.svg" alt="No Image" class="w-30" />
          <img src="/sample-logo.svg" alt="No Image" class="w-30" />
          <img src="/sample-logo.svg" alt="No Image" class="w-30" />
          <img src="/sample-logo.svg" alt="No Image" class="w-30" />
          <img src="/sample-logo.svg" alt="No Image" class="w-30" />
          <img src="/sample-logo.svg" alt="No Image" class="w-30" />
        </div>
      </template>
      <template #right>
        <Text title="Ferramentas">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos
            ex eaque distinctio iure magni itaque asperiores, quaerat eum
            reiciendis possimus dolor? Nisi alias odio ab incidunt, culpa veniam
            harum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae eos
            ex eaque distinctio iure magni itaque asperiores, quaerat eum
            reiciendis possimus dolor? Nisi alias odio ab incidunt, culpa veniam
            harum.
          </p>
        </Text>
      </template>
    </Panel>
    <!-- <Panel>Testemunhos</Panel>
    <Panel dark>Rodapé</Panel> -->
  </main>
</template>

<script setup lang="ts">
import Header from './components/header/index.vue';
import Panel from './components/panel.vue';
import Text from './components/text.vue';
import { ShoppingCart } from '@lucide/vue';
</script>
