const swiperFeature = new Swiper(".swiper-feature", {
    direction: "horizontal",
    loop: true,
    slidesPerView: "1",
    spaceBetween: 30,
    autoplay: {
        delay: 4000,
    },
    pagination: {
        el: '.swipper-feature__pagination',
        type: 'bullets',
    },
});

const swiperCounter = new Swiper(".swiper-counter", {
    direction: "horizontal",
    loop: true,
    slidesPerView: "1",
    spaceBetween: 30,
    autoplay: {
        delay: 4000,
    },
    pagination: {
        el: '.swiper-counter__pagination',
        type: 'bullets',
    },
});
