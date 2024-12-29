import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';

type Banner = {
  image: string;
  link: string;
};

const BannerSlider = ({banners}: {banners: Banner[]}) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % banners.length);
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Container maxWidth="xl">
      <SwipeableViews index={activeStep}>
        {banners.map((banner, index) => (
          <Box
            key={index}
            component="a"
            href={banner.link || '#'} 
            target={banner.link ? '_blank' : '_self'} 
            sx={{ display: 'block', textDecoration: 'none', cursor: 'pointer' }} 
          >
            <Box
              component="img"
              src={banner.image}
              alt={`Banner ${index + 1}`}
              sx={{ width: '100%', height: '400px', objectFit: 'fill' }}
            />
          </Box>
        ))}
      </SwipeableViews>
    </Container>
  );
};

export default BannerSlider;