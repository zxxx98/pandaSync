import { createClient, WebDAVClient } from "webdav";
import { WebDavAuth } from "./types";
import { logger } from "../../utils/logger";
/**
 * 连接 WebDAV 服务
 */
export async function connectWebDavService(auth: WebDavAuth)
{
    const client = createClient(auth.url, {
        username: auth.username,
        password: auth.password,
        remoteBasePath: auth.remoteBasePath,
    });
    const result = await checkConnection(client, auth);
    return result ? client : null;
}

// 检查连接是否成功
export async function checkConnection(client: WebDAVClient, auth: WebDavAuth)
{
    try {
        // 尝试获取根目录内容来验证连接
        await client.getDirectoryContents("/");
        logger.info("WebDAV连接成功", auth.url + (auth.remoteBasePath ?? ""));
        return true;
    } catch (error: any) {
        logger.error("WebDAV连接失败", error);
        return false;
    }
}