import Swiper from 'swiper';

document.querySelector(".burger").addEventListener("click", (e) => {
    e.target.classList.toggle("burger--close")
    document.querySelector(".topbar__nav").classList.toggle("topbar__nav--visible");
});

const swiper = new Swiper(".swiper", {
    speed: 400,
    spaceBetween: 100,
})
