import Swiper from 'swiper';
import $ from 'jquery';
import {
	Navigation,
	Pagination,
	Autoplay,
	EffectFade,
	EffectCoverflow,
	Thumbs,
	EffectCreative,
	Mousewheel,
} from "swiper/modules";

$(document).ready(function () {
	const mainBannerOption = {
		modules: [Navigation, EffectFade, Pagination, Autoplay],
		direction: 'vertical',
		speed: 1200,
		slidesPerView: 1,
		spaceBetween: `${remToPx(1)}rem`,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
	}

	function remToPx(remValue) {
		// Получаем текущий базовый размер шрифта (font-size) из элемента <html>
		var htmlFontSize = parseFloat(
			getComputedStyle(document.documentElement).fontSize
		);

		// Переводим значение из rem в px
		var pxValue = remValue * htmlFontSize;

		// Округляем значение до целых пикселей (по желанию)
		return Math.round(pxValue) + "px";
	}

	if (window.outerWidth > 768) {
		const swiperTopTitle = new Swiper('.top-title', mainBannerOption);
		const swiperBottomTitle = new Swiper('.bottom-title', mainBannerOption);
		const swiperFooterLeft = new Swiper('.banner-footer-left', mainBannerOption);
		const swiperFooterRight = new Swiper('.banner-footer-right', mainBannerOption);
		const swiperBackgroundImage = new Swiper('.main-banner__right-back', {
			...mainBannerOption,
			pagination: {
				el: '.main-banner__right-controls--progressbar',
				type: 'progressbar'
			},
			on: {
				init: function () {
					const progressbar = document.querySelector('.swiper-pagination-progressbar');
					progressbar.textContent = "";
					progressbar.insertAdjacentHTML('afterbegin', `
						<svg class="pagination-swiper-up__svg" viewBox="0 0 24 24">
							<circle class="pagination-swiper-up__bg" r="12" cx="12" cy="12" fill="none" stroke-width="0.2" />
							<circle class="pagination-swiper-up__progress" r="12" cx="12" cy="12" fill="none" stroke-width="0.2" />
						</svg>
					`);
					let circleProgress = progressbar.querySelector(".pagination-swiper-up__progress");
					let circleRadius = circleProgress.getAttribute("r");
					let circleLength = (2 * Math.PI * circleRadius) - 33;
					let circleIndex = circleLength / swiperTopTitle.slides.length

					circleProgress.style.setProperty("--stroke-dasharray", circleLength);
					circleProgress.style.setProperty("--stroke-dashoffset", circleLength - circleIndex);
					swiperTopTitle.on('slideChange', () => {
						const progress = circleLength - circleIndex - circleIndex * (swiperTopTitle.activeIndex);
						const progressIndicator = document.querySelector('.pagination-swiper-up__progress');
						progressIndicator.style.setProperty("--stroke-dashoffset", progress);
					})
				},
			}
		});
		const swiperIllustration = new Swiper('.banner-illustration', {
			...mainBannerOption,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			navigation: {
				nextEl: '.main-banner__pagination--next',
				prevEl: '.main-banner__pagination--prev',
			},
			pagination: {
				el: '.main-banner__right-controls--fraction',
				type: 'fraction',
			}
		});
		$('.main-banner__pagination--next').on('click', e => {
			e.preventDefault();
			swiperTopTitle.slideNext();
			swiperBottomTitle.slideNext();
			swiperFooterLeft.slideNext();
			swiperFooterRight.slideNext();
			swiperBackgroundImage.slideNext();
		})
		$('.main-banner__pagination--prev').on('click', e => {
			e.preventDefault();
			swiperTopTitle.slidePrev();
			swiperBottomTitle.slidePrev();
			swiperFooterLeft.slidePrev();
			swiperFooterRight.slidePrev();
			swiperBackgroundImage.slidePrev();
		})
	} else {
		const swiperTopTitle = new Swiper('.top-title-mobile', mainBannerOption);
		const swiperBottomTitle = new Swiper('.bottom-title-mobile', mainBannerOption);
		const swiperFooterLeft = new Swiper('.banner-footer-left-mobile', mainBannerOption);
		const swiperFooterRight = new Swiper('.banner-footer-right-mobile', mainBannerOption);
		const swiperBackgroundImage = new Swiper('.main-banner__right-back-mobile', mainBannerOption);
		const swiperIllustration = new Swiper('.banner-illustration-mobile', {
			modules: [Navigation, EffectFade],
			...mainBannerOption,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			navigation: {
				nextEl: '.main-banner__pagination--next',
				prevEl: '.main-banner__pagination--prev',
			},
		});

		$('.main-banner__pagination--next').on('click', e => {
			e.preventDefault();
			swiperTopTitle.slideNext();
			swiperBottomTitle.slideNext();
			swiperFooterLeft.slideNext();
			swiperFooterRight.slideNext();
			swiperBackgroundImage.slideNext();
		})
		$('.main-banner__pagination--prev').on('click', e => {
			e.preventDefault();
			swiperTopTitle.slidePrev();
			swiperBottomTitle.slidePrev();
			swiperFooterLeft.slidePrev();
			swiperFooterRight.slidePrev();
			swiperBackgroundImage.slidePrev();
		})
	}

	// const newsSwiper = new Swiper('.news-swiper', {
	// 	direction: 'horizontal',
	// 	speed: 1200,
	// 	slidesPerView: 'auto',
	// 	spaceBetween: `${remToPx(1.6)}rem`,
	// 	breakpoints: {
	// 		768: {
	// 			enabled: false,
	// 			slidesPerView: 'auto',
	// 			spaceBetween: `${remToPx(1)}rem`,
	// 		}
	// 	},
	// });

	const menuSwiper = new Swiper('.main-menu__cards', {
		modules: [Autoplay, Navigation],
		direction: "horizontal",
		speed: 1200,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		slidesPerView: 1,
		spaceBetween: `${remToPx(3.2)}rem`,
		navigation: {
			nextEl: '.main-menu__navigation--next',
			prevEl: '.main-menu__navigation--prev',
		},
		breakpoints: {
			768: {
				enabled: false,
				slidesPerView: 'auto',
				spaceBetween: `0`,
			}
		},
	});

	if (window.outerWidth > 768) {
		const saleSlidersOptions = {
			modules: [Autoplay, Navigation],
			direction: "horizontal",
			spaceBetween: `${remToPx(1)}rem`,
			speed: 1000,
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},
		}
		const leftSaleSlider = new Swiper('.sale-slider-first', saleSlidersOptions);
		const centerSaleSlider = new Swiper('.sale-slider-second', saleSlidersOptions);
		const rightSaleSlider = new Swiper('.sale-slider-third', {
			...saleSlidersOptions,
			navigation: {
				prevEl: '.main-sale__navigation--prev',
				nextEl: '.main-sale__navigation--next'
			}
		});
		$('.main-sale__navigation--next').on('click', e => {
			e.preventDefault();
			leftSaleSlider.slideNext();
			centerSaleSlider.slideNext();
		})
		$('.main-sale__navigation--prev').on('click', e => {
			e.preventDefault();
			leftSaleSlider.slidePrev();
			centerSaleSlider.slidePrev();
		})
	} else {
		const mobileSaleSlider = new Swiper('.sale-slider-mobile', {
			modules: [Autoplay, Navigation],
			direction: "horizontal",
			spaceBetween: `${remToPx(1.6)}rem`,
			slidesPerView: 'auto',
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},
			speed: 1200,
			navigation: {
				prevEl: '.main-sale__navigation--prev',
				nextEl: '.main-sale__navigation--next'
			}
		})
	}

	const reviewSwiper = new Swiper('.main-reviews__slider', {
		modules: [EffectCreative, Navigation, Autoplay],
		grabCursor: true,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		direction: 'horizontal',
		slidesPerView: 3.1,
		centeredSlides: true,
		speed: 1200,
		loop: true,
		initialSlide: 1,
		effect: "creative",
		navigation: {
			prevEl: '.main-reviews__navigation--prev',
			nextEl: '.main-reviews__navigation--next'
		},
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
			}
		}
	})
});