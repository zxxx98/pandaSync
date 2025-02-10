import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, MenuItem, Select, TextField } from "@mui/material";
import { LibraryType } from "../consts";
import { FormEvent, useState } from "react";
import { IWebDavAuth } from "../models/webdav";
import { connectWebDavService } from "../services/webdav/core";
import
  {
    useNotifications
  } from '@toolpad/core/useNotifications';
import { logger } from "../utils/logger";
import { rootStore } from "../init";
import { nanoid } from "nanoid";

const checkConnection = async (type: LibraryType, params: IWebDavAuth) =>
{
  switch (type) {
    case LibraryType.WebDAV:
      const client = await connectWebDavService(params);
      return client !== null;
    default:
      return false;
  }
}

const AddRemoteLibrary = ({ open, onClose }: { open: boolean, onClose: () => void }) =>
{
  const [checking, setChecking] = useState(false);
  const notify = useNotifications();
  const handleClose = () =>
  {
    onClose();
  }

  const handleSubmit = async (event: React.FormEvent<HTMLDivElement>) =>
  {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as any);
    const formJson = Object.fromEntries((formData as any).entries());
    console.log(formJson);
    const type = formJson.type as LibraryType;
    const params = formJson as IWebDavAuth;

    setChecking(true);
    const connection = await checkConnection(type, params);
    setChecking(false);
    if (connection) {
      rootStore.addRemoteLibrary({
        name: formJson.name as string,
        description: formJson.description as string,
        auth: {
          type: type,
          url: params.url,
          username: params.username,
          password: params.password,
          remoteBasePath: params.remoteBasePath,
        },
        index: rootStore.remoteLibraryList.length,
        id: nanoid()
      });
      onClose();
    } else {
      const errorMessage = "连接失败，请检查连接参数是否正确";
      logger.error(errorMessage);
      notify.show(errorMessage, {
        autoHideDuration: 3000,
        severity: "error",
      });
    }
  }

  return <Dialog
    open={open}
    onClose={handleClose}
    component='form'
    onSubmit={handleSubmit}
  >
    {checking && <LinearProgress />}
    <DialogTitle>添加远程库</DialogTitle>
    <DialogContent>
      <Select name="type" id="type" size="small" fullWidth defaultValue={LibraryType.WebDAV}>
        <MenuItem value={LibraryType.WebDAV}>WebDAV</MenuItem>
      </Select>
      <TextField
        autoFocus
        required
        size="small"
        margin="dense"
        id="name"
        name="name"
        label="名称"
        type="text"
        fullWidth
        variant="outlined"
      />
      <TextField
        required
        size="small"
        margin="dense"
        id="url"
        name="url"
        label="地址"
        type="url"
        fullWidth
        variant="outlined"
      />
      <TextField
        size="small"
        margin="dense"
        id="username"
        name="username"
        label="用户名"
        type="text"
        fullWidth
        variant="outlined"
      />
      <TextField
        size="small"
        margin="dense"
        id="password"
        name="password"
        label="密码"
        type="password"
        fullWidth
        variant="outlined"
      />
      <TextField
        size="small"
        margin="dense"
        id="remoteBasePath"
        name="remoteBasePath"
        label="基础路径"
        type="text"
        fullWidth
        variant="outlined"
      />
      <TextField
        size="small"
        margin="dense"
        id="description"
        name="description"
        label="描述"
        type="text"
        fullWidth
        multiline
        rows={2}
        variant="outlined"
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>取消</Button>
      <Button type="submit">确定</Button>
    </DialogActions>
  </Dialog>
}

export default AddRemoteLibrary;