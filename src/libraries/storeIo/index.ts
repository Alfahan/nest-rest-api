// import { Client } from 'minio';
// import { STOREIO_ACCESS_KEY, STOREIO_DIRECTORY, STOREIO_ENDPOINT, STOREIO_SECRET_KEY, STOREIO_USE_SSL } from 'src/consts';

// export default class StoreIO {
	
// 	/**
//      * Upload Path at Cloud Storage (store.io)
//      * @param {String} targetPath
//      * @param {String} filename
//      */
// 	storeIoUploadPath(targetPath: string, filename: string) {
// 		return `${STOREIO_DIRECTORY}/${targetPath}/${filename}`;
// 	}

// 	/**
//     * file extension
//     * @param {string} filename
//     * @return {string} extension
//     */
// 	fileExtension(filename: string) {
// 		const filenames: string[] = filename.split('.');
// 		return filenames[filenames.length - 1];
// 	}

// 	/**
//      * mime type from file extension
//      * @param {string} ext
//      * @return {string} mime type
//      */
// 	mimeTypeFromExtension(ext: string): string {
// 		let mime: string;
// 		switch (ext) {
// 			case 'pdf':
// 				mime = 'application/pdf';
// 				break;
// 			case 'doc':
// 				mime = 'application/msword';
// 				break;
// 			case 'docx':
// 				mime = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
// 				break;
// 			case 'xls':
// 				mime = 'application/vnd.ms-excel';
// 				break;
// 			case 'xlsx':
// 				mime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
// 				break;
// 			case 'ppt':
// 				mime = 'application/vnd.ms-powerpoint';
// 				break;
// 			case 'pptx':
// 				mime = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
// 				break;
// 			case 'jpg':
// 				mime = 'image/jpeg';
// 				break;
// 			case 'jpeg':
// 				mime = 'image/jpeg';
// 				break;
// 			case 'png':
// 				mime = 'image/png';
// 				break;
// 			case 'gif':
// 				mime = 'image/gif';
// 				break;
// 			case 'bmp':
// 				mime = 'image/bmp';
// 				break;
// 			case 'txt':
// 				mime = 'text/plain';
// 				break;
// 			case 'csv':
// 				mime = 'text/csv';
// 				break;
// 			case 'zip':
// 				mime = 'application/zip';
// 				break;
// 			case 'rar':
// 				mime = 'application/x-rar-compressed';
// 				break;
// 			default:
// 				mime = 'application/octet-stream';
// 				break;
// 		}
// 		return mime;
// 	}

// 	/**
//      * Allowed mimetype helper
//      * @author   : Ferdika Yudira, Hilman Fitriana
//      * @since    : 10-8-2023
//      * Rewritten to typescript from FABD-V3
//      * Reference mimetype : https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
//      * @param {*} mimeType
//      */
// 	allowedMimetype(mimeType: string): boolean {
// 		const allowedMimetypeAttachment: string[] = [
// 			'application/pdf',
// 			'application/msword',
// 			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
// 			'application/vnd.ms-excel',
// 			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
// 			'application/vnd.ms-powerpoint',
// 			'application/vnd.openxmlformats-officedocument.presentationml.presentation',
// 			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
// 			'application/vnd.visio',
// 			'text/plain',
// 			'image/jpeg',
// 			'image/png',
// 		];

// 		return allowedMimetypeAttachment.includes(mimeType);
// 	}

// 	/**
//      * Allowed Extension
//      * @param ext 
//      * @returns 
//      */
// 	allowedExtension(ext: string){
// 		const allowedExtension: string[] = [
// 			'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'jpg', 'jpeg', 'png', 'txt'
// 		];
// 		const tempExt = ext ? ext.toLowerCase() : '';
// 		return allowedExtension.includes(tempExt);
// 	}

// 	/**
//      * Upload To S3
//      * @param minioClient 
//      * @param bucket 
//      * @param file 
//      * @param targetPath 
//      * @param filename 
//      * @returns 
//      */
// 	async upload(
// 		bucket: string,
// 		file: any,
// 		targetPath: string,
// 		filename: string){

// 		const mc = new Client({
// 			endPoint: STOREIO_ENDPOINT,
// 			port: 9000,
// 			useSSL: STOREIO_USE_SSL == 'true' ? true : false,
// 			accessKey: STOREIO_ACCESS_KEY,
// 			secretKey: STOREIO_SECRET_KEY
// 		});

// 		const fname = file.originalname;
// 		const ext = this.fileExtension(fname);
// 		const contentType = this.mimeTypeFromExtension(ext);
// 		const uploadPath = this.storeIoUploadPath(targetPath,`${filename}.${ext}`);
// 		const meta: { [key: string]: string } = { 'Content-Type': contentType };
// 		await mc.putObject(bucket, uploadPath, file.buffer, meta);
// 		const protocol = STOREIO_USE_SSL === 'true' ? 'https' : 'http';
// 		return {
// 			filename: filename,
// 			extension: ext,
// 			url: `${protocol}://${STOREIO_ENDPOINT}/${bucket}/${uploadPath}`
// 		};
// 	}
// } 