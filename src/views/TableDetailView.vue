<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTableStore } from '../stores/tableStore';
import type { Player } from '../types/table';

const route = useRoute();
const router = useRouter();
const tableStore = useTableStore();

const tableId = route.params.id as string;
const table = computed(() => tableStore.tables.find(t => t.id === tableId));

const playerName = ref('');
const isJoining = ref(false);

const missingCount = computed(() => {
  return table.value ? tableStore.getMissingCount(table.value) : 0;
});

const isTableFull = computed(() => missingCount.value === 0);

const handleJoin = () => {
  if (!playerName.value.trim() || !table.value) return;

  const newPlayer: Player = {
    id: String(Date.now()),
    name: playerName.value.trim(),
    rating: 5.0,
    isHost: false
  };

  tableStore.joinTable(table.value.id, newPlayer);
  isJoining.value = false;
  playerName.value = '';
};
</script>

<template>
  <div v-if="table" class="min-h-screen p-4 max-w-md mx-auto flex flex-col justify-between">
    <div>
      <button 
        @click="router.push('/')" 
        class="text-xs text-slate-400 hover:text-white flex items-center gap-1 mb-4"
      >
        ← Masalara Dön
      </button>

      <div class="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-lg mb-6">
        <div class="flex justify-between items-start mb-2">
          <div>
            <h1 class="text-xl font-bold text-white">{{ table.venueName }}</h1>
            <p class="text-xs text-slate-400">{{ table.venueAddress }}</p>
          </div>
          <span class="bg-amber-500/20 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full border border-amber-500/30">
            {{ table.gameType }}
          </span>
        </div>
        <p v-if="table.note" class="text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-700/40 text-slate-300 italic mt-3">
          "{{ table.note }}"
        </p>
      </div>

      <div class="mb-6">
        <h2 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Masa Düzeni</h2>
        <div class="grid grid-cols-2 gap-3">
          <div 
            v-for="player in table.currentPlayers" 
            :key="player.id"
            class="bg-slate-800 border border-slate-700 rounded-xl p-3.5 flex items-center gap-3 shadow"
          >
            <div class="w-9 h-9 rounded-full bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-400 text-sm">
              {{ player.name[0].toUpperCase() }}
            </div>
            <div class="overflow-hidden">
              <p class="text-sm font-semibold text-white truncate">{{ player.name }}</p>
              <p class="text-[11px] text-slate-400">⭐ {{ player.rating }} {{ player.isHost ? '• Kurucu' : '' }}</p>
            </div>
          </div>

          <div 
            v-for="n in missingCount" 
            :key="'empty-' + n"
            class="bg-slate-900/40 border-2 border-dashed border-slate-700/80 rounded-xl p-3.5 flex items-center gap-3 text-slate-500"
          >
            <div class="w-9 h-9 rounded-full border border-dashed border-slate-600 flex items-center justify-center text-xs">
              ?
            </div>
            <span class="text-xs font-medium">Boş Sandalye</span>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-4 border-t border-slate-800">
      <div v-if="isTableFull" class="bg-emerald-950/40 border border-emerald-800/60 text-emerald-400 text-center py-3 rounded-xl text-sm font-semibold">
        🎉 Masa Doldu! Oyun Başlayabilir.
      </div>

      <div v-else>
        <div v-if="!isJoining">
          <button 
            @click="isJoining = true"
            class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-emerald-950"
          >
            Sandalyeye Otur ({{ missingCount }} Kişi Eksik)
          </button>
        </div>

        <div v-else class="space-y-3">
          <input 
            v-model="playerName"
            type="text" 
            placeholder="Adınızı veya lakabınızı girin"
            class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 placeholder:text-slate-500"
            @keyup.enter="handleJoin"
            autofocus
          />
          <div class="flex gap-2">
            <button 
              @click="isJoining = false"
              class="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-3 rounded-xl text-sm transition"
            >
              Vazgeç
            </button>
            <button 
              @click="handleJoin"
              :disabled="!playerName.trim()"
              class="w-2/3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition shadow-lg shadow-emerald-950"
            >
              Masaya Katıl
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="min-h-screen p-4 flex flex-col items-center justify-center text-center">
    <p class="text-slate-400 mb-4">Masa bulunamadı veya kapatılmış.</p>
    <button @click="router.push('/')" class="text-emerald-400 font-semibold text-sm underline">Masalara Dön</button>
  </div>
</template>