import $ from "jquery";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/bundle";
import { Navigation, Pagination, Autoplay, EffectFade, EffectCoverflow, Thumbs, EffectCreative, Mousewheel, Grid } from "swiper/modules";
let reviewSwiper;
let reviewSwiperMobile;
let leftSaleSlider;
let centerSaleSlider;
let rightSaleSlider;
let mobileSaleSlider;
let newsSlider;

$(document).ready(function () {
	bannerSwiperInit();
	reviewSwiperInit();
	menuSwiperInit();
	saleSwiperInit();
	newsSwiperInit();
	reviewDetailSwiperInit();
	vacancyBannerSwiperInit();
	vacancyDetailSwiperInit();
	vacancyImageBannerSwiperInit();
});
function remToPx(remValue) {
	// Получаем текущий базовый размер шрифта (font-size) из элемента <html>
	var htmlFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

	// Переводим значение из rem в px
	var pxValue = remValue * htmlFontSize;

	// Округляем значение до целых пикселей (по желанию)
	return Math.round(pxValue) + "px";
}
function reviewSwiperInit() {
	if ($(".main-reviews").length > 0) {
		if (window.outerWidth > 768) {
			reviewSwiper = new Swiper(".main-reviews__slider", {
				modules: [EffectCreative, Navigation, Autoplay],
				grabCursor: true,
				autoplay: {
					delay: 3000,
					disableOnInteraction: false,
				},
				direction: "horizontal",
				centeredSlides: true,
				speed: 1200,
				loop: true,
				initialSlide: 1,
				navigation: {
					prevEl: ".main-reviews__navigation--prev",
					nextEl: ".main-reviews__navigation--next",
				},
				slidesPerView: 3.1,
				effect: "creative",
				creativeEffect: {
					perspective: true,
					limitProgress: 3.2,
					prev: {
						translate: ["-55rem", "7rem", 0],
						origin: "center 500%",
						rotate: [0, 0, -15],
					},
					next: {
						rotate: [0, 0, 15],
						translate: ["55rem", "7rem", 0],
						origin: "center 500%",
					},
				},
			});
		} else {
			reviewSwiperMobile = new Swiper(".main-reviews__slider", {
				modules: [Navigation],
				grabCursor: true,
				spaceBetween: `${remToPx(3.2)}rem`,
				direction: "horizontal",
				speed: 1200,
				navigation: {
					prevEl: ".main-reviews__navigation--prev",
					nextEl: ".main-reviews__navigation--next",
				},
				slidesPerView: 1,
			});
		}
	}
}
function bannerSwiperInit() {
	const mainBannerOption = {
		modules: [Navigation, EffectFade, Pagination, Autoplay],
		direction: "vertical",
		speed: 1200,
		slidesPerView: 1,
		spaceBetween: `${remToPx(1)}rem`,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		allowTouchMove: false,
		touchReleaseOnEdges: true,
	};
	if (window.outerWidth > 768) {
		const swiperTopTitle = new Swiper(".top-title", mainBannerOption);
		const swiperBottomTitle = new Swiper(".bottom-title", mainBannerOption);
		const swiperFooterLeft = new Swiper(".banner-footer-left", mainBannerOption);
		const swiperFooterRight = new Swiper(".banner-footer-right", mainBannerOption);
		const swiperBackgroundImage = new Swiper(".main-banner__right-back", {
			...mainBannerOption,
			pagination: {
				el: ".main-banner__right-controls--progressbar",
				type: "progressbar",
			},
			on: {
				init: function () {
					const progressbar = document.querySelector(".swiper-pagination-progressbar");
					progressbar.textContent = "";
					progressbar.insertAdjacentHTML(
						"afterbegin",
						`
							<svg class="pagination-swiper-up__svg" viewBox="0 0 24 24">
								<circle class="pagination-swiper-up__bg" r="12" cx="12" cy="12" fill="none" stroke-width="0.2" />
								<circle class="pagination-swiper-up__progress" r="12" cx="12" cy="12" fill="none" stroke-width="0.2" />
							</svg>
						`
					);
					let circleProgress = progressbar.querySelector(".pagination-swiper-up__progress");
					let circleRadius = circleProgress.getAttribute("r");
					let circleLength = 2 * Math.PI * circleRadius - 33;
					let circleIndex = circleLength / swiperTopTitle.slides.length;

					circleProgress.style.setProperty("--stroke-dasharray", circleLength);
					circleProgress.style.setProperty("--stroke-dashoffset", circleLength - circleIndex);
					swiperTopTitle.on("slideChange", () => {
						const progress = circleLength - circleIndex - circleIndex * swiperTopTitle.activeIndex;
						const progressIndicator = document.querySelector(".pagination-swiper-up__progress");
						progressIndicator.style.setProperty("--stroke-dashoffset", progress);
					});
				},
			},
		});
		const swiperIllustration = new Swiper(".banner-illustration", {
			...mainBannerOption,
			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},
			navigation: {
				nextEl: ".main-banner__pagination--next",
				prevEl: ".main-banner__pagination--prev",
			},
			pagination: {
				el: ".main-banner__right-controls--fraction",
				type: "fraction",
			},
		});
		$(".main-banner__pagination--next").on("click", (e) => {
			e.preventDefault();
			swiperTopTitle.slideNext();
			swiperBottomTitle.slideNext();
			swiperFooterLeft.slideNext();
			swiperFooterRight.slideNext();
			swiperBackgroundImage.slideNext();
		});
		$(".main-banner__pagination--prev").on("click", (e) => {
			e.preventDefault();
			swiperTopTitle.slidePrev();
			swiperBottomTitle.slidePrev();
			swiperFooterLeft.slidePrev();
			swiperFooterRight.slidePrev();
			swiperBackgroundImage.slidePrev();
		});
	} else {
		const swiperTopTitle = new Swiper(".top-title-mobile", mainBannerOption);
		const swiperBottomTitle = new Swiper(".bottom-title-mobile", mainBannerOption);
		const swiperFooterLeft = new Swiper(".banner-footer-left-mobile", mainBannerOption);
		const swiperFooterRight = new Swiper(".banner-footer-right-mobile", mainBannerOption);
		const swiperBackgroundImage = new Swiper(".main-banner__right-back-mobile", mainBannerOption);
		const swiperIllustration = new Swiper(".banner-illustration-mobile", {
			modules: [Navigation, EffectFade],
			...mainBannerOption,
			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},
			navigation: {
				nextEl: ".main-banner__pagination--next",
				prevEl: ".main-banner__pagination--prev",
			},
		});

		$(".main-banner__pagination--next").on("click", (e) => {
			e.preventDefault();
			swiperTopTitle.slideNext();
			swiperBottomTitle.slideNext();
			swiperFooterLeft.slideNext();
			swiperFooterRight.slideNext();
			swiperBackgroundImage.slideNext();
		});
		$(".main-banner__pagination--prev").on("click", (e) => {
			e.preventDefault();
			swiperTopTitle.slidePrev();
			swiperBottomTitle.slidePrev();
			swiperFooterLeft.slidePrev();
			swiperFooterRight.slidePrev();
			swiperBackgroundImage.slidePrev();
		});
	}
}
function menuSwiperInit() {
	const menuSwiper = new Swiper(".main-menu__cards", {
		modules: [Navigation],
		direction: "horizontal",
		speed: 1200,
		slidesPerView: 1,
		spaceBetween: `${remToPx(3.2)}rem`,
		navigation: {
			nextEl: ".main-menu__navigation--next",
			prevEl: ".main-menu__navigation--prev",
		},
		breakpoints: {
			769: {
				enabled: false,
				slidesPerView: "auto",
				spaceBetween: `0`,
			},
		},
	});
}
function saleSwiperInit() {
	if (window.outerWidth <= 768) {
		mobileSaleSlider = new Swiper(".sale-slider-mobile", {
			modules: [Navigation],
			direction: "horizontal",
			spaceBetween: `${remToPx(1.6)}rem`,
			slidesPerView: "auto",
			speed: 1200,
			navigation: {
				prevEl: ".main-sale__navigation--prev",
				nextEl: ".main-sale__navigation--next",
			},
		});
	}
}
function newsSwiperInit() {
	newsSlider = new Swiper(".main-news__slider", {
		modules: [Autoplay, Navigation],
		direction: "horizontal",
		speed: 1200,
		slidesPerView: "auto",
		spaceBetween: `${remToPx(1.6)}rem`,
		breakpoints: {
			769: {
				enabled: false,
				slidesPerView: "auto",
				spaceBetween: `0`,
			},
		},
	});
}
function reviewDetailSwiperInit() {
	$('[data-modal="review-detail"]').on("click", () => {
		const reviewDetailSwiper = new Swiper(".review-modal-detail__slider", {
			modules: [EffectFade, Navigation, Autoplay],
			direction: "horizontal",
			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},
			speed: 800,
			slidesPerView: 1,
			navigation: {
				prevEl: ".review-modal-detail__navigation--prev",
				nextEl: ".review-modal-detail__navigation--next",
			},
		});
	});
}
function vacancyBannerSwiperInit() {
	if ($(".vacancy-banner").length > 0) {
		const vacancyBannerSwiper = new Swiper(".vacancy-banner__slider", {
			modules: [EffectFade, Navigation],
			direction: "vertical",
			speed: 1200,
			slidesPerView: 1,
			navigation: {
				prevEl: ".vacancy-banner__navigation--prev",
				nextEl: ".vacancy-banner__navigation--next",
			},
		});
	}
}
function vacancyImageBannerSwiperInit() {
	if ($(".vacancy-banner").length > 0) {
		const vacancyBannerImageSwiper = new Swiper(".vacancy-banner__image", {
			modules: [EffectFade, Navigation],
			direction: "vertical",
			speed: 1200,
			slidesPerView: 1,
			navigation: {
				prevEl: ".vacancy-banner__navigation--prev",
				nextEl: ".vacancy-banner__navigation--next",
			},
		});
	}
}
function vacancyDetailSwiperInit() {
	if ($(".vacancy-detail").length > 0) {
		const vacancyDetailSwiper = new Swiper(".vacancy-detail__slider", {
			modules: [Navigation, Grid],
			slidesPerView: "auto",
			speed: 800,
			spaceBetween: `${remToPx(3.2)}rem`,
			breakpoints: {
				769: {
					slidesPerView: 1,
					spaceBetween: `${remToPx(1)}rem`,
					grid: {
						rows: 2,
						fill: "column",
					},
				},
			},
			navigation: {
				prevEl: ".vacancy-detail__slider-navigation--prev",
				nextEl: ".vacancy-detail__slider-navigation--next",
			},
		});
	}
}
