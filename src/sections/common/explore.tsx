import React, { useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ItemCard from './itemCard';
import { useDispatch, useSelector } from 'src/redux/store';
import { getTours } from 'src/redux/slices/tours';
import { StyledTitleComponent } from 'src/styles/common';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';

const FeaturedTourList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTours());
    }, []);
    const tours = useSelector((state) => state.tours.tours);
    return (
        <Grid container spacing={2}>
            {tours && tours.length > 0 && tours.map((tour: any) => (
                <Grid item lg={3} md={4} sm={6} xs={12} key={tour._id}>
                    <ItemCard data={tour} />
                </Grid>
            ))}
        </Grid>
    );
};

const Explore = () => {
    const { t } = useTranslation();
    return (
        <Container maxWidth="xl">
            <Grid container rowGap={5}>
                <Grid item lg={12} className='mb-5'>
                    <StyledTitleComponent>{t(tokens.explore.title)}</StyledTitleComponent>
                    <Typography variant="h4" className='featured__tour-title'>
                        {t(tokens.explore.subtitle)}
                    </Typography>
                </Grid>
                <FeaturedTourList />
            </Grid>
        </Container>
    );
};

export default Explore;
