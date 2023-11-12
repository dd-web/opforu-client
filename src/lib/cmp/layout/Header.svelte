<script>
	import Caret from '$lib/icons/Caret.svelte';
	import AccountDropdown from './header/AccountDropdown.svelte';
	import { alerts } from '../../../stores/alerts';

	/** @type {Account|null|undefined} */
	export let account;

	let dropdownVisible = false;

	const testAdd = () => {
		alerts.newAlert('this is a test alert', 'info');
	};
</script>

<header class="h-full w-full flex justify-between items-center px-4 border-b border-zinc-800 shadow-lg shadow-black/20">
	<div>
		<a href="/">
			<span>Logo</span>
		</a>
		<button on:click={testAdd}>alert</button>
	</div>

	{#if account && account?.username}
		<div class="flex items-center gap-1 text-blue-200 relative">
			<span class="capitalize">{account.username}</span>
			<button on:click={() => (dropdownVisible = true)} class="fill-zinc-500 hover:fill-blue-100 rotate-180 p-1"
				><Caret /></button
			>
			{#if dropdownVisible}
				<AccountDropdown {account} on:close={() => (dropdownVisible = false)} />
			{/if}
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
