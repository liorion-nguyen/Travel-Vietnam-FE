import { tokens } from '../tokens';

export const vi = {
  // Common
  [tokens.common.languageChanged]: 'Ngôn ngữ đã được cập nhật',
  [tokens.common.hotels]: 'Khách sạn',
  [tokens.common.airportTransfer]: 'Đưa đón sân bay',
  [tokens.common.flights]: 'Vé máy bay',
  [tokens.common.date]: 'Ngày',
  [tokens.common.time]: 'Thời gian',
  [tokens.common.propose]: 'Đề xuất',
  [tokens.common.information]: 'Thông tin',
  [tokens.common.booking]: 'Đặt chỗ',
  [tokens.common.newsletter]: 'Bản tin',
  [tokens.common.notification]: 'Thông báo',
  [tokens.common.discountCode]: 'Mã giảm giá',
  [tokens.common.copySuccess]: 'Đã sao chép mã thành công!',
  [tokens.common.featured]: 'Nổi bật',
  [tokens.common.bookNow]: 'Đặt ngay',
  [tokens.common.perPerson]: '/ 1 người',
  [tokens.common.perRoom]: '/ 1 phòng',
  [tokens.common.ratings]: 'đánh giá',
  [tokens.common.noRatings]: 'Chưa có đánh giá',
  [tokens.common.currentLocation]: 'Vị trí hiện tại',

  // Nav
  [tokens.common.flights]: 'Vé máy bay',
  [tokens.nav.login]: 'Đăng nhập',
  [tokens.nav.register]: 'Đăng ký',
  [tokens.nav.logout]: 'Đăng xuất',
  [tokens.nav.settings]: 'Cài đặt',
  [tokens.nav.profile]: 'Hồ sơ',
  [tokens.nav.home]: 'Trang chủ',
  [tokens.nav.gallery]: 'Thư viện ảnh',
  [tokens.nav.about]: 'Về chúng tôi',
  [tokens.nav.tours]: 'Tour',
  [tokens.nav.hotels]: 'Khách sạn',

  // Hotels
  [tokens.hotels.destination]: 'Điểm đến',
  [tokens.hotels.checkIn]: 'Ngày nhận',
  [tokens.hotels.checkOut]: 'Ngày trả',
  [tokens.hotels.guests]: 'Khách',

  // Flights
  [tokens.flights.from]: 'Từ',
  [tokens.flights.to]: 'Đến',
  [tokens.flights.departure]: 'Ngày Khởi hành',
  [tokens.flights.return]: 'Ngày về',
  [tokens.flights.passengers]: 'Hành khách',

  // Airport Transfer
  [tokens.airportTransfer.pickUpLocation]: 'Điểm đón',
  [tokens.airportTransfer.destinationAirport]: 'Sân bay đến',
  [tokens.airportTransfer.departure]: 'Ngày khởi hành',
  [tokens.airportTransfer.return]: 'Ngày về',
  [tokens.airportTransfer.passengers]: 'Hành khách',

  // Profile
  [tokens.profile.title]: 'Hồ sơ',
  [tokens.profile.information]: 'Thông tin cá nhân',
  [tokens.profile.booking]: 'Lịch sử đặt chỗ',
  [tokens.profile.newsletter]: 'Tùy chọn bản tin',
  [tokens.profile.notification]: 'Thông báo',
  [tokens.profile.birthday]: 'Ngày sinh',
  [tokens.profile.location]: 'Địa điểm',
  [tokens.profile.fullName]: 'Họ và tên',
  [tokens.profile.emailAddress]: 'Địa chỉ email',
  [tokens.profile.dateOfBirth]: 'Ngày sinh',
  [tokens.profile.phoneNumber]: 'Số điện thoại',
  [tokens.profile.province]: 'Tỉnh/Thành phố',
  [tokens.profile.district]: 'Quận/Huyện',
  [tokens.profile.ward]: 'Phường/Xã',
  [tokens.profile.security]: 'Bảo mật',
  [tokens.profile.newPassword]: 'Mật khẩu mới',
  [tokens.profile.oldPassword]: 'Mật khẩu cũ',
  [tokens.profile.saveDetails]: 'Lưu thông tin',
  [tokens.profile.save]: 'Lưu',
  [tokens.profile.editInfo]: 'Thông tin có thể được chỉnh sửa',
  [tokens.profile.editPassword]: 'Mật khẩu có thể được thay đổi',

  // Booking History
  [tokens.bookingHistory.title]: 'Lịch sử đặt chỗ',
  [tokens.bookingHistory.filterSubheader]: 'Bạn có thể lọc lịch sử đặt chỗ theo ngày',
  [tokens.bookingHistory.bookingId]: 'Mã đặt chỗ',
  [tokens.bookingHistory.service]: 'Dịch vụ',
  [tokens.bookingHistory.date]: 'Ngày',
  [tokens.bookingHistory.time]: 'Thời gian',
  [tokens.bookingHistory.status]: 'Trạng thái',
  [tokens.bookingHistory.completed]: 'Hoàn thành',
  [tokens.bookingHistory.pending]: 'Đang chờ',
  [tokens.bookingHistory.cancelled]: 'Đã hủy',
  [tokens.bookingHistory.failed]: 'Thất bại',
  [tokens.bookingHistory.confirmed]: 'Đã xác nhận',
  [tokens.bookingHistory.amount]: 'Số tiền',

  // Discount
  [tokens.discount.title]: 'Mã giảm giá',
  [tokens.discount.code]: 'Mã',

  // Experience
  [tokens.experience.title]: 'Kinh nghiệm',
  [tokens.experience.subtitle]: 'Với tất cả kinh nghiệm của chúng tôi sẽ phục v bạn',
  [tokens.experience.description]:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas aliquam, hic tempora inventore suscipit unde.',
  [tokens.experience.successfulTrip]: 'Chuyến đi thành công',
  [tokens.experience.regularClients]: 'Khách hàng thường xuyên',
  [tokens.experience.yearExperience]: 'Năm kinh nghiệm',

  // Newsletter
  [tokens.newsletter.title]: 'Đăng ký ngay để nhận thông tin du lịch hữu ích',
  [tokens.newsletter.description]:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati adipisici sunt in, provident facere ipsam?',
  [tokens.newsletter.placeholder]: 'Nhập email của bạn',
  [tokens.newsletter.subscribe]: 'Đăng ký',

  // Testimonials
  [tokens.testimonials.title]: 'Khách hàng yêu thích',
  [tokens.testimonials.subtitle]: 'Khách hàng nói gì về chúng tôi',
  [tokens.testimonials.customer]: 'Khách hàng',

  // Hotels
  [tokens.hotels.bookHotel]: 'Đặt Khách sạn',
  [tokens.hotels.city]: 'Thành phố',
  [tokens.hotels.hotelName]: 'Tên khách sạn',
  [tokens.hotels.checkInOut]: 'Ngày nhận / trả phòng',
  [tokens.hotels.customer]: 'Khách hàng',
  [tokens.hotels.adults]: 'Người lớn',
  [tokens.hotels.children]: 'Trẻ em',
  [tokens.hotels.rooms]: 'Số phòng',
  [tokens.hotels.title]: 'Khách sạn',

  // Reviews
  [tokens.reviews.title]: 'Đánh giá của khách hàng',
  [tokens.reviews.filtering]: 'Lọc',
  [tokens.reviews.recommended]: 'Đề xuất',
  [tokens.reviews.travelerType]: 'Loại khách',
  [tokens.reviews.all]: 'Tất cả',
  [tokens.reviews.rating]: 'Đánh giá',
  [tokens.reviews.searchHere]: 'Tìm kiếm',
  [tokens.reviews.viewMore]: 'Xem thêm bình luận',
  [tokens.reviews.reviews]: 'đánh giá',
  [tokens.reviews.writeReview]: 'Viết đánh giá',
  [tokens.reviews.great]: 'Tuyệt vời',
  [tokens.reviews.quiteGood]: 'Khá tốt',
  [tokens.reviews.bad]: 'Không tốt',
  [tokens.reviews.submit]: 'Gửi đánh giá',
  // Tours
  [tokens.tours.bookTour]: 'Đặt Tour',
  [tokens.tours.tourDes]:
    'Lorem ipsum dolor ngồi amet consectetur adipisicing elit. Hàng hóa, kẻ thù.',
  [tokens.tours.destination]: 'Điểm đến',
  [tokens.tours.departurePoint]: 'Điểm khởi hành',
  [tokens.tours.tourName]: 'Tên tour',
  [tokens.tours.departureDate]: 'Ngày khởi hành',
  [tokens.tours.returnDate]: 'Ngày về',
  [tokens.tours.passengers]: 'Hành khách',
  [tokens.tours.adults]: 'Người lớn',
  [tokens.tours.children]: 'Trẻ em',
  [tokens.tours.searchTour]: 'Tìm Tour',
  [tokens.tours.propose]: 'Tour Đề Xuất',
  [tokens.tours.title]: 'Tour',

  // Tour Booking
  [tokens.tourBooking.description]: 'Mô tả',
  [tokens.tourBooking.openInGoogleMaps]: 'Mở trong Google Maps',
  [tokens.tourBooking.features.freeCancellation.title]: 'Miễn phí hủy',
  [tokens.tourBooking.features.freeCancellation.description]:
    'Hủy trước 24 giờ để được hoàn tiền đầy đủ',
  [tokens.tourBooking.features.healthPrecautions.title]: 'Biện pháp y tế',
  [tokens.tourBooking.features.healthPrecautions.description]:
    'Áp dụng các biện pháp an toàn và sức khỏe đặc biệt. Tìm hiểu thêm',
  [tokens.tourBooking.features.mobileTicketing.title]: 'Vé điện tử',
  [tokens.tourBooking.features.mobileTicketing.description]:
    'Sử dụng điện thoại hoặc in vé của bạn',
  [tokens.tourBooking.features.duration.title]: 'Thời gian 3.5 Giờ',
  [tokens.tourBooking.features.duration.description]: 'Kiểm tra lịch trình để xem giờ bắt đầu.',
  [tokens.tourBooking.features.instantConfirmation.title]: 'Xác nhận ngay',
  [tokens.tourBooking.features.instantConfirmation.description]: 'Không cần đợi xác nhận!',
  [tokens.tourBooking.features.tourGuide.title]: 'Hướng dẫn viên trực tiếp bằng tiếng Anh',
  [tokens.tourBooking.features.tourGuide.description]: 'Tiếng Anh',
  [tokens.tourBooking.booking.title]: 'Đặt tour',
  [tokens.tourBooking.booking.from]: 'Từ',
  [tokens.tourBooking.booking.to]: 'Đến',
  [tokens.tourBooking.booking.guests]: 'Số khách',
  [tokens.tourBooking.booking.subtotal]: 'Tổng cộng',
  [tokens.tourBooking.booking.confirmBooking]: 'Xác nhận đặt tour',
  [tokens.tourBooking.booking.saveWishlist]: 'Lưu vào danh sách yêu thích',
  [tokens.tourBooking.booking.shareActivity]: 'Chia sẻ hoạt động',
  [tokens.tourBooking.relatedTours.today]: 'Tour liên quan hôm nay',
  [tokens.tourBooking.relatedTours.vietnam]: 'Tour liên quan tại Việt Nam',
  [tokens.tourBooking.relatedTours.duration]: 'Thời gian',
  [tokens.tourBooking.relatedTours.facilities]: 'Tiện ích',
  [tokens.tourBooking.relatedTours.reviews]: 'đánh giá',
  [tokens.tourBooking.relatedTours.perPerson]: 'mỗi người',

  // Explore
  [tokens.explore.title]: 'Khám phá',
  [tokens.explore.subtitle]: 'Tour nổi bật của chúng tôi',

  // About
  about: {
    title: 'Về Chúng Tôi',
    welcome:
      'Chào mừng đến với website du lịch của chúng tôi! Chúng tôi cam kết tạo nên những trải nghiệm du lịch khó quên bằng cách cung cấp các dịch vụ lưu trú và tour du lịch tuyệt vời, được thiết kế riêng theo nhu cầu của bạn.',
    description:
      'Dù bạn đang tìm kiếm một kỳ nghỉ yên bình, một chuyến phiêu lưu mạo hiểm, hay một hành trình khám phá văn hóa, chúng tôi luôn sẵn sàng biến mọi khoảnh khắc trong chuyến đi của bạn trở nên đặc biệt.',
    mission: {
      title: 'Khám Phá Thế Giới Cùng Chúng Tôi',
      description:
        'Chúng tôi tin rằng mỗi hành trình là một cơ hội để khám phá và mở rộng tầm nhìn mới.',
      details:
        'Với đội ngũ chuyên gia du lịch, chúng tôi cam kết mang đến những trải nghiệm du lịch độc đáo vượt trội mong đợi, từ các tour nghỉ dưỡng đến những chuyến phiêu lưu thử thách.',
    },
    hotels: {
      title: 'Khách Sạn Của Chúng Tôi',
      description:
        'Khám phá nhiều loại khách sạn đáp ứng mọi nhu cầu của bạn, từ khu nghỉ dưỡng cao cấp đến các lựa chọn phù hợp với ngân sách.',
      learnMore: 'Tìm Hiểu Thêm',
    },
    tours: {
      title: 'Tour Du Lịch Của Chúng Tôi',
      description:
        'Khám phá những tour du lịch thú vị đưa bạn đến những địa điểm đẹp và phiêu lưu nhất trên thế giới.',
      learnMore: 'Tìm Hiểu Thêm',
    },
    team: {
      title: 'Đội Ngũ Của Chúng Tôi',
      members: {
        chung: {
          name: 'Nguyễn Quốc Chung',
          role: 'Lập Trình Viên Front-end',
          description:
            'Một lập trình viên Front-end sáng tạo với con mắt thẩm mỹ tinh tế. Chung kết hợp chuyên môn kỹ thuật với cảm nhận thẩm mỹ để tạo ra trải nghiệm người dùng hấp dẫn.',
        },
        duy: {
          name: 'Nguyễn Văn Duy',
          role: 'Lập Trình Viên Full-stack',
          description:
            'Một lập trình viên đa năng thành thạo cả công nghệ front-end và back-end. Duy mang đến cách tiếp cận cân bằng trong phát triển, đảm bảo sự tích hợp mượt mà giữa giao diện người dùng và logic máy chủ.',
        },
        chinh: {
          name: 'Phạm Thị Chinh',
          role: 'Chuyên Viên Phân Tích Kinh Doanh',
          description:
            'Một chuyên viên phân tích kinh doanh tận tụy với sự chú ý đến chi tiết và nhu cầu người dùng. Chinh chuyển đổi các yêu cầu phức tạp thành những hiểu biết có thể thực hiện được, hướng dẫn dự án hướng tới giải pháp lấy người dùng làm trung tâm.',
        },
        cuong: {
          name: 'Đặng Quốc Cường',
          role: 'Quản Lý Kinh Doanh',
          description:
            'Một quản lý kinh doanh giàu kinh nghiệm với tư duy chiến lược. Cường lãnh đạo đội ngũ với tầm nhìn và sự chính xác, tập trung vào tăng trưởng bền vững và hiệu quả hoạt động.',
        },
        duyen: {
          name: 'Dương Thị Ánh Duyên',
          role: 'Kiểm Thử Viên',
          description:
            'Một kiểm thử viên tỉ mỉ chuyên về đảm bảo chất lượng.Ánh Duyên đảm bảo mọi sản phẩm phát hành đều đạt tiêu chuẩn cao nhất, phát hiện và giải quyết vấn đề trước khi đến tay người dùng.',
        },
      },
    },
    contact: {
      title: 'Liên Hệ Với Chúng Tôi',
      description:
        'Có câu hỏi? Hãy liên hệ với chúng tôi qua email stu715105031@hnue.edu.vn | (+84) 708-200-334 hoặc stu715105064@hnue.edu.vn | (+84) 869-133-621.',
    },
  },

  auth: {
    login: {
      title: 'Đăng nhập',
      noAccount: 'Chưa có tài khoản?',
      signUp: 'Đăng ký',
      forgotPassword: 'Quên mật khẩu?',
      loginButton: 'Đăng nhập',
      email: 'Email',
      password: 'Mật khẩu',
      emailRequired: 'Email là bắt buộc',
      passwordRequired: 'Mật khẩu là bắt buộc',
      invalidEmail: 'Email không hợp lệ',
      passwordLength: 'Mật khẩu phải có ít nhất 8 ký tự',
    },
    register: {
      title: 'Đăng ký',
      haveAccount: 'Đã có tài khoản?',
      loginHere: 'Đăng nhập',
      registerButton: 'Đăng ký',
      terms: 'Tôi đã đọc Điều khoản và Điều kiện',
      termsRequired: 'Bạn phải chấp nhận điều khoản và điều kiện',
    },
    forgotPassword: {
      title: 'Quên mật khẩu',
      backToLogin: 'Quay lại đăng nhập',
      description:
        'Vui lòng nhập email của bạn vào ô bên dưới và chúng tôi sẽ gửi email kèm theo liên kết để đặt lại mật khẩu của bạn.',
      emailSent: 'Đã gửi email',
      emailSentDescription:
        'Nếu có tài khoản PTE Magic được đăng ký với {email}, chúng tôi đã gửi hướng dẫn cách đặt lại mật khẩu của bạn.',
      sendResetLink: 'Gửi liên kết đặt lại',
      verifyCode: 'Xác nhận mã',
    },
  },

  hotels: {
    articleTitle: 'Khám Phá Các Khách Sạn Tốt Nhất Tại Travel World',
    mainProducts: 'Sản phẩm chủ yếu',
    luxuryHotels: 'Khách sạn sang trọng',
    budgetHotels: 'Khách sạn giá rẻ',
    boutiqueHotels: 'Khách sạn boutique',
    resortHotels: 'Khách sạn nghỉ dưỡng',
    bookingProcess: 'Đặt Khách Sạn Tại Travel World',
    bookingDescription1:
      'Tại Travel World, chúng tôi cung cấp dịch vụ đặt phòng khách sạn dễ dàng và nhanh chóng. Bạn chỉ cần thực hiện ba bước đơn giản: tìm kiếm khách sạn theo địa điểm và tiêu chí của bạn, chọn phòng phù hợp và hoàn tất thanh toán. Chúng tôi sẽ lo liệu mọi thứ còn lại để bạn có một kỳ nghỉ thoải mái.',
    bookingDescription2:
      'Chúng tôi hợp tác với nhiều khách sạn hàng đầu để mang đến cho bạn những lựa chọn tốt nhất, từ những khách sạn sang trọng đến những lựa chọn tiết kiệm. Đội ngũ nhân viên của chúng tôi luôn sẵn sàng hỗ trợ bạn trong việc tìm kiếm và đặt phòng.',
    bookingDescription3:
      'Hãy để Travel World giúp bạn tìm kiếm nơi lưu trú lý tưởng cho chuyến đi của bạn, đảm bảo bạn có những trải nghiệm tuyệt vời và đáng nhớ.',
    hotelDetails: {
      title: 'Chi tiết Khách sạn',
      description: 'Mô tả',
      location: 'Vị trí',
      reviews: 'Đánh giá',
      relatedHotels: {
        today: 'Khách sạn liên quan hôm nay',
        vietnam: 'Khách sạn liên quan tại Việt Nam',
        duration: 'Thời gian',
        facilities: 'Tiện ích',
        reviews: 'đánh giá',
        perPerson: 'mỗi người',
      },
    },
    room: 'Phòng',
    showMore: 'Xem thêm',
    roomEndDate: 'Ngày kết thúc phải lớn hơn ngày bắt đầu',
    roomStartDate: 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc',
    roomSelect: 'Chọn phòng',
    roomGuest: 'Số khách',
    roomPrice: 'Giá',
    roomSpecial: 'Ưu đãi đặc biệt',
    roomTax: 'Thuế',
    roomBook: 'Đặt phòng',
    roomBill: 'Hóa đơn',
    roomStart: 'Bắt đầu',
    roomEnd: 'Kết thúc',
    pricePerNight: 'Giá mỗi đêm',
    numberOfNights: 'Số đêm',
    totalAmount: 'Tổng cộng',
    cancel: 'Hủy',
    confirm: 'Xác nhận',
    roomsAvailable: 'Phòng trống',
    roomType: 'Loại phòng',
  },

  hotelBooking: {
    title: 'Chi tiết Khách sạn',
    location: 'Vị trí',
    noRoomsAvailable: 'Không có phòng trống',
    description: 'Mô tả',
    openInGoogleMaps: 'Mở trong Google Maps',
    features: {
      freeCancellation: {
        title: 'Miễn phí hủy phòng',
        description: 'Hủy trước 24 giờ để được hoàn tiền đầy đủ',
      },
      healthPrecautions: {
        title: 'Biện pháp y tế',
        description: 'Áp dụng các biện pháp an toàn và sức khỏe đặc biệt. Tìm hiểu thêm',
      },
      mobileTicketing: {
        title: 'Vé điện tử',
        description: 'Sử dụng điện thoại hoặc in vé của bạn',
      },
      duration: {
        title: 'Thời gian 3.5 Giờ',
        description: 'Kiểm tra lịch trình để xem giờ bắt đầu.',
      },
      instantConfirmation: {
        title: 'Xác nhận ngay',
        description: 'Không cần đợi xác nhận!',
      },
      service: {
        title: 'Dịch vụ Khách sạn',
        description: 'Tiếng Anh',
      },
    },
    booking: {
      title: 'Đặt phòng',
      from: 'Từ',
      to: 'Đến',
      selectRoom: 'Chọn phòng',
      guests: 'Số khách',
      subtotal: 'Tổng cộng',
      confirmBooking: 'Xác nhận đặt phòng',
      saveWishlist: 'Lưu vào danh sách yêu thích',
      shareActivity: 'Chia sẻ',
    },
    relatedHotels: {
      today: 'Khách sạn liên quan hôm nay',
      vietnam: 'Khách sạn liên quan tại Việt Nam',
      duration: 'Thời gian',
      facilities: 'Tiện ích',
      reviews: 'đánh giá',
      perPerson: 'mỗi người',
    },
  },

  propose: {
    title: 'Đề xuất',
    subtitle: 'Các mục nổi bật của chúng tôi',
  },

  ourService: {
    title: 'Dịch vụ của chúng tôi',
    description: 'Những dịch vụ tốt nhất dành cho bạn',
  },

  banner: {
    title: 'Chào mừng',
    description: 'Tìm nơi ở hoàn hảo của bạn',
  },

  map: {
    title: 'Vị trí',
    currentLocation: 'Vị trí hiện tại',
  },

  article: {
    title: 'Bài viết',
    content: 'Nội dung',
  },

  booking: {
    loginRequired: 'Vui lòng đăng nhập để tiếp tục đặt phòng',
    confirmBooking: 'Xác nhận đặt phòng',
    saveWishlist: 'Lưu vào danh sách yêu thích',
    shareActivity: 'Chia sẻ hoạt động',
    subtotal: 'Tổng cộng',
    guests: {
      title: 'Khách',
      adults: 'Người lớn',
      children: 'Trẻ em',
      rooms: 'Phòng',
    },
    dates: {
      from: 'Từ',
      to: 'Đến',
      checkInOut: 'Nhận phòng / Trả phòng',
    },
  },

  features: {
    freeCancellation: {
      title: 'Miễn phí hủy phòng',
      description: 'Hủy trước 24 giờ để được hoàn tiền đầy đủ',
    },
    healthPrecautions: {
      title: 'Biện pháp y tế',
      description: 'Áp dụng các biện pháp an toàn và sức khỏe đặc biệt. Tìm hiểu thêm',
    },
    mobileTicketing: {
      title: 'Vé điện tử',
      description: 'Sử dụng điện thoại hoặc in vé của bạn',
    },
    duration: {
      title: 'Thời gian 3.5 Giờ',
      description: 'Kiểm tra lịch trình để xem giờ bắt đầu.',
    },
    instantConfirmation: {
      title: 'Xác nhận ngay',
      description: 'Không cần đợi xác nhận!',
    },
    service: {
      title: 'Dịch vụ',
      description: 'Tiếng Anh',
    },
  },

  layout: {
    search: 'Tìm kiếm',
    searchPlaceholder: 'Tìm kiếm...',
    notifications: 'Thông báo',
    settings: 'Cài đặt',
    language: 'Ngôn ngữ',
    theme: 'Giao diện',
    light: 'Sáng',
    dark: 'Tối',
  },

  dashboard: {
    overview: {
      title: 'Tổng quan',
      subtitle: 'Đây là những gì đang diễn ra',
      banner: {
        title: 'Cập nhật mới v6',
        description:
          'Mẫu yêu thích của bạn có giao diện mới hiện đại, nhiều tùy chọn tùy chỉnh, màn hình & hơn thế nữa.',
        update: 'Có bản cập nhật mới!',
        settings: 'Mở Cài đặt Ứng dụng',
      },
      help: {
        title: 'Trung tâm Trợ giúp',
        description: 'Cần giúp đỡ? Hãy kiểm tra trung tâm trợ giúp của chúng tôi.',
        button: 'Trung tâm Trợ giúp',
      },
      jobs: {
        title: 'Việc làm',
        description: 'Tìm công việc mơ ước của bạn',
        button: 'Tìm việc làm',
      },
      tips: {
        title: 'Mẹo & Thủ thuật',
        content: 'Những mẹo và thủ thuật hữu ích để tận dụng tối đa trải nghiệm của bạn.',
      },
      inbox: {
        title: 'Hộp thư đến',
        goToChat: 'Đi đến trò chuyện',
      },
      events: {
        title: 'Sự kiện sắp tới',
        seeAll: 'Xem tất cả',
      },
      transactions: {
        title: 'Giao dịch gần đây',
        subtitle: 'Dựa trên khoảng thời gian đã chọn',
        all: 'Tất cả',
        confirmed: 'Đã xác nhận',
        pending: 'Đang chờ',
      },
    },
  },

  hero: {
    title: 'Tìm Hiểu Trước Khi Đi',
    subtitle: 'Du lịch mở ra cánh cửa tạo nên kỷ niệm',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam ipsum nobis asperiores soluta voluptas quas voluptates. Molestiae tempora dignissimos, animi praesentium molestias perferendis porro expedita delectus. Soluta natus porro.',
    search: {
      location: 'Địa điểm',
      locationPlaceholder: 'Bạn muốn đi đâu?',
      distance: 'Khoảng cách',
      distancePlaceholder: 'Khoảng cách km',
      maxPeople: 'Số người tối đa',
      maxPeoplePlaceholder: '0',
      search: 'Tìm kiếm',
    },
  },

  service: {
    title: 'Dịch vụ của chúng tôi',
    subtitle: 'Chúng tôi cung cấp những dịch vụ tốt nhất',
    weather: {
      title: 'Tính toán thời tiết',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    },
    guide: {
      title: 'Hướng dẫn viên tốt nhất',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    },
    customization: {
      title: 'Tùy chỉnh',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    },
  },

  gallery: {
    title: 'Thư viện ảnh',
    subtitle: 'Ghé thăm thư viện ảnh tour của khách hàng',
  },
};
