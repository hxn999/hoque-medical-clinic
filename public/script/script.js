const toast = document.getElementById("toast");
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.sandwich-button');
    const menuSlider = document.getElementById('menuSlider');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        menuSlider.classList.toggle('active');

        const isExpanded = menuToggle.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        menuSlider.setAttribute('aria-hidden', !isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!menuSlider.contains(event.target) && !menuToggle.contains(event.target)) {
            menuToggle.classList.remove('active');
            menuSlider.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuSlider.setAttribute('aria-hidden', 'true');
        }
    });
});


const hero = document.querySelector('.hero')

// scroll animation
let c=0

const observerL = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // console.log(c)
        if (entry.isIntersecting) {
           
            entry.target.classList.add('show');
            // hero.classList.add("blur-xl")
        } else {
           
            entry.target.classList.remove('show');
        }
    });
});



const hiddenElementsL = document.querySelectorAll('.hidden-l');
hiddenElementsL.forEach((el) => observerL.observe(el));


const observerR = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        // console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // hero.classList.add("blur-xl")
        } else {
            entry.target.classList.remove('show');
            // hero.classList.remove("blur-xl")
        }
    });
});



const hiddenElementsR = document.querySelectorAll('.hidden-r');
hiddenElementsR.forEach((el) => observerR.observe(el));

const blurObserver = new IntersectionObserver((entries) => {
  
    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            console.log(entry)
            // entry.target.classList.add('show');
            hero.classList.add("blur-3xl")
        } else {
            // entry.target.classList.remove('show');
            hero.classList.remove("blur-3xl")
        }
    });
   
});



const main = document.querySelector('#animation');
window.onload = ()=>{
    blurObserver.observe(main)

}

// console.log(main)


function showToast() {
    toast.style.top = "20px";
    setTimeout(() => {
        toast.style.top = "-50px";
    }, 3000);
}