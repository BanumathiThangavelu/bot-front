import React, { useState } from 'react';
import './header.css';
import Logo from '../../assets/logo.png';
import {
  Avatar,
  Box,
  Typography,
  Popover,
  Button,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SIGN_IN } from '../../constant/navigation';

export default function Header() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('user') ?? '{}');
  console.log('userInfo', userInfo);
  const name: string = userInfo?.email || 'User';
  const email: string = userInfo?.email || 'example@email.com';

  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((n: string) => n.charAt(0).toUpperCase())
    .join('');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate(SIGN_IN);
  };

  const open = Boolean(anchorEl);
  console.log('open', open);
  console.log('anchorEl', anchorEl);
  const id = open ? 'user-popover' : undefined;

  return (
    <div className="header">
      <div className="header-container">
        <img src={Logo} className="header-logo" alt="Logo" />
        <div className="header-user">
          <Avatar
            className="header-avatar"
            onClick={handleAvatarClick}
            sx={{ cursor: 'pointer', bgcolor: '#673ab7' }}
          >
            {initials}
          </Avatar>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            slotProps={{
              paper: {
                sx: { p: 2, width: 250, boxShadow: 3, borderRadius: 2 },
              },
            }}
          >
            <Box display="flex" alignItems="center" mb={1}>
              <Avatar sx={{ bgcolor: '#673ab7', mr: 1 }}>{initials}</Avatar>
              <Box>
                <Typography fontWeight="bold">
                  {email?.split('@')?.[0]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {email}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={handleLogout}
              sx={{ textTransform: 'none', borderRadius: 2 }}
            >
              Logout
            </Button>
          </Popover>
        </div>
      </div>
    </div>
  );
}
