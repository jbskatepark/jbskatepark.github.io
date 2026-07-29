const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");
const parkVideo = document.querySelector(".park-video");
const videoToggle = document.querySelector(".video-toggle");

const updateHeader = () => {
  siteHeader?.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const updateVideoButton = () => {
  if (videoToggle && parkVideo) {
    videoToggle.textContent = parkVideo.paused ? "Play video" : "Pause video";
  }
};

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  parkVideo?.pause();
}

parkVideo?.addEventListener("play", updateVideoButton);
parkVideo?.addEventListener("pause", updateVideoButton);
updateVideoButton();

videoToggle?.addEventListener("click", () => {
  if (parkVideo.paused) {
    parkVideo.play();
  } else {
    parkVideo.pause();
  }
});

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  navigation.classList.toggle("is-open", !open);
});

navigation?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  }
});
