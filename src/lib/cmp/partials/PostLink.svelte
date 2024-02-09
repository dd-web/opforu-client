<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	/** @type {IPostLinkData} */ export let postLinkData;

	/** @type {IPost?} */ let post = null;
</script>

<button type="button" on:click={() => dispatch('post-link', postLinkData)}>
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
		@apply px-2 py-1 bg-blue-200 text-xl font-bold text-white;
	}
</style>
