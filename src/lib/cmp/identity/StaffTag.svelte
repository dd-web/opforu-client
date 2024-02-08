<script>
	/** @type {Account} */ export let account;

	// text transforms having no effect so doing this instead
	$: name = account?.username[0].toUpperCase() + account?.username?.slice(1);
</script>

<span
	class:role-admin={account.role === 'admin'}
	class:role-mod={account.role === 'mod'}
	title={account.role}
	class="relative bg-zinc-800 px-3 pb-1 rounded-sm border-zinc-700 border"
>
	<span class="absolute -top-2.5 uppercase text-xs italic left-1/2 -translate-x-1/2 font-semibold opacity-75"
		>{account.role}</span
	>

	<span class="font-semibold">{name}</span>
</span>

<style lang="postcss">
	span.role-admin :first-child {
		@apply text-red-400;
	}

	span.role-admin:hover :last-child {
		@apply text-red-200;
	}

	span.role-mod :first-child {
		@apply text-purple-400;
	}

	span.role-mod:hover :last-child {
		@apply text-purple-200;
	}
</style>
