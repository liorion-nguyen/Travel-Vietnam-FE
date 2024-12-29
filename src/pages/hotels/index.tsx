import { Stack } from '@mui/material';
import BannerSlider from 'src/sections/common/banner';
import Discount from 'src/sections/common/discount';
import FormFieldHotel from 'src/sections/hotels/formField';
import TextArticle from 'src/sections/hotels/hotelArticle';
import ProposeHotel from 'src/sections/hotels/propose';
import { useTranslation } from 'react-i18next';
import { dispatch } from 'src/redux/store';
import { useEffect } from 'react';
import { getTours } from 'src/redux/slices/tours';
import { tokens } from 'src/locales/tokens';
import { Seo } from 'src/components/common/performance/seo';

const HotelPage = () => {
  const { t } = useTranslation();
  const banners = [
    {
      image: 'https://tse4.mm.bing.net/th?id=OIG3.qmznknFATLAIp6yx0kfO&pid=ImgGn',
      link: '',
    },
    {
      image: 'https://tse2.mm.bing.net/th?id=OIG3.zJ.ycowDWuXmeTFHdDgT&pid=ImgGn',
      link: '',
    },
    {
      image: 'https://tse3.mm.bing.net/th?id=OIG1.syaY908k4ES41rygJwVB&pid=ImgGn',
      link: '',
    },
  ];
  const data = {
    title: t('hotels.articleTitle'),
    content: [
      {
        title: t('hotels.mainProducts'),
        content: [
          t('hotels.luxuryHotels'),
          t('hotels.budgetHotels'),
          t('hotels.boutiqueHotels'),
          t('hotels.resortHotels'),
        ],
      },
      {
        title: t('hotels.bookingProcess'),
        content: [
          t('hotels.bookingDescription1'),
          t('hotels.bookingDescription2'),
          t('hotels.bookingDescription3'),
        ],
      },
    ],
  };
  const promoCodes = [
    { title: "Mã 500K | Bangkok", description: "Giảm 5% tối đa 500K", code: "BKTBVNHT500K", apply: "Hotel" },
    { title: "Mã 750K | Tokyo", description: "Giảm 7% tối đa 750K", code: "TKTBVNHT750K", apply: "Hotel" },
    { title: "Ưu đãi Sacombank", description: "Giảm 250K cho khách sạn", code: "SACOMBANK250", apply: "Hotel" },
    { title: "Ưu đãi HSBC", description: "Giảm 300K cho khách sạn", code: "HSBCKS300", apply: "Hotel" },
    { title: "Mã 600K | Seoul", description: "Giảm 6% tối đa 600K", code: "SEOTBVNHT600K", apply: "Hotel" },
    { title: "Ưu đãi VIB", description: "Giảm 350K khi đặt khách sạn", code: "VIBKS350", apply: "Hotel" },
    { title: "Mã 900K | Paris", description: "Giảm 10% tối đa 900K", code: "PRTBVNHT900K", apply: "Hotel" },
    { title: "Ưu đãi BIDV", description: "Giảm 400K khi đặt khách sạn", code: "BIDVKS400", apply: "Hotel" },
    { title: "Mã 1 TRIỆU | Dubai", description: "Giảm 10% tối đa 1 triệu", code: "DBTBVNHT1M", apply: "Hotel" },
    { title: "Ưu đãi Vietcombank", description: "Giảm 500K cho khách sạn", code: "VCBKS500", apply: "Hotel" },
  ];
  useEffect(() => {
    dispatch(getTours());
  }, []);
  return (
    <Stack sx={{ display: 'flex', flexDirection: 'column', gap: 5, mb: 5 }}>
      <Seo title={t(tokens.hotels.title)} />
      <BannerSlider banners={banners} />
      <FormFieldHotel />
      <Discount promoCodes={promoCodes} />
      <ProposeHotel />
      <TextArticle data={data} />
    </Stack>
  );
};

export default HotelPage;
