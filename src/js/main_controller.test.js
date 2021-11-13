import { createSlider, init } from "./main_controller";
import Carousel from "./carousel";

const initMock = jest.fn();
const cleanUpMock = jest.fn();
jest.mock("./carousel", () => jest.fn());
Carousel.mockImplementation(() => ({
  init: initMock,
  cleanUp: cleanUpMock,
}));

describe("Controllers testing", () => {
  let imgInSlideEl;
  let imgNumberEl;

  beforeEach(() => {
    document.body.innerHTML = `<section class="carousel">
          <label for="img-per-slide">Количество слайдов для показа</label
          ><input type="number" id="img-per-slide" value="3" min="1" />
          <label for="img-number">Общее количество слайдов</label
          ><input type="number" id="img-number" value="10" min="1" />
          <label for="show-slide">Показать слайд</label
          ><input type="number" id="show-slide" value="1" min="1" />
        </section>
        <ul class="main__items" id="carousel"></ul>`;
    imgInSlideEl = document.getElementById("img-per-slide");
    imgNumberEl = document.getElementById("img-number");
    init();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("Check elements' existing", () => {
    expect(imgInSlideEl.value).toBe("3");
    expect(imgNumberEl.value).toBe("10");
  });
  test("Initializing after loading", () => {
    expect(Carousel).toHaveBeenCalled();
    expect(Carousel.mock.calls[0][0].imgInSlide).toBe(
      Number(imgInSlideEl.value)
    );
  });
  test("Listeners", () => {
    imgNumberEl.dispatchEvent(new Event("input"));
    expect(cleanUpMock).toHaveBeenCalledTimes(1);
    imgInSlideEl.dispatchEvent(new Event("input"));
    expect(cleanUpMock).toHaveBeenCalledTimes(2);
  });
  test("Creating new carousel", () => {
    imgInSlideEl.value = `${Math.random()}`;
    imgNumberEl.value = `${Math.random()}`;
    createSlider();
    expect(imgNumberEl.value).toBe(imgInSlideEl.value);
  });
});
