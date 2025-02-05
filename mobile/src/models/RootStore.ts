import { Instance, types } from "mobx-state-tree";
import { IRemoteLibrary, RemoteLibraryModel } from "./remoteLibrary/RemoteLibraryModel";
import { StorageKey } from "../consts";
import { Storage } from "../utils/storage";

export const RootStore = types.model({
    // 远程库列表
    remoteLibraryList: types.array(RemoteLibraryModel)
})
.actions(self => ({
    addRemoteLibrary(library: IRemoteLibrary){
        self.remoteLibraryList.push(library);
        Storage.save(StorageKey.REMOTE_LIBRARY, self.remoteLibraryList);
    },
    removeRemoteLibrary(library: IRemoteLibrary){
        self.remoteLibraryList.remove(library);
        Storage.save(StorageKey.REMOTE_LIBRARY, self.remoteLibraryList);
    }
}))

export interface IRootStore extends Instance<typeof RootStore> { }