export function isUrl(url) {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlRegex.test(url);
}

//

//
export function validate(
  urlValue,
  companyName,
  position,
  newCheck,
  featCheck,
  time,
  work,
  location,
  skills,
  skillList
) {
  let skillItems = "";
  if (isUrl(urlValue)) {
    console.log("success");
  } else {
    document.querySelector("#card_img-url").focus();
    document.querySelector("#card_img-url").style.outline = "1px solid red";
    return false;
  }

  if (companyName.length < 4) {
    document.querySelector("#card_company-name").focus();
    document.querySelector("#card_company-name").style.outline =
      "1px solid red";
    return false;
  }

  if (position.length < 4) {
    document.querySelector("#position").focus();
    document.querySelector("#position").style.outline = "1px solid red";
    return false;
  }

  if (time.length == "") {
    document.querySelector("#time-select").focus();
    document.querySelector("#time-select").style.outline = "1px solid red";
    return false;
  }
  if (work.length == "") {
    document.querySelector("#work-type-select").focus();
    document.querySelector("#work-type-select").style.outline = "1px solid red";
    return false;
  }
  if (location.length == "") {
    document.querySelector("#location-select").focus();
    document.querySelector("#location-select").style.outline = "1px solid red";
    return false;
  }

  let count = 0;
  document.querySelectorAll(".skillsCheck").forEach((value) => {
    if (value.checked) {
      count++;
      skills.style.border = "none";
      let skill = value.getAttribute("id");
      let res = skill[0].toUpperCase() + skill.slice(1);
      console.log(res);
      skillItems += `<li>${res}</li>`;
    }
  });

  if (count == 0) {
    skills.style.border = "1px solid red";
    skills.focus();
    return false;
  }
  document.getElementById("myform").reset();
  return { isValid: true, skillItems };
}

//

//

export function createCard(data) {
  console.log(data.skillItems);

  let checkforNew = "none";
  if (data.newCheck.checked) {
    checkforNew = "block";
  }
  let checkforFeat = "none";
  if (data.featCheck.checked) {
    checkforFeat = "block";
  }

  let resCard = `
       <div class="card" data-id="${data.cardId}">
          <span class="delete-btn" >X</span>
  
          <!-- 
          -->
          <div class="card-info">
            <img
            width="84"
            height="84"style="border-radius:50%;"
              src="${data.url}"
              alt="company icon"
              class="card-img" />
            <div class="job-info">
              <div class="company-name">
                <h5 class="company-name-title">${data.companyName}</h5>
                
                <span class="company-name-new" style="display:${checkforNew}">NEW!</span>
                <span class="company-name-feat" style="display:${checkforFeat}" >FEATURED</span>
              </div>
              <h3 class="card-job">${data.position}</h3>
              <ul class="card-job-about">
                <li class="card-job-about-time">${data.time}</li>
                <li class="card-job-about-type">${data.workType}</li>
                <li class="card-job-about-location">${data.location}</li>
              </ul>
            </div>
          </div>
          <!-- 
          -->
          <div class="card-skills">
            <ul class="skills-wrapper">
            ${data.skillItems}
            </ul>
          </div>
          <!--
          --->
        </div>`;

  const cardWrapper = document.querySelector(".card-wrapper");
  cardWrapper.innerHTML += resCard;

  const deleteBtn = cardWrapper.querySelector(
    `[data-id="${data.cardId}"] .delete-btn`
  );

  // deleteBtn.addEventListener("click", function () {
  //   if (confirm("Rostanham ochirmoqchimisiz?")) {
  //     const card = document.querySelector(`[data-id="${data.cardId}"]`);
  //     card.remove();
  //     //
  //     let cards = JSON.parse(localStorage.getItem("cards")) || [];
  //     cards = cards.filter((value) => {
  //       value.cardId !== data.cardId;
  //     });
  //     localStorage.setItem("cards", JSON.stringify(cards));
  //   }
  // });
}

//

export function loadCardsFromLocalStorage() {
  let cards = JSON.parse(localStorage.getItem("cards")) || []; // Get saved cards

  cards.forEach((card) => {
    createCard(card);
  });
}
