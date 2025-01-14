import { Typography } from "@mui/material";

import { Box } from "@mui/material";
import { WebDavCore } from "../../services/webdav";

const Home = () =>
{
    const client = WebDavCore.connectWebDavService({
        host: "http://192.168.100.1",
        port: 8888,
        username: "admin",
        password: "",
    });

    // 检查连接是否成功
    const checkConnection = async () =>
    {
        try {
            // 尝试获取根目录内容来验证连接
            await client.getDirectoryContents("/");
            console.log("WebDAV连接成功");
            return true;
        } catch (error) {
            console.error("WebDAV连接失败:", error);
            return false;
        }
    }

    // 执行连接检查
    checkConnection();

    return <Box>
        <Typography variant="h1">Home</Typography>
    </Box>
};

export default Home;
