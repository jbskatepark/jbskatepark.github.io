const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");
const parkVideo = document.querySelector(".park-video");
const videoToggle = document.querySelector(".video-toggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const updateHeader = () => {
  siteHeader?.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const setMenuOpen = (open) => {
  menuButton?.setAttribute("aria-expanded", String(open));
  navigation?.classList.toggle("is-open", open);
  if (menuButton) menuButton.textContent = open ? "Close" : "Menu";
};

menuButton?.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

navigation?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuButton.focus();
  }
});

window.matchMedia("(min-width: 901px)").addEventListener("change", (event) => {
  if (event.matches) setMenuOpen(false);
});

const updateVideoButton = () => {
  if (!parkVideo || !videoToggle) return;
  videoToggle.textContent = parkVideo.paused ? "Play video" : "Pause video";
};

const applyMotionPreference = () => {
  if (!parkVideo) return;

  if (reducedMotion.matches) {
    parkVideo.pause();
    updateVideoButton();
    return;
  }

  parkVideo.play().then(updateVideoButton).catch(updateVideoButton);
};

videoToggle?.addEventListener("click", () => {
  if (!parkVideo) return;

  if (parkVideo.paused) {
    parkVideo.play().then(updateVideoButton).catch(updateVideoButton);
  } else {
    parkVideo.pause();
    updateVideoButton();
  }
});

parkVideo?.addEventListener("play", updateVideoButton);
parkVideo?.addEventListener("pause", updateVideoButton);
reducedMotion.addEventListener("change", applyMotionPreference);
applyMotionPreference();
