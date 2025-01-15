import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import * as WebDavService from "../../services/webdav";
import { getWebDavBaseUrl } from "../../Config";
import { useEffect } from "react";

const Remote = () =>
{
    useEffect(() =>
    {
        WebDavService.connectWebDavService({
            url: getWebDavBaseUrl(),
            username: "zhouxin",
            password: "zx736124",
        }).then((client) =>
        {
            console.log(client);
        });
    }, []);
    return <Box>
        <Typography variant="h1">Remote</Typography>
    </Box>
};

export default Remote;