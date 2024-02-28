<script>
	import { postStore } from '$lib/stores/posts';
	import { threadStore } from '$lib/stores/threads';
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	/** @type {IPostLinkData} */ export let postLinkData;

	/** @type {keyof typeof EPostLinkResource} */ $: resource = postLinkData?.link_type[0] === 'p' ? 'post' : 'thread';

	/** @type {IPostStorePost?} */ let post = null;
	/** @type {IThreadStoreThread?} */ let thread = null;

	/** @type {keyof typeof EPostLookupResult} */ let status = 'init';

	let localID =
		postLinkData?.link_type[0] === 'p'
			? String(postLinkData.board + postLinkData.thread + postLinkData.post_number)
			: String(postLinkData.board + postLinkData.thread);

	$: hoverName = `Post ${
		status === 'processing'
			? 'being retreived'
			: status === 'error'
			? 'not found'
			: status === 'success'
			? 'found'
			: 'unretrievable'
	}`;

	/** Lookup a single post */
	const lookupPost = async () => {
		if (status !== 'init') return;
		status = 'processing';

		let p = await postStore.resolvePost(postLinkData.board, postLinkData.thread, postLinkData.post_number);
		if (typeof p === 'string') {
			status = 'error';
		} else if (p && typeof p?.post_number === 'number') {
			status = 'success';
			post = p;
		}
	};

	/** Lookup a single thread */
	const lookupThread = async () => {
		if (status !== 'init') return;
		status = 'processing';

		let t = await threadStore.resolveThread(postLinkData.board, postLinkData.thread);
		if (typeof t === 'string') {
			status = 'error';
		} else if (t && typeof t?.post_count === 'number') {
			status = 'success';
			thread = t;
		}
	};

	/** resolves lookup for determined resource referenced */
	const handleResolver = () => {
		if (typeof postLinkData?.link_type !== 'string') return;
		resource === 'post' ? lookupPost() : lookupThread();
	};

	/** Click handler for embedding */
	const handleClick = () => {
		if (resource === 'post' && post === null) return;
		if (resource === 'thread' && thread === null) return;
		dispatch('post-link', {
			id: localID,
			item: resource === 'post' ? post : thread,
			data: postLinkData,
			resource: resource
		});
	};

	onMount(() => {
		if (typeof postLinkData?.link_type !== 'string') return;
		let cached_post = null,
			cached_thread = null;

		if (resource === 'post') {
			cached_post = postStore.getPost(postLinkData.board, postLinkData.thread, postLinkData.post_number);
		} else {
			cached_thread = threadStore.getThread(postLinkData.board, postLinkData.thread);
		}

		if (typeof cached_post === 'string' || typeof cached_thread === 'string') {
			status = 'error';
		}

		post = typeof cached_post === 'string' ? null : cached_post;
		thread = typeof cached_thread === 'string' ? null : cached_thread;
	});
</script>

<button
	on:mouseenter={handleResolver}
	on:mouseover={handleResolver}
	on:focus={handleResolver}
	title={hoverName}
	type="button"
	class="post-link inline-flex flex-row {status}"
	on:click={handleClick}
>
	{#if postLinkData.link_type === 'post-internal-thread'}
		{postLinkData.post_number}
	{:else if postLinkData.link_type === 'thread-internal-board'}
		<span class="thread">
			{postLinkData.thread}
		</span>
	{:else if postLinkData.link_type === 'post-internal-board'}
		<span class="thread">
			{postLinkData.thread}
		</span>
		<span class="separate">/</span>
		<span class="post">
			{postLinkData.post_number}
		</span>
	{:else if postLinkData.link_type === 'thread-external-board'}
		<span class="board">
			{postLinkData.board}
		</span>
		<span class="separate">/</span>
		<span class="thread">
			{postLinkData.thread}
		</span>
	{:else if postLinkData.link_type === 'post-external-board'}
		<span class="board">
			{postLinkData.board}
		</span>
		<span class="separate">/</span>
		<span class="thread">
			{postLinkData.thread}
		</span>
		<span class="separate">/</span>
		<span class="post">
			{postLinkData.post_number}
		</span>
	{/if}
</button>

<style lang="postcss">
	button {
		@apply px-2;
	}
</style>
