<script>
	import { page } from '$app/stores';

	import Identity from '../global/Identity.svelte';
	import TagInfo from '../global/TagInfo.svelte';
	import ThreadAssets from '../assets/ThreadAssets.svelte';

	/** @type {Thread} */
	export let thread;
</script>

<article
	id="thread-{$page.params.short}-{thread.slug}"
	class="mx-2 relative border rounded-lg border-zinc-800 shadow-lg shadow-black/20"
>
	<!-- thread header -->
	<header class="bg-black/20 pt-2 pb-4 px-4 rounded-t-lg">
		<h3
			title={thread.title}
			class="text-blue-200 text-lg capitalize whitespace-nowrap overflow-hidden text-ellipsis w-full"
		>
			<a href="/boards/{$page.params.short}/{thread.slug}">{thread.title}</a>
		</h3>

		<hr class="mb-3 mt-1 opacity-20" />

		<div class="flex gap-2 items-center">
			<Identity identity={thread.creator} />
			<TagInfo key="mod" value={thread.mods.length} />
			<TagInfo key="post" value={thread.post_count} />
		</div>
	</header>

	<!-- content -->
	<div class="py-2 px-4 text-zinc-200 bg-zinc-800/20 flow-root">
		<!-- media -->
		{#if thread?.assets?.length > 0}
			<div class="float-left max-w-[32%] bg-black/20 p-2 rounded-md mr-4">
				<ThreadAssets assets={thread.assets} />
			</div>
		{/if}
		{@html thread.body}
	</div>

	<!-- thread footer -->
	<footer class="py-2 px-4 bg-black/20 rounded-b-lg">
		<p>{thread.created_at}</p>
	</footer>
</article>
