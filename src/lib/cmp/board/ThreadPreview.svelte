<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	import AssetGrid from '../assets/AssetGrid.svelte';
	import ContentTag from '../global/ContentTag.svelte';

	/** @type {Thread} */
	export let thread;

	$: if (browser) console.log('thread', thread);

	/**
	 * @param {Date|string|number} date represents point in time since epoch
	 */
	const calcElapsed = (date) => {
		let now = new Date();
		let end = new Date(date);

		let elapsed = end.getTime() - now.getTime();
	};
</script>

<article id="thread-{$page.params.short}-{thread.slug}" class="bg-zinc-900 rounded-md">
	<header>
		<h3 class="text-xl font-semibold mx-2 whitespace-nowrap overflow-hidden text-ellipsis">
			{thread.title}
		</h3>
		<div>
			<p>{thread.post_count} Posts</p>
		</div>
	</header>

	<div id="thread-preview-body" class="px-4 my-2">
		{#if thread?.assets?.length > 0}
			<div class="aspect-square max-w-xs w-full float-left mr-8">
				<AssetGrid assets={thread.assets} />
			</div>
		{/if}
		<div class="ml-4" class:col-span-2={thread?.assets?.length === 0}>
			{@html thread.body}
		</div>
	</div>

	<footer class="clear-left flex py-2 px-2 items-center justify-between">
		{#if thread?.tags?.length > 0}
			<div class="flex gap-2 max-w-[50%] overflow-hidden">
				{#each thread?.tags as tag (tag)}
					<ContentTag {tag} />
				{/each}
			</div>
		{:else}
			<span />
		{/if}

		<div class="">
			<span class="text-sm text-zinc-500" title={new Date(thread?.created_at).toLocaleTimeString()}>
				Created
				<span class="italic text-zinc-400">
					{new Date(thread?.created_at).toLocaleDateString()}
				</span>
			</span>

			<span class="text-zinc-500 mx-2">|</span>

			<span class="text-sm text-zinc-500" title={new Date(thread?.updated_at).toLocaleTimeString()}>
				Updated
				<span class="italic text-zinc-400">
					{new Date(thread?.updated_at).toLocaleDateString()}
				</span>
			</span>
		</div>
	</footer>
</article>

<style lang="postcss">
	/* #thread-preview-body {
		@apply grid grid-cols-[0.3fr_,1fr] grid-rows-[1fr];
	} */
</style>
