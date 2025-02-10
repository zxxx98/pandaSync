import { Instance, types } from "mobx-state-tree";
import { ImageDirectoryModel } from "./ImageDirectoryModel";

export const GalleryModel = types.model({
    remoteLibraryId: types.string,
    imageDirectorys: types.array(ImageDirectoryModel)
})

export interface IGallery extends Instance<typeof GalleryModel> { }