export function createCard(data, index) {
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
             ${data.new ? ' <h2 id="user-new">NEW!</h2>' : ""}
              ${data.feature ? '<h2 id="user-featured">FEATURE</h2>' : ""}
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
