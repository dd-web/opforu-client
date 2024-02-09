<script>
	import StaffTag from '$lib/cmp/identity/StaffTag.svelte';

	/** @type {IAccount} */ export let author;
	/** @type {IAccount[]} */ export let co_authors;
</script>

<div class="px-4 inline-flex gap-2 py-2">
	<StaffTag account={author} />

	{#if co_authors instanceof Array && co_authors?.length > 0}
		<span class="italic font-thin text-zinc-700">|</span>
	{/if}

	{#each co_authors as coauthor, ix (coauthor.username + `-${ix}`)}
		<StaffTag account={coauthor} />
	{/each}
</div>
