<script setup lang="ts">
import { RouterView } from 'vue-router';
import PwaInstallModal from './components/PwaInstallModal.vue';
</script>

<template>
  <main class="w-full min-h-screen bg-slate-900 text-slate-100">
    <RouterView />
    <PwaInstallModal />
  </main>
</template>