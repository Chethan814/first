document.addEventListener('DOMContentLoaded', function () {
    let slider = document.getElementsByClassName('slide');
    let counter = 0;
    slider = Array.from(slider);
    slider.forEach((element, index) => {
        element.style.left = `${index * 100}%`;
    });

    let nextBtn = document.getElementById("nextBtn");
    let prevBtn = document.getElementById("prevBtn");

    nextBtn.addEventListener('click', () => {
        counter++;
        slideImg();
    });

    prevBtn.addEventListener('click', () => {
        counter--;
        slideImg();
    });

    const slideImg = () => {
        if (counter < 0) {
            counter = slider.length - 1;
        } else if (counter >= slider.length) {
            counter = 0;
        }

        slider.forEach(element => {
            element.style.transform = `translateX(${-counter * 100}%)`;
        });
    };
});