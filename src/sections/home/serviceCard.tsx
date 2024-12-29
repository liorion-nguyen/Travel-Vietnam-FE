import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ServiceCardProps {
  item: {
    imgUrl: string;
    title: string;
    desc: string;
  };
}

const ServiceCard = ({ item }: ServiceCardProps) => {
    const { t } = useTranslation();
    const { imgUrl, title, desc } = item;

    return (
        <Box
            sx={{
                padding: '1rem',
                borderBottom: '1px solid rgba(250, 168, 53, 0.53)',
                borderRight: '1px solid rgba(250, 168, 53, 0.53)',
                borderRadius: '0.5rem',
            }}
        >
            <Box
                sx={{
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    backgroundColor: '#faa935',
                    padding: '0.5rem',
                    marginBottom: '1rem',
                    lineHeight: '50px',
                }}
            >
                <img src={imgUrl} alt={t(title)} style={{ width: '100%' }} />
            </Box>
            <Typography
                variant="h6"
                sx={{
                    fontSize: '1.1rem',
                    fontWeight: 500,
                }}
            >
                {t(title)}
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    fontSize: '0.8rem',
                    color: '#6e7074', 
                }}
            >
                {t(desc)}
            </Typography>
        </Box>
    );
}

export default ServiceCard;
