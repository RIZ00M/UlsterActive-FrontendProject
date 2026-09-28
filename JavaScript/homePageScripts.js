$(document).ready(function() {
    /* all function calls go here */
    backgroundChanger();
});

function backgroundChanger() {
    /* get the background element */
    const greeterElement = document.getElementById("greeter");
    
    /* get all the indicator dots */
    const indicatorDots = document.querySelectorAll('.indicator');

    /* list of background images */
    const backgroundImages = [
        "Images/greeterBackground1.jpg",
        "Images/greeterBackground2.jpg",
        "Images/greeterBackground3.jpg",
        "Images/greeterBackground4.jpg",
        "Images/greeterBackground5.jpg"
    ];

    /* function to change the background image */
    function changeBackground(imageIndex) {
        /* changes the background to an image in our folder */
        greeterElement.style.backgroundImage = "url(" + backgroundImages[imageIndex] + ")";
        
        /* did this to remove active from every dot as a way to fix a bug that made them all start active */
        indicatorDots.forEach(function(dot) {
            dot.classList.remove('active');
        });
        
        /* add the 'active' class to the current indicator dot */
        indicatorDots[imageIndex].classList.add('active');
    }

    /* show the first image when the page loads, I know there is one in CSS but just to be safe */
    changeBackground(0);

    /* add click event to each indicator dot to go to next image */
    indicatorDots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            changeBackground(index);
        });
    });
}
