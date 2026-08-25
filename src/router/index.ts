import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TableDetailView from '../views/TableDetailView.vue';
import CreateTableView from '../views/CreateTableView.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/table/:id', name: 'table-detail', component: TableDetailView },
    { path: '/create', name: 'create-table', component: CreateTableView }
  ]
});