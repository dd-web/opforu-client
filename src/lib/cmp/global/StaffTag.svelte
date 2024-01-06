<script>
	/** @type {Account?=} */ export let account;
</script>

{#if account}
	<span
		title="site {account.role}"
		class="relative mx-2 not-italic text-blue-50 bg-surface pr-2 rounded-md inline-flex items-center gap-2"
	>
		<span class="{account.role} uppercase rounded-md text-xs py-0.5 px-1 font-bold">
			{account.role[0]}{account.role[1]}
		</span>
		<span class="capitalize font-mono">
			{account.username}
		</span>
	</span>
{/if}

<style lang="postcss">
	.admin {
		@apply bg-red-600;
	}

	.mod {
		@apply bg-purple-600;
	}
</style>
