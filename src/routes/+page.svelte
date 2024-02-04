<script>
	import { browser } from '$app/environment';

	/** @type {import('./$types').PageData} */
	// export let data;
</script>

<svelte:head>
	<title>OPforU</title>
	<meta name="description" content="OPforU - Home Page" />
</svelte:head>

<div class="w-full mx-auto">
	<h1 class="text-4xl mt-4 text-center capitalize text-blue-100 font-semibold tracking-wider">OPforU</h1>
	<hr class="hr-split max-w-4xl w-full mx-auto" />
	<div class="max-w-2xl mx-auto">
		<p class="my-2 leading-6 tracking-wider text-lg first-letter:italic">
			OPforU is an anonymous forum platform designed to improve the quality of discussion on the internet. We believe
			that anonymity is a powerful tool that can be used to encourage people to be more open and honest with their
			opinions and place more value on the ideas themselves rather than the individual expressing them.
		</p>
		<p class="my-2 leading-6 tracking-wider text-lg">
			Anonymity introduces it's own set of issues however, we are aiming to design a platform that mitigates these
			issues without creating subversive systems that can be abused. This is a finely tuned line that must be
			continually monitored and iterated upon.
		</p>
		<p class="my-2 leading-6 tracking-wider text-lg">Stay tuned for furthur updates and information.</p>
	</div>
</div>
