import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import * as WebDavService from "../../services/webdav";
import { getWebDavBaseUrl } from "../../Config";
import { useCallback, useEffect, useState } from "react";
import { rootStore } from "../..";
import { IRemoteLibrary } from "../../models";

const Remote = () => {

    const [selectLibrary, setSelectLibrary] = useState<IRemoteLibrary | undefined>();

    useEffect(() => {
        const list = rootStore.remoteLibraryList;
        if (list.length > 0) {
            setSelectLibrary(list[0]);
        }
    }, [])

    useEffect(() => {
        if(selectLibrary)
        {
            // 刷新图库
            
        }
    }, [selectLibrary]);
    return <Box>
        <Typography variant="h1">Remote</Typography>
    </Box>
};

export default Remote;