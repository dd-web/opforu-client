<script>
	import Caret from '$lib/icons/Caret.svelte';

	/** @type {Account|null|undefined} */
	export let account;
</script>

<header class="h-full w-full flex justify-between items-center px-4">
	<span>Logo</span>

	{#if account && account?.username}
		<div class="flex items-center gap-1 text-blue-200">
			<span class="capitalize">{account.username}</span>
			<button class="fill-zinc-500 hover:fill-blue-100 rotate-180 p-1"><Caret /></button>
		</div>
	{:else}
		<div>
			<a href="/login">login</a>
			<span>/</span>
			<a href="/register">sign up</a>
		</div>
	{/if}
</header>

<style lang="postcss">
	header {
		@apply w-full h-16 bg-surface/50;
	}

	a {
		@apply text-blue-100 hover:text-blue-300;
	}
</style>
