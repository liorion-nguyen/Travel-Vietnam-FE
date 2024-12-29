import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Container, Grid, Typography, IconButton } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import toast from 'react-hot-toast';
import { StyledTitleComponent } from 'src/styles/common';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';

const chunkArray = (arr: any, size: any) => {
    return arr.reduce((acc: any, _: any, index: any) => {
        if (index % size === 0) {
            acc.push(arr.slice(index, index + size));
        }
        return acc;
    }, []);
};

const Discount = ({ promoCodes }: { promoCodes: any }) => {
    const { t } = useTranslation();
    const [activePromoIndex, setActivePromoIndex] = useState(0);
    const promoChunks = chunkArray(promoCodes, 4);

    const handlePromoPrev = () => {
        setActivePromoIndex(prev => (prev === 0 ? promoChunks.length - 1 : prev - 1));
    };

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code)
            .then(() => {
                toast.success(t(tokens.common.copySuccess));
            })
    }
    return (
        <Container maxWidth="xl">
            <StyledTitleComponent>{t(tokens.discount.title)}</StyledTitleComponent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <IconButton onClick={handlePromoPrev} sx={{ color: '#faa935', border: '1px solid #faa935', position: 'absolute', left: '0', top: '50%', zIndex: '1', transform: 'translateY(-50%)', background: 'white' }}>
                    <NavigateBeforeIcon />
                </IconButton>
                <SwipeableViews index={activePromoIndex}>
                    {promoChunks.map((chunk: any, chunkIndex: number) => (
                        <Grid
                            container
                            spacing={2}
                            key={chunkIndex}
                            sx={{
                                display: 'flex',
                                flexWrap: 'nowrap',
                                padding: '10px 0',
                                marginBottom: '0'
                            }}
                        >
                            {chunk.map((promo: any, index: number) => (
                                    <Grid
                                        item xs={12} sm={6} md={4} lg={3}
                                        key={index}
                                        sx={{
                                        flexBasis: 0,
                                        flexGrow: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            padding: '10px 0',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'stretch',
                                        }}
                                    >
                                        <Card sx={{
                                            minWidth: 275,
                                            position: 'relative',
                                            paddingTop: '25px',
                                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                            borderRadius: '8px',
                                            flexGrow: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between'
                                        }}>
                                            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                <Box>
                                                    <Typography variant="h6">{promo.title}</Typography>
                                                    <Typography variant="body2">{promo.description}</Typography>
                                                </Box>
                                                <Button
                                                    sx={{ background: 'rgba(247,249,250,1.00)', color: '#faa935', width: '100%', display: 'flex', gap: 2 }}
                                                    onClick={() => handleCopyCode(promo.code)}
                                                >
                                                    {t(tokens.discount.code)}: {promo.code}
                                                    <ContentCopyIcon sx={{ fontSize: '16px' }} />
                                                </Button>
                                            </CardContent>
                                            <p style={{
                                                position: 'absolute',
                                                top: '8px',
                                                right: '0',
                                                background: '#ff7e01',
                                                color: 'white',
                                                borderRadius: '20px 0 0 20px',
                                                padding: '5px 10px',
                                                fontSize: '12px'
                                            }}>{promo.apply}</p> 
                                            </Card>
                                        </Box>
                                    </Grid>
                            ))}
                        </Grid>
                    ))}
                </SwipeableViews>

                <IconButton onClick={handlePromoPrev} sx={{ color: '#faa935', border: '1px solid #faa935', position: 'absolute', right: '0', top: '50%', zIndex: '1', transform: 'translateY(-50%)', background: 'white' }}>
                    <NavigateNextIcon />
                </IconButton>
            </Box>
        </Container>
    );
};

export default Discount;   