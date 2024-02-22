<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { resolvePostLinkEvent } from '$lib/utils/resolvers';
	import { alerts } from '$lib/stores/alerts';
	import { goto } from '$app/navigation';

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
	/** @type {{ id: string, post: IPostLookupData}[]} */ let embedded = [];
	/** @type {HTMLElement}*/ let element;

	let gotEmbedWarning = false;

	$: html = content
		.split('\n')
		.map((line) => `<p>${line}</p>`)
		.join('');

	$: hrSplitCss = embedded.length > 0 ? 'block' : 'hidden';

	/**
	 * @TODO should get the post/thread and add it to the array for displaying
	 * Handler for post link events
	 * @param {CustomEvent} event
	 */
	function handlePostLinkEvent(event) {
		if (depth >= 8) {
			if (gotEmbedWarning === false) {
				alerts.newAlert('Max embedded depth. Next will redirect.', 'info');
				gotEmbedWarning = true;
				return;
			} else {
				switch (event?.detail?.linktype) {
					case 'post-internal-thread':
						goto(
							`/boards/${$page.params.short}/${$page.params.thread}#post-${$page.params.thread}-${event?.detail?.post?.post_number}`
						);
						break;
					case 'thread-internal-board':
						goto(`/boards/${$page.params.short}/${event?.detail?.post?.thread}`);
						break;
					case 'post-internal-board':
						goto(
							`/boards/${$page.params.short}/${event?.detail?.post?.thread}#post-${event?.detail?.post?.thread}-${event?.detail?.post?.post_number}`
						);
						break;
					case 'thread-external-board':
						goto(`/boards/${event?.detail?.post?.board}/${event?.detail?.post?.thread}`);
						break;
					case 'post-external-board':
						goto(
							`/boards/${event?.detail?.post?.board}/${event?.detail?.post?.thread}#post-${event?.detail?.post?.thread}-${event?.detail?.post?.post_number}`
						);
						break;
				}
				return;
			}
		}

		let { id, post } = event.detail;
		if (!id || !post || typeof post?.post_number !== 'number') return;

		let hasItem = embedded.filter((p) => p.id === id);

		if (hasItem.length === 0) {
			embedded = [...embedded, { id, post: event.detail.post }];
		} else {
			embedded = embedded.filter((p) => p.id !== id);
		}

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

	<hr class="hr-split clear-left {hrSplitCss}" />

	{#each embedded as wrapper ('embedded' + '-' + depth + '-' + wrapper.post?.post_number)}
		<svelte:self
			depth={depth + 1}
			elementId="embedded-{depth}-{wrapper?.post?.post_number}"
			creator={wrapper?.post?.creator}
			postNumber={wrapper?.post?.post_number}
			assets={wrapper?.post?.assets}
			content={wrapper?.post?.body}
			createdAt={wrapper?.post?.created_at}
			updatedAt={wrapper?.post?.updated_at}
		/>
	{:else}
		<span />
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
