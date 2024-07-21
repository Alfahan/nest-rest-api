import { config } from 'dotenv';

config();

export const CREATE = 'CREATE';
export const READ = 'READ';
export const UPDATE = 'UPDATE';
export const DELETE = 'DELETE';
export const APPROVAL = 'APPROVAL';

export const AVATAR = 'https://i.ibb.co/W2zHqtt/notion-avatar-1693279191524.png';

export const HCIP_URL = process.env.HCIP_URL;
export const OCA_URL = process.env.OCA_URL;
export const OCA_TOKEN = process.env.OCA_TOKEN;
export const MAIL_USERNAME = process.env.MAIL_USERNAME;
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_PORT = process.env.MAIL_PORT;
export const JWT_KEY = process.env.JWT_KEY;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;
export const JWT_REFRESH_EXPIRATION_TIME = process.env.JWT_REFRESH_EXPIRATION_TIME;
export const JWT_SIGNING_ALGORITHM = process.env.JWT_SIGNING_ALGORITHM;
export const WEB_URL = process.env.WEB_URL;

export const STOREIO_ENDPOINT = process.env.STOREIO_ENDPOINT;
export const STOREIO_USE_SSL = process.env.STOREIO_USE_SSL;
export const STOREIO_ACCESS_KEY = process.env.STOREIO_ACCESS_KEY;
export const STOREIO_SECRET_KEY = process.env.STOREIO_SECRET_KEY;
export const STOREIO_PRIVATE_BUCKET = process.env.STOREIO_PRIVATE_BUCKET;
export const STOREIO_PUBLIC_BUCKET = process.env.STOREIO_PUBLIC_BUCKET;
export const STOREIO_DIRECTORY = process.env.STOREIO_DIRECTORY;