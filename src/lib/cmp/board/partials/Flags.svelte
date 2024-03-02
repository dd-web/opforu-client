<script>
	/** @type {IThread} */ export let thread;
</script>

{#if thread?.flags instanceof Array}
	<ul class="inline-flex gap-1 mx-1">
		{#if thread?.flags?.includes('media_required')}
			<li title="Images are required in replies">
				<span class="tag-badge">IMG</span>
			</li>
		{/if}

		{#if thread?.flags?.includes('nsfw')}
			<li title="Not safe for work">
				<span class="tag-badge">NSFW</span>
			</li>
		{/if}

		{#if thread?.flags?.includes('nsfl')}
			<li title="Not safe for life">
				<span class="tag-badge">NSFL</span>
			</li>
		{/if}
	</ul>
{/if}

<style lang="postcss">
	ul li span {
		@apply px-1;
	}
</style>
