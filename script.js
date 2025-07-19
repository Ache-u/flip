const startScreen = document.getElementById("start-screen");
const flipbook = document.getElementById("flipbook");
const totalPages = 11;
let currentPage = 0;
const pages = [];

function launchFullscreen() {
  const docEl = document.documentElement;
  if (docEl.requestFullscreen) {
    docEl.requestFullscreen();
  } else if (docEl.mozRequestFullScreen) {
    docEl.mozRequestFullScreen();
  } else if (docEl.webkitRequestFullscreen) {
    docEl.webkitRequestFullscreen();
  } else if (docEl.msRequestFullscreen) {
    docEl.msRequestFullscreen();
  }
}

function showPage(index, forward = true) {
  if (index < 0 || index >= totalPages) return;

  const page = pages[index];
  if (forward) {
    page.style.transform = "rotateY(-180deg)";
  } else {
    page.style.transform = "rotateY(0deg)";
  }
}

function goNext() {
  if (currentPage < totalPages) {
    showPage(currentPage, true);
    currentPage++;
  }
}

function goPrev() {
  if (currentPage > 0) {
    currentPage--;
    showPage(currentPage, false);
  }
}

startScreen.addEventListener("click", () => {
  startScreen.style.display = "none";
  flipbook.style.display = "block";
  launchFullscreen();
  renderFlipbook();
});

function renderFlipbook() {
  for (let i = 1; i <= totalPages; i++) {
    const page = document.createElement("div");
    page.classList.add("page");
    page.style.zIndex = totalPages - i;

    const img = document.createElement("img");
    img.src = `pages/minos${i}.png`;
    img.alt = `Minos ${i}`;

    page.appendChild(img);
    flipbook.appendChild(page);
    pages.push(page);
  }

  // Clic lado izquierdo o derecho
  flipbook.addEventListener("click", (e) => {
    const middle = window.innerWidth / 2;
    if (e.clientX > middle) {
      goNext();
    } else {
      goPrev();
    }
  });

  // Tocar izquierda o derecha
  let startX = 0;
  flipbook.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  }, false);

  flipbook.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    if (endX < startX - 50) {
      goNext();
    } else if (endX > startX + 50) {
      goPrev();
    }
  }, false);
}
