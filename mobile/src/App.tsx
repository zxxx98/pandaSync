import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';
import MainNavigation from './components/MainNavigation';
import Settings from './pages/settings';
import About from './pages/about';
import Remote from './pages/remote';

export default function App()
{
  return (
    <>
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
    </>
  );
}
