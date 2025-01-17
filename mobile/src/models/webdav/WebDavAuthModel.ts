import { Instance, types } from "mobx-state-tree";
import { LibraryType } from "../../consts";

export const WebDavAuthModel = types.model({
    type: LibraryType.WebDAV,
    url: types.string,
    username: types.maybe(types.string),
    password: types.maybe(types.string),
    remoteBasePath: types.maybe(types.string),
})

export interface IWebDavAuth extends Instance<typeof WebDavAuthModel> { }