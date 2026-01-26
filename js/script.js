// Experience hover functionality
document.querySelectorAll(".exp-trigger").forEach((trigger) => {
  const target = document.getElementById(trigger.dataset.target);

  trigger.addEventListener("mouseenter", () => {
    target.style.display = "block";
    setTimeout(() => (target.style.opacity = "1"), 10);
  });

  trigger.addEventListener("mouseleave", () => {
    target.style.opacity = "0";
    setTimeout(() => (target.style.display = "none"), 300);
  });
});

// Tech stack image hover

const techImage = document.getElementById("techImage");

document.querySelectorAll(".techbox").forEach((box) => {
  box.addEventListener("mouseenter", () => {
    techImage.src = box.dataset.image;
    techImage.style.display = "block";
  });

  box.addEventListener("mouseleave", () => {
    techImage.style.display = "none";
  });
});

// random color for links

const links = document.querySelectorAll(".alink");

setInterval(() => {
  let randomlink = links[Math.floor(Math.random() * links.length)];
  randomlink.classList.add("twinkle");

  setTimeout(() => {
    randomlink.classList.remove("twinkle");
  }, 1500);
}, 2500);

// ticker animation 

const tickerElement = document.querySelector(".ticker");
const containerWidth = document.querySelector(".ticker-container").offsetWidth;

// Clone all items and append to create seamless loop
const items = tickerElement.querySelectorAll(".ticker-item");
items.forEach(item => {
  const clone = item.cloneNode(true);
  tickerElement.appendChild(clone);
});

let scrollPos = 0;

function autoScroll() {
  scrollPos -= 1;
  tickerElement.style.transform = `translateX(${scrollPos}px)`;

  // Reset to start when halfway through (seamless loop)
  if (Math.abs(scrollPos) >= tickerElement.scrollWidth / 2) {
    scrollPos = 0;
  }

  requestAnimationFrame(autoScroll);
}

autoScroll();

// Project hover thing

document.querySelectorAll(".project-card").forEach((project) => {
  project.addEventListener("mouseenter", () => {
    project.querySelector(".project-tag-group").style.visibility = "visible";
  });
  project.addEventListener("mouseleave", () => {
    project.querySelector(".project-tag-group").style.visibility = "hidden";
  });
});