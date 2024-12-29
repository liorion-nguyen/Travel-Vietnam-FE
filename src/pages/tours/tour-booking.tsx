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
  CardActions,
  TextField,
  MenuItem,
  Rating,
  Divider,
  CircularProgress,
  Link,
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
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { getTourById, getTours } from 'src/redux/slices/tours';
import { localStorageConfig } from 'src/config';
import { handleOpenDialog } from 'src/redux/slices/authentication';
import toast from 'react-hot-toast';
import { getPaymentUrl } from 'src/redux/slices/checkout';
import { BookingType } from 'src/types/redux/checkout';
import { useDialog } from 'src/hooks/use-dialog';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';
import { getHotels } from 'src/redux/slices/hotels';
import { Review, TourType } from 'src/types/redux/tours';
import { HotelType, LocationsType } from 'src/types/redux/hotels';
import ImageModal from 'src/components/common/imageModal/ImageModal';
import { LatLngTuple } from 'leaflet';

const relatedHotelsVietnam = (hotels: HotelType[]) => {
  const calculateAverageRating = (reviews: Review[] | undefined) => {
    if (!reviews || reviews.length === 0) return 5;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(2) as unknown as number;
  };
  return (
    hotels &&
    hotels?.map((hotel, index) => (
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
    ))
  );
};

const relatedToursToday = (tours: TourType[]) => {
  const calculateAverageRating = (reviews: { rating: number }[]) => {
    if (reviews.length === 0) return 5;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(2) as unknown as number;
  };
  return (
    tours &&
    tours?.map((tour, index) => (
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
    ))
  );
};

const TourBookingPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const pathname = location.pathname;
  const id = pathname.split('/').pop();
  const dialog = useDialog();
  const { tour } = useSelector((state: RootState) => state.tours);
  const { tours } = useSelector((state: RootState) => state.tours);
  const { hotels } = useSelector((state: RootState) => state.hotels);
  const [destination, setDestination] = useState<LatLngTuple>([0, 0]);
  const [provinces, setProvinces] = useState<LocationsType[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkInDate, setCheckInDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [checkOutDate, setCheckOutDate] = useState<string>(
    new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (tour) {
      setTotalPrice(tour.price);
    }
    if (!tours) {
      dispatch(getTours());
    }
    if (!hotels) {
      dispatch(getHotels());
    }
  }, [tour]);

  useEffect(() => {
    if (id) {
      dispatch(getTourById(id));
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
        const destination = data.data?.find((p) => p.id === tour?.destination.province);
        setDestination([destination?.latitude || 0, destination?.longitude || 0]);
      } catch (error: unknown) {
        toast.error(`Error fetching provinces: ${String(error)}`);
      }
    };

    fetchProvinces().catch((error: unknown) => {
      toast.error(`Error fetching provinces: ${String(error)}`);
    });
  }, [tour]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const days = (checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24);
      setTotalPrice(days * (tour?.price || 0));
    };

    calculateTotalPrice();
  }, [checkInDate, checkOutDate, tour?.price]);

  const handlePayment = () => {
    const access = localStorage.getItem(localStorageConfig.accessToken);

    if (!access) {
      dialog.handleOpen();
      dispatch(handleOpenDialog('login'));
      toast.error(t(tokens.booking.loginRequired));
      return;
    }

    dispatch(
      getPaymentUrl({
        amount: totalPrice,
        bookingType: BookingType.TOURS,
        guestSize: 2,
        orderId: id || '',
        roomId: '',
        startDate: '',
        endDate: '',
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
  return (
    <Container
      maxWidth="xl"
      sx={{ mt: 4 }}
    >
      {tour ? (
        <>
          <Typography
            variant="h4"
            gutterBottom
            maxWidth="sm"
          >
            {tour?.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              <LocationOnIcon fontSize="small" />{' '}
              {provinces?.find((p) => p.id === tour?.destination.province)?.name} |
            </Typography>
            <Rating
              name="half-rating-read"
              defaultValue={calculateAverageRating(tour?.reviews)}
              precision={0.1}
              readOnly
            />
            <Typography
              variant="subtitle1"
              color="textSecondary"
            >
              ({tour?.reviews.length} {t(tokens.reviews.reviews)})
            </Typography>
          </Box>

          <Grid
            container
            sx={{ mt: 2 }}
            columnSpacing={4}
            rowSpacing={2}
          >
            <Grid
              item
              xs={12}
              md={8}
              sx={{
                '.MuiPaper-root': { border: 0, borderRadius: 0 },
                '.MuiCardContent-root': { padding: 0 },
              }}
            >
              <Card sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <CardMedia
                  component="img"
                  height="400"
                  image={tour?.photos[0]}
                  alt="Tour Image"
                  onClick={() => handleImageClick(tour?.photos[0] || '')}
                />
                <CardContent sx={{ padding: 0 }}>
                  <Grid
                    container
                    spacing={2}
                  >
                    {tour?.photos.slice(0, 6).map((src: string, index: number) => (
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
                  {tour?.desc || 'No description available'}
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
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6">{t(tokens.hotelBooking.booking.title)}</Typography>
                  <TextField
                    label={t(tokens.hotelBooking.booking.from)}
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    fullWidth
                    sx={{ mt: 2 }}
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label={t(tokens.hotelBooking.booking.to)}
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    fullWidth
                    sx={{ mt: 2 }}
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label={t(tokens.hotelBooking.booking.guests)}
                    select
                    defaultValue="2 adults"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    <MenuItem value="1 adult">1 adult</MenuItem>
                    <MenuItem value="2 adults">2 adults</MenuItem>
                    <MenuItem value="3 adults">3 adults</MenuItem>
                  </TextField>
                  <p style={{ textAlign: 'center' }}>{t(tokens.hotelBooking.booking.subtotal)}</p>
                  <Typography
                    variant="h4"
                    sx={{ textAlign: 'center', color: '#faa935' }}
                  >
                    {totalPrice.toLocaleString()} VNĐ
                  </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#faa935', '&:hover': { backgroundColor: '#faa935' } }}
                    onClick={handlePayment}
                    fullWidth
                  >
                    {t(tokens.hotelBooking.booking.confirmBooking)}
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    color="inherit"
                  >
                    {t(tokens.hotelBooking.booking.saveWishlist)}
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    color="inherit"
                  >
                    {t(tokens.hotelBooking.booking.shareActivity)}
                  </Button>
                </CardActions>
              </Card>
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
            data={tour?.reviews || []}
            id={tour?._id || ''}
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

export default TourBookingPage;
