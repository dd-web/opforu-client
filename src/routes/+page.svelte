<script>
	import { browser } from '$app/environment';

	/** @type {import('./$types').PageData} */
	export let data;

	$: if (browser) console.log('root +page.svelte', data);
</script>

<svelte:head>
	<title>OPforU</title>
	<meta name="description" content="OPforU - Home Page" />
</svelte:head>

<div>
	<h1 class="text-4xl mt-4 text-center capitalize text-blue-100">OPforU</h1>
</div>
