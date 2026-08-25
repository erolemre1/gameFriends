<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useTableStore } from '../stores/tableStore';
import type { GameType, Table } from '../types/table';

const router = useRouter();
const tableStore = useTableStore();

const form = reactive({
  venueName: '',
  venueAddress: '',
  gameType: '101' as GameType,
  hostName: '',
  initialPlayerCount: 1, // Masayı açan kaç kişiyle oturuyor (1, 2 veya 3)
  note: ''
});

const gameTypes: { label: string; value: GameType }[] = [
  { label: '101 Okey', value: '101' },
  { label: 'Düz Okey', value: 'Duz' },
  { label: 'Eşli 101', value: 'Esli101' }
];

const handleCreateTable = () => {
  if (!form.venueName || !form.hostName) return;

  const currentPlayers = [];
  currentPlayers.push({
    id: String(Date.now()),
    name: form.hostName.trim(),
    rating: 5.0,
    isHost: true
  });

  for (let i = 2; i <= form.initialPlayerCount; i++) {
    currentPlayers.push({
      id: String(Date.now() + i),
      name: `Arkadaş ${i - 1}`,
      rating: 5.0,
      isHost: false
    });
  }

  const newTable: Table = {
    id: 'masa-' + Math.random().toString(36).substring(2, 7),
    venueName: form.venueName.trim(),
    venueAddress: form.venueAddress.trim() || 'Merkez',
    gameType: form.gameType,
    requiredPlayers: 4,
    currentPlayers,
    note: form.note.trim() || undefined,
    createdAt: new Date().toISOString()
  };

  tableStore.tables.unshift(newTable);
  router.push(`/table/${newTable.id}`);
};
</script>

<template>
  <div class="min-h-screen p-4 max-w-md mx-auto pb-10">
    <header class="flex items-center gap-3 mb-6">
      <button 
        @click="router.push('/')"
        class="w-8 h-8 flex items-center justify-center bg-slate-800 rounded-lg text-slate-300 text-sm"
      >
        ←
      </button>
      <h1 class="text-xl font-bold text-white">Yeni Masa Aç</h1>
    </header>

    <form @submit.prevent="handleCreateTable" class="space-y-4">
      <div>
        <label class="block text-xs font-semibold text-slate-400 mb-1.5">Mekan / Kafe Adı *</label>
        <input 
          v-model="form.venueName"
          type="text" 
          placeholder="Örn: Moda Oyun Kafe"
          required
          class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 placeholder:text-slate-500"
        />
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-400 mb-1.5">Semt / Bölge</label>
        <input 
          v-model="form.venueAddress"
          type="text" 
          placeholder="Örn: Kadıköy / Caferağa"
          class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 placeholder:text-slate-500"
        />
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-400 mb-1.5">Oyun Türü</label>
        <div class="grid grid-cols-3 gap-2">
          <button 
            type="button"
            v-for="item in gameTypes" 
            :key="item.value"
            @click="form.gameType = item.value"
            :class="form.gameType === item.value 
              ? 'bg-emerald-600 border-emerald-500 text-white font-bold' 
              : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'"
            class="py-2.5 rounded-xl border text-xs transition"
          >
            {{ item.label }}
          </button>
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-400 mb-1.5">Şu An Masada Kaç Kişisiniz?</label>
        <div class="grid grid-cols-3 gap-2">
          <button 
            type="button"
            v-for="count in [1, 2, 3]" 
            :key="count"
            @click="form.initialPlayerCount = count"
            :class="form.initialPlayerCount === count 
              ? 'bg-amber-600 border-amber-500 text-white font-bold' 
              : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'"
            class="py-2.5 rounded-xl border text-xs transition"
          >
            {{ count }} Kişiyiz ({{ 4 - count }} Eksik)
          </button>
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-400 mb-1.5">Adınız / Lakabınız *</label>
        <input 
          v-model="form.hostName"
          type="text" 
          placeholder="Adınızı girin"
          required
          class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 placeholder:text-slate-500"
        />
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-400 mb-1.5">Masa Notu (İsteğe Bağlı)</label>
        <textarea 
          v-model="form.note"
          rows="2"
          placeholder="Örn: Makarasına oynuyoruz, çaylar kaybedenden."
          class="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-emerald-500 placeholder:text-slate-500 resize-none"
        ></textarea>
      </div>

      <button 
        type="submit"
        :disabled="!form.venueName || !form.hostName"
        class="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg shadow-emerald-950 mt-4"
      >
        Masayı Başlat ve Yayınla
      </button>
    </form>
  </div>
</template>