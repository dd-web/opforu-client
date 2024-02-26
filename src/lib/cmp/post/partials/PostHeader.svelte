<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import Identity from '$lib/cmp/identity/Identity.svelte';
	import CircularIconBtn from '$lib/cmp/global/CircularIconBtn.svelte';
	import Hamburger from '$lib/icons/Hamburger.svelte';
	import PostNumber from '$lib/cmp/post/partials/PostNumber.svelte';

	/** @type {IIdentity} */ export let creator;
	/** @type {number} */ export let postNumber = 0;
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
			<Identity {creator} on:click={() => dispatch('alias-click', creator)} />
			<PostNumber num={postNumber} />
		</div>
	</slot>
</header>
