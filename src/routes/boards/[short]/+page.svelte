<script>
	import { newActionBarItem } from '$lib/utils/resolvers';

	import Board from '$lib/cmp/board/Board.svelte';
	import Pagination from '$lib/cmp/global/Pagination.svelte';
	import ContentActionBar from '$lib/cmp/layout/ContentActionBar.svelte';
	import ThreadForm from '$lib/cmp/form/ThreadForm.svelte';

	/** @type {import('./$types').PageData} */ export let data;
	/** @type {import('./$types').ActionData }*/ export let form;

	$: title = `${data.board.title[0].toUpperCase() + data.board.title.slice(1)}`;

	/** @type {any} */
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
		component = component === componentMap[event.detail] ? null : componentMap[event.detail];
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

	<svelte:component this={component} />

	<Board board={data?.board} threads={data?.threads} />
	<Pagination paginator={data.pagination} path="/boards/{data.board.short}/" />
</div>
