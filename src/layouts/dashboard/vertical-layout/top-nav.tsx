import React, { useEffect, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Dialog,
  Stack,
  MenuItem,
  Container,
  Menu,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { localStorageConfig } from 'src/config';
import LoginPage from 'src/pages/auth/login';
import RegisterPage from 'src/pages/auth/register';
import { RouterLink } from 'src/components/common/router/router-link';
import { StyledButton } from 'src/styles/user/nav-bar';
import { useDispatch, useSelector } from 'src/redux/store';
import { useDialog } from 'src/hooks/use-dialog';
import { handleOpenDialog, logout } from 'src/redux/slices/authentication';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';
import { LanguageSwitch } from '../language-switch';
import ProfileIcon from '@mui/icons-material/Person';
import ForgotPasswordPage from 'src/pages/auth/forgot-password';

export const TopNav = () => {
  const dialog = useDialog();
  const dispatch = useDispatch();
  const headerRef = useRef<HTMLElement | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (headerRef.current) {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
          headerRef.current.style.backgroundColor = '#fff';
          headerRef.current.style.boxShadow = '3px 3px 8px -3px #ddd';
        } else {
          headerRef.current.style.backgroundColor = 'transparent';
          headerRef.current.style.boxShadow = 'none';
        }
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return () => {
      window.removeEventListener('scroll', stickyHeaderFunc);
    };
  }, []);

  const { open } = useSelector((state: any) => state.authentication);

  useEffect(() => {
    if (open === 'login' || open === 'register' || open === 'logout') {
      dialog.handleOpen();
    }
  }, [open]);

  const token = localStorage.getItem(localStorageConfig.accessToken);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openProfileMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { t } = useTranslation();
  const location = useLocation();

  const navLinks = [
    { path: '/', display: t(tokens.nav.home) },
    { path: '/about', display: t(tokens.nav.about) },
    { path: '/tours', display: t(tokens.nav.tours) },
    { path: '/hotels', display: t(tokens.nav.hotels) },
  ];
  return (
    <AppBar
      position="sticky"
      ref={headerRef}
      sx={{
        backgroundColor: 'transparent',
        transition: 'background-color 0.3s ease',
        boxShadow: 'none',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', gap: 2.5 }}>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Link to="/">
              <img
                src="/assets/logo.png"
                alt="Logo"
                style={{ height: '50px' }}
              />
            </Link>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            {navLinks.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                style={{ textDecoration: 'none', color: '#0b2727' }}
                className={({ isActive }) => (isActive ? 'active__link' : '')}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    fontSize: '1.5rem',
                    '&:hover': { color: '#faa935' },
                    color:
                      location.pathname === item.path ||
                      (item.path !== '/' && location.pathname.startsWith(item.path))
                        ? '#faa935'
                        : '#0b2727',
                  }}
                >
                  {item.display}
                </Typography>
              </NavLink>
            ))}
          </Box>
          <LanguageSwitch />
          {token ? (
            <IconButton onClick={handleClick}>
              <ProfileIcon />
            </IconButton>
          ) : (
            <>
              <MenuItem
                onClick={() => {
                  dialog.handleOpen();
                  dispatch(handleOpenDialog('login'));
                }}
                sx={{
                  background: '#faa935',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '0.4rem 1.5rem',
                  ':hover': {
                    background: '#ff7e01',
                  },
                }}
              >
                {t(tokens.nav.login)}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dialog.handleOpen();
                  dispatch(handleOpenDialog('register'));
                }}
                sx={{
                  background: '#ff7e01',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '0.4rem 1.5rem',
                  ':hover': {
                    background: '#ff7e01',
                  },
                }}
              >
                {t(tokens.nav.register)}
              </MenuItem>
            </>
          )}
          <Menu
            anchorEl={anchorEl}
            open={openProfileMenu}
            onClose={handleClose}
          >
            <RouterLink href="/profile">
              <MenuItem>{t(tokens.nav.profile)}</MenuItem>
            </RouterLink>
            {/* <MenuItem
              onClick={() => {
                // Chuyển hướng đến trang cài đặt
              }}
            >
              {t(tokens.nav.settings)}
            </MenuItem> */}
            <MenuItem
              onClick={() => {
                dialog.handleOpen();
                dispatch(handleOpenDialog('logout'));
              }}
            >
              {t(tokens.nav.logout)}
            </MenuItem>
          </Menu>

          {open !== '' && (
            <Dialog
              fullWidth
              maxWidth="sm"
              onClose={() => {
                dialog.handleClose();
                dispatch(handleOpenDialog(''));
              }}
              open={dialog.open}
            >
              <Stack p={4}>
                {open === 'login' && <LoginPage />}
                {open === 'register' && <RegisterPage />}
                {open === 'forgot-password' && <ForgotPasswordPage />}
                {open === 'logout' && (
                  <Stack spacing={2}>
                    <Typography
                      variant="h6"
                      textAlign="center"
                    >
                      Bạn có muốn đăng xuất hay không!
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      justifyContent="space-around"
                    >
                      <RouterLink href="/">
                        <StyledButton
                          variant="contained"
                          sx={{
                            background: '#faa935',
                            ':hover': {
                              background: '#ff7e01',
                            },
                          }}
                          onClick={() => {
                            dispatch(logout());
                            dialog.handleClose();
                          }}
                        >
                          Đăng xuất
                        </StyledButton>
                      </RouterLink>
                      <StyledButton
                        variant="outlined"
                        color="inherit"
                        onClick={dialog.handleClose}
                      >
                        Hủy
                      </StyledButton>
                    </Stack>
                  </Stack>
                )}
              </Stack>
            </Dialog>
          )}

          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: 'block', md: 'none' }, color: 'black' }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer}
        >
          <List sx={{ width: 250 }}>
            {navLinks.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={toggleDrawer}
              >
                <NavLink
                  to={item.path}
                  style={{ textDecoration: 'none', color: '#0b2727', width: '100%' }}
                  className={({ isActive }) => (isActive ? 'active__link' : '')}
                >
                  <ListItemText primary={item.display} />
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Container>
    </AppBar>
  );
};
