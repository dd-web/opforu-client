<script>
	/** @type {Account?=} */ export let account;
	/** @type {boolean} */ export let anonymous = false;
</script>

{#if account}
	<span class="tag-badge inline-flex flex-row gap-1 px-2 group hover:border-zinc-500">
		<span class="text-red-700 font-bold group-hover:text-red-500"> Admin</span>
		<span class="text-zinc-400 group-hover:text-blue-200">{anonymous ? 'Anonymous' : account.username}</span>
	</span>
{/if}
