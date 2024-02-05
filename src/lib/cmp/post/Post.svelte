<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { resolvePostLinkEvent } from '$lib/utils/resolvers';

	import PostHeader from './PostHeader.svelte';
	import PostBody from './PostBody.svelte';
	import PostFooter from './PostFooter.svelte';
	import PostLink from '../partials/PostLink.svelte';

	/** @type {string} */ export let elementId;
	/** @type {Identity} */ export let creator;
	/** @type {Asset[]} */ export let assets;
	/** @type {string} */ export let content;
	/** @type {Date|string} */ export let createdAt;
	/** @type {Date|string} */ export let updatedAt;
	/** @type {string[]} */ export let tagList = [];
	/** @type {number} */ export let postNumber = 0;

	/** @type {number} */ export let depth = 0;
	/** @type {Post[]} */ let embedded = [];
	/** @type {HTMLElement}*/ let element;

	/**
	 * @TODO should get the post/thread and add it to the array for displaying
	 * Handler for post link events
	 * @param {CustomEvent} event
	 */
	const handlePostLinkEvent = (event) => {
		console.log('External post link:', event.detail);
	};

	onMount(() => {
		const linkElements = element.querySelectorAll('button.post-link');
		[...linkElements].forEach((btnEl) => {
			const postLinkParams = resolvePostLinkEvent(btnEl, $page.params.short, $page.params.thread);

			let cmp = new PostLink({
				target: btnEl,
				props: {
					postLinkData: postLinkParams
				}
			});

			cmp.$on('post-link', handlePostLinkEvent);
			cmp.$inject_state;
		});
	});
</script>

<!-- post-{thread.slug}-{post.post_number} -->
<article bind:this={element} id={elementId} class="bg-zinc-900 rounded-md" class:embedded={depth > 0}>
	<slot name="header">
		<PostHeader identity={creator} {postNumber} />
	</slot>

	<slot name="body">
		<PostBody {assets} {content} />
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

	.base-split {
		@apply hidden;
	}
</style>
