<script>
	import '../app.css';
	import Topbar from '$lib/cmp/layout/Topbar.svelte';
	import Sidebar from '$lib/cmp/layout/Sidebar.svelte';
	import Notifications from '$lib/cmp/global/Notifications.svelte';

	import { alerts } from '$lib/stores/alerts';

	export let data;

	$: if (data?.session === 'expired') {
		alerts.newAlert('Your session has expired, please log in', 'error');
	}
</script>

<div id="app">
	<Topbar account={data.account} />
	<div id="app-content">
		<Sidebar boards={data.boards} />
		<main class="mx-auto max-w-[80%]">
			<slot />
		</main>
	</div>

	<div class="fixed z-50 right-8 bottom-8 flex flex-col gap-4 max-w-xs w-full">
		<Notifications />
	</div>
</div>

<style lang="postcss">
	#app {
		@apply h-full w-full;
	}

	#app-content {
		@apply bg-zinc-950 flex;
		min-height: calc(100vh - 3rem);
	}
</style>
