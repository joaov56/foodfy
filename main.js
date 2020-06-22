const cards = document.querySelectorAll(".card");
const close = document.querySelector(".close-modal");
const modalContent = document.querySelector(".modal-content");
const modalOverlay = document.querySelector(".modal-overlay");

for (card of cards) {
  console.log(card);

  card.addEventListener("click", function () {
    modalOverlay.classList.add("active");
    modalContent.innerHTML += `${card.innerHTML}`;
  });
}

close.addEventListener("click", function () {
  modalContent.innerHTML = "";
  modalOverlay.classList.remove("active");
});
