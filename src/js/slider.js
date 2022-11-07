const typeSwiper = (widthSize) => {
    let numSlides = 0;
    if (widthSize > 1000) {
        numSlides = 3;
    } else {
        numSlides = 1;
    }

    return new Swiper(".swiper", {
        effect: "default",
        direction: "horizontal",
        loop: true,
        slidesPerView: numSlides,
        spaceBetween: 30,
        autoplay: {
            delay: 4000,
        },
        navigation: {
            nextEl: '.swiper__next-element',
            prevEl: '.swiper__prev-element',
        },
    });
};

let swiper = typeSwiper(window.innerWidth);

window.addEventListener("resize", () => {
    swiper = typeSwiper(innerWidth);
});

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
