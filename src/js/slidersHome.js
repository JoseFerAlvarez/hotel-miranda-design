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

const swiperFood = new Swiper(".swiper-food", {
    direction: "horizontal",
    loop: true,
    slidesPerView: "1",
    spaceBetween: 30,
    autoplay: {
        delay: 4000,
    },
    navigation: {
        nextEl: '.swiper-food__next-element',
        prevEl: '.swiper-food__prev-element',
    },
});

const swiperFoodGrid = new Swiper(".swiper-food__grid", {
    direction: "horizontal",
    loop: true,
    slidesPerView: "1",
    spaceBetween: 30,
    autoplay: {
        delay: 4000,
    },
    navigation: {
        nextEl: '.swiper-food__grid__next-element',
        prevEl: '.swiper-food__grid__prev-element',
    },
});

const swiperFoodImages = new Swiper(".swiper-food__images", {
    direction: "horizontal",
    loop: true,
    slidesPerView: "1",
    spaceBetween: 30,
    autoplay: {
        delay: 4000,
    },
    pagination: {
        el: '.swiper-food__pagination',
        type: 'bullets',
    },
});
