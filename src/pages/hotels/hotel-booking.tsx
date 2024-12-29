import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Divider,
  CircularProgress,
  Link,
  Stack,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CancelIcon from '@mui/icons-material/Cancel';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TranslateIcon from '@mui/icons-material/Translate';
import Maps from 'src/sections/common/map';
import Testimonials from 'src/sections/common/testimonials';
import CustomerReview from 'src/sections/hotels/details/review';
import { useDispatch, useSelector, RootState } from 'src/redux/store';
import { getPaymentUrl } from 'src/redux/slices/checkout';
import { localStorageConfig } from 'src/config';
import { useDialog } from 'src/hooks/use-dialog';
import { handleOpenDialog } from 'src/redux/slices/authentication';
import toast from 'react-hot-toast';
import { BookingType } from 'src/types/redux/checkout';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';
import { getHotelById, getHotels, getRooms } from 'src/redux/slices/hotels';
import { HotelType, LocationsType } from 'src/types/redux/hotels';
import { getTours } from 'src/redux/slices/tours';
import { Review, TourType } from 'src/types/redux/tours';
import ImageModal from 'src/components/common/imageModal/ImageModal';
import { LatLngTuple } from 'leaflet';
import { RoomOptionItem } from 'src/sections/hotels/details/rooms';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const relatedHotelsVietnam = (hotels: HotelType[]) => {
  const calculateAverageRating = (reviews: Review[] | undefined) => {
    if (!reviews || reviews.length === 0) return 5;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(2) as unknown as number;
  };
  return hotels?.map((hotel, index) => (
    <Card key={index}>
      <Link
        href={`/hotels/${hotel._id}`}
        underline="none"
      >
        <CardMedia
          component="img"
          height="140"
          image={hotel.photos[0]}
          alt={hotel.name}
        />
        <CardContent>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
          >
            {hotel.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
          >
            {hotel.description}
          </Typography>
          {hotel.reviews.map((review, i) => (
            <Typography
              variant="body2"
              color="textSecondary"
              key={i}
            >
              {review.reviewText}
            </Typography>
          ))}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Rating
              value={calculateAverageRating(hotel.reviews)}
              readOnly
              size="small"
            />
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ ml: 1 }}
            >
              {hotel.reviews.length} reviews
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{ mt: 1 }}
          >
            {hotel.price.toLocaleString()} VNĐ/person
          </Typography>
        </CardContent>
      </Link>
    </Card>
  ));
};

const relatedToursToday = (tours: TourType[]) => {
  const calculateAverageRating = (reviews: { rating: number }[]) => {
    if (reviews.length === 0) return 5;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(2) as unknown as number;
  };
  return tours?.map((tour, index) => (
    <Card key={index}>
      <Link
        href={`/tours/${tour._id}`}
        underline="none"
      >
        <CardMedia
          component="img"
          height="140"
          image={tour.photos[0]}
          alt={tour.title}
        />
        <CardContent>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
          >
            {tour.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
          >
            {tour.desc}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Rating
              value={calculateAverageRating(tour.reviews)}
              readOnly
              size="small"
            />
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ ml: 1 }}
            >
              {tour.reviews.length} reviews
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{ mt: 1 }}
          >
            {tour.price.toLocaleString()} VNĐ/person
          </Typography>
        </CardContent>
      </Link>
    </Card>
  ));
};

const HotelBookingPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const pathname = location.pathname;
  const id = pathname.split('/').pop();
  const dialog = useDialog();
  const { hotelId } = useParams();
  const { tours } = useSelector((state: RootState) => state.tours);
  const { hotels, hotel, rooms } = useSelector((state: RootState) => state.hotels);
  const [provinces, setProvinces] = useState<LocationsType[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [destination, setDestination] = useState<LatLngTuple>([0, 0]);

  useEffect(() => {
    if (hotel) {
      setTotalPrice(hotel.price);
    }
    if (!tours) {
      dispatch(getTours());
    }
    if (!hotels) {
      dispatch(getHotels());
    }
  }, [hotel]);

  useEffect(() => {
    if (id) {
      dispatch(getHotelById(id));
    }
  }, [id]);

  useEffect(() => {
    const fetchProvinces = async (): Promise<void> => {
      try {
        const response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm');
        const data: { data: LocationsType[] } = (await response.json()) as {
          data: LocationsType[];
        };
        setProvinces(data.data);
        const destination = data.data?.find((p) => p.id === hotel?.address.province);
        setDestination([destination?.latitude || 0, destination?.longitude || 0]);
      } catch (error: unknown) {
        toast.error(`Error fetching provinces: ${String(error)}`);
      }
    };

    fetchProvinces().catch((error: unknown) => {
      toast.error(`Error fetching provinces: ${String(error)}`);
    });
  }, [hotel]);

  const handlePayment = (
    price: number,
    roomId: string,
    guestSize: number,
    startDate: string,
    endDate: string
  ) => {
    const access = localStorage.getItem(localStorageConfig.accessToken);

    if (!access) {
      dialog.handleOpen();
      dispatch(handleOpenDialog('login'));
      toast.error(t(tokens.booking.loginRequired));
      return;
    }

    dispatch(
      getPaymentUrl({
        amount: price,
        bookingType: BookingType.HOTELS,
        roomId: roomId,
        guestSize: guestSize,
        orderId: hotelId || '',
        startDate: startDate,
        endDate: endDate,
      })
    );
  };

  const features = [
    {
      icon: <CancelIcon sx={{ color: '#faa935' }} />,
      title: t(tokens.hotelBooking.features.freeCancellation.title),
      description: t(tokens.hotelBooking.features.freeCancellation.description),
    },
    {
      icon: <HealthAndSafetyIcon sx={{ color: '#faa935' }} />,
      title: t(tokens.hotelBooking.features.healthPrecautions.title),
      description: t(tokens.hotelBooking.features.healthPrecautions.description),
    },
    {
      icon: <MobileFriendlyIcon sx={{ color: '#faa935' }} />,
      title: t(tokens.hotelBooking.features.mobileTicketing.title),
      description: t(tokens.hotelBooking.features.mobileTicketing.description),
    },
    {
      icon: <AccessTimeIcon sx={{ color: '#faa935' }} />,
      title: t(tokens.hotelBooking.features.duration.title),
      description: t(tokens.hotelBooking.features.duration.description),
    },
    {
      icon: <FlashOnIcon sx={{ color: '#faa935' }} />,
      title: t(tokens.hotelBooking.features.instantConfirmation.title),
      description: t(tokens.hotelBooking.features.instantConfirmation.description),
    },
    {
      icon: <TranslateIcon sx={{ color: '#faa935' }} />,
      title: t(tokens.hotelBooking.features.service.title),
      description: t(tokens.hotelBooking.features.service.description),
    },
  ];

  const calculateAverageRating = (reviews: Review[] | undefined) => {
    if (!reviews || reviews.length === 0) return 5;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(2) as unknown as number;
  };

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    setModalOpen(true);
  };
  const [showAll, setShowAll] = useState(false);
  const visibleRooms = showAll ? rooms : rooms && rooms.slice(0, 2);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleSearch = () => {
    if (startDate && endDate) {
      dispatch(getRooms(hotelId || '', startDate.toISOString(), endDate.toISOString()));
    } else {
      toast.error('Please select both start and end dates');
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ mt: 4 }}
    >
      {hotel ? (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
          >
            <Stack>
              <Typography
                variant="h4"
                gutterBottom
                maxWidth="sm"
              >
                {hotel?.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                >
                  <LocationOnIcon fontSize="small" />{' '}
                  {provinces?.find((p) => p.id === hotel?.address.province)?.name} |
                </Typography>
                <Rating
                  name="half-rating-read"
                  defaultValue={calculateAverageRating(hotel?.reviews)}
                  precision={0.1}
                  readOnly
                />
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                >
                  ({hotel?.reviews.length} {t(tokens.reviews.reviews)})
                </Typography>
              </Box>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
            >
              <Stack>
                <Typography>{t(tokens.hotels.pricePerNight)}</Typography>
                <Typography
                  variant="h5"
                  sx={{ color: '#faa935' }}
                >
                  {totalPrice.toLocaleString()} VNĐ
                </Typography>
              </Stack>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#faa935',
                  '&:hover': { backgroundColor: '#faa935' },
                  height: 'fit-content',
                }}
                onClick={() => {
                  const targetElement = document.getElementById('rooms');
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                {t(tokens.hotelBooking.booking.selectRoom)}
              </Button>
            </Stack>
          </Stack>

          <Grid
            container
            sx={{ mt: 2 }}
            columnSpacing={4}
            rowSpacing={2}
          >
            <Grid
              item
              xs={12}
              sx={{
                '.MuiPaper-root': { border: 0, borderRadius: 0 },
                '.MuiCardContent-root': { padding: 0 },
              }}
            >
              <Card sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <CardMedia
                  component="img"
                  height="400"
                  image={hotel?.photos[0]}
                  alt="Tour Image"
                  onClick={() => handleImageClick(hotel?.photos[0] || '')}
                />
                <CardContent sx={{ padding: 0 }}>
                  <Grid
                    container
                    spacing={2}
                  >
                    {hotel?.photos.slice(0, 6).map((src: string, index: number) => (
                      <Grid
                        item
                        xs={2}
                        key={index}
                      >
                        <img
                          src={src}
                          alt={`Thumbnail ${index}`}
                          style={{ width: '100%', height: '100%', cursor: 'pointer' }}
                          onClick={() => handleImageClick(src)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
              <Box
                sx={{
                  mt: 4,
                  p: 2,
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  backgroundColor: '#f9f9f9',
                }}
              >
                <Grid
                  container
                  spacing={2}
                >
                  {features.map((feature, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      key={index}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
                        {feature.icon}
                        <Box>
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                          >
                            {feature.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                          >
                            {feature.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6">{t(tokens.hotelBooking.description)}</Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                >
                  {hotel?.description || 'No description available'}
                </Typography>
              </Box>
              <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ color: '#faa935', textDecoration: 'underline' }}
                >
                  {t(tokens.hotelBooking.openInGoogleMaps)}
                </Typography>
                <Maps destination={destination} />
              </Box>
              <Stack
                direction="row"
                sx={{ mt: 4 }}
                spacing={2}
                id="rooms"
              >
                <Card sx={{ mt: 4, p: 2, borderRadius: 4, width: '100%' }}>
                  <Typography
                    variant="h5"
                    color="text.primary"
                    mb={2}
                  >
                    {t(tokens.hotels.room)}
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack
                      direction="row"
                      spacing={2}
                      mb={2}
                    >
                      <DatePicker
                        label={t(tokens.hotels.roomStart)}
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                        slotProps={{ textField: { fullWidth: true } }}
                      />
                      <DatePicker
                        label={t(tokens.hotels.roomEnd)}
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                        slotProps={{ textField: { fullWidth: true } }}
                      />
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#faa935',
                          '&:hover': { backgroundColor: '#faa935' },
                        }}
                        onClick={handleSearch}
                      >
                        {t(tokens.layout.search)}
                      </Button>
                    </Stack>
                  </LocalizationProvider>
                  {rooms && rooms.length === 0 && (
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      mb={2}
                    >
                      {t(tokens.hotelBooking.noRoomsAvailable)}
                    </Typography>
                  )}
                  <Grid
                    container
                    spacing={2}
                  >
                    <Grid
                      item
                      xs={12}
                    >
                      {visibleRooms &&
                        visibleRooms.map((room, index) => (
                          <Stack key={index}>
                            <RoomOptionItem
                              id={room._id}
                              title={t(tokens.hotels.roomsAvailable) + ' : ' + room.roomNumber}
                              details={t(tokens.hotels.roomType) + ' : ' + room.roomType}
                              price={room.price}
                              adults={room.maxOccupancy}
                              handlePayment={handlePayment}
                              startDate={startDate}
                              endDate={endDate}
                            />
                          </Stack>
                        ))}
                      {rooms && rooms.length > 2 && !showAll && (
                        <Stack justifyContent="center">
                          <Button
                            variant="outlined"
                            sx={{ mt: 2 }}
                            onClick={() => setShowAll(true)}
                          >
                            {t(tokens.hotels.showMore)}
                          </Button>
                        </Stack>
                      )}
                    </Grid>
                  </Grid>
                </Card>
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Box sx={{ mt: 4, '.MuiContainer-root': { padding: 0 } }}>
            <Typography variant="h6">{t(tokens.hotelBooking.relatedHotels.today)}</Typography>
            {tours && <Testimonials Html={relatedToursToday(tours)} />}
          </Box>
          <Divider sx={{ my: 4 }} />
          <Box sx={{ mt: 4, '.MuiContainer-root': { padding: 0 } }}>
            <Typography variant="h6">{t(tokens.hotelBooking.relatedHotels.vietnam)}</Typography>
            {hotels && <Testimonials Html={relatedHotelsVietnam(hotels)} />}
          </Box>
          <Divider sx={{ my: 4 }} />
          <CustomerReview
            data={hotel?.reviews || []}
            id={hotel?._id || ''}
          />
          <ImageModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            imageSrc={selectedImage || ''}
          />
        </>
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
};

export default HotelBookingPage;
