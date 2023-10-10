<script>
	import { browser } from '$app/environment';
	import { setTheme } from '$lib/utils/theme';
	import { onMount } from 'svelte';

	onMount(() => {
		if (browser) {
			setTheme();
		}
	});
</script>

<h1 class="text-3xl">Hello!</h1>
<div>
	<p>and now some stuff to make the page longer so i can fix layout</p>
	{#each Array(500) as item, ix}
		<p>Hello {ix}</p>
	{/each}
</div>
