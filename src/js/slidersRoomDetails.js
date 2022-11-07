let swiperRoomRelated = new Swiper(".swiper-room-related", {
    effect: "default",
    direction: "horizontal",
    loop: true,
    slidesPerView: "1",
    spaceBetween: 30,
    autoplay: {
        delay: 4000,
    },
    navigation: {
        nextEl: '.room-related__swiper__next-element',
        prevEl: '.room-related__swiper__prev-element',
    },
});
