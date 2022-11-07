let swiperRoomPopular = new Swiper(".swiper-room-popular", {
    effect: "default",
    direction: "horizontal",
    loop: true,
    slidesPerView: "1",
    spaceBetween: 30,
    autoplay: {
        delay: 4000,
    },
    navigation: {
        nextEl: '.room-popular__swiper__next-element',
        prevEl: '.room-popular__swiper__prev-element',
    },
});
