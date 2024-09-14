// Ensure the DOM is fully loaded before executing scripts
$(document).ready(function () {
    /*** Toggle Menu ***/
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    /*** Scroll Behavior and Scroll Spy ***/
    $(window).on('scroll load', function () {
        // Remove toggle classes on scroll/load
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        // Show/Hide scroll-top button
        if ($(window).scrollTop() > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }

        // Scroll Spy to highlight active section link
        $('section').each(function () {
            let sectionTop = $(this).offset().top - 200;
            let sectionHeight = $(this).outerHeight();
            let scrollPosition = $(window).scrollTop();
            let sectionId = $(this).attr('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find('a[href="#' + sectionId + '"]').addClass('active');
            }
        });
    });

    /*** Smooth Scrolling ***/
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate(
            {
                scrollTop: $($(this).attr('href')).offset().top,
            },
            500,
            'linear'
        );
    });

    

    /*** Page Visibility Change ***/
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'visible') {
            document.title = 'Portfolio | Rachit Saini';
            $('#favicon').attr('href', './assets/images/favicon.png');
        } else {
            document.title = 'Come Back To Portfolio';
            $('#favicon').attr('href', './assets/images/favhand.png');
        }
    });

    /*** Typed.js Effect ***/
    new Typed('.typing-text', {
        strings: [
            'Frontend Development',
            'Backend Development',
            'Web Designing',
            'Competitive Programming',
            'Web Development',
        ],
        loop: true,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 500,
    });

    /*** Fetch and Display Skills ***/
    async function fetchSkills() {
        try {
            const response = await fetch('skills.json');
            const skills = await response.json();
            let skillsContainer = $('#skillsContainer');
            let skillHTML = '';
            skills.forEach(skill => {
                skillHTML += `
                    <div class="bar">
                        <div class="info">
                            <img src="${skill.icon}" alt="${skill.name}" />
                            <span>${skill.name}</span>
                        </div>
                    </div>
                `;
            });
            skillsContainer.html(skillHTML);
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
    }

    /*** Fetch and Display Projects ***/
    async function fetchProjects() {
        try {
            const response = await fetch('projects.json');
            const projects = await response.json();
            let projectsContainer = $('.work .box-container');
            let projectHTML = '';
            projects.forEach(project => {
                projectHTML += `
                    <div class="box tilt">
                        <img draggable="false" src="${project.image}" alt="${project.name}" />
                        <div class="content">
                            <div class="tag">
                                <h3>${project.name}</h3>
                            </div>
                            <div class="desc">
                                <p>${project.desc}</p>
                                <div class="btns">
                                    <a href="${project.link}" class="btn" target="_blank">
                                        <i class="fas fa-eye"></i> View
                                    </a>
                                    <a href="${project.github}" class="btn" target="_blank">
                                        Code <i class="fas fa-code"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            projectsContainer.html(projectHTML);

            // Initialize Vanilla Tilt
            VanillaTilt.init($('.tilt'), {
                max: 15,
            });

            // Initialize ScrollReveal
            ScrollReveal().reveal('.work .box', { interval: 200 });
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    }

    // Fetch skills and projects on page load
    fetchSkills();
    fetchProjects();

    /*** Initialize ScrollReveal Animations ***/
    ScrollReveal().reveal('.home .content h2, .home .content p, .about .content h3, .about .content p', {
        origin: 'top',
        distance: '80px',
        duration: 1000,
        interval: 200,
    });

    ScrollReveal().reveal('.skills .container, .education .box-container, .experience .timeline', {
        origin: 'bottom',
        distance: '80px',
        duration: 1000,
        interval: 200,
    });

    /*** Disable Developer Mode Shortcuts ***/
    document.onkeydown = function (e) {
        if (
            e.keyCode == 123 ||
            (e.ctrlKey && e.shiftKey && e.keyCode == 73) || // Ctrl+Shift+I
            (e.ctrlKey && e.shiftKey && e.keyCode == 74) || // Ctrl+Shift+J
            (e.ctrlKey && e.keyCode == 85) // Ctrl+U
        ) {
            return false;
        }
    };
});
