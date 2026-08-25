import { ref, onMounted } from 'vue';

const deferredPrompt = ref<any>(null);
const showInstallModal = ref(false);
const isIOS = ref(false);

export function usePwaInstall() {
  const checkIsInstalled = () => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone === true;

    const isDismissed = localStorage.getItem('pwa_install_dismissed') === 'true';

    const userAgent = window.navigator.userAgent.toLowerCase();
    isIOS.value = /iphone|ipad|ipod/.test(userAgent);

    return isStandalone || isDismissed;
  };

  onMounted(() => {
    if (checkIsInstalled()) {
      showInstallModal.value = false;
      return;
    }

    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      deferredPrompt.value = e;
      showInstallModal.value = true;
    });

    if (isIOS.value && !checkIsInstalled()) {
      showInstallModal.value = true;
    }
  });

  const installApp = async () => {
    if (deferredPrompt.value) {
      deferredPrompt.value.prompt();
      const { outcome } = await deferredPrompt.value.userChoice;
      if (outcome === 'accepted') {
        showInstallModal.value = false;
      }
      deferredPrompt.value = null;
    }
  };

  const dismissModal = () => {
    showInstallModal.value = false;
    localStorage.setItem('pwa_install_dismissed', 'true');
  };

  return {
    showInstallModal,
    isIOS,
    installApp,
    dismissModal
  };
}