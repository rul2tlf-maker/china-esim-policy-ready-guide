const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && window.anime) {
  anime({
    targets: ".hero-copy > *",
    translateY: [28, 0],
    opacity: [0, 1],
    delay: anime.stagger(90),
    duration: 920,
    easing: "easeOutExpo"
  });

  anime({
    targets: ".scan-lane-a",
    translateX: ["-22%", "280%"],
    duration: 3200,
    easing: "linear",
    loop: true
  });

  anime({
    targets: ".scan-lane-b",
    translateX: ["280%", "-18%"],
    duration: 4200,
    easing: "linear",
    loop: true
  });

  anime({
    targets: ".hero-pills li",
    translateY: [16, 0],
    opacity: [0, 1],
    delay: anime.stagger(70, { start: 420 }),
    duration: 680,
    easing: "easeOutQuad"
  });

  anime({
    targets: ".feed-row",
    opacity: [0.35, 1],
    translateX: [10, 0],
    delay: anime.stagger(150, { start: 460 }),
    duration: 760,
    easing: "easeOutExpo"
  });

  anime({
    targets: ".route-track span",
    width: ["0%", "100%"],
    duration: 1900,
    delay: 900,
    easing: "easeInOutQuart"
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    if (!reduceMotion && window.anime) {
      anime({
        targets: entry.target,
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 760,
        easing: "easeOutExpo"
      });
    } else {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "none";
    }

    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));

document.querySelectorAll(".count").forEach((node) => {
  const target = Number(node.dataset.count || "0");

  if (reduceMotion || !window.anime) {
    node.textContent = target % 1 === 0 ? String(target) : target.toFixed(1);
    return;
  }

  const state = { value: 0 };
  anime({
    targets: state,
    value: target,
    round: target % 1 === 0 ? 1 : 10,
    duration: 1500,
    delay: 520,
    easing: "easeOutCubic",
    update: () => {
      node.textContent = target % 1 === 0 ? String(Math.round(state.value)) : state.value.toFixed(1);
    }
  });
});
