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
