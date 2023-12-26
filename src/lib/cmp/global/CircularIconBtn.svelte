<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<button
	on:click={() => dispatch('click')}
	class="group outline-none relative fill-zinc-400 hover:fill-zinc-200 active:scale-95 active:opacity-50 transition-all duration-150"
>
	<slot />
	<span
		class="group-hover:bg-zinc-500 bg-transparent group-focus-visible:outline outline-1 absolute opacity-20 h-8 w-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
	/>
</button>
