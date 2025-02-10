import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';
import MainNavigation from './components/MainNavigation';
import Settings from './pages/settings';
import About from './pages/about';
import Remote from './pages/remote';
import { useEffect, useState } from 'react';
import
  {
    NotificationsProvider,
    NotificationsProviderSlots,
  } from '@toolpad/core/useNotifications';
import { init } from './init';
import { styled } from '@mui/material/styles';
import { Box, Snackbar } from '@mui/material';

const notificationsProviderSlots: NotificationsProviderSlots = {
  //页面顶部
  snackbar: styled(Snackbar)({ position: 'absolute', bottom: window.innerHeight - 200 }),
};

export default function App()
{
  const [inited, setInited] = useState(false);

  useEffect(() =>
  {
    init().then(() =>
    {
      setInited(true);
    });
  }, []);

  return (
    <Box sx={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      {inited ? (
        <NotificationsProvider slots={notificationsProviderSlots}>
          <BrowserRouter>
            <Routes>
              {/* 重定向根路径到 home */}
              <Route path="/" element={<Navigate to="/home" replace />} />
              {/* 基础路由 */}
              <Route path="/home" element={<Home />} />
              <Route path="/remote" element={<Remote />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
            </Routes>
            <MainNavigation />
          </BrowserRouter>
        </NotificationsProvider>
      ) : (
        <div>Loading...</div>
      )}
    </Box>
  );
}
