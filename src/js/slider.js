/* import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper'; */

const typeSwiper = (widthSize) => {
    if (widthSize > 1000) {
        return new Swiper(".swiper", {
            effect: "coverflow",
            direction: "horizontal",
            loop: true,
            slidesPerView: "3",
            coverflowEffect: {
                rotate: -5,
                stretch: -50,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            spaceBetween: 30,
            autoplay: {
                delay: 4000,
            },
            navigation: {
                nextEl: '.swiper__next-element',
                prevEl: '.swiper__prev-element',
            },
        });
    } else {
        return new Swiper(".swiper", {
            direction: "horizontal",
            loop: true,
            slidesPerView: "1",
            spaceBetween: 30,
            autoplay: {
                delay: 4000,
            },
            navigation: {
                nextEl: '.swiper__next-element',
                prevEl: '.swiper__prev-element',
            },
        });
    }
};

let swiper = typeSwiper(window.innerWidth);

/* window.addEventListener("resize", () => {
    swiper = typeSwiper(innerWidth);
});
 */
