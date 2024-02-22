<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	/** @type {IPostLinkData} */ export let postLinkData;

	/** @type {IPost?} */ let post = null;
	/** @type {keyof typeof EPostLookupResult} */ let status = 'init';

	let localID = String(postLinkData.thread + postLinkData.post_number);

	$: hoverName = `Post ${
		status === 'processing'
			? 'being retreived'
			: status === 'error'
			? 'not found'
			: status === 'success'
			? 'found'
			: 'delayed'
	}`;

	/**
	 * Lookup a single post
	 * @param {string} thread - thread slug (in url)
	 * @param {number} post_num - post number
	 */
	const lookupPost = async (thread, post_num) => {
		if (status !== 'init') return;
		status = 'processing';

		const qs = new URLSearchParams();
		qs.append('thread', thread);
		qs.append('post', String(post_num));

		const data = await fetch(`/api/post?${qs.toString()}`)
			.then((resp) => {
				status = 'success';
				return resp.json();
			})
			.catch(() => {
				status = 'error';
			})
			.finally((/** @type {IPostLookupData?} */ resdata) => {
				post = resdata;
			});

		post = data;
	};

	const handleClick = () => {
		if (!post || post === null) return;
		dispatch('post-link', {
			post: post,
			id: localID,
			linktype: postLinkData.link_type
		});
	};

	const handleLookupPost = () => {
		if (status === 'init') {
			lookupPost(postLinkData.thread, postLinkData.post_number);
		}
	};
</script>

<button
	on:mouseenter={handleLookupPost}
	on:mouseover={handleLookupPost}
	on:focus={handleLookupPost}
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
