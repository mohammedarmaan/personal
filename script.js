document.querySelectorAll(".exp-trigger").forEach((trigger) => {
  const target = document.getElementById(trigger.dataset.target);

  trigger.addEventListener("mouseenter", () => {
    target.style.display = "block";
    setTimeout(() => (target.style.opacity = "1"), 100);
  });

  trigger.addEventListener("mouseleave", () => {
    target.style.opacity = "0";
    setTimeout(() => (target.style.display = "none"), 100);
  });
});
