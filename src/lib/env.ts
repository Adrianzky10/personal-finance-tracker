export const MONGODB_URI: string = process.env.MONGODB_URI || "";

export const MONGODB_DB_NAME: string = process.env.MONGODB_DB_NAME || "";

export const JWT_SECRET: string = process.env.JWT_SECRET || "";

export const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "1d";

export const EMAIL_SMTP_SECURE: boolean =
  Boolean(process.env.EMAIL_SMTP_SECURE) || false;

export const EMAIL_SMTP_PASS: string = process.env.EMAIL_SMTP_PASS || "";

export const EMAIL_SMTP_USER: string = process.env.EMAIL_SMTP_USER || "";

export const EMAIL_SMTP_PORT: number =
  Number(process.env.EMAIL_SMTP_PORT) || 465;

export const EMAIL_SMTP_HOST: string = process.env.EMAIL_SMTP_HOST || "";

export const EMAIL_SMTP_SERVICE_NAME: string =
  process.env.EMAIL_SMTP_SERVICE_NAME || "";

export const APP_URL: string = process.env.APP_URL || "http://localhost:3001";
