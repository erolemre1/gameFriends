<script setup lang="ts">
import { onMounted, ref } from 'vue';

const showInstallModal = ref(false);
const isIOS = ref(false);
const deferredPrompt = ref<any>(null);

const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
};

const getCookie = (name: string) => {
  const nameEQ = name + '=';
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const c = cookie.trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
  }
  return null;
};

const dismissModal = () => {
  showInstallModal.value = false;
  setCookie('installPromptShown', 'true', 1);
};

const installApp = async () => {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt();
    const { outcome } = await deferredPrompt.value.userChoice;
    if (outcome === 'accepted') {
      console.log('Uygulama yüklendi');
    }
    deferredPrompt.value = null;
  }
  dismissModal();
};

const openInstallModal = () => {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
  if (isStandalone || getCookie('installPromptShown')) {
    return;
  }

  setTimeout(() => {
    showInstallModal.value = true;
  }, 2500);
};

onMounted(() => {
  isIOS.value = /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !(window as any).MSStream;

  if ((window as any).pwaDeferredPrompt) {
    deferredPrompt.value = (window as any).pwaDeferredPrompt;
  }

  window.addEventListener('beforeinstallprompt', (event: Event) => {
    event.preventDefault();
    deferredPrompt.value = event;
    openInstallModal();
  });

  openInstallModal();
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

      <p v-if="!isIOS" class="text-slate-600 text-sm mb-5">
        Okey Masa Bulucu'yu telefonunuza yükleyerek masaları daha hızlı bulabilir ve anlık bildirimleri alabilirsiniz!
      </p>

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
