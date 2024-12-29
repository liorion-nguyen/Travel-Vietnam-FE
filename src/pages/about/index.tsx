import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, CardMedia, Button, Link } from '@mui/material';
import { styled } from '@mui/system';
import Testimonials from 'src/sections/common/testimonials';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';
import { Seo } from 'src/components/common/performance/seo';

const StyledContainer = styled(Container)({
  marginTop: '4rem',
  textAlign: 'center',
});

const relatedTeam = () => {
  const { t } = useTranslation();
  const team = [
    {
      name: t(tokens.about.team.members.chung.name),
      image: '/assets/about/avt_chung.jpg',
      description: t(tokens.about.team.members.chung.description),
      link: 'https://www.facebook.com/chungg.203',
    },
    {
      name: t(tokens.about.team.members.duy.name),
      image: '/assets/about/avt_duy.jpg',
      description: t(tokens.about.team.members.duy.description),
      link: 'https://www.facebook.com/vanduy.nguyen.2003',
    },
    {
      name: t(tokens.about.team.members.chinh.name),
      image: '/assets/about/avt_chinh.jpg',
      description: t(tokens.about.team.members.chinh.description),
      link: 'https://www.facebook.com/yukio.pham.5',
    },
    {
      name: t(tokens.about.team.members.cuong.name),
      image: '/assets/about/avt_cuong.jpg',
      description: t(tokens.about.team.members.cuong.description),
      link: 'https://www.facebook.com/cuongdq1002',
    },
    {
      name: t(tokens.about.team.members.duyen.name),
      image: '/assets/about/avt_duyen.jpg',
      description: t(tokens.about.team.members.duyen.description),
      link: 'https://www.facebook.com/profile.php?id=100073160363879',
    },
  ];

  return team.map((member, index) => (
    <Card sx={{ boxShadow: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }} key={index}>
      <Link href={member.link} target="_blank" rel="noopener noreferrer">
        <CardMedia
          component="img"
        height="200"
        image={member.image}
          alt={member.name}
        />
      </Link>
      <CardContent>
        <Typography variant="h6">{member.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {member.description}
        </Typography>
      </CardContent>
    </Card>
  ));
};

const AboutUs = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <StyledContainer maxWidth="xl">
      <Seo title={t(tokens.about.title)} />
      <Typography variant="h3" gutterBottom>
        {t(tokens.about.title)}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        {t(tokens.about.welcome)}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        {t(tokens.about.description)}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3 }}>
            <CardMedia
              component="img"
              height="300"
              image="/assets/about/hotels.png"
              alt="Our Hotels"
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {t(tokens.about.hotels.title)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {t(tokens.about.hotels.description)}
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate('/hotels')}>
                {t(tokens.about.hotels.learnMore)}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3 }}>
            <CardMedia
              component="img"
              height="300"
              image="/assets/about/tours.png"
              alt="Our Tours"
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {t(tokens.about.tours.title)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {t(tokens.about.tours.description)}
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate('/tours')}>
                {t(tokens.about.tours.learnMore)}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6, backgroundColor: '#f5f5f5', p: 4, borderRadius: 2 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#003366' }}>
          {t(tokens.about.mission.title)}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#333333', mb: 4 }}>
          {t(tokens.about.mission.description)}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#333333', mt: 2 }}>
          {t(tokens.about.mission.details)}
        </Typography>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          {t(tokens.about.team.title)}
        </Typography>
        <Testimonials Html={relatedTeam()} />
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          {t(tokens.about.contact.title)}
        </Typography>
        <Typography variant="body1">
          {t(tokens.about.contact.description)}
        </Typography>
      </Box>
    </StyledContainer>
  );
};

export default AboutUs;