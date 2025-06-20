const flipbook = document.getElementById("flipbook");
const totalPages = 10;
let currentPage = 0;

const pages = [];

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

// Click en lado derecho o izquierdo
flipbook.addEventListener("click", (e) => {
  const middle = window.innerWidth / 2;
  if (e.clientX > middle) {
    goNext();
  } else {
    goPrev();
  }
});

// Soporte táctil
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
