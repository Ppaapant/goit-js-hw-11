import { createGalleryCard } from './js/render-functions.js';
import { fetchQueriesbyPhoto } from './js/pixabay-api.js';


import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.searchForm');
const gallery = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a');

const searchSubmit = event => {
  const loader = document.querySelector('.loader');
  event.preventDefault();

  const searchedEl = searchForm.elements[0].value.trim();

  if (searchedEl === '') {
    iziToast.error({
      title: '',
      message: 'Please enter your request',
      messageColor: '#fafafb',
      position: 'topRight',
      backgroundColor: '#ef4040',
    });

    return;
  }

  document.querySelector('.loader').classList.add('show-loader');

  fetchQueriesbyPhoto(searchedEl)
    .then(data => {
      if (data.total === 0) {
        iziToast.error({
          title: '',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: '#fafafb',
          position: 'topRight',
          backgroundColor: '#ef4040',
        });

        gallery.innerHTML = '';

        searchForm.reset();

        return;
      }

      const galleryTemplate = data.hits
        .map(el => createGalleryCard(el))
        .join('');

      gallery.innerHTML = galleryTemplate;
      lightbox.refresh();
    })

    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      loader.classList.remove('show-loader');
    });
};

searchForm.addEventListener('submit', searchSubmit);
