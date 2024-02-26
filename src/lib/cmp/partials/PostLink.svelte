<script>
	import { postStore } from '$lib/stores/posts';
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	/** @type {IPostLinkData} */ export let postLinkData;

	/** @type {IPost?} */ let post = null;
	/** @type {keyof typeof EPostLookupResult} */ let status = 'init';

	let localID = String(postLinkData.board + postLinkData.thread + postLinkData.post_number);

	$: hoverName = `Post ${
		status === 'processing'
			? 'being retreived'
			: status === 'error'
			? 'not found'
			: status === 'success'
			? 'found'
			: 'unretrievable'
	}`;

	/**
	 * Lookup a single post
	 * @param {string} board - board short name
	 * @param {string} thread - thread slug (in url)
	 * @param {number} postnum - post number
	 */
	const lookupPost = async (board, thread, postnum) => {
		if (status !== 'init') return;
		status = 'processing';

		let p = await postStore.resolvePost(board, thread, postnum);
		if (typeof p === 'string') {
			status = 'error';
		} else if (p && typeof p?.post_number === 'number') {
			status = 'success';
			post = p;
		}
	};

	const handleClick = () => {
		if (!post || post === null) return;
		dispatch('post-link', {
			post: post,
			id: localID
		});
	};

	onMount(() => {
		let cached = postStore.getPost(postLinkData.board, postLinkData.thread, postLinkData.post_number);
		if (cached) {
			status = typeof cached === 'string' ? 'error' : 'success';
			post = typeof cached === 'string' ? null : cached;
		}
	});
</script>

<button
	on:mouseenter={() => lookupPost(postLinkData.board, postLinkData.thread, postLinkData.post_number)}
	on:mouseover={() => lookupPost(postLinkData.board, postLinkData.thread, postLinkData.post_number)}
	on:focus={() => lookupPost(postLinkData.board, postLinkData.thread, postLinkData.post_number)}
	title={hoverName}
	type="button"
	class="post-link {status}"
	on:click={handleClick}
>
	{#if postLinkData.link_type === 'post-internal-thread'}
		{postLinkData.post_number}
	{:else if postLinkData.link_type === 'thread-internal-board'}
		{postLinkData.thread}
	{:else if postLinkData.link_type === 'post-internal-board'}
		{postLinkData.thread}/{postLinkData.post_number}
	{:else if postLinkData.link_type === 'thread-external-board'}
		{postLinkData.board}/{postLinkData.thread}
	{:else if postLinkData.link_type === 'post-external-board'}
		{postLinkData.board}/{postLinkData.thread}/{postLinkData.post_number}
	{/if}
</button>

<style lang="postcss">
	button {
		@apply px-2;
	}
</style>
