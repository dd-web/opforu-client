<script>
	/** @type {number} */
	export let value = 0;
	/** @type {number|string} */
	export let key = 'key';
</script>

<span class="px-2 py-0.5 text-sm ghost font-bold rounded-sm">
	{value}
	<span class="italic text-white/80 font-normal capitalize">{key}{value > 1 ? 's' : ''}</span>
</span>
