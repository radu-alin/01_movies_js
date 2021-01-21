const backdrop = document.getElementById('backdrop');
const addMovieModal = document.getElementById('add-modal');
const deleteMovieModal = document.getElementById('delete-modal');
const entryTextSection = document.getElementById('entry-text');
const listRoot = document.getElementById('movie-list');
const startAddMovieButton = document.querySelector('header button');

const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');

const movies = [];

const showBackdropHandler = () => {
  backdrop.classList.add('visible');
};
const hideBackdropHandler = () => {
  backdrop.classList.remove('visible');
};

//UI
const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
  <div class="movie-element__image">
    <img src="${imageUrl}" alt="${title}">
  </div>
  <div class="movie-element__info ">
    <h2>${title}</h2>
    <p>${rating}/5 stars</>
  </div>
  `;
  newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, id));
  listRoot.appendChild(newMovieElement);
};

const cancelAddMovieHandler = () => {
  too;
};

//confirmDeleteMovieModal
const closeMovieDeletionModal = () => {
  hideBackdropHandler();
  deleteMovieModal.classList.remove('visible');
};

const startDeleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add('visible');
  showBackdropHandler();
  const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive ');
  let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger ');

  cancelDeletionButton.removeEventListener('click', closeMovieDeletionModal);
  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

  confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger ');

  cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);
  confirmDeletionButton.addEventListener('click', deleteMovie.bind(null, movieId));
};

//movieModal
const clearMovieInput = () => {
  for (const el of userInputs) {
    el.value = '';
  }
};

const closeMovieAddModalHandler = () => {
  clearMovieInput();
  hideBackdropHandler();
  addMovieModal.classList.remove('visible');
};

const showMovieModalHandler = () => {
  addMovieModal.classList.add('visible');
  showBackdropHandler();
  clearMovieInput();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;
  if (
    titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 6
  ) {
    alert('Please enter valid values.');
    return;
  }
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };
  movies.push(newMovie);
  closeMovieAddModalHandler();
  clearMovieInput();
  updateUI();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
};

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const el of movies) {
    if (movieId === el.id) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  // listRoot.removeChild(listRoot.children[movieIndex]);
  listRoot.children[movieIndex].remove();
  closeMovieDeletionModal();
  updateUI();
};

//backdrop
const backdropClickHandler = () => {
  closeMovieDeletionModal();
  closeMovieAddModalHandler();
};

//backdrop
backdrop.addEventListener('click', backdropClickHandler);
//addMovieModal
startAddMovieButton.addEventListener('click', showMovieModalHandler);
cancelAddMovieButton.addEventListener('click', closeMovieAddModalHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
//confirmDeleteMovieModal

// https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/128px-Unofficial_JavaScript_logo_2.svg.png
