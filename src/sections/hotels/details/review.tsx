import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Rating, Avatar, Divider, TextField, MenuItem, Button } from '@mui/material';
import { Review } from 'src/types/redux/tours';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';
import { dispatch } from 'src/redux/store';
import { createReviewTour } from 'src/redux/slices/tours';
import { useLocation } from 'react-router';
import { createReviewHotel } from 'src/redux/slices/hotels';

const CustomerReview = ({ data, id }: { data: Review[], id: string }) => {
    const { t } = useTranslation();
    const pathname = useLocation();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const calculateAverageRating = (reviews: { rating: number }[]) => {
        if (reviews.length === 0) return 0;
        const total = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (total / reviews.length).toFixed(2);
    };

    const averageRating = calculateAverageRating(data);

    const handleRating = (value: number) => {
        if (value > 4) {
            return t(tokens.reviews.great);
        }
        if (value > 3) {
            return t(tokens.reviews.quiteGood);
        }
        return t(tokens.reviews.bad);
    };
    
    const handleSubmit = async () => {
        if (pathname.pathname.includes('tours')) {
            await dispatch(createReviewTour(review, rating, id));
        } else {
            await dispatch(createReviewHotel(review, rating, id));
        }
        setReview('');
        setRating(0);
    };
    return (
        <Container maxWidth="xl" sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5" gutterBottom>
                {t(tokens.reviews.title)}
            </Typography>
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'end', mb: 2 }}>
                    <Typography variant="h3" sx={{ mr: 1 }}>{averageRating}</Typography>
                    <Typography variant="body1" sx={{ ml: 1 }}>{data.length} {t(tokens.reviews.reviews)}</Typography>
                </Box>
                <Rating value={Number(averageRating)} readOnly precision={0.1} sx={{ fontSize: '3rem' }} />
            </Box>

            <Grid container columnSpacing={2} sx={{ mb: 2, mt: 0, backgroundColor: '#F8FAFC', border: '0.5px solid rgba(22, 82, 125, 0.08)', borderRadius: '5px', padding: 2 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField select label={t(tokens.reviews.filtering)} fullWidth>
                        <MenuItem value="recommended">{t(tokens.reviews.recommended)}</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField select label={t(tokens.reviews.travelerType)} fullWidth>
                        <MenuItem value="all">{t(tokens.reviews.all)}</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField select label={t(tokens.reviews.rating)} fullWidth>
                        <MenuItem value="all">{t(tokens.reviews.all)}</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField label={t(tokens.reviews.searchHere)} fullWidth />
                </Grid>
            </Grid>

            {data.map((review: Review, index: number) => (
                <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Avatar sx={{ mr: 2 }} src={review.avatar} />
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold">{review.fullName}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {new Date(review.updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </Typography>
                        </Box>
                    </Box>
                    <Rating value={review.rating} readOnly size="small" precision={0.1} />
                    <Typography variant="body2" color="textSecondary">{review.reviewText}</Typography>
                    <Divider sx={{ mt: 2 }} />
                </Box>
            ))}
            {
                data.length > 5 && (
                    <Typography
                        variant="h6"
                        sx={{
                            mt: 2,
                            textAlign: 'center',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                            color: '#faa935',
                        }}
                    >
                        {t(tokens.reviews.viewMore)}
                    </Typography>
                )
            }
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h5" sx={{ mt: 2 }}>{t(tokens.reviews.writeReview)}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Rating value={rating} precision={0.1} onChange={(e, newValue: number | null) => setRating(newValue || 0)} />
                    <Typography variant="body1">{handleRating(rating)}</Typography>
                </Box>
                <TextField label={t(tokens.reviews.writeReview)} fullWidth value={review} onChange={(e) => setReview(e.target.value)} />
                <Button variant="contained" disabled={!review || rating === 0} color="primary" onClick={handleSubmit}>{t(tokens.reviews.submit)}</Button>
            </Box>
        </Container>
    );
};

export default CustomerReview;
