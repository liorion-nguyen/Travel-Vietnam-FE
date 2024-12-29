import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { StyledTitleComponent } from 'src/styles/common';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';

// Styled components for custom styles
const HeroSubtitle = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

const HeroImgBox = styled(Box)({
  paddingTop: '2rem',
  img: {
    width: '100%',
    height: '350px',
    borderRadius: '20px',
    border: '1px solid #faa935',
    objectFit: 'cover',
  },
  video: {
    width: '100%',
    height: '350px',
    borderRadius: '20px',
    border: '1px solid #faa935',
    objectFit: 'cover',
  },
});

const Highlight = styled('span')({
  color: '#faa935',
});

const HeroContent = styled(Box)({
  paddingTop: '3.5rem',
  h1: {
    fontSize: '2.5rem',
    fontWeight: '600',
    marginTop: '1rem',
    marginBottom: '2rem',
  },
  p: {
    fontSize: '1rem',
    color: '#6e7074',
    lineHeight: '1.4rem',
  },
});

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2}>
        <Grid item lg={6}>
          <HeroContent>
            <HeroSubtitle>
              <StyledTitleComponent>{t(tokens.hero.title)}</StyledTitleComponent>
              <img src="assets/home/hero/world.png" alt="World" style={{ width: '2.3rem', height: '2.3rem' }} />
            </HeroSubtitle>
            <Typography variant="h1">
              {t(tokens.hero.subtitle)} <Highlight>memories</Highlight>
            </Typography>
            <Typography>
              {t(tokens.hero.description)}
            </Typography>
          </HeroContent>
        </Grid>

        <Grid item lg={2}>
          <HeroImgBox>
            <img src="assets/home/hero/hero-img01.jpg" alt="Hero" />
          </HeroImgBox>
        </Grid>

        <Grid item lg={2} sx={{marginTop: 2.5}}>
          <HeroImgBox className="hero__video-box mt-4">
            <video src="assets/home/hero/hero-video.mp4" controls />
          </HeroImgBox>
        </Grid>

        <Grid item lg={2} sx={{marginTop: 5}}>
          <HeroImgBox className="mt-5">
            <img src="assets/home/hero/hero-img02.jpg" alt="Hero 2" />
          </HeroImgBox>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HeroSection;