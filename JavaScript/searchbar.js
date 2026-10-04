/* change any page info here */
const pages = [
    { name: 'Home', path: 'home.html', summary: 'Welcome to UlsterActive, your fitness journey starts here.' },
    { name: 'About Us', path: 'Webpages/about.html', summary: 'Discover our mission, values, and what makes UlsterActive special.' },
    { name: 'Contact Us', path: 'Webpages/contact.html', summary: 'Get in touch with us for inquiries, support, or feedback.' },
    { name: 'Memberships', path: 'Webpages/membership.html', summary: 'Explore our membership options and join the UlsterActive community.' },
    { name: 'Finaghy', path: 'Webpages/finaghy.html', summary: 'Visit our Finaghy gym location for top-notch facilities and classes.' },
    { name: 'Cityside (Yorkgate)', path: 'Webpages/yorkgate.html', summary: 'Check out our Cityside (Yorkgate) gym with modern equipment and expert trainers.' },
    { name: 'Class Timetable', path: 'Webpages/timetables.html', summary: 'View our class schedules and book your favorite fitness sessions.' }
];

$(document).ready(function() {
    /* if the webpage contains the path /Webpages/ then go up one ../ but if its home then stay on same level. 
    functionally just determines if we're dealing with home or not. */
    const linkPrefix = window.location.pathname.includes('/Webpages/') ? '../' : '';

    pages.forEach(function(page) {
    /* Adjusts navigation links based on current directory depth.
       if we are inside the 'Webpages' folder, we remove the directory prefix 
       for subpages to keep them relative, while ensuring 'Home' points back to root.
    */
    if (linkPrefix && page.name !== 'Home') {
        page.link = page.path.replace('Webpages/', '');
    } else {
        page.link = linkPrefix + page.path;
    }
    });
    /* I had to get help here as it was difficult to solve figuring out the path nightmare */

    /* storage variables */
    const $input = $('#search-input');
    const $list = $('#autocomplete-list');

    $input.on('input', function() {
        const query = $(this).val().toLowerCase(); /* sanitise input by making it lowercase */
       
        $list.empty(); /* empty the list from any previous searches */

        if (query) {
            pages.filter(function(page) {
                // searches by name and summary so if the user enters "join" it will show membership autocomplete.
                return page.name.toLowerCase().includes(query) || page.summary.toLowerCase().includes(query);
            }).forEach(function(page) {
                $list.append($('<li>').html(`<strong>${page.name}</strong><br><small>${page.link}</small><br><em>${page.summary}</em>`).data('link', page.link));
            });
            $list.show();
        } else {
            /* if theres nothing to show then hide the inactive elements junk */
            $list.hide();
        }
    });

    /* go to the link shown by the list */
    $list.on('click', 'li', function() {
        window.location.href = $(this).data('link');
    });
});