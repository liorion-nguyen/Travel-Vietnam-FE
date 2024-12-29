import React, { useEffect } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useLocation } from 'react-router';
import { paymentReturn } from 'src/redux/slices/checkout';
import { useDispatch, useSelector } from 'src/redux/store';
import { ParamsReturn } from 'src/types/redux/checkout';

const VnPayResult: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(queryParams.entries());
  const dispatch = useDispatch();
  const { vnpayReturn } = useSelector((state) => state.checkout);

  useEffect(() => {
    dispatch(paymentReturn(params as unknown as ParamsReturn));
  }, []);

  return (
    vnpayReturn && (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f5f5f5"
      >
        <Paper
          elevation={3}
          sx={{ p: 4, maxWidth: 600, textAlign: 'center' }}
        >
          {vnpayReturn && vnpayReturn?.status === 'CONFIRMED' && params.vnp_BankCode !== 'VNPAY' ? (
            <>
              <CheckCircleOutlineIcon
                color="success"
                fontSize="large"
              />
              <Typography
                variant="h5"
                color="green"
                mt={2}
              >
                Thanh toán thành công!
              </Typography>

              <Typography
                variant="body1"
                mt={2}
              >
                Loại: {vnpayReturn.bookingType}
              </Typography>

              <Typography variant="body1">Số tiền: {vnpayReturn.amount} VND</Typography>
              <Typography variant="body1">Mã giao dịch: {vnpayReturn.txnRef}</Typography>
              <Button
                variant="contained"
                color="primary"
                href="/"
                sx={{ mt: 3 }}
              >
                Trở về
              </Button>
            </>
          ) : (
            <>
              <ErrorOutlineIcon
                color="error"
                fontSize="large"
              />
              <Typography
                variant="h5"
                color="red"
                mt={2}
              >
                Thanh toán thất bại!
              </Typography>
              <Typography
                variant="body1"
                mt={2}
              >
                Đơn hàng của bạn đã bị hủy hoặc có lỗi xảy ra.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href="/"
                sx={{ mt: 3 }}
              >
                Trở về
              </Button>
            </>
          )}
        </Paper>
      </Box>
    )
  );
};

export default VnPayResult;
