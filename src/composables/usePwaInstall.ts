import { ref, onMounted } from 'vue';

const deferredPrompt = ref<any>(null);
const showInstallModal = ref(false);
const isIOS = ref(false);

export function usePwaInstall() {
  const setCookie = (name: string, value: string, days: number) => {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  };

  const getCookie = (name: string) => {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
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
    const userAgent = window.navigator.userAgent;
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    isIOS.value = isIOSDevice;

    if ((window as any).pwaDeferredPrompt) {
      deferredPrompt.value = (window as any).pwaDeferredPrompt;
    }

    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      deferredPrompt.value = e;
      openInstallModal();
    });

    openInstallModal();
  });

  const installApp = async () => {
    if (deferredPrompt.value) {
      deferredPrompt.value.prompt();
      const { outcome } = await deferredPrompt.value.userChoice;
      if (outcome === 'accepted') {
        console.log('Kullanıcı uygulamayı yüklemeyi kabul etti.');
      }
      deferredPrompt.value = null;
    }
    dismissModal();
  };

  const dismissModal = () => {
    showInstallModal.value = false;
    setCookie('installPromptShown', 'true', 1);
  };

  return {
    showInstallModal,
    isIOS,
    installApp,
    dismissModal
  };
}