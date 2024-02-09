<script>
	import Post from '$lib/cmp/post/Post.svelte';
	import PostHeader from '$lib/cmp/post/partials/PostHeader.svelte';

	/** @type {IBoard} */ export let board;
	/** @type {IThread[]}*/ export let threads;
</script>

<section class="mt-8 mb-4 flex flex-col gap-4">
	{#each threads as thread (thread._id)}
		<Post
			elementId="board-{board.short}-{thread.slug}"
			assets={thread.assets}
			content={thread.body}
			creator={thread.creator}
			tagList={thread.tags}
			createdAt={thread.created_at}
			updatedAt={thread.updated_at}
		>
			<div slot="header">
				<PostHeader creator={thread.creator}>
					<div slot="center" class="mr-auto">
						<h3 title={thread.title} class="w-full text-title text-limit text-attention link">
							<a class="outline-none" href="/boards/{board.short}/{thread.slug}">{thread.title}</a>
						</h3>
					</div>

					<div slot="right" class="text-limit">
						<span class="text-sm text-zinc-500">
							<span class="italic text-zinc-400">{thread.post_count}</span>
							Posts
						</span>
						<span class="text-zinc-500">|</span>
						<span class="text-sm text-zinc-500">
							<span class="italic text-zinc-400">{thread.mods.length}</span>
							Mod{thread.mods.length > 1 ? 's' : ''}
						</span>
					</div>
				</PostHeader>
			</div>
		</Post>
	{:else}
		<div>No threads found</div>
	{/each}
</section>

<style lang="postcss">
	h3 {
		@apply max-w-4xl;
	}
</style>
