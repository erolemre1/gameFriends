import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router';
import './style.css';
import App from './App.vue';
import { registerSW } from 'virtual:pwa-register';

const clearDevelopmentServiceWorkers = async () => {
	if (!import.meta.env.DEV || !('serviceWorker' in navigator)) return;

	const registrations = await navigator.serviceWorker.getRegistrations();
	if (registrations.length === 0) return;

	await Promise.all(registrations.map((registration) => registration.unregister()));
	window.location.reload();
};

if (import.meta.env.DEV) {
	void clearDevelopmentServiceWorkers();
} else {
	registerSW({ immediate: true });
}

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');