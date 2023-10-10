<script>
	import '../app.css';
	import Header from '$lib/cmp/layout/Header.svelte';
	import Footer from '$lib/cmp/layout/Footer.svelte';
	import Sidebar from '$lib/cmp/layout/Sidebar.svelte';

	export let data;

	// $: console.log('layout data', data.boards);
</script>

<div id="app" class="h-full w-full">
	<Header />

	<div id="app-body">
		<Sidebar boards={data.boards} />
		<main class="bg-zinc-800">
			<slot />
		</main>
	</div>
	<Footer />
</div>

<style lang="postcss">
	#app-body {
		@apply max-w-screen-1440 mx-auto bg-surface/30 grid grid-cols-[minmax(0,1fr),minmax(0,3fr),minmax(0,1fr)] gap-8;
	}

	#app {
		@apply h-full w-full;
	}

	main {
		/* lowest supported screen size */
		@apply w-full flex flex-col;
	}
</style>
