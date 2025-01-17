import { Instance, types } from "mobx-state-tree";
import { WebDavAuthModel } from "./WebDavAuthModel";

const AuthModel = types.union(WebDavAuthModel);

export interface IAuth extends Instance<typeof AuthModel> { }

export const RemoteLibraryModel = types.model({
    // 名称
    name: types.string,
    // 描述
    description: types.string,
    // 认证信息
    auth: AuthModel,
    // 排序
    index: types.number,
})

export interface IRemoteLibrary extends Instance<typeof RemoteLibraryModel> { }