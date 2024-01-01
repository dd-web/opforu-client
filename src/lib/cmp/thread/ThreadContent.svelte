<script>
	import ContentTag from '$lib/cmp/global/ContentTag.svelte';
	import AssetGrid from '../assets/AssetGrid.svelte';
	import Identity from '../global/Identity.svelte';
	import CircularIconBtn from '../global/CircularIconBtn.svelte';
	import Hamburger from '$lib/icons/Hamburger.svelte';

	export let /** @type {Thread} */ thread;
</script>

<article id="thread-{thread.slug}-content" class="bg-zinc-900 rounded-md">
	<header class="flex justify-between items-center p-2">
		<div class="flex items-center justify-between w-full gap-2">
			<CircularIconBtn>
				<Hamburger />
			</CircularIconBtn>

			<Identity identity={thread.creator} />
		</div>
	</header>

	<div id="thread-{thread.slug}-content-body" class="px-4 my-2">
		{#if thread?.assets?.length > 0}
			<div class="aspect-square max-w-xs w-full float-left mr-8">
				<AssetGrid assets={thread.assets} />
			</div>
		{/if}
		<div class="ml-4" class:col-span-2={thread?.assets?.length === 0}>
			{@html thread.body}
		</div>
	</div>

	<footer class="clear-left flex p-2 items-center justify-between">
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
