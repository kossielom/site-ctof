// ================================
// MENU BURGER (responsive)
// ================================
function toggleMenu() {
  const nav = document.getElementById('main-nav');
  nav.classList.toggle('active');
}

// ================================
// MULTILINGUE : FR / IT
// ================================
function setLang(lang) {
  const translatables = document.querySelectorAll('.lang');
  translatables.forEach(el => {
    if (el.dataset[lang]) {
      el.textContent = el.dataset[lang];
    }
  });
}

// ================================
// GALERIE + MODALE + SLIDESHOW
// ================================

// Liste des images de la galerie
const allImages = [
  { src: "images/galerie/img1..jpg", alt: "Fête culturelle", category: "culture" },
  { src: "images/galerie/img1-1.jpg", alt: "Fête culturelle", category: "culture" },
  { src: "images/galerie/cuisine1.jpg", alt: "Atelier de cuisine", category: "cuisine" },
  { src: "images/galerie/img3.jpg", alt: "Conférence communautaire", category: "events" },
  { src: "images/galerie/img4.jpg", alt: "Concert togolais", category: "culture" }
];

let filteredImages = [...allImages];
let currentIndex = 0;
let slideshowInterval = null;

// Filtrer les images par catégorie
function filterGallery(category) {
  const gallery = document.getElementById("gallery");
  if (!gallery) return; // éviter erreur si pas sur la page galerie

  filteredImages = category === "all"
    ? [...allImages]
    : allImages.filter(img => img.category === category);

  gallery.innerHTML = "";
  filteredImages.forEach((imgData, index) => {
    const img = document.createElement("img");
    img.src = imgData.src;
    img.alt = imgData.alt;
    img.onclick = () => openModal(index);
    gallery.appendChild(img);
  });
}

// Ouvrir modale + lancer slideshow
function openModal(index) {
  currentIndex = index;
  updateModal();
  const modal = document.getElementById("modal");
  if (modal) modal.style.display = "block";
  startSlideshow();
}

// Mettre à jour image + légende
function updateModal() {
  const img = document.getElementById("modal-img");
  const caption = document.getElementById("modal-caption");
  if (img && caption) {
    img.src = filteredImages[currentIndex].src;
    caption.textContent = filteredImages[currentIndex].alt;
  }
}

// Fermer modale + arrêter slideshow
function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.style.display = "none";
  stopSlideshow();
}

// Navigation image suivante / précédente
function nextImage() {
  currentIndex = (currentIndex + 1) % filteredImages.length;
  updateModal();
}
function prevImage() {
  currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
  updateModal();
}

// Lancer / arrêter slideshow
function startSlideshow() {
  stopSlideshow(); // éviter double intervalle
  slideshowInterval = setInterval(nextImage, 4000); // 4s
}
function stopSlideshow() {
  if (slideshowInterval) {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
  }
}

// Support clavier (← → Échap)
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("modal");
  if (modal && modal.style.display === "block") {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") closeModal();
  }
});

// ================================
// INITIALISATION AU CHARGEMENT
// ================================
window.onload = () => {
  setLang("fr"); // langue par défaut
  if (document.getElementById("gallery")) {
    filterGallery("all");
   }
};
function openVideo(url) {
  const modal = document.getElementById("video-modal");
  const frame = document.getElementById("video-frame");
  modal.style.display = "block";
  frame.src = url;
}
function closeVideoModal() {
  const modal = document.getElementById("video-modal");
  const frame = document.getElementById("video-frame");
  modal.style.display = "none";
  frame.src = "";
}
