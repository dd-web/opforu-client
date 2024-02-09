<script>
	import StaffTag from '$lib/cmp/identity/StaffTag.svelte';

	/** @type {IAccount} */ export let account;
</script>

{#if account?.role === 'admin' || account?.role === 'mod'}
	<StaffTag {account} />
{:else}
	<span class="bg-zinc-800 px-3 pb-1 rounded-dm border-zinc-700 border select-none">{account?.username}</span>
{/if}
