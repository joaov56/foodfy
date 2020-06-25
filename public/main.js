const cards = document.querySelectorAll(".card");
const close = document.querySelector(".close-modal");
const modalContent = document.querySelector(".modal-content");
const modalOverlay = document.querySelector(".modal-overlay");

for (let card of cards) {
  console.log(card);

  card.addEventListener("click", function () {
    const id = card.getAttribute("id");
    window.location.href = `/recipes/${id}`;
  });
}
