<script>
	import { onMount, createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { page } from '$app/stores';
	import { resolvePostLinkEvent, resolvePostLinkURL } from '$lib/utils/resolvers';
	import { alerts } from '$lib/stores/alerts';
	import { goto } from '$app/navigation';

	import PostHeader from './partials/PostHeader.svelte';
	import PostBody from './partials/PostBody.svelte';
	import PostFooter from './partials/PostFooter.svelte';
	import PostLink from '../partials/PostLink.svelte';

	/** DOM details */
	/** @type {string} */ export let elementId;
	/** @type {boolean} */ export let showPostCount = false;

	/** post fields */
	/** @type {IIdentity} */ export let creator;
	/** @type {IAsset[]} */ export let assets;
	/** @type {string} */ export let content;
	/** @type {string?=} */ export let createdAt;
	/** @type {string?=} */ export let updatedAt;
	/** @type {string[]} */ export let tagList = [];
	/** @type {number} */ export let postNumber = 0;

	/** thread info */
	/** @type {number} */ export let creatorPostCount = 1;
	/** @type {IFocusedIdentity?} */ export let focusedIdentity = null;

	/** recursion info */
	/** @type {number} */ export let depth = 0;
	/** @type {ICEPostLink[]} */ let embedded = [];

	/** local state */
	/** @type {boolean} */ let gotEmbedWarning = false;
	/** @type {HTMLElement}*/ let element;

	$: hrSplitCss = embedded.length > 0 ? 'block' : 'hidden';
	$: isFocusedAlias = focusedIdentity?.identity?.name === creator?.name;

	/**
	 * Handles post link events, add/removal from embedded list and redirects
	 * @param {CustomEvent<ICEPostLink>} event
	 */
	function handlePostLinkEvent(event) {
		if (depth >= 8) {
			if (gotEmbedWarning === false) {
				alerts.newAlert('Max embedded depth. Next will redirect.', 'info');
				gotEmbedWarning = true;
				return;
			} else {
				goto(resolvePostLinkURL(event.detail.data));
				return;
			}
		}

		let { id, post } = event.detail;
		if (!id || !post || typeof post?.post_number !== 'number') return;

		let hasItem = embedded.filter((p) => p.id === id);

		if (hasItem.length === 0) {
			embedded = [...embedded, { ...event.detail }];
		} else {
			embedded = embedded.filter((p) => p.id !== id);
		}
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

			let btnEl = button.querySelector('button');
			if (btnEl) {
				button.replaceWith(btnEl);
			}
		});
	});
</script>

<article
	bind:this={element}
	id={elementId}
	class="bg-zinc-900 rounded-md border border-transparent"
	class:embedded={depth > 0}
	class:highlight={isFocusedAlias}
>
	<slot name="header">
		<PostHeader {creator} {postNumber} on:alias-click>
			<div class="ml-auto" slot="center">
				{#if showPostCount}
					<span
						class="tag-badge px-2 -mr-2"
						title="{creatorPostCount} post{creatorPostCount > 1 ? 's' : ''} by this user"
					>
						{creatorPostCount} Post{creatorPostCount > 1 ? 's' : ''}
					</span>
				{/if}
			</div>
		</PostHeader>
	</slot>

	<slot name="body">
		<PostBody {assets} {content} />
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

	.highlight {
		@apply bg-blue-100/10 border border-blue-200/20;
	}
</style>
