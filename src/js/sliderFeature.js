const swiper = new Swiper(".swiper-feature", {
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
