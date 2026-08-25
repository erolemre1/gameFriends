<script setup lang="ts">
import { RouterView } from 'vue-router';
import PwaInstallModal from './components/PwaInstallModal.vue';
</script>

<template>
  <main class="app-shell">
    <RouterView />
    <PwaInstallModal />
  </main>
</template>

<style scoped>
.app-shell {
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  background: #0f172a;
  color: #f8fafc;
}
</style>