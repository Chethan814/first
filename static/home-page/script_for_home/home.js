document.addEventListener('DOMContentLoaded', function () {

    let menu = document.getElementById('menu')
    let navList = document.querySelector('.nav-list')
    let body = document.body
    menu.addEventListener('click', function () {
        menu.name = menu.name === 'menu' ? 'close' : 'menu'
        // console.log(navList);
        let firstChild = navList.firstElementChild;
        if (firstChild.classList.contains('hidden')) {
            firstChild.classList.remove('hidden');
            firstChild.classList.add('block');
            body.classList.add('overflow-hidden');
            body.classList.remove('overflow-visible');
        } else {
            firstChild.classList.remove('block');
            firstChild.classList.add('hidden');

            body.classList.remove('overflow-hidden');
            body.classList.add('overflow-visible');
        }
    })

    document.getElementById('search').placeholder = 'City or address';

    
    


});