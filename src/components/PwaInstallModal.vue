<script setup lang="ts">
import { onMounted } from 'vue';
import { usePwaInstall } from '../composables/usePwaInstall';

const { showInstallModal, isIOS, installApp, dismissModal } = usePwaInstall();

onMounted(() => {
  // Eğer event Vue yüklenmeden önce tetiklendiyse index.html'den al
  if (window.pwaDeferredPrompt) {
    deferredPrompt.value = window.pwaDeferredPrompt;
    if (!getCookie('installPromptShown')) {
      setTimeout(() => { showModal.value = true; }, 2500);
    }
  }

  // Eğer Vue yüklendikten sonra tetiklenirse buradan yakala
  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault();
    deferredPrompt.value = e;
    if (!getCookie('installPromptShown')) {
      setTimeout(() => { showModal.value = true; }, 2500);
    }
  });

  // ... iOS kontrolleri (önceki kodun aynısı)
});
</script>

<template>
  <div 
    v-if="showInstallModal" 
    class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm"
  >
    <div class="bg-white p-8 text-center max-w-[350px] w-[90%] rounded-2xl relative shadow-2xl">
      <button 
        @click="dismissModal" 
        class="absolute top-3 right-4 text-slate-800 text-3xl font-bold leading-none"
      >
        &times;
      </button>
      
      <div class="text-6xl mb-3">📲</div>
      <h3 class="text-emerald-700 text-xl font-bold mt-0 mb-2">Uygulamayı Cihazınıza Yükleyin</h3>
      
      <!-- Android Metni -->
      <p v-if="!isIOS" class="text-slate-600 text-sm mb-5">
        Okey Masa Bulucu'yu telefonunuza yükleyerek masaları daha hızlı bulabilir ve anlık bildirimleri alabilirsiniz!
      </p>

      <!-- iOS Metni -->
      <p v-else class="text-slate-600 text-sm mb-5 text-left">
        Apple politikaları gereği uygulamamızı yüklemek için:<br><br>
        <b>1.</b> Tarayıcınızın alt kısmındaki <b>Paylaş</b> ikonuna dokunun.<br>
        <b>2.</b> Açılan menüden <b>Ana Ekrana Ekle</b> seçeneğini seçin.
      </p>
      
      <div class="flex gap-2 justify-center">
        <button 
          v-if="!isIOS"
          @click="installApp" 
          class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg text-base transition"
        >
          Hemen Yükle
        </button>
        <button 
          @click="dismissModal" 
          class="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-3 rounded-lg text-base transition"
        >
          Daha Sonra
        </button>
      </div>
    </div>
  </div>
</template>