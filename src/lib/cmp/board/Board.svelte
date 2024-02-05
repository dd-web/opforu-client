<script>
	import Post from '$lib/cmp/post/Post.svelte';
	import PostHeader from '$lib/cmp/post/PostHeader.svelte';

	/** @type {Board} */ export let board;
	/** @type {Thread[]}*/ export let threads;
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
				<PostHeader identity={thread.creator}>
					<div slot="center" class="flex-grow">
						<h3 class="w-full text-title text-limit text-attention link">
							<a class="outline-none" href="/boards/{board.short}/{thread.slug}">{thread.title}</a>
						</h3>
					</div>

					<div slot="right">
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
				</PostHeader>
			</div>
		</Post>
	{:else}
		<div>No threads found</div>
	{/each}
</section>
