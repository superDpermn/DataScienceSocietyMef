const banner = document.getElementById("banner");
const anim = document.getElementById("mainAnim");
const cursorElement = document.getElementById("text-cursor");
cursorElement.classList.add("animatedCursor");
const bannerImageContainer = document.getElementById("bannerImage");
const teamContainer = document.getElementById("teamContainer");

//team member arrays
const allTeamMembers = [];

const EDU_IT = [];
const CONTENT = [];
const ORG_SPONS = [];
const SOC_MEDIA = [];
const NO_SUBTEAM = [];

const teamMembers = teamContainer.children;
const bannerFontSize = 60; //manually set this when changing banner font size in css

const typingSpeed = 100;
const showMS = 2000;
const hideMS = 1000;
const swapDelay = 0;

const textArr = [
  //the strings to be cycled for the banner animation.
  "Data Talks Etkinlikleri",
  "Python & SQL Database Eğitimi",
  "Excel Eğitimleri",
];
const imageURLs = [
  //the file names of the banner slides, it is ordered.
  "Logo-full.jpg",
  "logo.png",
];
let currentTextIndex = 0;
let currentText = {
  text: textArr[0],
  delay: textArr[0].length * typingSpeed * 2 + showMS + swapDelay,
};
let imageCircularIndex = 0;

let typingStop = 0;
let noBannerText = true;

//a helper method that creates compatible objects to represent members
function createMember(
  NameSurname = "İsim Soyisim",
  Status = "Ekip",
  imageFileName = "user.png"
) {
  let ID;
  switch (Status) {
    case "Eğitim/IT Ekibi":
      ID = 0;
      break;
    case "İçerik Ekibi":
      ID = 1;
      break;
    case "Organizasyon ve Sponsorluk Ekibi":
      ID = 2;
      break;
    case "Sosyal Medya Ekibi":
      ID = 3;
      break;
    default:
      ID = 4;
  }
  return {
    imgSrc: "images/" + imageFileName,
    NameSurname: NameSurname,
    Status: Status,
    teamID: ID,
  };
}

//WRITE IN REVERSE ORDER UNTIL SOMEONE FINDS A FIX
const allTeamMemberTemplates = [
  createMember("Aksel Uğur", "Eğitim/IT Ekibi"),
  createMember("İlker Çınar", "Eğitim/IT Ekibi"),
  createMember("Nur Şahin", "Eğitim/IT Ekibi"),
  createMember("Bahri Efe Özkök", "Eğitim/IT Ekibi"),
  createMember("Eda Mine Topkara", "İçerik Ekibi"),
  createMember("Yaprak Müstecaplıoğlu", "İçerik Ekibi"),
  createMember("Mustafa Kaan Zengin", "İçerik Ekibi"),
  createMember("Duygu Özlü", "İçerik Ekibi"),
  createMember("Gülpembe Dağaşan", "Organizasyon ve Sponsorluk Ekibi"),
  createMember("Özgenur Şensoy", "Organizasyon ve Sponsorluk Ekibi"),
  createMember("Yusuf Sami", "Organizasyon ve Sponsorluk Ekibi"),
  createMember("Tuba Sinem Dinç", "Sosyal Medya Ekibi"),
  createMember("Ayşe Melis Özbek", "Sosyal Medya Ekibi"),
  createMember("Buse Su Buren", "İçerik Ekibi & Sosyal Medya Ekibi"),
];

function typeText(stringInput, speed) {
  let currentCharIndex = 0;

  function type() {
    cursorElement.classList.remove("animatedCursor");
    const currentString = stringInput;
    if (currentCharIndex < currentString.length) {
      const charSpan = document.createElement("span");
      charSpan.textContent = currentString.charAt(currentCharIndex);
      charSpan.classList.add("typing-animation");
      anim.appendChild(charSpan);
      currentCharIndex++;
      updateCursorPosition();
      setTimeout(type, speed);
    } else {
      updateCursorPosition();
      cursorElement.classList.add("animatedCursor");
      setTimeout(deleteText, showMS, typingSpeed); // Delay between strings
    }
  }

  type();
  noBannerText = false;
}

