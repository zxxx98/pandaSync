import { BufferLike, createClient, FileStat, WebDAVClient } from "webdav";
import { logger } from "../../utils/logger";
import { IWebDavAuth } from "../../models/webdav/WebDavAuthModel";
import { IImageDirectory } from "../../models/image";
/**
 * 连接 WebDAV 服务
 */
export async function connectWebDavService(auth: IWebDavAuth)
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
export async function checkConnection(client: WebDAVClient, auth: IWebDavAuth)
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

/**
 * @description 获取所有图片文件夹路径
 * 图片在远端都是按照 年/月/日 这样储存的
 * @param client WebDAVClient 实例
 * @param root 图片根目录
 * @returns 文件夹路径列表
 */
export async function getImageDirectorys(client: WebDAVClient, root: string): Promise<IImageDirectory[]>
{
    try {
        const directoryContents = await client.getDirectoryContents(root) as FileStat[];
        const imageDirectories: IImageDirectory[] = [];
        for (const item of directoryContents) {
            if (item.type === "directory") {
                //第一层的文件夹名是年份
                const year = item.basename;

            }
        }
        return imageDirectories;
    } catch (error: any) {
        logger.error("Failed to get image directories", error);
        return [];
    }
}


function isImageFile(filename: string)
{
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    const extension = filename.substring(filename.lastIndexOf(".")).toLowerCase();
    return imageExtensions.includes(extension);
}
