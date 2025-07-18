window.onload = () => {
  const enterBtn = document.getElementById("enter-btn");
  const enterScreen = document.getElementById("enter-screen");
  const mainContent = document.querySelector("main");
  const music = document.getElementById("bg-music");
  const playBtn = document.getElementById("play-btn");
  const volumeSlider = document.getElementById("volume-slider");
  const scrollTopBtn = document.getElementById("scroll-top");
  const searchInput = document.getElementById("search");
  const typedText = document.getElementById("typed-text");
  const projects = document.querySelectorAll(".project");
  const codingStatus = document.getElementById("coding-status");

  const devMessages = [
    "Welcome to justdev-chris tools",
    "justdev-chris — Tools & Projects",
    "chris is now online",
  ];

  let i = 0, j = 0, currentText = "", isDeleting = false;
  function typeEffect() {
    if (i < devMessages.length) {
      if (!isDeleting && j <= devMessages[i].length) {
        currentText = devMessages[i].substring(0, j++);
        typedText.innerText = currentText;
      } else if (isDeleting && j >= 0) {
        currentText = devMessages[i].substring(0, j--);
        typedText.innerText = currentText;
      }

      if (!isDeleting && j === devMessages[i].length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
      } else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % devMessages.length;
        setTimeout(typeEffect, 500);
      } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
      }
    }
  }

  enterBtn.onclick = () => {
    enterScreen.style.display = "none";
    mainContent.style.display = "flex";
    music.play().catch(() => {});
    typeEffect();
  };

  playBtn.onclick = () => {
    if (music.paused) {
      music.play();
    } else {
      music.pause();
    }
  };

  volumeSlider.addEventListener("input", () => {
    music.volume = volumeSlider.value;
  });

  window.onscroll = () => {
    scrollTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
  };

  scrollTopBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    projects.forEach((proj) => {
      proj.style.display = proj.innerText.toLowerCase().includes(query)
        ? "block"
        : "none";
    });
  });

  const codingList = ["TransferNest", "UCC: Story 2", "MetaLens", "New Tool"];
  let codingIndex = 0;
  setInterval(() => {
    codingStatus.innerText = codingList[codingIndex];
    codingIndex = (codingIndex + 1) % codingList.length;
  }, 5000);
};
