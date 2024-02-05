<script>
	import Post from '$lib/cmp/post/Post.svelte';

	/** @type {Thread} */ export let thread;
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
