<script>
	/** @type {string?=}*/ export let date;
	/** @type {keyof typeof EModifiedContext} */ export let context = 'created';
</script>

{#if !!date && typeof date === 'string'}
	<span class="text-sm text-zinc-500 capitalize" title={new Date(date ?? '').toLocaleDateString()}>
		{context}
		<span class="italic text-zinc-400">
			{new Date(date ?? '').toLocaleTimeString()}
		</span>
	</span>
{/if}
