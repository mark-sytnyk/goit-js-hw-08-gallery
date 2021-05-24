import gallery from './gallery-items.js';
const galleryRef = document.querySelector('.js-gallery');
const btnClose = document.querySelector('[data-action="close-lightbox"]');
const overlay = document.querySelector('.lightbox__overlay');
const lightbox = document.querySelector('.js-lightbox');
const modal = document.querySelector('.lightbox__image');
const galleryElem = createElements (gallery);
galleryRef.insertAdjacentHTML('afterbegin', galleryElem)
galleryRef.addEventListener('click', onModalOpen);
btnClose.addEventListener('click', onModalClose);
overlay.addEventListener('click', onOverlayClick);

function createElements (gallery) {
   return gallery.map(
       ({ preview, original, description }) => {
         return  `
           <li class="gallery__item">
           <a
            class="gallery__link"
            href="${original}"
           >
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
          </a>
          </li>
           `
       }).join('')
}
function onModalOpen(event) {
    event.preventDefault();
    modal.src = event.target.dataset.source;
    modal.alt = event.target.alt;
    lightbox.classList.add('is-open');
    window.addEventListener('keydown', onEscKeyPress);
}

function onModalClose(event) {
  lightbox.classList.remove('is-open');
  window.removeEventListener('keydown', onEscKeyPress);
}

function onOverlayClick(event) {
  if (event.currentTarget === event.target) {
    onModalClose()
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onModalClose()
  }
}
galleryRef.addEventListener('keydown', onLeftOrRightKeyPress)
function onLeftOrRightKeyPress(event) {
  if (event.code === 'ArrowLeft') {
    const currentImage = modal.src;
    const currentIndex = gallery.findIndex(img => img.original === currentImage)
    const previousIndex = currentIndex === 0 ? gallery.length -1 : currentIndex -1;
    const previousImage = gallery[previousIndex]
    modal.src = previousImage.original
    modal.alt = previousImage.description
  }
  if (event.code === 'ArrowRight') {
    const currentImage = modal.src;
    const currentIndex = gallery.findIndex(img => img.original === currentImage)
    const nextIndex = currentIndex === gallery.length-1 ?  0 : currentIndex +1;
    const nextImage = gallery[nextIndex]
    modal.src = nextImage.original
    modal.alt = nextImage.description
  } 
}