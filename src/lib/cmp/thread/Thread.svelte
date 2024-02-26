<script>
	import Post from '$lib/cmp/post/Post.svelte';

	/** @type {IThread} */ export let thread;

	/** @type {IFocusedIdentity?} */ let focusedIdentity = null;

	/**
	 * Updates the highlighted alias to provided and resolves their post count
	 * @param {CustomEvent} event
	 */
	const handleAliasFocus = (event) => {
		if (!event || !event.detail || !event.detail.name) return;

		if (focusedIdentity?.identity?.name === event.detail.name) {
			focusedIdentity = null;
			return;
		}

		focusedIdentity = {
			identity: event.detail,
			post_count: (thread?.posts?.filter((p) => p?.creator?.name === event?.detail?.name)).length
		};
	};
</script>

<section class="mt-8 mb-4 flex flex-col gap-4">
	<Post
		elementId="thread-{thread.slug}-content"
		creator={thread?.creator}
		assets={thread?.assets}
		content={thread?.body}
		tagList={thread?.tags}
		createdAt={thread?.created_at}
		updatedAt={thread?.updated_at}
	/>

	{#each thread?.posts as post (post.post_number)}
		<Post
			on:alias-click={handleAliasFocus}
			{focusedIdentity}
			elementId="post-{thread.slug}-{post.post_number}"
			creator={post?.creator}
			postNumber={post?.post_number}
			assets={post?.assets}
			content={post?.body}
			createdAt={post?.created_at}
			updatedAt={post?.updated_at}
		/>
	{/each}
</section>
