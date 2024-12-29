import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  FormControl,
  Menu,
  IconButton,
  Typography,
  Container,
  Grid,
  Popover,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { DateRange } from 'react-date-range';
import { enGB } from 'date-fns/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { StyledTitleComponent } from 'src/styles/common';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';
import { useDispatch } from 'src/redux/store';
import { getTours } from 'src/redux/slices/tours';

interface Location {
  id: string;
  name: string;
}

const FormFieldTour = () => {
  const { t } = useTranslation();
  const [destination, setDestination] = useState('');
  const [departurePoint, setDeparturePoint] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [room, setRoom] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElDate, setAnchorElDate] = useState(null);
  const [provinces, setProvinces] = useState<Location[]>([]);
  const open = Boolean(anchorEl);
  const openDate = Boolean(anchorElDate);
  const textFieldRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const [bookedDates, setBookedDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleSelect = (ranges: any) => {
    setBookedDates(ranges.selection);
  };

  const handleIncrease = (type: any) => {
    if (type === 'Người lớn') setAdults((prev) => prev + 1);
    if (type === 'Trẻ em') setChildren((prev) => prev + 1);
    if (type === 'Số phòng') setRoom((prev) => prev + 1);
  };

  const handleDecrease = (type: any) => {
    if (type === 'Người lớn' && adults > 1) setAdults((prev) => prev - 1);
    if (type === 'Trẻ em' && children > 0) setChildren((prev) => prev - 1);
    if (type === 'Số phòng' && room > 0) setRoom((prev) => prev - 1);
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickDate = (event: any) => {
    setAnchorElDate(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClosePopover = () => {
    setAnchorElDate(null);
  };

  const formatDate = (date: any) => {
    return date.toLocaleDateString();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(
        getTours(
          0,
          9,
          hotelName,
          destination ? provinces.find((province) => province.name === destination)?.id : '',
          departurePoint ? provinces.find((province) => province.name === departurePoint)?.id : ''
        )
      );
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [destination, hotelName, departurePoint]);
  

  useEffect(() => {
    fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
      .then((response) => response.json())
      .then((data) => {
        setProvinces(data.data);
      });
  }, []);

  return (
    <Container maxWidth="xl">
      <StyledTitleComponent>{t(tokens.tours.bookTour)}</StyledTitleComponent>

      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          sm={6}
        >
          <TextField
            select
            label={t(tokens.tours.destination)}
            name="address.province"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            fullWidth
          >
            {provinces.map((province) => (
              <MenuItem
                key={province.name}
                value={province.name}
              >
                {province.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
        >
          <TextField
            select
            label={t(tokens.tours.departurePoint)}
            name="address.province"
            value={departurePoint}
            onChange={(e) => setDeparturePoint(e.target.value)}
            fullWidth
          >
            {provinces.map((province) => (
              <MenuItem
                key={province.name}
                value={province.name}
              >
                {province.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
        >
          <TextField
            fullWidth
            label={t(tokens.tours.tourName)}
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
        >
          <FormControl
            fullWidth
            sx={{ mb: 2 }}
          >
            <TextField
              label={t(tokens.tours.departureDate)}
              value={`${formatDate(bookedDates.startDate)} - ${formatDate(bookedDates.endDate)}`}
              onClick={handleClickDate}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              ref={textFieldRef}
            />
            <Popover
              open={openDate}
              anchorEl={anchorElDate}
              onClose={handleClosePopover}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              PaperProps={{
                style: {
                  width: textFieldRef.current ? textFieldRef.current.offsetWidth : 'auto',
                },
              }}
            >
              <Box
                p={2}
                sx={{ width: '100%', '.rdrCalendarWrapper, .rdrMonth': { width: '100%' } }}
              >
                <DateRange
                  ranges={[bookedDates]}
                  onChange={handleSelect}
                  locale={enGB}
                  minDate={new Date()}
                />
              </Box>
            </Popover>
          </FormControl>
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
        >
          <FormControl
            fullWidth
            sx={{ mb: 2 }}
          >
            <TextField
              id="guest-selector"
              label={t(tokens.tours.passengers)}
              variant="outlined"
              value={`${t(tokens.tours.adults)}: ${adults}${
                children !== 0 ? `, ${t(tokens.tours.children)}: ${children}` : ''
              }`}
              onClick={handleClick}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              PaperProps={{
                style: {
                  width: textFieldRef.current ? textFieldRef.current.offsetWidth : 'auto',
                },
              }}
            >
              <Box>
                <MenuItem>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Typography>{t(tokens.tours.adults)}</Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="10px"
                    >
                      <IconButton
                        onClick={() => handleDecrease('Người lớn')}
                        disabled={adults <= 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{adults}</Typography>
                      <IconButton onClick={() => handleIncrease('Người lớn')}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </MenuItem>

                <MenuItem>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Typography>{t(tokens.tours.children)}</Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="10px"
                    >
                      <IconButton
                        onClick={() => handleDecrease('Trẻ em')}
                        disabled={children <= 0}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{children}</Typography>
                      <IconButton onClick={() => handleIncrease('Trẻ em')}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </MenuItem>
              </Box>
            </Menu>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FormFieldTour;
