import Carousel from "./carousel";

describe("Carousel", () => {
  let elem;
  let imgInSlideEl;
  let imgNumberEl;
  let sliderShowNumberEl;
  let carousel;

  beforeEach(() => {
    document.body.innerHTML = `        <section class="carousel">
          <label for="img-per-slide">Количество слайдов для показа</label
          ><input type="number" id="img-per-slide" value="3" min="1" />
          <label for="img-number">Общее количество слайдов</label
          ><input type="number" id="img-number" value="10" min="1" />
          <label for="show-slide">Показать слайд</label
          ><input type="number" id="show-slide" value="1" min="1" />
        </section>
        <ul class="main__items" id="carousel"></ul>`;
    elem = document.getElementById("carousel");
    imgInSlideEl = document.getElementById("img-per-slide");
    imgNumberEl = document.getElementById("img-number");
    sliderShowNumberEl = document.getElementById("show-slide");
    carousel = new Carousel({
      elem,
      imgInSlide: Number(imgInSlideEl.value),
      imgNumber: Number(imgNumberEl.value),
      sliderShowNumberEl,
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("Initializing carousel", () => {
    expect(carousel.elem).toBe(elem);
    expect(carousel).toBeInstanceOf(Carousel);
  });
  test("Creating carousel", () => {
    const initFn = jest.spyOn(carousel, "init");
    carousel.init();
    expect(initFn).toHaveBeenCalled();
    expect(elem.children.length).toBe(Number(imgNumberEl.value));
    expect(
      elem.children[
        Math.floor(Math.random() * Number(imgNumberEl.value - 1))
      ].classList.contains("transit")
    ).toBeTruthy();
  });
  test("Creating listeners", () => {
    const listenerMock = jest.spyOn(carousel, "listener");
    const mouseDownMock = jest.spyOn(carousel, "mouseDown");
    const getSlideBindMock = jest.spyOn(carousel, "getSlideBind");

    carousel.listener();
    expect(listenerMock).toHaveBeenCalled();

    carousel.elem.dispatchEvent(new MouseEvent("mousedown"));
    expect(mouseDownMock).toHaveBeenCalled();
    carousel.sliderShowNumberEl.dispatchEvent(new Event("input"));
    expect(getSlideBindMock).toHaveBeenCalled();
  });
  test("Starting moving carousel listeners", () => {
    const pointerMoveMock = jest.spyOn(carousel, "pointerMoveBind");
    const pointerUpMock = jest.spyOn(carousel, "pointerUpBind");
    const moveAtMock = jest.spyOn(carousel, "moveAt");
    const event = {
      target: elem.firstElementChild,
    };
    carousel.mouseDown(event);
    document.dispatchEvent(new MouseEvent("mousemove"));
    document.dispatchEvent(new MouseEvent("mouseup"));
    expect(pointerMoveMock).toHaveBeenCalled();
    expect(moveAtMock).toHaveBeenCalled();
    expect(pointerUpMock).toHaveBeenCalled();
  });
  describe("Starting moving carousel", () => {
    beforeEach(() => {
      carousel.init();
      const event = {
        target: elem.firstElementChild,
      };
      carousel.mouseDown(event);
      // carousel.dX < carousel.dXPrev
      carousel.dX = -Math.random();
      carousel.dXPrev = -carousel.dX;
    });
    test("Carousel at the left border", () => {
      carousel.allSlideElements[0].left = Math.random();
      carousel.sliderLeftBound = -Math.random();
      carousel.moveAt(Math.random());
      expect(carousel.dXPrev !== carousel.dX).toBeTruthy();
    });
    test("Carousel at the right border", () => {
      carousel.allSlideElements[carousel.allSlideElements.length - 1].right =
        -Math.random();
      carousel.sliderRightBound = Math.random();
      carousel.moveAt(Math.random());
      expect(carousel.dXPrev !== carousel.dX).toBeTruthy();
    });
    test("carousel moving", () => {
      // carousel.dX > carousel.dXPrev
      carousel.dXPrev = carousel.dX;
      carousel.dX = -carousel.dXPrev;
      carousel.allSlideElements[carousel.allSlideElements.length - 1].right =
        -Math.random();
      carousel.sliderRightBound = Math.random();
      carousel.moveAt(Math.random());
      expect(carousel.dXPrev === carousel.dX).toBeTruthy();
    });
    test("End moving carousel", () => {
      carousel.allSlideElements[0].left = Math.random();
      carousel.sliderLeftBound =
        carousel.allSlideElements[0].left - Math.random();
      carousel.endMove(Math.random());
      expect(carousel.allSlideElements[0].left).not.toBe(0);
      setTimeout(() => {
        expect(carousel.allSlideElements[0].left).toBe(0);
      });
    });
  });
});
