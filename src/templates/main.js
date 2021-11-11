import "./add.scss";
import "./articles.scss";
import "./contact.scss";
import "./style.scss";

import Carousel from "./carousel";

let email;
let title;
let content;
let submitBtn;

let elem;
let imgInSlideEl;
let imgNumberEl;
let sliderShowNumberEl;
let carousel;

export function submitForm(e) {
  e.preventDefault();
  if (submitBtn.classList.contains("shake")) {
    submitBtn.className = "";
    submitBtn.classList.remove("shake");
  }
  if (
    content.value.length < 20 ||
    (title && !title.value) ||
    (email && !email.value)
  ) {
    submitBtn.classList.add("shake");
    setTimeout(() => submitBtn.classList.remove("shake"), 1000);
    return;
  }

  submitBtn.classList.toggle("is-loading");
  setTimeout(() => {
    submitBtn.classList.toggle("is-loading");
    submitBtn.disabled = false;
    content.disabled = false;
    content.value = "";
    if (title) {
      title.disabled = false;
      title.value = "";
    }
    if (email) {
      email.disabled = false;
      email.value = "";
    }
  }, 1000);

  submitBtn.disabled = true;
  content.disabled = true;
  if (title) {
    title.disabled = true;
  }
  if (email) {
    email.disabled = true;
  }
}

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
  email = document.getElementById("email");
  title = document.getElementById("title");
  content = document.getElementById("content");
  submitBtn = document.getElementById("submit-button");

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
  if (content && submitBtn) {
    content.value = "";
    submitBtn.addEventListener("click", submitForm);
  }
}

window.addEventListener("load", init);
