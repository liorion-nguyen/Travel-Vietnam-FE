import React from 'react';
import {
  Container,
  Grid,
  Typography,
  IconButton,
  List,
  ListItem,
  Link as MuiLink,
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  GitHub,
  YouTube,
  Facebook,
  Instagram,
  LocationOn,
  MailOutline,
  Phone,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';

const Footer = () => {
  const { t } = useTranslation();

  const quickLinks1 = [
    { path: '/', display: t(tokens.nav.home) },
    { path: '/about', display: t(tokens.nav.about) },
    { path: '/tours', display: t(tokens.nav.tours) },
    { path: '/hotels', display: t(tokens.nav.hotels) },
  ];

  const quickLinks2 = [
    { path: '/gallery', display: t(tokens.nav.gallery) },
    { path: '/login', display: t(tokens.nav.login) },
    { path: '/register', display: t(tokens.nav.register) },
  ];

  return (
    <footer style={{ border: '0.5px solid rgba(22, 82, 125, 0.08)' }}>
      <Container maxWidth="xl">
        <Grid
          container
          spacing={4}
          sx={{ padding: 2.5 }}
        >
          <Grid
            item
            lg={3}
            xs={12}
          >
            <div>
              <img
                src="/assets/logo.png"
                alt="Logo"
                style={{ width: '60%', marginBottom: '1rem' }}
              />
              <Typography sx={{ color: 'text.secondary', fontSize: '1rem' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, enim.
              </Typography>
              <div
                style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '1rem' }}
              >
                <IconButton
                  component={Link}
                  to="#"
                  sx={{ color: 'text.primary' }}
                >
                  <YouTube />
                </IconButton>
                <IconButton
                  component={Link}
                  to="#"
                  sx={{ color: 'text.primary' }}
                >
                  <GitHub />
                </IconButton>
                <IconButton
                  component={Link}
                  to="https://www.facebook.com/chungg.203"
                  sx={{ color: 'text.primary' }}
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  component={Link}
                  to="https://www.instagram.com/chungg.203"
                  sx={{ color: 'text.primary' }}
                >
                  <Instagram />
                </IconButton>
              </div>
            </div>
          </Grid>

          {/* Quick Links 1 */}
          <Grid
            item
            lg={3}
            xs={12}
          >
            <Typography
              variant="h5"
              sx={{ color: 'text.primary', mb: 2 }}
            >
              Discover
            </Typography>
            <List>
              {quickLinks1.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{ p: 0 }}
                >
                  <MuiLink
                    component={Link}
                    to={item.path}
                    sx={{ color: 'text.secondary', fontSize: '1.2rem' }}
                  >
                    {item.display}
                  </MuiLink>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Quick Links 2 */}
          <Grid
            item
            lg={3}
            xs={12}
          >
            <Typography
              variant="h5"
              sx={{ color: 'text.primary', mb: 2 }}
            >
              Quick Links
            </Typography>
            <List>
              {quickLinks2.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{ p: 0 }}
                >
                  <MuiLink
                    component={Link}
                    to={item.path}
                    sx={{ color: 'text.secondary', fontSize: '1.2rem' }}
                  >
                    {item.display}
                  </MuiLink>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Contact Section */}
          <Grid
            item
            lg={3}
            xs={12}
          >
            <Typography
              variant="h5"
              sx={{ color: 'text.primary', mb: 2 }}
            >
              Contact
            </Typography>
            <List sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <ListItem sx={{ p: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Typography
                  variant="h6"
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <LocationOn sx={{ color: '#faa935' }} /> Address:
                </Typography>
                <Typography sx={{ fontSize: '1.2rem' }}>Cầu Giấy, Hà Nội</Typography>
              </ListItem>

              <ListItem sx={{ p: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Typography
                  variant="h6"
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <MailOutline sx={{ color: '#faa935' }} /> Email:
                </Typography>
                <Typography sx={{ fontSize: '1.2rem' }}>stu715105031@hnue.edu.vn</Typography>
              </ListItem>

              <ListItem sx={{ p: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Typography
                  variant="h6"
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <Phone sx={{ color: '#faa935' }} /> Phone:
                </Typography>
                <Typography sx={{ fontSize: '1.2rem' }}>(+84) 708200334</Typography>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
