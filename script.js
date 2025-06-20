const flipbook = document.getElementById("flipbook");
const totalPages = 10;
let currentPage = 0;

for (let i = 1; i <= totalPages; i++) {
  const page = document.createElement("div");
  page.classList.add("page");
  page.style.zIndex = totalPages - i;

  const img = document.createElement("img");
  img.src = `pages/minos${i}.png`;
  img.alt = `Minos ${i}`;

  page.appendChild(img);
  flipbook.appendChild(page);

  page.addEventListener("click", () => {
    if (i - 1 === currentPage) {
      page.style.transform = "rotateY(-180deg)";
      currentPage++;
    } else if (i - 1 === currentPage - 1) {
      page.style.transform = "rotateY(0deg)";
      currentPage--;
    }
  });
}
