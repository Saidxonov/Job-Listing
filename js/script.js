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

document.addEventListener("DOMContentLoaded", function() {
    const cards = JSON.parse(localStorage.getItem("jobCards")) || [];
    cards.forEach((data, index) => {
        let card = createCard(data, index);
        block.innerHTML += card;
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", function() {
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
    if (!img.value.startsWith("https")) {
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

function createCard(data, index) {
    return `
    <div class="card">
      <img class="user-img" src="${data.img}" alt="" />
      <div class="user-info">
        <div class="users-all-info">
          <div class="user-info-top">
            <div class="user-company-name">
              <h2> ${data.company} </h2>
            </div>
            <div class="user-new-featured">
              <h2 id="user-new">${data.new ? "NEW" : ""}</h2>
              <h2 id="user-featured">${data.feature ? "FEATURED" : ""}</h2>
            </div>
          </div>
          <div class="user-company">
            <h2> ${data.userPosition} </h2>
            <div class="user-time-location">
              <h2 class="day">${data.timeOfWork}</h2>
              <h2 class="type-of-work">${data.typeOfWork}</h2>
              <h2 class="location">${data.location}</h2>
            </div>
          </div>
        </div>
        <div class="user-skills">
          ${
            data.fulstakSkil
              ? `<h2 class="user-skil-frontend">Full Stack</h2>`
              : ""
          }
          ${data.python ? `<h2 class="user-skil-frontend">Python</h2>` : ""}
          ${
            data.midweight
              ? `<h2 class="user-skil-frontend">Midweight</h2>`
              : ""
          }
          ${data.react ? `<h2 class="user-skil-frontend">React</h2>` : ""}
        </div>
      </div>
      <button class="delete-btn">Delete</button>
    </div>
  `;
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