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
		console.log('post link', event.detail);
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

		let resourceType = event.detail?.resource;
		let resourceId = event.detail?.id;
		let item = event.detail?.item;

		if (!resourceType || !resourceId || !item) return;

		let hasItem = embedded.filter((p) => p.id === resourceId);

		if (hasItem.length === 0) {
			embedded = [...embedded, { ...event.detail }];
		} else {
			embedded = embedded.filter((p) => p.id !== resourceId);
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

	<!-- these need max sizes or an overflow can occur because of a flex bug, it's going to be annoying and a lot of work -->
	<div class="overflow-hidden">
		{#each embedded as wrapper ('embedded' + '-' + depth + '-' + wrapper?.resource === 'thread' ? wrapper.item?.thread : wrapper.item?.post_number)}
			<svelte:self
				depth={depth + 1}
				elementId="embedded-{depth}-{wrapper?.resource === 'thread' ? wrapper.item?.thread : wrapper.item?.post_number}"
				creator={wrapper?.item?.creator}
				postNumber={wrapper?.item?.post_number}
				assets={wrapper?.item?.assets}
				content={wrapper?.item?.body}
				createdAt={wrapper?.item?.created_at}
				updatedAt={wrapper?.item?.updated_at}
			>
				<div slot="header">
					<PostHeader creator={wrapper?.item?.creator}>
						<div class="tag-badge px-2" slot="left">
							{wrapper?.resource}
						</div>

						<div class="overflow-hidden flex-1" slot="center">
							{#if wrapper?.resource === 'thread'}
								<h4 class="text-lg text-limit">
									{wrapper?.item?.title} dklasjkldj aslkdjalk sdjlkas dlkaskld askdj alkdjlk asjdkl asjdklas sjdklaj dslkajskdl
									jaslkd jalksdj akldj klasjdlk asjdkl ajslkdja kldjaslk dklajdskl jdl
								</h4>
							{/if}
						</div>
					</PostHeader>
				</div>
			</svelte:self>
		{:else}
			<span />
		{/each}
	</div>

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
