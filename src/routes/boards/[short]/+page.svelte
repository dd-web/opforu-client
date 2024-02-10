<script>
	import { newActionBarItem } from '$lib/utils/resolvers';
	import { goto } from '$app/navigation';

	import Board from '$lib/cmp/board/Board.svelte';
	import Pagination from '$lib/cmp/global/Pagination.svelte';
	import ContentActionBar from '$lib/cmp/layout/ContentActionBar.svelte';
	import ThreadForm from '$lib/cmp/form/ThreadForm.svelte';

	/** @type {import('./$types').PageData} */ export let data;

	$: title = `${data.board.title[0].toUpperCase() + data.board.title.slice(1)}`;

	/** @type {Record<string, any>} */
	let componentMap = {
		threadForm: ThreadForm
	};

	/** @type {typeof ThreadForm|null} */ let component = null;

	let actionButtons = [newActionBarItem('new-thread', 'threadForm', 'New Thread')];

	/**
	 * Handle action bar events
	 * @param {CustomEvent} event
	 */
	const handleActionEvent = (event) => {
		if (event.detail === 'threadForm' && !data?.account) {
			const qs = new URLSearchParams();
			qs.append('next', 'board');
			qs.append('id', data?.board?.short);
			goto(`/login?${qs.toString()}`);
		} else {
			component = component === componentMap[event.detail] ? null : componentMap[event.detail];
		}
	};

	/** Resets the current component to null, rendering nothing */
	const handleResetComponent = () => {
		component = null;
	};
</script>

<svelte:head>
	<title>{title} - OPforU</title>
	<meta name="description" content={data.board.description} />
</svelte:head>

<div class="px-8">
	<h1 class="text-4xl mt-4 text-center capitalize text-blue-100">{data.board.title}</h1>
	<h2 class="text-base italic text-center text-neutral-300">{data.board.description}</h2>

	<ContentActionBar on:new-thread={handleActionEvent} items={actionButtons} />

	<svelte:component this={component} on:close={handleResetComponent} />

	<Board board={data?.board} threads={data?.threads} />
	<Pagination paginator={data.pagination} path="/boards/{data.board.short}/" />
</div>
