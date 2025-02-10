import Resizer from 'react-image-file-resizer';
import { IAuth, IRemoteLibrary } from '../../models';
import { LibraryType } from '../../consts';
import { WebDavService } from '../webdav';
import { rootStore } from '../../init';
import { uploadConfig } from '../../Config';

//缩略图根路径
const thumbnailRootPath = "/thumbnail";
// 原图根路径
const originalRootPath = "/original";

/**
 * 生成缩略图
 * @param image 原始图片
 * @returns 压缩之后的base64图片
 */
export function generateThumbnail(image: Blob): Promise<string>
{
    return new Promise((resolve) =>
    {
        Resizer.imageFileResizer(
            image,
            512, // 宽度
            512, // 高度
            'JPEG', // 格式
            60, // 质量
            0, // 旋转角度
            (uri) =>
            {
                resolve(uri as string);
            },
            'base64' // 输出类型
        );
    });
}

/**
 * 上传多个图片
 * @param images 图片文件
 * @param rl 远程库
 * @returns 上传失败的图片
 */
export async function uploadImages(images: File[], rl: IRemoteLibrary)
{
    //并发限制
    const maxConcurrency = uploadConfig.maxConcurrency;
    const concurrencyQueue: Promise<any>[] = [];
    const errorImages: File[] = [];
    // 处理每个图片
    for (const image of images) {
        // 如果并发队列已满，等待任意一个任务完成
        if (concurrencyQueue.length >= maxConcurrency) {
            await Promise.race(concurrencyQueue);
            // 移除已完成的任务
            const completed = concurrencyQueue.filter(p => (p as any).status === 'fulfilled');
            if (completed.length > 0) {
                concurrencyQueue.splice(concurrencyQueue.indexOf(completed[0]), 1);
            }
        }

        // 添加新的上传任务到并发队列
        const uploadPromise = uploadImage(image, rl, errorImages);
        concurrencyQueue.push(uploadPromise);
    }
    // 等待所有剩余的上传任务完成
    await Promise.all(concurrencyQueue);
    return errorImages;
}

async function uploadImage(image: File, rl: IRemoteLibrary, errorImages: File[])
{
    const client = await WebDavService.connectWebDavService(rl.auth);
    if (!client) {
        errorImages.push(image);
        return false;
    }
    const thumbnailBase64 = await generateThumbnail(image);
    // 将base64转换为Blob
    const thumbnailBlob = await fetch(thumbnailBase64).then(res => res.blob());

    const lastModifiedDate = new Date(image.lastModified);
    const year = lastModifiedDate.getFullYear();
    const month = lastModifiedDate.getMonth() + 1;
    const day = lastModifiedDate.getDate();
    const path = `${year}/${month}/${day}`;

    try {
        await client.createDirectory(path);
        await client.putFileContents(`${originalRootPath}/${path}/${image.name}`, image);
        await client.putFileContents(`${thumbnailRootPath}/${path}/${image.name}`, thumbnailBlob);
        return true;
    } catch (error) {
        errorImages.push(image);
        return false;
    }

}

export async function getGallery(rl: IRemoteLibrary)
{
    const gallery = rootStore.galleryList.find(item => item.remoteLibraryId === rl.id);
    if (gallery) {
        return gallery;
    }
    if (rl.auth.type === LibraryType.WebDAV) {
        const client = await WebDavService.connectWebDavService(rl.auth);
        if (!client) {
            return null;
        }
        //缩略图目录
        const thumbnailDirectories = await WebDavService.getImageDirectorys(client, thumbnailRootPath);
        rootStore.galleryList.push({
            remoteLibraryId: rl.id,
            imageDirectorys: thumbnailDirectories
        });
    }
    return rootStore.galleryList.find(item => item.remoteLibraryId === rl.id);
}