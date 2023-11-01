<script>
	import { writable } from 'svelte/store';

	let store = writable([]);

	let notifs = $store;
</script>

{#each notifs as notif}
	<div>
		<p>notification</p>
	</div>
{/each}
