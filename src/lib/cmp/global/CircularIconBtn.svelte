<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	/** @type {string} */ let css = '';
	/** @type {string} */ export { css as class };

	/** @type {keyof typeof EButtonType} */ export let buttonType = 'button';
</script>

<button
	type={buttonType}
	on:click={() => dispatch('click')}
	class="{css} group outline-none relative text-attention-damp pressure-press"
>
	<slot />
	<span class="group-hover:bg-zinc-500 group-focus-visible:outline absolute-center" />
</button>

<style lang="postcss">
	button > span {
		@apply bg-transparent outline-1 opacity-20 h-8 w-8 rounded-full;
	}
</style>
