import React from 'react';
import { Container, Grid, Typography, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';

const NewsLetter = () => {
    const { t } = useTranslation();

    return (
        <Container maxWidth='xl' sx={{ position: 'relative' }}>
            <Box
                sx={{
                    position: 'absolute',
                    width: '100vw',
                    background: "#cae5f4",
                    zIndex: -1,
                    height: '100%',
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)' 
                }}
            />
            <Grid container>
                <Grid item lg={6}>
                    <div style={{ padding: '50px 0' }}>
                        <Typography variant="h2" style={{ fontSize: '2rem', marginBottom: '1.4rem' }}>
                            {t(tokens.newsletter.title)}
                        </Typography>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', padding: '0.4rem', marginBottom: '0.8rem', borderRadius: '5px' }}>
                            <TextField
                                type="email"
                                placeholder={t(tokens.newsletter.placeholder)}
                                variant="outlined"
                                InputProps={{
                                    style: { fontSize: '1rem', color: '#0b2727', border: 'none' }
                                }}
                                sx={{
                                    "fieldset": {
                                        border: '0'
                                    }
                                }}
                                fullWidth
                            />
                            <Button variant="contained" style={{ padding: '0.5rem 1.5rem', background: '#faa935', color: '#fff', fontSize: '1rem' }}>
                                {t(tokens.newsletter.subscribe)}
                            </Button>
                        </div>
                        <Typography style={{ color: '#0b2727', fontSize: '1rem' }}>
                            {t(tokens.newsletter.description)}
                        </Typography>
                    </div>
                </Grid>
                <Grid item lg={6}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src="/assets/home/newsletter/male-tourist.png" alt="" style={{ width: '100%' }} />
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}

export default NewsLetter;
