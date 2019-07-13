$(".menu__burger").on("click", function(e) {
    e.preventDefault();
    $(".menu__burger").toggleClass("menu__burger--active");
    $(".menu__list").toggleClass("menu__list--active");
    $(".menu").toggleClass("menu--active");
    $(".search__store-list").toggleClass("search__store-list--active");
});
$(".menu__link-project").on("click", function(e) {
    e.preventDefault();
    $(".menu__link-project").toggleClass("menu__link--active");
    $(".menu__submenu-project").toggleClass("menu__submenu--active");
    $(".menu__item-project").toggleClass("menu__item--active");
});
$(".menu__link-about").on("click", function(e) {
    e.preventDefault();
    $(".menu__link-about").toggleClass("menu__link--active");
    $(".menu__submenu-about").toggleClass("menu__submenu--active");
    $(".menu__item-about").toggleClass("menu__item--active");
});