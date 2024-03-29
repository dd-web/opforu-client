
import { deserialize } from '$app/forms';
import { nanoid } from 'nanoid'

/**
 * Resolve local file info object from file
 * @param {File} file - file
 * @returns {Promise<ILocalFileInfo>} - local file info object
 */
export async function resolveFileInfo(file) {
  return await new Promise((resolve, reject) => {
    if (!file) reject(new Error('File is not defined'))

    let timeout = setTimeout(() => {
      reject(new Error('File processing timed out'))
    }, 10000);

    /** @type {ILocalFileInfo} */
    let info = {
      local_id: nanoid(),
      source_id: null,
      uploaded: false,
      description: '',
      name: file.name,
      status: 'init',
      type: resolveFileTypeFromFile(file),
      signal: null,
      progress: 0,
      file: file,
      width: 0,
      height: 0,
      poster: null
    }

    switch (info.type) {
      case 'image':
        processImageFileInfo(info).then((data) => {
          clearTimeout(timeout)
          resolve(data)
        })
        break;
      case 'video':
        processVideoFileInfo(info).then((data) => {
          clearTimeout(timeout)
          resolve(data)
        })
        break;
      default:
        clearTimeout(timeout);
        reject(new Error('Unsupported file type'));
    }
  })
}

/**
 * Resolve type of asset from file
 * @param {File} file - file
 * @returns {keyof typeof EAssetType} - asset type
 */
function resolveFileTypeFromFile(file) {
  if (file && file?.type && typeof file?.type === 'string') {
    switch (file.type.split('/')[0]) {
      case 'image':
        return 'image'
      case 'video':
        return 'video'
      default:
        return 'image'
    }
  }

  return "unknown"
}

/**
 * Process local file info object for image files
 * @param {ILocalFileInfo} fileInfo - local file info object
 * @returns {Promise<ILocalFileInfo>} - processed local file info object
 */
async function processImageFileInfo(fileInfo) {
  return new Promise((resolve, reject) => {
    const shadow = new Image();
    const url = URL.createObjectURL(fileInfo.file ?? new Blob());

    /** Onload handler */
    shadow.onload = () => {
      fileInfo.width = shadow.width;
      fileInfo.height = shadow.height;
      fileInfo.poster = url;
      resolve(fileInfo)
    }

    /** Onerror handler */
    shadow.onerror = () => reject('Image processing failed');

    /** Set source and load */
    shadow.src = url;
  });
}

/**
 * Process local file info object for video files
 * @param {ILocalFileInfo} fileInfo - local file info object
 * @returns {Promise<ILocalFileInfo>} - processed local file info object
 */
async function processVideoFileInfo(fileInfo) {
  return new Promise((resolve, reject) => {
    const shadow = document.createElement('video');
    const url = URL.createObjectURL(fileInfo?.file ?? new Blob());

    /** Onloadedmetadata handler */
    shadow.onloadedmetadata = () => {
      shadow.currentTime = 1;
      fileInfo.width = shadow.videoWidth;
      fileInfo.height = shadow.videoHeight;
    }

    /** Onseeked handler */
    shadow.onseeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = shadow.videoWidth;
      canvas.height = shadow.videoHeight;

      const ctx = canvas.getContext('2d');
      ctx?.drawImage(shadow, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((data) => {
        fileInfo.poster = URL.createObjectURL(data ?? new Blob());
        resolve(fileInfo)
      });
    }

    /** Onerror handler */
    shadow.onerror = () => reject('Video processing failed');

    /* Set source and load */
    shadow.src = url;
  })
}

/**
 * Upload file to server based on local file info object
 * @param {FormData} form - form data object
 * @returns {Promise<Record<string, unknown> | undefined>} - response object
 */
export async function uploadFileInfo(form, url = '?/fileUpload') {
  return new Promise((resolve, reject) => {
    fetch(url, { method: 'POST', body: form })
      .then((res) => res.text())
      .then(res => deserialize(res))
      .then(res => {
        switch (res?.type) {
          case "success":
            resolve(res?.data);
            break;
          case "error":
            reject(res?.error);
            break;
          default:
            reject(res?.status)
            break;
        }
      })
  })

}

/**
 * Creates and returns a new FormData object from a local file info object
 * @param {ILocalFileInfo} fileInfo - local file info object
 * @returns {FormData} - form data object
 */
export function createFormDataFromFileInfo(fileInfo) {
  const formData = new FormData();
  formData.append('file', fileInfo?.file ?? new Blob());
  formData.append('name', fileInfo?.name ?? '');
  formData.append('description', fileInfo?.description ?? '');
  formData.append('type', fileInfo?.type ?? '');
  formData.append('width', String(fileInfo?.width) ?? '0');
  formData.append('height', String(fileInfo?.height) ?? '0');
  formData.append('local_id', fileInfo?.local_id ?? '');
  return formData;
}

/**
 * Creates and returns a new AttachedFileData object from a local file info object
 * @param {ILocalFileInfo} fileInfo local file info object
 * @param {string[]=} tags - array of strings (tags) that describe the file
 * @returns {Partial<IAttachedFileData>}
 */
export function createFileAttachmentData(fileInfo, tags) {
  /** @type {Partial<IAttachedFileData>} */let obj = {
    source_id: fileInfo?.source_id ?? '',
    file_name: fileInfo?.name ?? '',
  }

  if (fileInfo?.description && typeof fileInfo?.description === 'string' && fileInfo?.description.length > 0) {
    obj['description'] = fileInfo.description
  }

  if (fileInfo?.name && typeof fileInfo?.name === 'string' && fileInfo?.name.length > 0) {
    obj['file_name'] = fileInfo.name
  }

  if (tags && Array.isArray(tags) && tags.length > 0) {
    obj['tags'] = tags
  }

  return obj;
}



/**
 * Formats size of bytes into short readable string, ex: 2.4 mb, etc.
 * @param {number} size - size of file/whatever to get size of
 * @returns {string}
 */
export function formatBytes(size) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];

  let bytes = size;
  let unitIndex = 0;

  for (unitIndex = 0; bytes >= 1024 && unitIndex < 4; unitIndex++) {
    bytes /= 1024;
  }

  return `${bytes.toFixed(2)} ${units[unitIndex]}`
}