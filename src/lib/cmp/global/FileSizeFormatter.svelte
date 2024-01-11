<script>
	/** @type {number} */ export let size = 0;

	/**
	 * Formats a number into a human readable file size
	 * @param {number} n - size in bytes
	 */
	const format = (n) => {
		const units = ['B', 'KB', 'MB', 'GB', 'TB'];

		let bytes = n;
		let uindex = 0;

		for (uindex = 0; bytes >= 1024 && uindex < 4; uindex++) {
			bytes /= 1024;
		}

		return bytes.toFixed(2) + units[uindex];
	};
</script>

{format(size)}
