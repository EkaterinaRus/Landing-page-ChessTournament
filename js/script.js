const tickers = document.querySelectorAll('.ticker__list');

function setupViewport(ticker) {
  const itemCount = ticker.querySelectorAll('.ticker__item').length;
  let viewportWidth = 0;
  ticker.querySelectorAll('.ticker__item').forEach(item => {
    const clonedItem = item.cloneNode(true);
    ticker.insertBefore(clonedItem, ticker.lastChild);
  });

  for (let i = 0; i < itemCount; i++) {
    const itemWidth = ticker.querySelectorAll('.ticker__item')[i].offsetWidth;
    viewportWidth += itemWidth;
  }

  ticker.style.width = `${viewportWidth}px`;

  return viewportWidth
};

function animateTicker(ticker) {
  let viewportWidth = setupViewport(ticker)

  ticker.animate([
    { marginLeft: `-${viewportWidth}px` }
  ], {
    duration: 30000,
    easing: "linear",
    iterations: Infinity
  });
};

function initializeTickers() {
  tickers.forEach((ticker) => {
    animateTicker(ticker);
  });
}

initializeTickers();




// const ticker = document.querySelector('.ticker__list');
// const tickerItem = ticker.querySelectorAll('.ticker__item');
// const itemCount = ticker.querySelectorAll('.ticker__item').length;
// let viewportWidth = 0;

// const setupViewport = () => {
//   ticker.querySelectorAll('.ticker__item').forEach(item => {
//     const clonedItem = item.cloneNode(true);
//     ticker.insertBefore(clonedItem, ticker.lastChild);
//   });

//   for (let i = 0; i < itemCount; i++) {
//     const itemWidth = ticker.querySelectorAll('.ticker__item')[i].offsetWidth;
//     console.log(itemWidth)
//     viewportWidth += itemWidth;
//   }

//   ticker.style.width = `${viewportWidth}px`;
// };

// const animateTicker = () => {
//   ticker.animate([
//     { marginLeft: `-${viewportWidth}px` }
//   ], {
//     duration: 30000,
//     easing: "linear",
//     iterations: Infinity
//   });
// };

// function initializeTicker() {
//   setupViewport();
//   animateTicker();
// }

// initializeTicker() 

const aboutTextFirst = document.querySelector('.about__text-part--first');
const aboutTextSecond = document.querySelector('.about__text-part--second');

// Функция для разбиения текста
function splitText() {
  const fullText = 'Чтобы поддержать Международный васюкинский турнир посетите лекцию на тему: <span class="text-accent">«Плодотворная дебютная идея»</span>';
  const splitIndex = fullText.indexOf('посетите лекцию на тему: <span class="text-accent">«Плодотворная дебютная идея»</span>');

  // Получаем ширину экрана
  const screenWidth = window.innerWidth;

  // Если ширина экрана меньше 768px
  if (screenWidth < 768) {
    // Разбиваем текст
    const firstPart = fullText.slice(0, splitIndex);
    const secondPart = fullText.slice(splitIndex);

    // Обновляем текст в элементах
    aboutTextFirst.innerHTML = firstPart;
    aboutTextSecond.innerHTML = secondPart;
  } else {
    // Объединяем текст в один элемент
    aboutTextFirst.innerHTML = fullText;
    aboutTextSecond.innerHTML = '';
  }
}

window.addEventListener('load', splitText);
window.addEventListener('resize', splitText);
