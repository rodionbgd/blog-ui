import "./add.scss";
import "./articles.scss";
import "./contact.scss";
import "./style.scss";

const email = document.getElementById("email");
const title = document.getElementById("title");
const content = document.getElementById("content");
const submitBtn = document.getElementById("submit-button");

function addArticle(e) {
  e.preventDefault();
  if (submitBtn.classList.contains("shake")) {
    submitBtn.className = "";
    submitBtn.classList.remove("shake");
  }
  if (content.value.length < 20 || !title.value || (email && !email.value)) {
    submitBtn.classList.add("shake");
    setTimeout(() => submitBtn.classList.remove("shake"), 1000);
    return;
  }

  submitBtn.classList.toggle("is-loading");
  setTimeout(() => {
    submitBtn.classList.toggle("is-loading");
    submitBtn.disabled = false;
    content.disabled = false;
    title.disabled = false;
    email.disabled = false;
    content.value = "";
    title.value = "";
    email.value = "";
  }, 1000);

  submitBtn.disabled = true;
  content.disabled = true;
  title.disabled = true;
  email.disabled = true;
}

if (content && submitBtn) {
  content.value = "";
  submitBtn.addEventListener("click", addArticle);
}
