<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	/** @type {IIdentity} */ export let creator;
</script>

{#if creator}
	<button
		class="tag-badge {['creator', 'mod'].includes(creator.role)
			? ''
			: creator.style} inline-flex flex-row gap-1 p-2 group hover:ring-opacity-40 outline-none focus-visible:underline underline-offset-4"
		class:creator={creator.role === 'creator'}
		class:mod={creator.role === 'mod'}
		on:click={() => dispatch('click')}
	>
		{#if creator.role === 'creator'}
			<span class="font-bold text-red-300 group-hover:text-red-400"> OP </span>
		{:else if creator.role === 'mod'}
			<span class="font-bold text-purple-300 group-hover:text-purple-400"> MOD </span>
		{/if}

		<span class="text-opacity-80 group-hover:text-opacity-100 text-inherit">{creator.name}</span>
	</button>
{/if}

<style lang="postcss">
	/* creator & mod roles */
	.creator {
		@apply border-none !ring-red-600 !ring-opacity-20 !bg-red-900 bg-opacity-10;
		@apply hover:!ring-opacity-40 hover:!bg-opacity-20;
	}

	.mod {
		@apply border-none !ring-purple-600 !ring-opacity-20 !bg-purple-900 bg-opacity-10;
		@apply hover:!ring-opacity-40 hover:!bg-opacity-20;
	}

	/* filled */
	.variant-filled-primary {
		@apply bg-primary !text-on-primary;
	}
	.variant-filled-secondary {
		@apply bg-secondary !text-on-secondary;
	}
	.variant-filled-tertiary {
		@apply bg-tertiary !text-on-tertiary;
	}
	.variant-filled-success {
		@apply bg-success !text-on-success;
	}
	.variant-filled-warning {
		@apply bg-warning !text-on-warning;
	}
	.variant-filled-error {
		@apply bg-error !text-on-error;
	}
	.variant-filled-surface {
		@apply bg-surface !text-on-surface;
	}

	/* ghost */
	.variant-ghost-primary {
		@apply bg-primary/30 text-white;
		@apply ring-primary ring-1;
	}
	.variant-ghost-secondary {
		@apply bg-secondary/30 text-on-secondary;
		@apply ring-secondary ring-1;
	}
	.variant-ghost-tertiary {
		@apply bg-tertiary/30 text-white;
		@apply ring-tertiary ring-1;
	}
	.variant-ghost-success {
		@apply bg-success/30 text-white;
		@apply ring-success ring-1;
	}
	.variant-ghost-warning {
		@apply bg-warning/30 text-white;
		@apply ring-warning ring-1;
	}
	.variant-ghost-error {
		@apply bg-error/30 text-white;
		@apply ring-error ring-1;
	}
	.variant-ghost-surface {
		@apply bg-surface/30 text-white;
		@apply ring-surface ring-1;
	}

	/* soft */
	.variant-soft-primary {
		@apply bg-primary/40 text-white;
	}
	.variant-soft-secondary {
		@apply bg-secondary/40 text-on-secondary;
	}
	.variant-soft-tertiary {
		@apply bg-tertiary/40 text-white;
	}
	.variant-soft-success {
		@apply bg-success/40 text-white;
	}
	.variant-soft-warning {
		@apply bg-warning/40 text-white;
	}
	.variant-soft-error {
		@apply bg-error/40 text-white;
	}
	.variant-soft-surface {
		@apply bg-surface/40 text-white;
	}

	/* glass */
	.variant-glass-primary {
		@apply bg-primary/20 text-white backdrop-blur-sm;
	}
	.variant-glass-secondary {
		@apply bg-secondary/50 text-on-secondary backdrop-blur-sm;
	}
	.variant-glass-tertiary {
		@apply bg-tertiary/20 text-white backdrop-blur-sm;
	}
	.variant-glass-success {
		@apply bg-success/20 text-white backdrop-blur-sm;
	}
	.variant-glass-warning {
		@apply bg-warning/20 text-white backdrop-blur-sm;
	}
	.variant-glass-error {
		@apply bg-error/20 text-white backdrop-blur-sm;
	}
	.variant-glass-surface {
		@apply bg-surface/50 text-white backdrop-blur-sm;
	}
</style>
