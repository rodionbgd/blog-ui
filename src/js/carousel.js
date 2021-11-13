export default class Carousel {
  constructor(options) {
    this.elem = options.elem;
    this.sliderShowNumberEl = options.sliderShowNumberEl;
    this.imgInSlide = options.imgInSlide;
    this.imgNumber = options.imgNumber;
    this.initialOffset = 0;
    this.lastSlide = 0;
    this.startX = 0;
    this.dX = 0;
    this.dXPrev = 0;
    this.shiftX = 0;
    this.context = this;
    this.allSlideElements = null;
    this.sliderLeftBound = 0;
    this.sliderRightBound = 0;
    this.pointerMoveBind = this.pointerMove.bind(this.context);
    this.pointerUpBind = this.endMove.bind(this.context);
    this.getSlideBind = this.getSlide.bind(this.context);

    this.init();
    this.listener();
  }

  init() {
    this.elem.innerHTML = "";
    for (let i = 0; i < this.imgNumber; i += 1) {
      this.elem.innerHTML += `<li class="main__items__item transit" style="min-width: calc(${
        100 / this.imgInSlide
      }%)">
  <img src="./img/${Math.floor(Math.random() * 5 + 1)}.jpg" alt="item ${i}">
  <h3 class="main__items__item__title center">item ${i + 1}</h3>
</li>`;
    }
    this.initialOffset = this.elem.firstElementChild.clientLeft;
  }

  listener() {
    this.sliderShowNumberEl.addEventListener("input", this.getSlideBind);
    this.elem.addEventListener("selectstart", (e) => e.preventDefault());
    this.elem.addEventListener("dragstart", (e) => e.preventDefault());
    this.elem.addEventListener("mousedown", this.mouseDown.bind(this.context));
  }

  pointerMove(event) {
    this.dX = event.pageX - this.startX;
    this.moveAt(event.pageX);
  }

  moveAt(pageX) {
    if (
      this.dX < this.dXPrev &&
      this.allSlideElements[
        this.allSlideElements.length - 1
      ].getBoundingClientRect().right < this.sliderRightBound
    ) {
      return;
    }
    if (
      this.allSlideElements[0].getBoundingClientRect().left >
      this.sliderLeftBound
    ) {
      return;
    }
    this.dXPrev = this.dX;
    this.allSlideElements.forEach((item) => {
      item.firstElementChild.classList.remove("slider-show");
      item.style.left = `${pageX - this.shiftX}px`;
    });
  }

  endMove(e) {
    setTimeout(() => {
      this.allSlideElements.forEach((item) => {
        if (
          Math.abs(Math.ceil((e.pageX - this.shiftX) / item.clientWidth)) <
          this.imgNumber - this.imgInSlide + 1
        ) {
          item.style.left = `${
            e.pageX - this.shiftX - ((e.pageX - this.shiftX) % item.clientWidth)
          }px`;
        }
      });
      if (
        this.allSlideElements[
          this.allSlideElements.length - 1
        ].getBoundingClientRect().right < this.sliderRightBound
      ) {
        this.allSlideElements.forEach((item) => {
          item.style.left = `${
            -item.clientWidth * (this.imgNumber - this.imgInSlide)
          }px`;
        });
      } else if (
        this.allSlideElements[0].getBoundingClientRect().left >
        this.sliderLeftBound
      ) {
        this.allSlideElements.forEach((item) => {
          item.style.left = `${0}`;
        });
      }
    }, 200);
    document.removeEventListener("mousemove", this.pointerMoveBind);
    document.removeEventListener("mouseup", this.pointerUpBind);
  }

  mouseDown(e) {
    const coords = this.elem.getBoundingClientRect();
    this.sliderLeftBound = coords.left;
    this.sliderRightBound = coords.right;
    const sliderElem = e.target;
    if (!sliderElem.closest("li")) {
      return;
    }
    this.allSlideElements = this.elem.querySelectorAll("li");
    this.startX = e.pageX;
    this.sliderLeftBound = this.elem.getBoundingClientRect().left;
    this.shiftX =
      e.clientX -
      this.allSlideElements[0].getBoundingClientRect().left +
      this.sliderLeftBound;

    document.addEventListener("mousemove", this.pointerMoveBind);
    document.addEventListener("mouseup", this.pointerUpBind);
  }

  getSlide() {
    let number = Number(this.sliderShowNumberEl.value);
    if (number > this.imgNumber) {
      number = this.imgNumber;
      this.sliderShowNumberEl.value = `${number}`;
    }
    if (!this.allSlideElements) {
      this.allSlideElements = this.elem.querySelectorAll("li");
    }
    if (this.lastSlide) {
      this.allSlideElements[
        this.lastSlide - 1
      ].firstElementChild.classList.remove("slider-show");
    }
    this.lastSlide = number;
    this.allSlideElements.forEach((item, index) => {
      if (index === number - 1) {
        item.firstElementChild.classList.add("slider-show");
      }
      if (number + this.imgInSlide > this.imgNumber + 1) {
        item.style.left = `${
          this.initialOffset -
          item.clientWidth * (this.imgNumber - this.imgInSlide)
        }px`;
      } else {
        item.style.left = `${
          this.initialOffset - item.clientWidth * (number - 1)
        }px`;
      }
    });
  }

  cleanUp() {
    this.sliderShowNumberEl.removeEventListener("input", this.getSlideBind);
  }
}
