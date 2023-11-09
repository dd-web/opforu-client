<script>
	/** @type {Identity} */
	export let identity;
</script>

{#if ['creator', 'mod'].includes(identity.role)}
	<span
		title="thread {identity.role}"
		class="{identity.role} h-6 font-mono text-center text-sm font-bold uppercase rounded px-1.5 border border-zinc-700 inline-flex items-center"
	>
		{identity.role === 'creator' ? 'OP' : 'MOD'}
	</span>
{/if}

<span
	class="{identity.style} h-6 font-mono px-1.5 rounded font-bold text-sm uppercase tracking-widest inline-flex items-center"
	>{identity.name}</span
>

<style lang="postcss">
	/* creator & mod roles */
	.creator,
	.mod {
		@apply bg-zinc-800/50 text-white;
	}

	.creator {
		@apply border-primary;
	}

	.mod {
		@apply border-tertiary;
	}

	/* filled */
	.variant-filled-primary {
		@apply bg-primary text-on-primary;
	}
	.variant-filled-secondary {
		@apply bg-secondary text-on-secondary;
	}
	.variant-filled-tertiary {
		@apply bg-tertiary text-white;
	}
	.variant-filled-success {
		@apply bg-success text-on-success;
	}
	.variant-filled-warning {
		@apply bg-warning text-on-warning;
	}
	.variant-filled-error {
		@apply bg-error text-on-error;
	}
	.variant-filled-surface {
		@apply bg-surface text-on-surface;
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
