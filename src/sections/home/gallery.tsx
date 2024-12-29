import { Container } from '@mui/material';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { StyledTitleComponent } from 'src/styles/common';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';

const Gallery = () => {
    const { t } = useTranslation();
    const galleryTitleStyle = {
        fontSize: '1.6rem',
        marginBottom: '2.5rem',
        marginTop: '0.8rem',
    };

    const masonryImgStyle = {
        width: '100%',
        display: 'block',
        borderRadius: '10px',
        transition: '0.3s',
    };

    const handleMouseOver = (e: any) => {
        e.currentTarget.style.transform = 'scale(1.1)';
    };

    const handleMouseOut = (e: any) => {
        e.currentTarget.style.transform = 'scale(1)';
    };

    const galleryImages = [
        "./assets/home/gallery/gallery-01.jpg",
        "./assets/home/gallery/gallery-02.jpg",
        "./assets/home/gallery/gallery-03.jpg",
        "./assets/home/gallery/gallery-04.jpg",
        "./assets/home/gallery/gallery-05.jpg",
        "./assets/home/gallery/gallery-06.jpg",
        "./assets/home/gallery/gallery-07.jpg",
        "./assets/home/gallery/gallery-02.jpg"
    ]

    return (
        <Container maxWidth="xl">
            <Row>
                <Col lg='12'>
                    <StyledTitleComponent>{t(tokens.gallery.title)}</StyledTitleComponent>
                    <h2 style={galleryTitleStyle}>{t(tokens.gallery.subtitle)}</h2>
                </Col>
                <Col lg='12'>
                    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 1, 992: 4 }}>
                        <Masonry gutter='1rem'>
                            {
                                galleryImages.map((item, index) => (
                                    <img
                                        src={item}
                                        key={index}
                                        alt=""
                                        style={masonryImgStyle}
                                        onMouseOver={handleMouseOver}
                                        onMouseOut={handleMouseOut}
                                    />
                                ))
                            }
                        </Masonry>
                    </ResponsiveMasonry>
                </Col>
            </Row>
        </Container>
    );
}

export default Gallery;
