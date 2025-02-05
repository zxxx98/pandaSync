import { AppBar, Box, Button, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { rootStore } from "../..";
import { IRemoteLibrary } from "../../models";
import MoreIcon from '@mui/icons-material/MoreVert';
import AddToDrive from '@mui/icons-material/AddToDrive';
import FolderOpen from '@mui/icons-material/FolderOpen';
import { observer } from "mobx-react-lite";
import AddRemoteLibrary from "../../components/AddRemoteLibrary";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { grey } from '@mui/material/colors';


const Remote = () => {

    const [selectLibrary, setSelectLibrary] = useState<IRemoteLibrary | undefined>();
    const [menuSetting, setMenuSetting] = useState<{
        anchorEl: null | HTMLElement;
        open: boolean;
    }>({
        anchorEl: null,
        open: false,
    });
    const [addRemoteLibraryOpen, setAddRemoteLibraryOpen] = useState(false);
    const [menuItems, setMenuItems] = useState<{
        label: string;
        action: () => void;
        icon?: React.ReactNode;
    }[]>([]);

    useEffect(() => {
        const list = rootStore.remoteLibraryList;
        if (list.length > 0) {
            setSelectLibrary(list[0]);
        }
        initMenuItems();
    }, [])

    useEffect(() => {
        initMenuItems();
    }, [rootStore.remoteLibraryList.length]);

    const initMenuItems = () => {
        const addItem = {
            label: "添加远程库",
            icon: <AddToDrive />,
            action: () => {
                setAddRemoteLibraryOpen(true);
            }
        }
        const items = [
            ...rootStore.remoteLibraryList.map(item => ({
                label: item.name,
                action: () => {
                    setSelectLibrary(item);
                },
                icon: <FolderOpen />,
            })),
            addItem,
        ]
        setMenuItems(items);
    }

    const handleMenuSetting = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuSetting({
            anchorEl: event.currentTarget,
            open: true,
        });
    }

    const handleClose = () => {
        setMenuSetting({
            anchorEl: null,
            open: false,
        });
    }

    useEffect(() => {
        if (selectLibrary) {
            // 刷新图库

        }
    }, [selectLibrary]);

    return <Box sx={{ flexGrow: 1, height: "100%", width: "100%" }}>
        <Box sx={{ position: "relative", height: 50, backgroundColor: grey[500], borderBottom: "1px solid #e0e0e0" }}>
            <Box sx={{ textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                <Typography sx={{ color: "white", fontSize: 24 }}>{selectLibrary?.name}</Typography>
            </Box>
            <IconButton sx={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }} size="large"
                aria-label="display more actions"
                edge="end"
                color="inherit" onClick={handleMenuSetting}>
                <MoreIcon sx={{ color: "white" }} />
            </IconButton>
            <Menu open={menuSetting.open} onClose={handleClose} anchorEl={menuSetting.anchorEl}>
                {menuItems.map((item, index) => (
                    <MenuItem key={index} onClick={() => {
                        item.action();
                        handleClose();
                    }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText>{item.label}</ListItemText>
                        </Box>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
        {rootStore.remoteLibraryList.length === 0 &&
            <Box sx={{ textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                <ImageNotSupportedIcon sx={{ color: grey[400], fontSize: 24 }} />
                <Typography sx={{ color: grey[400], fontSize: 24 }}>暂无远程库</Typography>
            </Box>
        }
        <AddRemoteLibrary open={addRemoteLibraryOpen} onClose={() => setAddRemoteLibraryOpen(false)} />
    </Box>
};

export default observer(Remote);