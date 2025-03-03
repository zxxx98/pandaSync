import { LibraryType, StorageKey } from "./consts";
import { IRemoteLibrary, IRootStore, RootStore } from "./models";
import { Storage } from "./utils/storage";
import { nanoid } from 'nanoid';

export let rootStore: IRootStore;

export async function init()
{
    const remoteLibraryList = _loadRomoteLibraryList();
    rootStore = RootStore.create({
        remoteLibraryList: remoteLibraryList.map(item => ({
            ...item,
            id: nanoid()
        })),
        galleryList: []
    });
    (window as any).rootStore = rootStore;
}

function _loadRomoteLibraryList(): IRemoteLibrary[]
{
    const list = (Storage.get(StorageKey.REMOTE_LIBRARY) || []) as IRemoteLibrary[];
    //根据index递增排序
    list.sort((a, b) => a.index - b.index);
    return list;
}