<script>
	import '../app.css';
	import Header from '$lib/cmp/layout/Header.svelte';
	import Footer from '$lib/cmp/layout/Footer.svelte';
	import Sidebar from '$lib/cmp/layout/Sidebar.svelte';
	import Notifications from '$lib/cmp/global/Notifications.svelte';

	import { alerts } from '../stores/alerts';

	export let data;

	$: if (data?.session === 'expired') {
		alerts.newAlert('Your session has expired, please log in', 'error');
	}
</script>

<div id="app" class="h-full w-full">
	<Header account={data?.account} />

	<div id="app-body">
		<aside class="w-full h-full bg-black/20 border-r border-zinc-800 drop-shadow-lg">
			<Sidebar boards={data.boards} />
		</aside>
		<main class="">
			<slot />
		</main>
	</div>
	<Footer />
	<div class="fixed z-50 right-8 bottom-8 flex flex-col gap-4 max-w-xs w-full">
		<Notifications />
	</div>
</div>

<style lang="postcss">
	#app-body {
		@apply max-w-screen-1440 mx-auto bg-surface/30 grid grid-cols-[minmax(0,1fr),minmax(0,3fr),minmax(0,1fr)] gap-8;
		min-height: calc(100vh - 4rem - 10rem);
	}

	#app {
		@apply h-full w-full;
	}

	main {
		@apply w-full flex flex-col;
	}
</style>
