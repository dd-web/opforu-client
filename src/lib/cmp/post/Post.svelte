<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { resolvePostLinkEvent } from '$lib/utils/resolvers';

	import PostHeader from './partials/PostHeader.svelte';
	import PostBody from './partials/PostBody.svelte';
	import PostFooter from './partials/PostFooter.svelte';
	import PostLink from '../partials/PostLink.svelte';

	/** @type {string} */ export let elementId;
	/** @type {IIdentity} */ export let creator;
	/** @type {IAsset[]} */ export let assets;
	/** @type {string} */ export let content;
	/** @type {string?=} */ export let createdAt;
	/** @type {string?=} */ export let updatedAt;
	/** @type {string[]} */ export let tagList = [];
	/** @type {number} */ export let postNumber = 0;

	/** @type {number} */ export let depth = 0;
	/** @type {IPost[]} */ let embedded = [];
	/** @type {HTMLElement}*/ let element;

	$: html = content
		.split('\n')
		.map((line) => `<p>${line}</p>`)
		.join('');

	/**
	 * @TODO should get the post/thread and add it to the array for displaying
	 * Handler for post link events
	 * @param {CustomEvent} event
	 */
	function handlePostLinkEvent(event) {
		console.log('post link:', event.detail);
	}

	onMount(() => {
		const linkElements = element.querySelectorAll('button.post-link');
		[...linkElements].forEach((button) => {
			let cmp = new PostLink({
				target: button,
				props: {
					postLinkData: resolvePostLinkEvent(button, $page?.params?.short, $page?.params?.thread)
				}
			});

			cmp.$on('post-link', handlePostLinkEvent);
			cmp.$inject_state;

			button.replaceWith(button.querySelector('button') ?? new Node());
		});
	});
</script>

<!-- post-{thread.slug}-{post.post_number} -->
<article bind:this={element} id={elementId} class="bg-zinc-900 rounded-md" class:embedded={depth > 0}>
	<slot name="header">
		<PostHeader {creator} {postNumber} />
	</slot>

	<slot name="body">
		<PostBody {assets} content={html} />
	</slot>

	<hr class="hr-split hidden" class:block={embedded.length > 0} />

	{#each embedded as post ('embedded' + '-' + depth + '-' + post?.post_number)}
		<svelte:self
			depth={depth + 1}
			elementId="embedded-{depth}-{post?.post_number}"
			identity={post?.creator}
			assets={post?.assets}
			content={post?.body}
			createdAt={post?.created_at}
			updatedAt={post?.updated_at}
		/>
	{/each}

	<slot name="footer">
		<PostFooter {createdAt} {updatedAt} {tagList} />
	</slot>
</article>

<style lang="postcss">
	.embedded {
		@apply m-4;
	}
</style>
