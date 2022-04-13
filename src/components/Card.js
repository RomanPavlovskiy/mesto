export class Card {
  constructor (data, cardTemplateSelector, handleImageClick, handleDeleteButtonClick, handleLikeButtonClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
  }

  _getTemplate() {
    const card = document
    .querySelector(this._cardTemplateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true)
  
    return card;
  }

  isLiked() {
    const userHasLikedCard = this._likes.find(user => user._id === this._userId)
    return userHasLikedCard
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _setEventListeners() {
    const deleteCardButton = this._card.querySelector('.element__delete');
    deleteCardButton.addEventListener('click', () => {
      this._handleDeleteButtonClick(this._id)
    })
    this._likeCardButton.addEventListener('click', () => {
      this._handleLikeButtonClick(this._id)
    })
    this._cardImage.addEventListener('click', () => {
      this._handleImageClick();
    })
  }

  setLikes(newLikes) {
    this._likes = newLikes
    const likeCountCard = this._card.querySelector('.element__count-like')
    likeCountCard.textContent = this._likes.length

    if (this.isLiked()) {
      this._fillLikeIcon()
    } else {
      this._clearLikeIcon()
    }
  }

  _fillLikeIcon = () => {
    this._likeCardButton.classList.add('element__like_add');
  }

  _clearLikeIcon = () => {
    this._likeCardButton.classList.remove('element__like_add');
  }

  generateCard() {
    this._card = this._getTemplate ();
    this._cardTitle = this._card.querySelector('.element__title');
    this._cardImage = this._card.querySelector('.element__photo');
    this._likeCardButton = this._card.querySelector('.element__like');

    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
      
    this._setEventListeners()
    this.setLikes(this._likes)

    if (this._ownerId !== this._userId) {
      this._card.querySelector('.element__delete').style.display = 'none'
    }

    return this._card;
  }
}