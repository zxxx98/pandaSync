import { StorageKey } from "./consts";
import { IRemoteLibrary, IRootStore, RootStore } from "./models";
import { Storage } from "./utils/storage";

export let rootStore: IRootStore;

export function init() {
    const remoteLibraryList = _loadRomoteLibraryList();
    rootStore = RootStore.create({
        remoteLibraryList
    });
}

function _loadRomoteLibraryList(): IRemoteLibrary[] {
    const list = (Storage.get(StorageKey.REMOTE_LIBRARY) || []) as IRemoteLibrary[];
    //根据index递增排序
    list.sort((a, b) => a.index - b.index)
    return list;
}