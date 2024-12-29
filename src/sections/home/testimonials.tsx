import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import Slider from 'react-slick';
import { StyledTitleComponent } from 'src/styles/common';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';

const Testimonials = () => {
    const { t } = useTranslation();
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
            },
          },
        ],
    };

    return (
        <Slider {...settings}>
            {["/assets/home/testimonials/ava-1.jpg", "/assets/home/testimonials/ava-2.jpg", "/assets/home/testimonials/ava-2.jpg", "/assets/home/testimonials/ava-3.jpg"].map((avatar, index) => (
                <div key={index} style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '8px' }}>
                    <Typography variant="body1" style={{ marginBottom: '16px' }}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus sit, explicabo provident hic distinctio
                        molestias voluptates nobis alias placeat suscipt earum debitits recusandae voluptate illum expedita
                        corrupti aliquid doloribus delectus?
                    </Typography>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
                        <img src={avatar} style={{ width: '25%', height: '25%', borderRadius: '8px' }} alt="" />
                        <div>
                            <Typography variant="h6" style={{ marginBottom: '0', marginTop: '8px' }}>
                                {index === 0 ? 'John Doe' : index === 1 ? 'Lia Franklin' : 'John Doe'}
                            </Typography>
                            <Typography variant="body2">{t(tokens.testimonials.customer)}</Typography>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

const TestimonialSection = () => {
    const { t } = useTranslation();
    
    return (
        <Container maxWidth="xl">
            <Grid container rowSpacing={4}>
                <Grid item xs={12}>
                    <StyledTitleComponent>{t(tokens.testimonials.title)}</StyledTitleComponent>
                    <Typography variant="h2" style={{ fontSize: '1.6rem', marginTop: '0.8rem' }}>
                        {t(tokens.testimonials.subtitle)}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Testimonials />
                </Grid>
            </Grid>
        </Container>
    );
};

export default TestimonialSection;
