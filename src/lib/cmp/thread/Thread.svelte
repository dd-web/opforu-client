<script>
	import Post from '$lib/cmp/post/Post.svelte';
	import { onMount } from 'svelte';

	/** @type {IThread} */ export let thread;

	/** @type {IFocusedIdentity?} */ let focusedIdentity = null;
	/** @type {{ [key: string]: number }} */ let postCountDict = {};

	/** initialize the post count dictionary */
	const initPostCountDict = () => {
		if (thread?.posts?.length > 0) {
			thread.posts.forEach((p) => {
				postCountDict[p.creator.name] =
					typeof postCountDict[p.creator.name] === 'number' ? postCountDict[p.creator.name] + 1 : 1;
			});
		}
	};

	/**
	 * Updates focused identity, or resets it if identity is already focused
	 * @param {CustomEvent} event
	 */
	const handleAliasFocus = (event) => {
		if (!event || !event.detail || !event.detail.name) return;

		focusedIdentity =
			focusedIdentity?.identity?.name === event.detail.name
				? null
				: {
						identity: event.detail,
						post_count: postCountDict[event.detail.name]
				  };
	};

	onMount(() => {
		initPostCountDict();
	});
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
			showPostCount={true}
			creatorPostCount={postCountDict[post.creator.name]}
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
