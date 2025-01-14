/**
 * WebDAV 认证信息
 */
export type WebDavAuth = {
    host: string;
    port: number;
    username?: string;
    password?: string;
    remoteBasePath?: string;
}