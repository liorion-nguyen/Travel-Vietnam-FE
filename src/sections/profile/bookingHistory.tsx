import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Pagination,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';
import { useSelector } from 'src/redux/store';
import { BookingType } from 'src/types/redux/booking';

function BookingHistory() {
  const { t } = useTranslation();
  const { bookings } = useSelector((state) => state.booking);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return (
          <Chip
            label={t(tokens.bookingHistory.confirmed)}
            color="success"
          />
        );
      case 'PENDING':
        return (
          <Chip
            label={t(tokens.bookingHistory.pending)}
            color="warning"
          />
        );
      case 'CANCELLED':
        return (
          <Chip
            label={t(tokens.bookingHistory.cancelled)}
            color="error"
          />
        );
      case 'COMPLETED':
        return (
          <Chip
            label={t(tokens.bookingHistory.completed)}
            color="success"
          />
        );
      case 'FAILED':
        return (
          <Chip
            label={t(tokens.bookingHistory.failed)}
            color="error"
          />
        );
      default:
        return <Chip label={status} />;
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const paginatedBookings = bookings?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box>
      <Card>
        <CardHeader
          subheader={t(tokens.bookingHistory.filterSubheader)}
          title={t(tokens.bookingHistory.title)}
        />
        <Divider />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {t(tokens.bookingHistory.bookingId)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {t(tokens.bookingHistory.service)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {t(tokens.bookingHistory.date)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {t(tokens.bookingHistory.amount)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {t(tokens.bookingHistory.status)}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedBookings?.map((booking: BookingType) => (
                  <TableRow key={booking._id}>
                    <TableCell align="center">{booking._id}</TableCell>
                    <TableCell align="center">{booking.bookingType}</TableCell>
                    <TableCell align="center">
                      {new Date(booking.createdAt).toLocaleDateString('vi-VN')}
                    </TableCell>
                    <TableCell align="center">{booking.amount.toLocaleString()} VNĐ</TableCell>
                    <TableCell align="center">{getStatusChip(booking.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={bookings ? Math.ceil(bookings.length / itemsPerPage) : 0}
            page={page}
            onChange={handlePageChange}
            sx={{ alignSelf: 'center', mt: 2 }}
          />
        </CardContent>
        <Divider />
      </Card>
    </Box>
  );
}

export default BookingHistory;
