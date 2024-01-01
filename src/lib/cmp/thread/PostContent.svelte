<script>
	import AssetGrid from '../assets/AssetGrid.svelte';
	import Identity from '../global/Identity.svelte';
	import CircularIconBtn from '../global/CircularIconBtn.svelte';
	import Hamburger from '$lib/icons/Hamburger.svelte';

	export let /** @type {Post} */ post;
	export let /** @type {Thread} */ thread;
</script>

<article id="post-{thread.slug}-{post.post_number}" class="bg-zinc-900 rounded-md">
	<header class="flex justify-between items-center p-2">
		<div class="">
			<CircularIconBtn>
				<Hamburger />
			</CircularIconBtn>
		</div>

		<div class="flex gap-2 items-center">
			<Identity identity={post?.creator} />
			<button class="post-num-badge px-2">
				{post?.post_number}
			</button>
		</div>
	</header>

	<div id="post-body" class="px-4 my-2">
		{#if post?.assets?.length > 0}
			<div class="aspect-square max-w-xs w-full float-left mr-8">
				<AssetGrid assets={post.assets} />
			</div>
		{/if}
		<div class="ml-4" class:col-span-2={post?.assets?.length === 0}>
			{@html post.body}
		</div>
	</div>

	<footer class="clear-left flex p-2 items-center justify-between">
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
</style>
