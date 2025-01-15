/**
 * WebDAV 认证信息
 */
export type WebDavAuth = {
    url: string;
    username?: string;
    password?: string;
    remoteBasePath?: string;
}