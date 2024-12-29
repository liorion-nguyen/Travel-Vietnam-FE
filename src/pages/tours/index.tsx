import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Seo } from 'src/components/common/performance/seo';
import { tokens } from 'src/locales/tokens';
import BannerSlider from 'src/sections/common/banner';
import Discount from 'src/sections/common/discount';
import Explore from 'src/sections/common/explore';
import TextArticle from 'src/sections/hotels/hotelArticle';
import FormFieldTour from 'src/sections/tours/formField';

const TourPage = () => {
  const { t } = useTranslation();
  const banners = [
    {
      image: '/assets/tours/banner1.png',
      link: '',
    },
    {
      image: '/assets/tours/banner2.png',
      link: '',
    },
    {
      image: '/assets/tours/banner3.png',
      link: '',
    },
  ];

  const promoCodes = [
    { title: "Mã 300K | Phú Quốc", description: "Giảm 5% tối đa 300K", code: "PQTBVNHT300K", apply: "Tour" },
    { title: "Ưu đãi Agribank", description: "Giảm 200K cho tour", code: "AGRITOUR200", apply: "Tour" },
    { title: "Mã 600K | Hạ Long", description: "Giảm 7% tối đa 600K", code: "HLTBVNHT600K", apply: "Tour" },
    { title: "Ưu đãi BIDV", description: "Giảm 250K cho tour", code: "BIDVTOUR250", apply: "Tour" },
    { title: "Mã 500K | Đà Nẵng", description: "Giảm 10% tối đa 500K", code: "DNTBVNHT500K", apply: "Tour" },
    { title: "Ưu đãi TPBank", description: "Giảm 300K cho tour", code: "TPBTOUR300", apply: "Tour" },
    { title: "Mã 800K | Nha Trang", description: "Giảm 8% tối đa 800K", code: "NTTBVNHT800K", apply: "Tour" },
    { title: "Ưu đãi VPBank", description: "Giảm 400K cho tour", code: "VPBTOUR400", apply: "Tour" },
    { title: "Mã 1 TRIỆU | Sapa", description: "Giảm 15% tối đa 1 triệu", code: "SPTBVNHT1M", apply: "Tour" },
    { title: "Ưu đãi Eximbank", description: "Giảm 500K cho tour", code: "EXIMTOUR500", apply: "Tour" }
  ];  

  const data = {
    title: "Khám Phá Các Tour Du Lịch Đặc Sắc Tại Travel World",
    content: [
      {
        title: "Giới thiệu về Tour Du Lịch",
        content: [
          "Travel World tự hào mang đến cho bạn những trải nghiệm du lịch tuyệt vời nhất với các tour du lịch đa dạng và phong phú. Chúng tôi cung cấp các tour từ những điểm đến nổi tiếng đến những địa điểm ít người biết đến, giúp bạn khám phá vẻ đẹp của thiên nhiên và văn hóa địa phương.",
          "Với đội ngũ hướng dẫn viên chuyên nghiệp và nhiệt tình, chúng tôi cam kết mang đến cho bạn những trải nghiệm đáng nhớ. Mỗi tour đều được thiết kế tỉ mỉ, đảm bảo bạn sẽ có những khoảnh khắc tuyệt vời bên gia đình và bạn bè.",
          "Chúng tôi cũng cung cấp các tour du lịch đặc biệt, bao gồm tour mạo hiểm, tour văn hóa, và tour ẩm thực, giúp bạn có cơ hội trải nghiệm những điều mới mẻ và thú vị. Hãy để Travel World đồng hành cùng bạn trong hành trình khám phá thế giới.",
        ]
      },
      {
        title: "Lợi Ích Khi Đặt Tour Tại Travel World",
        content: [
          "Khi đặt tour tại Travel World, bạn sẽ được hưởng nhiều lợi ích như giá cả hợp lý, dịch vụ khách hàng tận tâm và linh hoạt trong việc thay đổi lịch trình. Chúng tôi luôn lắng nghe và đáp ứng nhu cầu của bạn để đảm bảo chuyến đi của bạn diễn ra suôn sẻ.",
          "Ngoài ra, chúng tôi còn cung cấp các gói tour kết hợp với các dịch vụ khác như đặt phòng khách sạn, vé máy bay, và các hoạt động giải trí, giúp bạn tiết kiệm thời gian và công sức trong việc lên kế hoạch cho chuyến đi.",
          "Hãy đến với Travel World để trải nghiệm những tour du lịch tuyệt vời và khám phá những điều kỳ diệu mà thế giới mang lại.",
        ]
      }
    ]
  }
  return (
    <Stack sx={{ display: 'flex', flexDirection: 'column', gap: 5, mb: 5 }}>
      <Seo title={t(tokens.tours.title)} />
      <BannerSlider banners={banners} />
      <FormFieldTour />
      <Discount promoCodes={promoCodes} />
      <Explore />
      <TextArticle data={ data } />
    </Stack>
  );
};

export default TourPage;
