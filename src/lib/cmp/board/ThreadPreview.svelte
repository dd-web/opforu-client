<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	import AssetGrid from '../assets/AssetGrid.svelte';

	/** @type {Thread} */
	export let thread;

	$: if (browser) console.log('thread', thread);
</script>

<article id="thread-{$page.params.short}-{thread.slug}" class="bg-zinc-900 rounded-md">
	<header>
		<h3 class="text-xl font-semibold mx-2 whitespace-nowrap overflow-hidden text-ellipsis">{thread.title}</h3>
		<div>
			<p>{thread.post_count} Posts</p>
		</div>
	</header>

	<div class="grid grid-cols-[0.3fr,_1fr] grid-rows-[1fr] px-4 my-2">
		{#if thread?.assets?.length > 0}
			<div class="aspect-square max-w-xs">
				<AssetGrid assets={thread.assets} />
			</div>
		{/if}
		<div class="ml-4" class:col-span-2={thread?.assets?.length === 0}>
			{@html thread.body}
		</div>
	</div>

	<footer>
		<p>thread footer</p>
	</footer>
</article>

<style lang="postcss">
</style>
