<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	import AssetGrid from '../assets/AssetGrid.svelte';
	import ContentTag from '../global/ContentTag.svelte';
	import CircularIconBtn from '../global/CircularIconBtn.svelte';
	import Hamburger from '$lib/icons/Hamburger.svelte';

	/** @type {Thread} */ export let thread;

	// $: if (browser) console.log('thread', thread);
</script>

<article id="thread-{$page.params.short}-{thread.slug}" class="bg-zinc-900 rounded-md">
	<header class="flex justify-between items-center p-2">
		<div class="mr-2 -mb-1">
			<CircularIconBtn>
				<Hamburger />
			</CircularIconBtn>
		</div>
		<h3
			class="text-xl font-semibold mx-2 whitespace-nowrap overflow-hidden text-ellipsis capitalize w-full text-blue-50 hover:text-blue-200 focus-within:underline underline-offset-4 focus-within:text-blue-200 outline-none"
		>
			<a class="outline-none" href="/boards/{$page.params.short}/{thread.slug}">{thread.title}</a>
		</h3>
		<div class="whitespace-nowrap">
			<span class="text-sm text-zinc-500">
				<span class="italic text-zinc-400">{thread.post_count}</span>
				Posts
			</span>
			<span class="text-zinc-500 mx-2">|</span>
			<span class="text-sm text-zinc-500">
				<span class="italic text-zinc-400">{thread.mods.length}</span>
				Mod{thread.mods.length > 1 ? 's' : ''}
			</span>
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
