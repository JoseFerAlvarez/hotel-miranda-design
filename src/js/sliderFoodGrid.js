const swiper = new Swiper(".swiper-food__grid", {
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
