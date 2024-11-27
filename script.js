// document.addEventListener('DOMContentLoaded', () => {
//     const button = document.querySelector('.sandwich-button');
    
//     button.addEventListener('click', () => {
//         button.classList.toggle('active');
//         button.setAttribute('aria-expanded', button.classList.contains('active'));
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle =  document.querySelector('.sandwich-button');
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

