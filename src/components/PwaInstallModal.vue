<script setup lang="ts">
import { usePwaInstall } from '../composables/usePwaInstall';

const { showInstallModal, isIOS, deferredPrompt, installApp, dismissModal } = usePwaInstall();
</script>

<template>
  <div
    v-if="showInstallModal"
    class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
  >
    <div class="bg-white p-7 text-center max-w-[360px] w-full rounded-2xl relative shadow-2xl">
      <button
        @click="dismissModal"
        class="absolute top-3 right-4 text-slate-800 text-3xl font-bold leading-none"
      >
        &times;
      </button>

      <div class="text-6xl mb-3">📲</div>
      <h3 class="text-emerald-700 text-xl font-bold mt-0 mb-2">Uygulamayı Cihazınıza Yükleyin</h3>

      <p v-if="!isIOS" class="text-slate-600 text-sm mb-5 leading-relaxed">
        Bu uygulamayı telefonunuza kurarsanız daha hızlı açılır, internet bağlantısı olmadan da çalışır.
      </p>

      <p v-else class="text-slate-600 text-sm mb-5 text-left leading-relaxed">
        iPhone/iPad’de yükleme için:<br><br>
        <b>1.</b> Tarayıcının <b>Paylaş</b> simgesine dokunun.<br>
        <b>2.</b> <b>Ana Ekrana Ekle</b> seçeneğini seçin.<br>
        <b>3.</b> Sonra <b>Ekle</b> ile kurulum tamamlanır.
      </p>

      <div class="flex gap-2 justify-center">
        <button
          v-if="!isIOS && deferredPrompt"
          @click="installApp"
          class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg text-base transition"
        >
          Yükle
        </button>

        <button
          @click="dismissModal"
          :class="[
            'font-bold py-3 rounded-lg text-base transition flex-1',
            !isIOS && deferredPrompt ? 'bg-slate-200 hover:bg-slate-300 text-slate-800' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          ]"
        >
          {{ !isIOS && deferredPrompt ? 'Daha Sonra' : 'Tamam' }}
        </button>
      </div>
    </div>
  </div>
</template>
