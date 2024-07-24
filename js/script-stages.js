const carouselStages = document.querySelector(".stages__content");
const wrapperStages = carouselStages.querySelector(".carousel__wrapper");
const arrowBtnsStages = carouselStages.querySelectorAll(".carousel__btn");

const firstCardWidthStages = wrapperStages.querySelector(".carousel__slide").offsetWidth;
let scrollWidth = carouselStages.scrollWidth - carouselStages.clientWidth;

const indicatorParents = carouselStages.querySelector(".carousel__pagination");
let sectionIndex = 0;


function combineListItems() {
  // Получаем элементы списка этапов
  const stagesListItems = document.querySelectorAll('.stages__list .stages__item');
  if (stagesListItems.length >= 2) {
    // Используем NodeList.forEach для перебора элементов
    stagesListItems.forEach((item, i) => {
      // Получаем длину текста текущего и следующего элементов
      const currentItemTextLength = item.querySelector('.stages__text').textContent.length;
      let nextItemTextLength;

      // Проверяем, есть ли следующий элемент
      if (stagesListItems[i + 1]) {
        nextItemTextLength = stagesListItems[i + 1].querySelector('.stages__text').textContent.length;
      } else {
        // Если нет, устанавливаем длину текста следующего элемента в 0
        nextItemTextLength = 0;
      }

      // Складываем длины текстов
      const combinedTextLength = currentItemTextLength + nextItemTextLength;

      // Если сумма длин не превышает 125, объединяем элементы
      if (combinedTextLength <= 125) {
        const currentItemInnerHTML = item.innerHTML;
        const nextItemInnerHTML = stagesListItems[i + 1].innerHTML;
        // Создаем объединенный текст с помощью шаблона
        const combinedText = `${currentItemInnerHTML}${nextItemInnerHTML}`;
        // Изменяем текст текущего элемента
        item.innerHTML = combinedText;
        // Удаляем следующий элемент
        stagesListItems[i + 1].remove();
      }
    });
  }
  
  let updatedCardTotalStages = stagesListItems.length;
  return updatedCardTotalStages;
};

const updateCardTotalStages = () => {
  const carouselChildrensStages = [...wrapperStages.children];
  return carouselChildrensStages.length;
};

function showIndicator() {
  const carouselStages = document.querySelector(".stages__content");
  const carouselNavigation = carouselStages.querySelector(".carousel__navigation");
  const carouselPagination = carouselNavigation.querySelector(".carousel__pagination");

  let cardTotalStages = updateCardTotalStages();

  carouselNavigation.classList.remove('visually-hidden');

  for (let i = 0; i < cardTotalStages; i++) {
    let li = document.createElement('li');
    li.classList.add('carousel__dot');

    if (i == 0) {
      li.classList.add('selected')
    }
    carouselPagination.appendChild(li);
  }

  addIndicatorEventListeners();
};

function addIndicatorEventListeners() {
  document.querySelectorAll('.carousel__pagination li').forEach((indicator, ind) => {
    indicator.addEventListener('click', () => {
      sectionIndex = ind;
      updateCarousel();
    });
  });
};

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

// Функция для обновления состояния карусели
const updateCarousel = () => {
  // Обновляем индикаторы
  document.querySelector('.carousel__pagination .selected').classList.remove('selected');
  indicatorParents.children[sectionIndex].classList.add('selected');

  // Обновляем положение карусели
  wrapperStages.scrollLeft = firstCardWidthStages * sectionIndex;

  // Обновляем состояние кнопок
  showDisabledIcons();
};

// Добавляем обработчики событий для кнопок
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
};

function checkScreenSize() {
  initCarousel();
};

// Вызываем функцию при загрузке страницы
checkScreenSize();
