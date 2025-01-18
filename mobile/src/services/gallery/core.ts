import Resizer from 'react-image-file-resizer';
import { IAuth } from '../../models';
import { LibraryType } from '../../consts';
import { WebDavService } from '../webdav';

//缩略图根路径
const thumbnailRootPath = "/thumbnail";
// 原图根路径
const originalRootPath = "/original";

/**
 * 生成缩略图
 * @param image 原始图片
 * @returns 压缩之后的base64图片
 */
export function generateThumbnail(image: Blob): Promise<string> {
    return new Promise((resolve) => {
        Resizer.imageFileResizer(
            image,
            512, // 宽度
            512, // 高度
            'JPEG', // 格式
            60, // 质量
            0, // 旋转角度
            (uri) => {
                resolve(uri as string);
            },
            'base64' // 输出类型
        );
    });
}

export async function getGallery(auth: IAuth) {
    if (auth.type === LibraryType.WebDAV) {
        const client = await WebDavService.connectWebDavService(auth);
        if (!client) {
            return null;
        }
        const thumbnails = await WebDavService.getImagesRecursively(client, thumbnailRootPath);
    }
}