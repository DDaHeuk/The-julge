const sliderSettings = {
  dots: true,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 2500,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 743, // 모바일 사이즈
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

export default sliderSettings;
