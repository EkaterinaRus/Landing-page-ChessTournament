const carouselStages = document.querySelector(".stages__content");
const wrapperStages = carouselStages.querySelector(".carousel__wrapper");
const arrowBtnsStages = carouselStages.querySelectorAll(".carousel__btn");
const firstCardWidthStages = wrapperStages.querySelector(".carousel__slide").offsetWidth;
let scrollWidth = carouselStages.scrollWidth - carouselStages.clientWidth;

const indicatorParents = carouselStages.querySelector(".carousel__pagination");
let sectionIndex = 0;

function combineListItems() {
  const stagesListItems = document.querySelectorAll(".stages__list .stages__item");
  if (stagesListItems.length >= 2) {
    stagesListItems.forEach((item, i) => {
      const currentItemTextLength = item.querySelector(".stages__text").textContent.length;
      let nextItemTextLength;

      if (stagesListItems[i + 1]) {
        nextItemTextLength = stagesListItems[i + 1].querySelector(".stages__text").textContent.length;
      } else {
        nextItemTextLength = 0;
      }

      const combinedTextLength = currentItemTextLength + nextItemTextLength;

      if (combinedTextLength <= 125) {
        const currentItemInnerHTML = item.innerHTML;
        const nextItemInnerHTML = stagesListItems[i + 1].innerHTML;
        const combinedText = `${currentItemInnerHTML}${nextItemInnerHTML}`;
        item.innerHTML = combinedText;
        stagesListItems[i + 1].remove();
      }
    });
  }

  let updatedCardTotalStages = stagesListItems.length;
  return updatedCardTotalStages;
}

const updateCardTotalStages = () => {
  const carouselChildrensStages = [...wrapperStages.children];
  return carouselChildrensStages.length;
};

function showIndicator() {
  const carouselStages = document.querySelector(".stages__content");
  const carouselNavigation = carouselStages.querySelector(".carousel__navigation");
  const carouselPagination = carouselNavigation.querySelector(".carousel__pagination");

  let cardTotalStages = updateCardTotalStages();

  carouselNavigation.classList.remove("visually-hidden");

  for (let i = 0; i < cardTotalStages; i++) {
    let li = document.createElement("li");
    li.classList.add("carousel__dot");

    if (i == 0) {
      li.classList.add("selected");
    }
    carouselPagination.appendChild(li);
  }

  addIndicatorEventListeners();
}

function addIndicatorEventListeners() {
  document.querySelectorAll(".carousel__pagination li").forEach((indicator, ind) => {
    indicator.addEventListener("click", () => {
      sectionIndex = ind;
      updateCarousel();
    });
  });
}

const showDisabledIcons = () => {
  cardTotalStages = updateCardTotalStages();

  if (sectionIndex === 0) {
    arrowBtnsStages[0].setAttribute("disabled", "");
  } else {
    arrowBtnsStages[0].removeAttribute("disabled");
  }

  if (sectionIndex === cardTotalStages - 1) {
    arrowBtnsStages[1].setAttribute("disabled", "");
  } else {
    arrowBtnsStages[1].removeAttribute("disabled");
  }
};

const updateCarousel = () => {
  document.querySelector(".carousel__pagination .selected").classList.remove("selected");
  indicatorParents.children[sectionIndex].classList.add("selected");

  wrapperStages.scrollLeft = firstCardWidthStages * sectionIndex;

  showDisabledIcons();
};

arrowBtnsStages.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("carousel__btn--prev")) {
      sectionIndex = Math.max(sectionIndex - 1, 0);
    } else {
      sectionIndex = Math.min(sectionIndex + 1, cardTotalStages - 1);
    }

    updateCarousel();
  });
});

function initCarousel() {
  if (window.innerWidth < 768) {
    combineListItems();
    showIndicator();
    updateCarousel();
  }
}

function checkScreenSize() {
  initCarousel();
}

checkScreenSize();
