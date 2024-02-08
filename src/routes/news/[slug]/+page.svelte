<script>
	/** @type {import('./$types').PageData} */ export let data;

	// $: console.log('single article', data?.article);
</script>

<div>
	<h1>Article</h1>
	<h2>{data?.article?.title}</h2>
</div>
