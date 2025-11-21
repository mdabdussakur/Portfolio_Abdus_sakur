let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
  let header = document.querySelector("header");

  header.classList.toggle("sticky", window.screenY > 100);
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

ScrollReveal({
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content,.heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img,.services-container,.portfolio-box,.contact form",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1,.about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p,.about-content", { origin: "right" });

const typed = new Typed(".text-rotation", {
  strings: ["Google Ads Expert", "Meta Ads Expert", "Web Analytics Expert"],
  typeSpeed: 70,
  backSpeed: 80,
  backDelay: 800,
  loop: true,
});

//-----About Section Counter-------------//

// COUNTER UP ON SCROLL
const counters = document.querySelectorAll('[data-bs-toggle="counter-up"]');
const speed = 20000; // lower number = faster count

const startCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  const increment = target / speed;

  const updateCount = () => {
    const current = +counter.innerText;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      requestAnimationFrame(updateCount);
    } else {
      counter.innerText = target + "+";
    }
  };

  updateCount();
};

// Intersection Observer to trigger when visible
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
        observer.unobserve(entry.target); // run only once
      }
    });
  },
  { threshold: 0.5 } // 50% of element must be visible
);

// Attach observer to each counter
counters.forEach((counter) => {
  observer.observe(counter);
});
//----------------About Section done---------//

//-------circle skill bar------------//

const skillBars = document.querySelectorAll(".skill-bar .bar span");

const animateSkillBar = (bar) => {
  const width = window.getComputedStyle(bar).getPropertyValue("--w"); // custom width
  bar.style.width = width; // animate to final width
};

const barObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillBar(entry.target);
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

skillBars.forEach((bar) => barObserver.observe(bar));

//  circle animation

const circles = document.querySelectorAll(".circle");

const animateCircles = (elem) => {
  const dots = elem.getAttribute("data-dots");
  const marked = elem.getAttribute("data-percent");
  const percent = Math.floor((dots * marked) / 100);
  let points = "";
  const rotate = 360 / dots;

  for (let i = 0; i < dots; i++) {
    points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
  }

  elem.innerHTML = points;

  const pointsMarked = elem.querySelectorAll(".points");

  let i = 0;
  const markPoints = () => {
    if (i < percent) {
      pointsMarked[i].classList.add("marked");
      i++;
      requestAnimationFrame(markPoints);
    }
  };
  markPoints();
};

const circleObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCircles(entry.target);
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

circles.forEach((circle) => circleObserver.observe(circle));

//----------Portfolio isotope and filter--------------

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".btn-f");
  const portfolioItems = document.querySelectorAll(".port-box");

  // Default: show only 9 items
  const showLimit = 9;

  function filterProjects(filter) {
    let count = 0;

    portfolioItems.forEach((item) => {
      if (filter === "all" || item.classList.contains(filter.slice(1))) {
        if (filter === "all" && count >= showLimit) {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
        count++;
      } else {
        item.style.display = "none";
      }
    });
  }

  // Initial load – show only 9 projects
  filterProjects("all");

  // Add event listeners to all filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");
      filterProjects(filter);
    });
  });
});

// portfolio box reveal

document.addEventListener("DOMContentLoaded", () => {
  const portBoxes = document.querySelectorAll(".port-box");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100; // how early to start the animation

    portBoxes.forEach((box) => {
      const boxTop = box.getBoundingClientRect().top;
      if (boxTop < windowHeight - revealPoint) {
        box.classList.add("reveal");
      } else {
        box.classList.remove("reveal");
      }
    });
  }
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Run once on page load
});

// ---------------------portfolio ended-----------------------------//

// -------------------Testimonials carousel-----------------------//

$(document).ready(function () {
  $(".testimonial-carousel").owlCarousel({
    loop: true,
    margin: 30,
    center: true,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 800,
    dots: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 1,
      },
      992: {
        items: 1,
      },
    },
  });
});

// -------------email.js--------------------------------//////

(function () {
  emailjs.init("AE34oGBm6DGUPTPIK"); // Replace with your EmailJS Public Key
})();

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = this;
  const email = document.getElementById("email").value;
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  // Basic validation
  if (!email || !email.includes("@") || !name || !message) {
    alert("⚠️ Please fill up the form correctly before submitting.");
    return;
  }

  // Send message to YOU
  emailjs
    .sendForm("service_14z023q", "template_yqx9tvw", form)
    .then(() => {
      // Auto-reply to the visitor
      emailjs.send("service_14z023q", "template_4jnuwzn", {
        user_name: name,
        user_email: email,
        message: message,
      });

      // Success popup
      alert("✅ Message sent successfully! Thank you for contacting me.");

      // Reset form
      form.reset();
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      alert("❌ Failed to send message. Please try again.");
    });
});
