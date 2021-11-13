import "../css/add.scss";
import "../css/contact.scss";
import "../css/style.scss";

let email;
let title;
let content;
let submitBtn;

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

export function init() {
  email = document.getElementById("email");
  title = document.getElementById("title");
  content = document.getElementById("content");
  submitBtn = document.getElementById("submit-button");

  if (content && submitBtn) {
    content.value = "";
    submitBtn.addEventListener("click", submitForm);
  }
}

window.addEventListener("load", init);
