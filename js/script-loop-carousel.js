const wrapper = document.querySelector(".participants__content")
const carousel = wrapper.querySelector(".carousel__wrapper");
const arrowBtns = wrapper.querySelectorAll(".carousel__btn");
const firstCardWidth = carousel.querySelector(".carousel__slide").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

let cardPervView = Math.round(carousel.offsetWidth / firstCardWidth);
let cardTotal = carouselChildrens.length;

document.querySelector(".carousel__pagination--total").innerHTML = `${cardTotal}`;

carouselChildrens.slice(-cardPervView).reverse().forEach(card => {
  carousel.insertAdjacentHTML('afterbegin', card.outerHTML);
});

carouselChildrens.slice(0, cardPervView).forEach(card => {
  carousel.insertAdjacentHTML('beforeend', card.outerHTML);
});

arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    console.log(carousel.scrollLeft)
    console.log(carousel.offsetWidth)
    carousel.scrollLeft += btn.id === "prev" ? - carousel.offsetWidth : carousel.offsetWidth;
  });  
});

const autoPlay = () => {
  timeoutId = setTimeout(() => carousel.scrollLeft += carousel.offsetWidth, 4000);
}

autoPlay();

const infiniteScroll = () => {
  if(carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth);
    carousel.classList.remove("no-transition");
  } else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  } else if(((carousel.scrollWidth - carousel.offsetWidth) - Math.ceil(carousel.scrollLeft)) < 20 ){
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if(!wrapper.matches(":hover")) autoPlay();
}

carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

let timeout;

const updateSlideNumber = () => {
  clearTimeout(timeout); 
  timeout = setTimeout(() => {
    let scrollLeft = carousel.scrollLeft - firstCardWidth;
    if (scrollLeft < 0) {
      scrollLeft += carousel.scrollWidth;
    }
    const currentSlide = Math.round(scrollLeft / firstCardWidth) % cardTotal + 1;
    document.querySelector(".carousel__pagination--current").textContent = currentSlide;
  }, 100); 
};

carousel.addEventListener("scroll", updateSlideNumber);