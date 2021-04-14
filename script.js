'use strict';

// Scrolling of show more //////////////////////////////////

const btnScroll = document.querySelector('.btn-show');

const section1 = document.querySelector('.section-about');

btnScroll.addEventListener('click', function (e) {
  e.preventDefault();
  //   console.log('scroll');

  section1.scrollIntoView({ behavior: 'smooth' });
});

/// Scolling of nav buttons //////////////////////////////////

document.querySelector('.main-nav').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav_link')) {
    const id = e.target.getAttribute('href');
    const c = id.replace('#', '.');
    document.querySelector(c).scrollIntoView({ behavior: 'smooth' });
  }
});

/// Hiding of inactive buttons on nav bar //////////////////////////////////

const nav = document.querySelector('.nav');

const mouseover = function (e) {
  if (e.target.classList.contains('nav_link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav_link');
    // console.log(siblings);
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
  }
};

nav.addEventListener('mouseover', mouseover.bind(0.5));
nav.addEventListener('mouseout', mouseover.bind(1));

/// sticky navigation //////////////////////////////////

// const initialcoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function (e) {
//   if (window.scrollY > initialcoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

const header = document.querySelector('.header');

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const options = {
  root: null,
  threshold: 0.1,
};

const headerObserver = new IntersectionObserver(stickyNav, options);
headerObserver.observe(header);

/// Revealing elements on scrolling //////////////////////////////////

const sections = document.querySelectorAll('.sect');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) {
    return;
  }
  entry.target.classList.remove('section_hidden');
  observer.unobserve(entry.target);
};

const options1 = {
  root: null,
  threshold: 0.2,
};

const sectionObserver = new IntersectionObserver(revealSection, options1);

sections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section_hidden');
});
