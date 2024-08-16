document.addEventListener('DOMContentLoaded', function () {

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


    const destWrapper = document.querySelector(".dest-cards.wrapper");
    const destCarousel = document.querySelector(".dest-cards .carousel");
    const destFirstCardWidth = destCarousel.querySelector(".card").offsetWidth;
    const destArrowBtns = document.querySelectorAll(".dest-cards .wrapper i");
    const destCarouselChildrens = [...destCarousel.children];

    let destIsDragging = false, destStartX, destStartScrollLeft, destTimeoutId;

    // Get the number of destination cards that can fit in the carousel at once
    let destCardPerView = Math.round(destCarousel.offsetWidth / destFirstCardWidth);

    // Insert copies of the last few destination cards to the beginning of carousel for infinite scrolling
    destCarouselChildrens.slice(-destCardPerView).reverse().forEach(destCard => {
        destCarousel.insertAdjacentHTML("afterbegin", destCard.outerHTML);
    });

    // Insert copies of the first few destination cards to the end of carousel for infinite scrolling
    destCarouselChildrens.slice(0, destCardPerView).forEach(destCard => {
        destCarousel.insertAdjacentHTML("beforeend", destCard.outerHTML);
    });

    // Scroll the destination carousel at appropriate position to hide first few duplicate cards on Firefox
    destCarousel.classList.add("no-transition");
    destCarousel.scrollLeft = destCarousel.offsetWidth;
    destCarousel.classList.remove("no-transition");

    // Add event listeners for the arrow buttons to scroll the destination carousel left and right
    destArrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            destCarousel.scrollLeft += btn.id === "dest-left" ? -destFirstCardWidth : destFirstCardWidth;
        });
    });

    const destDragStart = (e) => {
        destIsDragging = true;
        destCarousel.classList.add("dragging");
        // Records the initial cursor and scroll position of the destination carousel
        destStartX = e.pageX;
        destStartScrollLeft = destCarousel.scrollLeft;
    };

    const destDragging = (e) => {
        if (!destIsDragging) return; // if destIsDragging is false return from here
        // Updates the scroll position of the destination carousel based on the cursor movement
        destCarousel.scrollLeft = destStartScrollLeft - (e.pageX - destStartX);
    };

    const destDragStop = () => {
        destIsDragging = false;
        destCarousel.classList.remove("dragging");
    };

    const destInfiniteScroll = () => {
        // If the destination carousel is at the beginning, scroll to the end
        if (destCarousel.scrollLeft === 0) {
            destCarousel.classList.add("no-transition");
            destCarousel.scrollLeft = destCarousel.scrollWidth - (2 * destCarousel.offsetWidth);
            destCarousel.classList.remove("no-transition");
        }
        // If the destination carousel is at the end, scroll to the beginning
        else if (Math.ceil(destCarousel.scrollLeft) === destCarousel.scrollWidth - destCarousel.offsetWidth) {
            destCarousel.classList.add("no-transition");
            destCarousel.scrollLeft = destCarousel.offsetWidth;
            destCarousel.classList.remove("no-transition");
        }

        // Clear existing timeout & start autoplay if mouse is not hovering over destination carousel
        clearTimeout(destTimeoutId);
        if (!destWrapper.matches(":hover")) destAutoPlay();
    };

    const destAutoPlay = () => {
        if (window.innerWidth < 800) return; // Return if window is smaller than 800
        // Autoplay the destination carousel after every 2500 ms
        destTimeoutId = setTimeout(() => destCarousel.scrollLeft += destFirstCardWidth, 2500);
    };
    destAutoPlay();

    destCarousel.addEventListener("mousedown", destDragStart);
    destCarousel.addEventListener("mousemove", destDragging);
    document.addEventListener("mouseup", destDragStop);
    destCarousel.addEventListener("scroll", destInfiniteScroll);
    destWrapper.addEventListener("mouseenter", () => clearTimeout(destTimeoutId));
    destWrapper.addEventListener("mouseleave", destAutoPlay);


    function initializeDestinationCarousel(carouselClass, wrapperClass, leftArrowId, rightArrowId) {
        const destWrapper = document.querySelector(`.${wrapperClass}`);
        const destCarousel = document.querySelector(`.${carouselClass}`);
        const destFirstCardWidth = destCarousel.querySelector(".card").offsetWidth;
        const destArrowBtns = document.querySelectorAll(`.${wrapperClass} i`);
        const destCarouselChildrens = [...destCarousel.children];

        let destIsDragging = false, destStartX, destStartScrollLeft, destTimeoutId;

        let destCardPerView = Math.round(destCarousel.offsetWidth / destFirstCardWidth);

        destCarouselChildrens.slice(-destCardPerView).reverse().forEach(destCard => {
            destCarousel.insertAdjacentHTML("afterbegin", destCard.outerHTML);
        });

        destCarouselChildrens.slice(0, destCardPerView).forEach(destCard => {
            destCarousel.insertAdjacentHTML("beforeend", destCard.outerHTML);
        });

        destCarousel.classList.add("no-transition");
        destCarousel.scrollLeft = destCarousel.offsetWidth;
        destCarousel.classList.remove("no-transition");

        destArrowBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                destCarousel.scrollLeft += btn.id === leftArrowId ? -destFirstCardWidth : destFirstCardWidth;
            });
        });

        const destDragStart = (e) => {
            destIsDragging = true;
            destCarousel.classList.add("dragging");
            destStartX = e.pageX;
            destStartScrollLeft = destCarousel.scrollLeft;
        };

        const destDragging = (e) => {
            if (!destIsDragging) return;
            destCarousel.scrollLeft = destStartScrollLeft - (e.pageX - destStartX);
        };

        const destDragStop = () => {
            destIsDragging = false;
            destCarousel.classList.remove("dragging");
        };

        const destInfiniteScroll = () => {
            if (destCarousel.scrollLeft === 0) {
                destCarousel.classList.add("no-transition");
                destCarousel.scrollLeft = destCarousel.scrollWidth - (2 * destCarousel.offsetWidth);
                destCarousel.classList.remove("no-transition");
            } else if (Math.ceil(destCarousel.scrollLeft) === destCarousel.scrollWidth - destCarousel.offsetWidth) {
                destCarousel.classList.add("no-transition");
                destCarousel.scrollLeft = destCarousel.offsetWidth;
                destCarousel.classList.remove("no-transition");
            }

            clearTimeout(destTimeoutId);
            if (!destWrapper.matches(":hover")) destAutoPlay();
        };

        const destAutoPlay = () => {
            if (window.innerWidth < 800) return;
            destTimeoutId = setTimeout(() => destCarousel.scrollLeft += destFirstCardWidth, 2500);
        };
        destAutoPlay();

        destCarousel.addEventListener("mousedown", destDragStart);
        destCarousel.addEventListener("mousemove", destDragging);
        document.addEventListener("mouseup", destDragStop);
        destCarousel.addEventListener("scroll", destInfiniteScroll);
        destWrapper.addEventListener("mouseenter", () => clearTimeout(destTimeoutId));
        destWrapper.addEventListener("mouseleave", destAutoPlay);
    }

    // Example usage
    initializeDestinationCarousel("new-dest-carousel", "new-dest-wrapper", "new-left-arrow", "new-right-arrow");



});