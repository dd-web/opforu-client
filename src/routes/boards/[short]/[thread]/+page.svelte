<script>
	import { browser } from '$app/environment';

	import PostListItem from '$lib/cmp/thread/PostListItem.svelte';

	/** @type {{thread: Thread}} */
	export let data;

	$: if (browser) console.log('data (thread)', data);
</script>

<section>
	<!-- thread stuff -->

	<!-- posts -->
	{#each data.thread.posts as post (post.post_number)}
		<PostListItem {post} />
	{:else}
		<p>No Posts Found</p>
	{/each}
</section>
