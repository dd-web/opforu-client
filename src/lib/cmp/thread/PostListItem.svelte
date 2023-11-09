<script>
	import { page } from '$app/stores';

	import Identity from '../global/Identity.svelte';
	import ThreadAssets from '../assets/ThreadAssets.svelte';

	/** @type {Post} */
	export let post;
</script>

<article
	id="t-{$page.params.thread}-{post.post_number}"
	class="relative border rounded-lg border-zinc-700 shadow-sm shadow-black/20"
>
	<!-- post header -->
	<div class="bg-zinc-900/50 py-2 px-4 rounded-t-lg flex justify-between">
		<span class="inline-flex items-center gap-2">
			<Identity identity={post.creator} />
		</span>

		<span class="h-6 font-mono text-center text-sm font-bold rounded px-1.5 bg-blue-500/50 inline-flex items-center">
			{post.post_number}
		</span>
	</div>

	<!-- post body -->
	<div class="py-2 px-4 text-zinc-200 bg-zinc-700/20 flow-root">
		{#if post?.assets?.length > 0}
			<div class="float-left max-w-[32%] w-full bg-black/20 p-2 rounded-md mr-4">
				<ThreadAssets assets={post.assets} />
			</div>
		{/if}
		{@html post.body}
	</div>

	<!-- post footer -->
	<div class="py-2 px-4 bg-zinc-900/50 rounded-b-lg">
		<p>{post.created_at}</p>
	</div>
</article>
