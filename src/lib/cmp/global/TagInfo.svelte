<script>
	/** @type {number} */
	export let value = 0;
	/** @type {number|string} */
	export let key = 'key';
	/** @type {boolean} */
	export let plurize = true;
</script>

<span
	class="h-6 font-mono text-center text-sm px-1.5 ghost font-bold rounded border border-zinc-700 inline-flex items-center gap-1"
>
	{value}
	<span class="italic text-white/80 font-normal capitalize">{key}{plurize ? (value > 1 ? 's' : '') : ''}</span>
</span>
