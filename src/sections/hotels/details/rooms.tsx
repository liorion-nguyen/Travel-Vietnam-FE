import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  Grid,
  DialogActions,
  TextField,
  DialogContent,
  DialogTitle,
  Dialog,
  Divider,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';

export const RoomOptionItem: React.FC<{
  id: string;
  title: string;
  details: string;
  price: number;
  adults?: number;
  startDate?: Date | null;
  endDate?: Date | null;
  handlePayment?: (
    price: number,
    roomId: string,
    guestSize: number,
    startDate: string,
    endDate: string
  ) => void;
  isPopular?: boolean;
}> = ({ id, title, details, price, adults, handlePayment, startDate, endDate }) => {
  const [open, setOpen] = useState(false);

  const [error, setError] = useState('');

  const totalPrice =
    price * (endDate && startDate ? dayjs(endDate).diff(dayjs(startDate), 'day') : 0);
  const { t } = useTranslation();
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  const handleConfirm = () => {
    if (error || totalPrice === 0) {
      toast.error('Thông tin chưa hợp lệ');
      return;
    }

    const guestSize = adults || 1;
    if (handlePayment) {
      handlePayment(
        totalPrice,
        id,
        guestSize,
        startDate ? startDate.toISOString() : '',
        endDate ? endDate.toISOString() : ''
      );
    }
    handleClose();
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mb: 3,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          p: 3,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            container
            xs={12}
            sx={{
              background: '#f5f5f5',
              borderRadius: 1,
              p: 1,
              mb: 2,
            }}
          >
            <Grid
              item
              xs={6}
            >
              <Typography
                variant="subtitle1"
                fontWeight="bold"
              >
                {t(tokens.hotels.roomSelect)}
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
            >
              <Typography
                variant="subtitle1"
                fontWeight="bold"
              >
                {t(tokens.hotels.roomGuest)}
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ textAlign: 'right' }}
            >
              <Typography
                variant="subtitle1"
                fontWeight="bold"
              >
                {t(tokens.hotels.roomPrice)}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            item
            xs={6}
          >
            <Typography variant="body2">{title}</Typography>
            <Typography variant="body2">{details}</Typography>
          </Grid>

          <Grid
            item
            xs={2}
          >
            <Stack
              mt={2}
              direction="row"
            >
              {Array.from({ length: adults || 2 }).map((_, index) => (
                <PersonIcon
                  key={index}
                  color="primary"
                  sx={{
                    fontSize: 32,
                    mt: 0.5,
                  }}
                />
              ))}
            </Stack>
          </Grid>

          <Grid
            item
            xs={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <Typography
              sx={{
                background: '#e3f2fd',
                borderRadius: 1,
                px: 1,
                fontSize: '0.85rem',
              }}
            >
              {t(tokens.hotels.roomSpecial)}
            </Typography>
            <Typography
              variant="h5"
              color="primary"
              sx={{ mt: 1, fontWeight: 'bold' }}
            >
              {price.toLocaleString()} VNĐ
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', mt: 0.5 }}
            >
              {t(tokens.hotels.roomTax)}
            </Typography>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleClickOpen}
          sx={{
            mt: 3,
            alignSelf: 'flex-end',
            textTransform: 'none',
            px: 3,
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#faaf00',
            },
          }}
        >
          {t(tokens.hotels.roomBook)}
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{t(tokens.hotels.roomBill)}</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label={t(tokens.hotels.roomStart)}
              type="date"
              name="startDate"
              InputLabelProps={{ shrink: true }}
              value={startDate ? dayjs(startDate).format('YYYY-MM-DD') : ''}
            />
            <TextField
              label={t(tokens.hotels.roomEnd)}
              type="date"
              name="endDate"
              InputLabelProps={{ shrink: true }}
              value={endDate ? dayjs(endDate).format('YYYY-MM-DD') : ''}
            />
            <Divider />
            <Typography variant="body2">
              <strong>{t(tokens.hotels.pricePerNight)}:</strong> {price.toLocaleString()} VNĐ
            </Typography>
            <Typography variant="body2">
              <strong>{t(tokens.hotels.numberOfNights)}:</strong>{' '}
              {startDate && endDate ? dayjs(endDate).diff(dayjs(startDate), 'day') : 0}
            </Typography>
            <Typography
              variant="h6"
              color="primary"
            >
              <strong>{t(tokens.hotels.totalAmount)}:</strong> {totalPrice.toLocaleString()} VNĐ
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="secondary"
          >
            {t(tokens.hotels.cancel)}
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            color="primary"
          >
            {t(tokens.hotels.confirm)}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
