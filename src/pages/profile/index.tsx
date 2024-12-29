import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Container,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BirthdayCakeIcon from '@mui/icons-material/Cake';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Information from 'src/sections/profile/information';
import BookingHistory from 'src/sections/profile/bookingHistory';
import { dispatch, useSelector } from 'src/redux/store';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';
import { getUser } from 'src/redux/slices/user';
import { getBookings } from 'src/redux/slices/booking';
import { Seo } from 'src/components/common/performance/seo';

const ProfilePage = () => {
  const [mode, setMode] = useState<'information' | 'booking' | 'newsletter' | 'notification'>(
    'information'
  );
  const { user } = useSelector((state) => state.user);
  const [province, setProvince] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getBookings());
  }, []);

  useEffect(() => {
    const fetchProvinces = async (): Promise<void> => {
      try {
        const response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm');
        const data = await response.json();
        if (data && data.data && Array.isArray(data.data)) {
          for (const item of data.data) {
            if (item.id == user?.address.province) {
              setProvince(item.name);
            }
          }
        }
      } catch (error: unknown) {
        toast.error(`Error fetching provinces: ${String(error)}`);
      }
    };

    fetchProvinces().catch((error: unknown) => {
      toast.error(`Error fetching provinces: ${String(error)}`);
    });
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <Container
      maxWidth="xl"
      sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}
    >
      <Seo title={t(tokens.profile.title)} />
      {
        !user ?
          <CircularProgress />
          :
          <>
            <Box
              width="25%"
              bgcolor="white"
              p={2}
              borderRadius="8px"
              boxShadow="0 2px 10px rgba(0,0,0,0.1)"
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mb={3}
              >
                <Box position="relative">
                  <input
                    ref={fileInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    type="file"
                    onChange={handleImageUpload}
                  />
                  <Avatar
                    src={image || '/assets/avatars/profile.svg'}
                    sx={{ width: 100, height: 100, mb: 1 }}
                  />
                  <IconButton
                    onClick={handleClick}
                    sx={{
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                      backgroundColor: 'white',
                      p: 0.5,
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Typography variant="h6">{user?.fullName}</Typography>
                <Box
                  display="flex"
                  gap={1}
                  mt={1}
                >
                  <LocationOnIcon color="disabled" />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    {province}
                  </Typography>
                  <Divider
                    orientation="vertical"
                    flexItem
                  />
                  <BirthdayCakeIcon
                    color="disabled"
                    fontSize="small"
                  />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    {user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : ''}
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <List>
                <ListItem
                  button
                  onClick={() => setMode('information')}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: mode === 'information' ? 'primary.light' : 'transparent',
                  }}
                >
                  <ListItemText primary={t(tokens.profile.information)} />
                </ListItem>
                <ListItem
                  button
                  onClick={() => setMode('booking')}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: mode === 'booking' ? 'primary.light' : 'transparent',
                  }}
                >
                  <ListItemText primary={t(tokens.profile.booking)} />
                </ListItem>

              </List>
            </Box>
            <Box
              flexGrow={1}
              ml={4}
            >
              {mode === 'information' && <Information />}
              {mode === 'booking' && <BookingHistory />}
            </Box>
          </>
      }


    </Container>
  );
};

export default ProfilePage;
