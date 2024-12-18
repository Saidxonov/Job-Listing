import { createCard } from "./validate.js";
const img = document.querySelector("#input-img-url");
const companyName = document.querySelector("#input-company-name");
const newChekbox = document.querySelector("#input-new-chekbox");
const featureChekbox = document.querySelector("#input-feature-chekbox");
const userPosition = document.querySelector("#input-posotion-user");
const timeOfWork = document.querySelector("#vaqt");
const typeOfWork = document.querySelector("#type-of-work");
const locationInput = document.querySelector("#location");
const fulstakSkil = document.querySelector("#fulstak-skil");
const pythonSkil = document.querySelector("#python-skil");
const midweightSkil = document.querySelector("#midweight-skil");
const reactSkil = document.querySelector("#react-skil");
const button = document.querySelector("#btn");
const block = document.querySelector("#block");
const form = document.querySelector("#form");

// JavaScript to hide loader by adding the hidden class after 3 seconds
setTimeout(() => {
  document.getElementById("loader-card").classList.add("hidden");
}, 4020);

function saveCardToLocalStorage(data) {
  const cards = JSON.parse(localStorage.getItem("jobCards")) || [];
  cards.push(data);
  localStorage.setItem("jobCards", JSON.stringify(cards));
}

function deleteFromLocalStorage(index) {
  let cards = JSON.parse(localStorage.getItem("jobCards")) || [];
  cards.splice(index, 1);
  localStorage.setItem("jobCards", JSON.stringify(cards));
}

document.addEventListener("DOMContentLoaded", function () {
  const cards = JSON.parse(localStorage.getItem("jobCards")) || [];
  cards.forEach((data, index) => {
    let card = createCard(data, index);
    block.innerHTML += card;
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const cardElement = this.parentElement;
      const cardIndex = Array.from(block.children).indexOf(cardElement);
      cardElement.remove();
      deleteFromLocalStorage(cardIndex);
    });
  });
});

function isValid() {
  let valid = true;
  if (companyName.value.length < 4) {
    alert("Kompaniya nomi 4 ta harfdan kam bo'lmasligi kerak");
    valid = false;
  }
  if (!img.value.startsWith("https://")) {
    alert("Rasm URL manzili https bilan boshlanishi kerak");
    valid = false;
  }
  if (!newChekbox.checked && !featureChekbox.checked) {
    alert("New yoki Featured checkbox-lardan birini tanlash kerak");
    valid = false;
  }
  if (userPosition.value.length < 5) {
    alert("Lavozim nomi 5 ta harfdan kam bo'lmasligi kerak");
    valid = false;
  }
  if (timeOfWork.value === "tanlang") {
    alert("Vaqt maydonini tanlash kerak");
    valid = false;
  }
  if (typeOfWork.value === "tanlang") {
    alert("Ish turi maydonini tanlash kerak");
    valid = false;
  }
  if (locationInput.value === "tanlang") {
    alert("Joylashuv maydonini tanlash kerak");
    valid = false;
  }
  return valid;
}

button &&
  button.addEventListener("click", function (event) {
    event.preventDefault();
    if (isValid()) {
      let info = {
        img: img.value,
        company: companyName.value,
        new: newChekbox.checked,
        feature: featureChekbox.checked,
        userPosition: userPosition.value,
        timeOfWork: timeOfWork.value,
        typeOfWork: typeOfWork.value,
        location: locationInput.value,
        fulstakSkil: fulstakSkil.checked,
        python: pythonSkil.checked,
        midweight: midweightSkil.checked,
        react: reactSkil.checked,
      };
      let card = createCard(info);
      block.innerHTML += card;
      saveCardToLocalStorage(info);
      form.reset();
      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const cardElement = this.parentElement;
          const cardIndex = Array.from(block.children).indexOf(cardElement);
          cardElement.remove();
          deleteFromLocalStorage(cardIndex);
        });
      });
    }
  });
