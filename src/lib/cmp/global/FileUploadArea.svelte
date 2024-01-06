<script>
	import { nanoid } from 'nanoid';
	import { alerts } from '$lib/stores/alerts';

	import UploadingFile from '../partials/UploadingFile.svelte';

	/** @type {HTMLInputElement} */ let inputEl;
	/** @type {FileList} */ let files;
	/** @type {LocalFileInfo[]} */ let filesAttached = [];

	$: console.log('files attached', filesAttached);

	const handleFiles = async () => {
		console.log('file list:', files);
		if (files.length === 0) return;
		if (files.length + filesAttached.length > 9) {
			console.log('cannot attach more than 9 files');
			alerts.newAlert('Too many files. Total must be 9 or fewer.', 'warning');
			return;
		}

		await Promise.all(
			[...files].map((file) => {
				return new Promise((resolve, reject) => {
					let fileTimeout = setTimeout(() => {
						reject('could not load file: operation timed out');
					}, 10000);

					/** @type {LocalFileInfo} */
					let fileInfo = {
						local_id: nanoid(),
						name: file.name,
						status: 'init',
						type: null,
						progress: 0,
						file: file,
						width: 0,
						height: 0,
						poster: null
					};

					if (file && file?.type && typeof file?.type === 'string') {
						switch (file.type.split('/')[0]) {
							/** @type {Image} */
							case 'image':
								fileInfo.type = 'image';
								const shadowImage = new Image();
								shadowImage.src = URL.createObjectURL(file);
								shadowImage.onload = () => {
									fileInfo.width = shadowImage.width;
									fileInfo.height = shadowImage.height;
									fileInfo.poster = URL.createObjectURL(file);

									clearTimeout(fileTimeout);
									resolve(fileInfo);
								};
								shadowImage.onerror = () => {
									clearTimeout(fileTimeout);
									reject('error loading image');
								};
								break;

							/** @type {Video} */
							case 'video':
								fileInfo.type = 'video';
								const shadowVideo = document.createElement('video');

								shadowVideo.onloadedmetadata = () => {
									shadowVideo.currentTime = 1;
									fileInfo.width = shadowVideo.videoWidth;
									fileInfo.height = shadowVideo.videoHeight;
								};

								shadowVideo.onseeked = (e) => {
									const canvas = document.createElement('canvas');
									canvas.width = shadowVideo.videoWidth;
									canvas.height = shadowVideo.videoHeight;
									const ctx = canvas.getContext('2d');
									if (ctx) {
										ctx.drawImage(shadowVideo, 0, 0, canvas.width, canvas.height);
										canvas.toBlob((blob) => {
											if (blob) {
												fileInfo.poster = URL.createObjectURL(blob);
											}
											clearTimeout(fileTimeout);
											resolve(fileInfo);
										});
									}
								};

								shadowVideo.onerror = () => {
									clearTimeout(fileTimeout);
									reject('error loading video');
								};

								shadowVideo.src = URL.createObjectURL(file);
								break;

							default:
								clearTimeout(fileTimeout);
								reject('unsupported file type');
						}
					}

					if (!fileInfo.type) {
						clearTimeout(fileTimeout);
						reject('could not resolve file type');
					}
				});
			})
		)
			.then((fileInfoValues) => {
				filesAttached = [...filesAttached, ...fileInfoValues];
			})
			.catch((error) => {
				console.log('file promise error:', error);
				alerts.newAlert('Could not load file', 'error');
			});
	};
</script>

<div class="flex flex-col justify-between py-2 mx-2 gap-4">
	<div class="h-full flex gap-4 w-full overflow-x-scroll bg-zinc-900 rounded-t-md mt-4">
		{#each filesAttached as file (file.local_id)}
			<UploadingFile {file} />
		{/each}
	</div>
	<div class="relative">
		{#if filesAttached.length < 9}
			<label class="block h-20 rounded-xl outline-dashed outline-2 outline-zinc-700">
				<input
					bind:this={inputEl}
					bind:files
					on:change={handleFiles}
					disabled={filesAttached.length >= 9}
					type="file"
					accept="image/* video/*"
					multiple
					class="h-full w-full opacity-0"
				/>
			</label>
			<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
				<button
					on:click={() => inputEl?.click()}
					type="button"
					class="btn-generic bg-zinc-800 py-1 px-2 text-zinc-400 hover:text-zinc-200 focus-visible:text-zinc-200"
					>Upload</button
				>
				<span class="text-xs mt-2 text-zinc-400">Drag and drop or click to upload</span>
			</div>
		{:else}
			<p class="text-zinc-400 text-center">Upload limit reached. Remove one or more files to add another.</p>
		{/if}
	</div>
</div>
