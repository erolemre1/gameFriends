<script setup lang="ts">
import { useTableStore } from '../stores/tableStore';
import { useRouter } from 'vue-router';

const tableStore = useTableStore();
const router = useRouter();

const goToTable = (id: string) => {
  router.push(`/table/${id}`);
};
</script>

<template>
  <div class="min-h-screen pb-20 p-4 max-w-md mx-auto">
    <header class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-white tracking-tight">Okey Masaları</h1>
        <p class="text-xs text-slate-400">Çevrendeki açık masalar</p>
      </div>
      <button 
        @click="router.push('/create')"
        class="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition shadow-lg shadow-emerald-900/40"
      >
        + Masa Aç
      </button>
    </header>

    <div class="space-y-4">
      <div 
        v-for="table in tableStore.tables" 
        :key="table.id"
        @click="goToTable(table.id)"
        class="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 active:scale-[0.98] transition cursor-pointer shadow-md"
      >
        <div class="flex justify-between items-start mb-2">
          <div>
            <h3 class="font-bold text-base text-white">{{ table.venueName }}</h3>
            <p class="text-xs text-slate-400">{{ table.venueAddress }}</p>
          </div>
          <span class="bg-amber-500/20 text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-500/30">
            {{ table.gameType }}
          </span>
        </div>

        <div class="my-3 flex items-center justify-between bg-slate-900/50 p-2.5 rounded-xl border border-slate-700/30">
          <div class="flex -space-x-2 overflow-hidden">
            <div 
              v-for="player in table.currentPlayers" 
              :key="player.id"
              class="inline-block h-8 w-8 rounded-full bg-slate-700 border-2 border-slate-800 text-center text-xs leading-7 font-bold text-slate-200"
            >
              {{ player.name[0] }}
            </div>
            <div 
              v-for="n in tableStore.getMissingCount(table)" 
              :key="n"
              class="inline-flex items-center justify-center h-8 w-8 rounded-full bg-slate-800/80 border-2 border-dashed border-slate-600 text-xs text-slate-500"
            >
              ?
            </div>
          </div>
          <span class="text-xs font-medium text-emerald-400">
            {{ tableStore.getMissingCount(table) }} kişi aranıyor
          </span>
        </div>

        <p v-if="table.note" class="text-xs text-slate-300 italic mb-2">"{{ table.note }}"</p>
      </div>
    </div>
  </div>
</template>