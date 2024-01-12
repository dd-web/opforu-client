<script>
	import { clickoutside } from '$lib/actions/clickoutside';

	/** @type {boolean} */ export let visible = true;
	/** @type {() => void} */ export let handleClickOutside = () => {
		visible = false;
	};
</script>

<div id="modal">
	<div use:clickoutside on:clickoutside={handleClickOutside}>
		<slot />
	</div>
</div>

<style lang="postcss">
	#modal {
		@apply fixed z-50 top-0 left-0 w-full h-full bg-black/50 flex flex-col justify-center items-center;
	}

	#modal > div {
		@apply bg-zinc-900 p-4 rounded-md;
	}
</style>
