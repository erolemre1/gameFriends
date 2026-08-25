<script setup lang="ts">
import { usePwaInstall } from '../composables/usePwaInstall';

const { showInstallModal, isIOS, installApp, dismissModal } = usePwaInstall();
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div 
      v-if="showInstallModal" 
      class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
    >
      <div class="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-2xl shadow-lg shadow-emerald-950">
            🀄
          </div>
          <div>
            <h3 class="font-bold text-white text-base">Uygulamayı Yükle</h3>
            <p class="text-xs text-slate-400">Masaları kaçırma, anında katıl!</p>
          </div>
        </div>

        <p class="text-xs text-slate-300 leading-relaxed">
          Uygulamayı ana ekranına ekleyerek masaya oyuncu geldiğinde anlık bildirim alabilir ve tek tıkla masaya ulaşabilirsin.
        </p>

        <div v-if="isIOS" class="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-xs text-slate-300 space-y-2">
          <p class="font-semibold text-emerald-400">iPhone / iPad için:</p>
          <ol class="list-decimal list-inside space-y-1 text-slate-300">
            <li>Alttaki <span class="text-white font-bold">Paylaş (Share)</span> butonuna bas.</li>
            <li>Aşağı kaydırıp <span class="text-white font-bold">"Ana Ekrana Ekle"</span>yi seç.</li>
          </ol>
        </div>

        <div class="flex gap-2 pt-2">
          <button 
            @click="dismissModal"
            class="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
          >
            Daha Sonra
          </button>

          <button 
            v-if="!isIOS"
            @click="installApp"
            class="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-950"
          >
            Ana Ekrana Ekle
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>