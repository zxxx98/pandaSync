import { Instance, types } from "mobx-state-tree";
import { RemoteLibraryModel } from "./webdav/RemoteLibraryModel";

export const RootStore = types.model({
    // 远程库列表
    remoteLibraryList: types.array(RemoteLibraryModel)
})

export interface IRootStore extends Instance<typeof RootStore> { }