<script>
	export let /** @type {Account|undefined|null} */ account;
	export let /** @type {boolean} */ anonymous = false;
</script>

{#if account}
	<span class="tag-badge inline-flex flex-row gap-1 px-2 group hover:border-zinc-500">
		<span class="text-purple-700 font-bold group-hover:text-purple-500"> Mod</span>
		<span class="text-zinc-400 group-hover:text-blue-200">{anonymous ? 'Anonymous' : account.username}</span>
	</span>
{/if}
