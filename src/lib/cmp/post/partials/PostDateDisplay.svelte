<script>
	import DateFormat from '$lib/cmp/post/partials/DateFormat.svelte';

	/** @type {string?=}*/ export let createdAt;
	/** @type {string?=}*/ export let updatedAt;
	/** @type {string?=} */ export let deletedAt = undefined;
</script>

<div class="flex gap-2 items-center">
	<DateFormat context="created" date={createdAt} />
	<span class="text-zinc-500">|</span>
	{#if !!deletedAt && typeof deletedAt === 'string'}
		<DateFormat context="deleted" date={deletedAt} />
	{:else}
		<DateFormat context="updated" date={updatedAt} />
	{/if}
</div>
