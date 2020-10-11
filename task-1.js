import galleryItems from './gallery-items.js';


const refs = {
  galleryList: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  bigImg: document.querySelector('.lightbox__image'),
  modalCloseBtn: document.querySelector('button[data-action="close-lightbox"]'),


  backDropEl: document.querySelector('.lightbox__overlay'),
};


refs.galleryList.insertAdjacentHTML(
  'beforeend',
  createGalleryItems(galleryItems),
);


refs.galleryList.addEventListener('click', openModal);
refs.modalCloseBtn.addEventListener('click', OnCloseModalBtnClick);
refs.backDropEl.addEventListener('click', onBackdropClick);


function createGalleryItems(galleryItems) {
  const markup = galleryItems.map(({ original, description, preview }) => {
    return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img class="gallery__image"src="${preview}"data-source="${original}"alt="${description}"/>
        </a>
            </li>`;
  })
    .join('');

  return markup;
}

function openModal(event) {
  event.preventDefault();
  const IMG_NODE_NAME = 'IMG';
  const isImg = event.target.nodeName !== IMG_NODE_NAME;
  if (isImg) {
    return;
  }
  refs.modal.classList.add('is-open');
  window.addEventListener('keydown', onEscBtnClick);

  window.addEventListener('keydown', onArrowRightButtonClick);
  window.addEventListener('keydown', onArrowLeftButtonClick);
  refs.bigImg.src = event.target.dataset.source;
  refs.bigImg.alt = event.target.alt;
}

function OnCloseModalBtnClick() {

  refs.modal.classList.remove('is-open');
  window.removeEventListener('keydown', onArrowLeftButtonClick);
  window.removeEventListener('keydown', onArrowRightButtonClick);
  window.addEventListener('keydown', onEscBtnClick);

  refs.bigImg.src = '';
  refs.bigImg.alt = '';
}

function onEscBtnClick(event) {
  const ESC_BTN_CODE = 'Escape';
  const isEscBtn = event.code === ESC_BTN_CODE;
  if (isEscBtn) {
    console.log('Закрыть модалку');
    refs.modal.classList.remove('is-open');
    window.addEventListener('keydown', onEscBtnClick);

    window.removeEventListener('keydown', onArrowLeftButtonClick);
    window.removeEventListener('keydown', onArrowRightButtonClick);
    window.removeEventListener('keydown', onEscBtnClick);

    refs.bigImg.src = '';
    refs.bigImg.alt = '';
  }
}
function onBackdropClick() {
  refs.modal.classList.remove('is-open');
  window.removeEventListener('keydown', onArrowLeftButtonClick);
  window.removeEventListener('keydown', onArrowRightButtonClick);
  window.addEventListener('keydown', onEscBtnClick);

  refs.bigImg.src = '';
  refs.bigImg.alt = '';
  console.log('Клик в бекдроп');
}


function onArrowRightButtonClick(event) {
  const ARROW_RIGHT_BTN_CODE = 'ArrowRight';
  const isArrowRightBtn = event.code !== ARROW_RIGHT_BTN_CODE;
  if (isArrowRightBtn) {
    return;
  }
  const arrOfImg = galleryItems.map(({ original }) => original);
  let currentImgIndex = arrOfImg.indexOf(refs.bigImg.src);

  if (currentImgIndex + 1 > arrOfImg.length - 1) {
    currentImgIndex = -1;
  }

  refs.bigImg.src = arrOfImg[currentImgIndex + 1];
}

function onArrowLeftButtonClick(event) {
  const ARROW_LEFT_BTN_CODE = 'ArrowLeft';
  const isArrowLeftBtn = event.code !== ARROW_LEFT_BTN_CODE;
  if (isArrowLeftBtn) {
    return;
  }
  const arrOfImg = galleryItems.map(({ original }) => original);
  let currentImgIndex = arrOfImg.indexOf(refs.bigImg.src);
  if (currentImgIndex === 0) {
    currentImgIndex = arrOfImg.length;
  }
  refs.bigImg.src = arrOfImg[currentImgIndex - 1];
}