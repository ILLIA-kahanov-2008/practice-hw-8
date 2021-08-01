import { galleryItems } from "./galleryItems";
import { refs } from "./refs";

let activeIndex = null;

console.log(galleryItems);
console.log(refs);

function createGalleryCards(items) {
  return items.map(({preview, original, description}) => {
    return `<li class="gallery__item"><a class="gallery__link"
    href=${original}><img class="gallery__image" src=${preview}
    data-source=${original} alt=${description} /></a></li>`;
  })
}

refs.galleryList.innerHTML = createGalleryCards(galleryItems).join('');

refs.galleryList.addEventListener('click', onModalOpen);

function onModalOpen(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  refs.modal.classList.add('is-open');
  refs.modalImage.src = event.target.dataset.source;

  createGalleryCards(galleryItems).forEach((element, index) => {
    if (element.includes(event.target.src)) {
      activeIndex = index;
    }
  });


  window.addEventListener('keydown', CloseModalByEscape);
  window.addEventListener('keydown', changeByArrows);
}

refs.modal.addEventListener('click', onCloseModal);

function onCloseModal(event) {
  if (event.target.nodeName === 'IMG') {
    return;
  }
  refs.modalImage.src = '';
  refs.modal.classList.remove('is-open');
  window.removeEventListener('keydown', CloseModalByEscape);
  window.removeEventListener('keydown', changeByArrows);
}

function CloseModalByEscape(event) {
  if (event.code !== 'Escape') {
    return;
  }
  
  onCloseModal();  
}


function changeByArrows(event) {
  if (event.key === 'ArrowRight' && activeIndex < galleryItems.length - 1) {
    activeIndex += 1;
    refs.modalImage.src = galleryItems[activeIndex].original;
    return;
  }

  if (event.key === 'ArrowLeft' && activeIndex > 0) {
    activeIndex -= 1;
    refs.modalImage.src = galleryItems[activeIndex].original;
    return;
  }

 if (event.key === 'ArrowRight' && activeIndex === (galleryItems.length - 1)) {
    activeIndex = 0;
   refs.modalImage.src = galleryItems[activeIndex].original;
   return;
  }

  if (event.key === 'ArrowLeft' && activeIndex === 0) {
    activeIndex = galleryItems.length - 1;
    refs.modalImage.src = galleryItems[activeIndex].original;
    return;
  }

}
