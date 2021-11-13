import "../css/style.scss";

import Carousel from "./carousel";

let elem;
let imgInSlideEl;
let imgNumberEl;
let sliderShowNumberEl;
let carousel;

export function createSlider() {
  const imgNumber = Number(imgNumberEl.value);
  let imgInSlide = Number(imgInSlideEl.value);
  if (imgInSlide > imgNumber) {
    imgInSlideEl.value = `${imgNumber}`;
    imgInSlide = imgNumber;
  }
  if (carousel) {
    if (
      imgInSlide === carousel.imgInSlide &&
      imgNumber === carousel.imgNumber
    ) {
      return;
    }
    carousel.cleanUp();
    carousel = null;
  }
  carousel = new Carousel({ elem, imgInSlide, imgNumber, sliderShowNumberEl });
}

export function init() {
  elem = document.getElementById("carousel");
  imgInSlideEl = document.getElementById("img-per-slide");
  imgNumberEl = document.getElementById("img-number");
  sliderShowNumberEl = document.getElementById("show-slide");

  if (imgNumberEl && imgInSlideEl && elem && sliderShowNumberEl) {
    carousel = new Carousel({
      elem,
      imgInSlide: Number(imgInSlideEl.value),
      imgNumber: Number(imgNumberEl.value),
      sliderShowNumberEl,
    });
    imgNumberEl.addEventListener("input", createSlider);
    imgInSlideEl.addEventListener("input", createSlider);
  }
}

window.addEventListener("load", init);
