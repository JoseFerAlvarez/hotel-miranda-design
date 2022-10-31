const swiper = new Swiper(".swiper-food__images", {
    direction: "horizontal",
    loop: true,
    slidesPerView: "1",
    spaceBetween: 30,
    autoplay: {
        delay: 4000,
    },
    pagination: {
        el: '.swipper-food__pagination',
        type: 'bullets',
    },
});
