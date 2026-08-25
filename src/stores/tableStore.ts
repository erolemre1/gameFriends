import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Table, Player } from '../types/table';

export const useTableStore = defineStore('table', () => {
  const tables = ref<Table[]>([
    {
      id: 'masa-101',
      venueName: 'Moda Oyun Kafe',
      venueAddress: 'Kadıköy / Moda',
      gameType: '101',
      requiredPlayers: 4,
      currentPlayers: [
        { id: '1', name: 'Ahmet', rating: 4.8, isHost: true },
        { id: '2', name: 'Mert', rating: 4.5, isHost: false }
      ],
      note: 'Çayına oynuyoruz, 2 kişi eksik!',
      createdAt: new Date().toISOString()
    }
  ]);

  const activeTable = ref<Table | null>(null);

  const getMissingCount = (table: Table) => {
    return table.requiredPlayers - table.currentPlayers.length;
  };

  const joinTable = (tableId: string, player: Player) => {
    const target = tables.value.find(t => t.id === tableId);
    if (target && target.currentPlayers.length < target.requiredPlayers) {
      target.currentPlayers.push(player);
    }
  };

  return {
    tables,
    activeTable,
    getMissingCount,
    joinTable
  };
});