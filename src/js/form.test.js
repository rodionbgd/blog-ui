import { init, submitForm } from "./form";

describe("Submit form", () => {
  let email;
  let title;
  let content;
  let submitBtn;

  beforeEach(() => {
    document.body.innerHTML = `<form class="main__add-article">
          <label for="email">Email</label>
          <input type="email" value="" id="email" />
          <label for="title">Тема</label>
          <input type="text" value="" id="title" />
          <label for="content">Содержание</label>
          <textarea name="articls" id="content" rows="5"></textarea>
          <button type="submit" id="submit-button">Отправить</button>
        </form>`;
    email = document.getElementById("email");
    title = document.getElementById("title");
    content = document.getElementById("content");
    submitBtn = document.getElementById("submit-button");
    init();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("Initializing after loading", () => {
    expect(content.value).toBe("");
  });
  test("Listeners", () => {
    submitBtn.dispatchEvent(new Event("click"));
    expect(submitBtn.classList.contains("shake")).toBeTruthy();
  });
  test("Removal class shake", () => {
    content.value = `${new Array(25).fill(true).toString()}`;
    title.value = `${Math.random()}`;
    email.value = `${Math.random()}`;
    submitBtn.classList.add("shake");
    submitForm(new Event("input"));
    expect(submitBtn.classList.contains("shake")).toBeFalsy();
  });
  test("adding class shake after submitting", () => {
    submitForm(new Event("input"));
    expect(submitBtn.classList.contains("shake")).toBeTruthy();
    setTimeout(() => {
      expect(submitBtn.classList.contains("shake")).toBeFalsy();
    }, 1200);
  });
  test("Adding class is-loading after submitting", () => {
    content.value = `${new Array(25).fill(true).toString()}`;
    title.value = `${Math.random()}`;
    email.value = `${Math.random()}`;
    submitForm(new Event("input"));
    expect(submitBtn.disabled).toBeTruthy();
    setTimeout(() => {
      expect(submitBtn.disabled).toBeFalsy();
    }, 1200);
  });
});
