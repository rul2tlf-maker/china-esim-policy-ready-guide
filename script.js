const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && window.anime) {
  anime({
    targets: ".hero-copy > *",
    translateY: [24, 0],
    opacity: [0, 1],
    delay: anime.stagger(90),
    duration: 860,
    easing: "easeOutExpo"
  });

  anime({
    targets: ".scan-beam",
    translateX: ["-18%", "245%"],
    duration: 2600,
    easing: "linear",
    loop: true
  });

  anime({
    targets: [".frame-line-a", ".frame-line-b", ".frame-line-c"],
    opacity: [0.25, 0.9],
    scale: [0.985, 1.01],
    direction: "alternate",
    duration: 1800,
    delay: anime.stagger(180),
    loop: true,
    easing: "easeInOutSine"
  });

  anime({
    targets: ".signal-pills li",
    translateY: [14, 0],
    opacity: [0, 1],
    delay: anime.stagger(70, { start: 420 }),
    duration: 640,
    easing: "easeOutQuad"
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
    duration: 1400,
    delay: 520,
    easing: "easeOutCubic",
    update: () => {
      node.textContent = target % 1 === 0 ? String(Math.round(state.value)) : state.value.toFixed(1);
    }
  });
});
