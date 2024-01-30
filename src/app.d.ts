// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			account?: Account?;
			session?: Session | string?;
		}
		// interface PageData {}
		// interface Platform {}
	}

	/**
	 * These are Public API types for the most part. They are what a default public client would see, and
	 * a couple other ephemeral fields added for convenience. They do not represent the full data model or
	 * what a registered client would see. Extend from these bases when necessary.
	 */

	type Paginator = {
		current_page: number;
		page_size: number;
		total_pages: number;
		total_records: number;
		last_page: number;
		last_page_size: number;
	}

	type TimeStampGroup = {
		_id?: string;
		created_at: string;
		updated_at: string;
		deleted_at?: string;
	}

	type Account = TimeStampGroup & {
		username: string;
		email: string;
		role: AccountRole;
		status: AccountStatus;
	}

	type Article = TimeStampGroup & {
		title: string;
		body: string;
		slug: string;
		tags: string[];
		status: ArticleStatus;
		author: Account;
		co_authors: Account[];
	}

	type Board = TimeStampGroup & {
		title: string;
		short: string;
		description: string;
		threads: Thread[];
		post_ref: number;
	};

	type Thread = TimeStampGroup & {
		title: string;
		body: string;
		slug: string;
		status: ThreadStatus;
		creator: IIdentity;
		mods: IIdentity[];
		posts: Post[];
		assets: Asset[];
		tags: string[];
		post_count: number;
	}

	type Identity = TimeStampGroup & {
		name: string;
		role: ThreadRole;
		status: IdentityStatus;
		style: string;
	}

	type Post = TimeStampGroup & {
		body: string;
		creator: Identity;
		post_number: number;
		assets: Asset[];
	}

	type Session = TimeStampGroup & {
		session_id: string;
		account_id: string;
		expires: string;
	}

	type Asset = TimeStampGroup & {
		asset_type: AssetType;
		avatar: AssetDetail;
		source: AssetDetail;
		file_name: string;
		tags: string[];
	}

	type AssetDetail = {
		extension: string;
		height: number;
		width: number;
		size: number;
		size_str: string;
		url: string;
	}

	/**
	 * Enums / Constants
	 */
	enum AccountStatus {
		Unknown = 'unknown',
		Active = 'active',
		Suspended = 'suspended',
		Banned = 'banned',
		Deleted = 'deleted',
	}

	enum AccountRole {
		Unknown = 'unknown',
		Public = 'public',
		User = 'user',
		Mod = 'mod',
		Admin = 'admin',
	}

	enum ArticleStatus {
		Draft = 'draft',
		Published = 'published',
		Archived = 'archived',
		Deleted = 'deleted',
	}

	enum IdentityStatus {
		Unkown = 'unknown',
		Active = 'active',
		Suspended = 'suspended',
		Banned = 'banned',
		Deleted = 'deleted',
	}

	enum ThreadStatus {
		Open = 'open',
		Closed = 'closed',
		Archived = 'archived',
		Deleted = 'deleted',
	}

	enum ThreadRole {
		User = 'user',
		Mod = 'mod',
		Creator = 'creator',
	}


	/** Front end types */
	type AlertType = 'success' | 'info' | 'warning' | 'error';
	type AssetType = 'image' | 'video';
	type LocalFileStatus = 'init' | 'uploading' | 'canceled' | 'complete' | 'error';

	type Alert = {
		id: number;
		type: AlertType;
		message: string;
		removecallback: Timeout | null;
	}

	interface LocalFileInfo {
		/**
		 * Local ID is a unique ID on the client side used to ensure we're updating the
		 * same file once it's uploaded. The server will send back the same ID as well
		 * as the source_id when processing the file.
		 */
		local_id: string;

		/**
		 * Source ID is the ID of the matching AssetSource on the server. It's received
		 * after the file is uploaded (before form submission) and is sent along again
		 * when the post/thread form is submitted in an array of AttachedFileData.
		 */
		source_id: string?;

		/**
		 * Name is the name of the file on the client's side when they selected it.
		 */
		name: string;

		/**
		 * Status determines the current stage of processing the file is in.
		 * this determines many things such as when it can be previewed, uploaded, etc.
		 */
		status: LocalFileStatus;

		/**
		 * If the client wishes to enter a description for the file, they can do it here.
		 */
		description: string;

		/**
		 * File is the actual file data. Appended to a FormData object and sent to
		 * the server for processing.
		 */
		file: File?;

		/**
		 * Dimensions of the file. Used for a few things, mostly display purposes.
		 */
		width: number;
		height: number;

		/**
		 * Type of asset. Used to determine display behavior, and other details.
		 */
		type?: AssetType?;

		/**
		 * Poster is the local image data used to display the preview.
		 * It's not ever uploaded or has any other purpose.
		*/
		poster?: string?;

		/**
		 * Uploaded tells us if the file had already been sent to the server
		 * for processing. If it has, we don't need to send it again.
		*/
		uploaded: boolean;
		signal?: AbortSignal?;
		progress: number;
	}

	/**
	 * File data when it's attached along with a post/thread after it's been uploaded.
	 */
	interface AttachedFileData {
		/**
		 * Source ID is the ID of the matching AssetSource on the server.
		 */
		source_id: string;

		/**
		 * If the client wishes to enter a description for the file, they can do it here.
		 */
		description: string;

		/**
		 * The client can rename the file to whatever they want, if they wish. otherwise
		 * the original file name will be used.
		 */
		file_name: string;

		/**
		 * Tags are used to categorize the file. They can be used for searching, filtering, etc.
		 * They are not required.
		 */
		tags: string[];
	}



}




export { };
