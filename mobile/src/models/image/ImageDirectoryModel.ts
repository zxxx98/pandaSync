import { Instance, types } from "mobx-state-tree";

export const ImageDirectoryModel = types.model({
    year: types.number,
    month: types.number,
    day: types.number,
    //文件路径
    images: types.array(types.string)
}).views(self =>
{
    return {
        get path()
        {
            return `/${self.year}/${self.month}/${self.day}`;
        }
    }
})

export interface IImageDirectory extends Instance<typeof ImageDirectoryModel> { }