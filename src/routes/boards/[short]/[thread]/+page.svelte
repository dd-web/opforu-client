<script>
	import { browser } from '$app/environment';

	import PostListItem from '$lib/cmp/thread/PostListItem.svelte';
	import ThreadAssets from '$lib/cmp/assets/ThreadAssets.svelte';
	import TagInfo from '$lib/cmp/global/TagInfo.svelte';
	import Identity from '$lib/cmp/global/Identity.svelte';

	/** @type {{thread: Thread}} */
	export let data;

	$: if (browser) console.log('data (thread)', data);
</script>

<section class="mt-8">
	<!-- thread stuff -->
	<article class="relative border rounded-lg border-zinc-800 shadow-lg shadow-black/20">
		<!-- thread header -->
		<header class="bg-zinc-800/50 pt-2 pb-4 px-4 rounded-t-lg">
			<h3 class="text-blue-200 text-lg capitalize whitespace-nowrap overflow-hidden text-ellipsis w-full">
				{data.thread.title}
			</h3>
			<hr class="mb-3 mt-1 opacity-20" />
			<div>
				<Identity identity={data.thread.creator} />
				<TagInfo key="mod" value={data.thread.mods.length} />
			</div>
		</header>

		<!-- thread content -->
		<div class="py-2 px-4 text-zinc-200 bg-zinc-900/20 flow-root">
			<!-- media -->
			{#if data.thread?.assets?.length > 0}
				<div class="float-left max-w-[32%] bg-black/20 p-2 rounded-md mr-4">
					<ThreadAssets assets={data.thread.assets} />
				</div>
			{/if}
			{@html data.thread.body}
		</div>

		<!-- thread footer -->
		<footer class="py-2 px-4 bg-zinc-800/50 rounded-b-lg">
			<p>{data.thread.created_at}</p>
		</footer>
	</article>

	<!-- posts -->
	<div class="pt-8 flex flex-col gap-8">
		{#each data.thread.posts as post (post.post_number)}
			<PostListItem {post} />
		{:else}
			<p>No Posts Found</p>
		{/each}
	</div>
</section>