function deleteText(speed) {
  var letterNodes = anim.children;
  cursorElement.classList.remove("animatedCursor");
  function deleteOne() {
    if (anim.hasChildNodes) {
      const currentLetter = letterNodes[anim.childElementCount - 1];
      currentLetter.classList.remove("typing-animation");
      currentLetter.classList.add("delete-animation");
      currentLetter.addEventListener("animationend", () => {
        if (anim.lastChild == currentLetter) anim.removeChild(currentLetter);
      });
      if (anim.childElementCount > 1) {
        //if not the last node
        setTimeout(deleteOne, speed);
        updateCursorPosition();
      } else {
        cursorElement.classList.add("animatedCursor");
        noBannerText = true;
        swapText();
      }
    }
  }
  deleteOne();
}

function swapText() {
  currentTextIndex++;
  let circularIndex = currentTextIndex % textArr.length;
  currentText = {
    text: textArr[circularIndex],
    delay: textArr[circularIndex].length * typingSpeed * 2 + showMS + swapDelay,
  }; //circular indexing
  updateBannerText();
}

function selectUpdate() {
  if (noBannerText) {
    resetCursorPosition();
  } else {
    updateCursorPosition();
  }
}

function updateCursorPosition() {
  if (anim.hasChildNodes) {
    try {
      const lastSpan = anim.lastChild;
      const rect = lastSpan.getBoundingClientRect();
      const bannerBox = banner.getBoundingClientRect();
      cursorElement.style.left = rect.right - bannerBox.left + "px";
      cursorElement.style.top = rect.top - bannerBox.top + "px";
    } catch (error) {
      //handle error appropriately
      console.log(error);
    }
  }
}

function resetCursorPosition() {
  cursorElement.style.left = "0px";
}

function updateBannerText() {
  resetCursorPosition();
  changeBannerImage(imageURLs[imageCircularIndex++ % imageURLs.length]);
  setTimeout(
    (a, b) => {
      typeText(a, b);
    },
    hideMS,
    currentText.text,
    typingSpeed
  );
}

window.addEventListener("resize", selectUpdate);

function changeBannerImage(imageFileName) {
  function appendNewImage() {
    const newImage = new Image();
    newImage.src = "images/" + imageFileName;
    newImage.addEventListener("load", () => {
      newImage.style.animationName = "fadeIn";
      bannerImageContainer.appendChild(newImage);
    });
  }

  if (bannerImageContainer.firstChild) {
    const currentImage = bannerImageContainer.firstChild;
    currentImage.style.animationName = "fadeOut";
    currentImage.addEventListener("animationend", () => {
      bannerImageContainer.innerHTML = "";
      appendNewImage();
    });
  } else {
    appendNewImage();
  }
}

//changeBannerImage(fileNameAndExtension) for changing banner image

function addTeamMembers() {
  //adds team members given in an array of objects like:
  //memberArray = [{imgSrc:"images/BahriEfe.png",NameSurname:"Bahri Efe Özkök",Status:"Eğitim/IT Ekibi"}];
  for (let member of allTeamMemberTemplates) {
    const container = document.createElement("div");
    container.classList.add("teamMember");
    const mImage = new Image(128, 128);
    mImage.src = member.imgSrc || "images/user.png";

    container.appendChild(mImage);

    const p1 = document.createElement("p");
    p1.classList.add("memberName");
    const p2 = document.createElement("p");
    p2.classList.add("memberStatus");

    const p1t = document.createTextNode(member.NameSurname);
    const p2t = document.createTextNode(member.Status);

    p1.appendChild(p1t);
    p2.appendChild(p2t);

    container.appendChild(p1);
    container.appendChild(p2);

    allTeamMembers.push(container);
    switch (member.teamID) {
      case 0:
        EDU_IT.push(container);
        break;
      case 1:
        CONTENT.push(container);
        break;
      case 2:
        ORG_SPONS.push(container);
        break;
      case 3:
        SOC_MEDIA.push(container);
        break;
      case 4:
      default:
        NO_SUBTEAM.push(container);
    }
  }

  [EDU_IT, CONTENT, ORG_SPONS, SOC_MEDIA, NO_SUBTEAM].forEach((arr) => {
    const subContainer = document.createElement("div");
    subContainer.classList.add("subTeam");
    arr.forEach((member) => {
      subContainer.appendChild(member);
    });
    teamContainer.appendChild(subContainer);
  });
}

function init() {
  typeText(currentText.text, typingSpeed);
  changeBannerImage(imageURLs[imageCircularIndex++ % imageURLs.length]);

  addTeamMembers();
}

init();
