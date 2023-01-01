(function () {

    /**
   * Easy selector helper function
   */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
   * Easy event listener function
   */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
   * Easy on scroll event listener 
   */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
   * Scrolls to an element with header offset
   */
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset - 20,
            behavior: 'smooth'
        })
    }

    var navbar = document.getElementById('header');
    var fixedTopBarClass = 'fixed-top';

    let navbarlinks = document.querySelectorAll('#header .scrollto');


    //navbar Links Active class
    const navbarLinksActive = () => {
        let position = window.scrollY + 127;
        navbarlinks.forEach(navbarLink => {
            if (!navbarLink.hash) return;
            let section = document.querySelector(navbarLink.hash);
            if (!section) return;
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarLink.classList.add('active')
            } else {
                navbarLink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarLinksActive);
    onscroll(document, navbarLinksActive);

    // Back to top Button
    let backtotop = document.querySelector('.back-to-top');
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop);
        onscroll(document, toggleBacktotop);
    }

    // Sticky Navbar
    function normalNavbar() {
        navbar.classList.remove(fixedTopBarClass);
    }

    function stickyNavbar() {
        navbar.classList.add(fixedTopBarClass);
    }

    const stickyNavBar = () => {
        if (window.scrollY > 300) {
            stickyNavbar();
        } else {
            normalNavbar();
        }
    }
    window.addEventListener('scroll', stickyNavBar);

    /**
     * Scrool with ofset on links with a class name .scrollto
    */
    on('click', '.scrollto', function (e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#header')
            scrollto(this.hash)
        }
    }, true)

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });


    /**
   * Animation on scroll
   */
    window.addEventListener('load', () => {
        AOS.init({
            duration: 1100,
            // easing: 'ease-in',
            once: true,
            mirror: false
        })
        // AOS.init();
    });
})()