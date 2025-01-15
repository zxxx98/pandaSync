import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home, PhotoLibrary } from '@mui/icons-material';

export default function MainNavigation()
{
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  return (
    <Box sx={{
      width: '80%',
      position: 'fixed',
      bottom: '2rem',
      left: '50%',
      transform:
        'translateX(-50%)',
    }}>
      <BottomNavigation
        style={{
          borderRadius: '1.5rem',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden',
        }}
        showLabels
        value={value}
        onChange={(event, newValue) =>
        {
          setValue(newValue);
          navigate(newValue);
        }}
      >
        <BottomNavigationAction value={'home'} label="home" icon={< Home />} />
        <BottomNavigationAction value={'remote'} label="remote" icon={< PhotoLibrary />} />
        < BottomNavigationAction value={'settings'} label="Settings" icon={< SettingsIcon />} />
        < BottomNavigationAction value={'about'} label="About" icon={< InfoIcon />} />
      </BottomNavigation>
    </Box>
  );
}
