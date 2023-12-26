<script>
	import { alerts } from '$lib/stores/alerts';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { quintOut, cubicOut } from 'svelte/easing';
</script>

{#each $alerts as notif, i (notif.id)}
	<div
		role="alertdialog"
		aria-labelledby="alert-title"
		aria-describedby="alert-desc"
		in:fade={{ delay: 75, duration: 600, easing: quintOut }}
		out:fade={{ delay: 0, duration: 800, easing: cubicOut }}
		animate:flip={{ delay: 0, duration: 600, easing: quintOut }}
		class="bg-zinc-900 shadow relative shadow-black/50 border-zinc-700 border rounded-md py-2 grid grid-rows-1 grid-cols-[2rem_1fr] justify-items-center"
	>
		<button on:click={() => alerts.removeAlert(notif.id)} class="absolute top-0 left-0 h-full w-full" />
		<div class="flex justify-center items-center select-none">
			<span class="fill-blue-200/20">
				{#if notif.type === 'info'}
					<span>I</span>
				{:else if notif.type === 'success'}
					<span>I</span>
				{:else if notif.type === 'warning'}
					<span>I</span>
				{:else if notif.type === 'error'}
					<span>I</span>
				{/if}
			</span>
			<span id="alert-title" class="hidden">{notif.type}</span>
		</div>
		<div role="document" class="text-center select-none px-2">
			<p id="alert-desc" class="capitalize text-sm">{notif.message}</p>
			<p class="text-xs text-blue-100/40 italic">click to dismiss</p>
		</div>
	</div>
{/each}
