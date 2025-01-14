import { createClient } from "webdav";
import { WebDavAuth } from "./types";
/**
 * 连接 WebDAV 服务
 */
export function connectWebDavService(auth: WebDavAuth)
{
    const client = createClient(`${auth.host}:${auth.port}`, {
        username: auth.username,
        password: auth.password,
        remoteBasePath: auth.remoteBasePath,
    });
    return client;
}