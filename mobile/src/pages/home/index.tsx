import { Button, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { GalleryService } from "../../services/gallery";
import { rootStore } from "../../init";

const Home = () =>
{
    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        try {
            const files = event.target.files;
            if (files) {
                const errorImages = await GalleryService.uploadImages(Array.from(files), rootStore.remoteLibraryList[0]);
                if (errorImages.length > 0) {
                    console.log('上传失败', errorImages);
                }
            }
        } catch (error) {
            console.error('Error handling file:', error);
        }
    };

    return (
        <Box sx={{ flexGrow: 1, height: "100%", width: "100%" }}>
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                onChange={handleUpload}
            />
            <label htmlFor="image-upload">
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    component="span"
                >
                    开始上传
                </Button>
            </label>
        </Box>
    );
};

export default Home;
