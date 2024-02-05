<script>
	import IdentityComponent from '$lib/cmp/global/Identity.svelte';
	import CircularIconBtn from '$lib/cmp/global/CircularIconBtn.svelte';
	import Hamburger from '$lib/icons/Hamburger.svelte';
	import PostNumber from '$lib/cmp/thread/PostNumber.svelte';

	/** @type {Identity} */ export let identity;
	/** @type {number}*/ export let postNumber = 0;
</script>

<header class="flex justify-between items-center gap-4 p-2 h-12">
	<slot name="left">
		<div class="-mb-1 pl-2">
			<CircularIconBtn>
				<Hamburger />
			</CircularIconBtn>
		</div>
	</slot>

	<slot name="center" />

	<slot name="right">
		<div class="flex gap-2 items-center">
			<IdentityComponent {identity} />
			{#if typeof postNumber === 'number' && postNumber !== 0}
				<PostNumber {postNumber} />
			{/if}
		</div>
	</slot>
</header>
