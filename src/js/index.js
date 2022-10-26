document.querySelector(".burger").addEventListener("click", (e) => {
    e.target.classList.toggle("burger--close")
    document.querySelector(".topbar__nav").classList.toggle("topbar__nav--visible");
});
