import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router';
import './style.css';
import App from './App.vue';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.error('Service worker kaydı başarısız:', err);
    });
  });
}

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');