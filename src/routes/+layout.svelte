<script>
	import '../app.css';
	import Header from '$lib/cmp/layout/Header.svelte';
	import Footer from '$lib/cmp/layout/Footer.svelte';
	import Sidebar from '$lib/cmp/layout/Sidebar.svelte';

	export let data;
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
