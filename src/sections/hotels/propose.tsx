import React, { useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import { StyledTitleComponent } from 'src/styles/common';
import ItemCard from '../common/itemCard';
import { dispatch, RootState, useSelector } from 'src/redux/store';
import { getHotels } from 'src/redux/slices/hotels';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';

const ProposeHotel = () => {
    const { t } = useTranslation();
    const { hotels } = useSelector((state: RootState) => state.hotels);
    useEffect(() => {
        dispatch(getHotels());
    }, []);
    
    return (
        <Container maxWidth="xl">
            <StyledTitleComponent>{t(tokens.common.propose)}</StyledTitleComponent>
            <Grid container spacing={2}>
                {hotels?.map((hotel: any, index: number) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <ItemCard data={hotel} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProposeHotel;
