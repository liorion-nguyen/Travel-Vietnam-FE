import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
import { Col } from 'reactstrap'
import ServiceCard from './serviceCard'
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';

const ServicesSection = () => {
    const { t } = useTranslation();
    const servicesData = [
        {
            imgUrl: "./assets/home/service/weather.png",
            title: t(tokens.service.weather.title),
            desc: t(tokens.service.weather.description),
        },
        {
            imgUrl: './assets/home/service/guide.png',
            title: t(tokens.service.guide.title),
            desc: t(tokens.service.guide.description),
        },
        {
            imgUrl: './assets/home/service/customization.png',
            title: t(tokens.service.customization.title),
            desc: t(tokens.service.customization.description),
        },
    ]
    return (
        <section>
            <Container maxWidth='xl'>
                <Grid container spacing={4}>
                    <Grid item lg={3}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: '2rem',
                                fontWeight: 500,
                                color: '#ee6e6e',
                                fontFamily: '"Island Moments", cursive'
                            }}
                        >
                            {t(tokens.service.title)}
                        </Typography>
                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: '2rem',
                                fontWeight: 500
                            }}
                        >
                            {t(tokens.service.subtitle)}
                        </Typography>
                    </Grid>
                    <Grid item lg={9}>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 3
                            }}
                        >
                            {
                                servicesData.map((item, index) => (
                                    <Col lg='3' md='6' sm='12' className='mb-4' key={index}>
                                        <ServiceCard item={item} />
                                    </Col>))
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </section>
    )
}

export default ServicesSection