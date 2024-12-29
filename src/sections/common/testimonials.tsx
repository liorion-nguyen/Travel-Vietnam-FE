import React from 'react';
import { Container } from '@mui/material';
import Slider from 'react-slick';
const Testimonials = ({ Html }: { Html: any }) => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 500000,
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
        <Container maxWidth="xl" sx={{ mt: 4, ".slick-track": { display: 'flex', gap: 2 } }}>
            <Slider {...settings}>
                {Html}
            </Slider>
        </Container>
    );
};
export default Testimonials;