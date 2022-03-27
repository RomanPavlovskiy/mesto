export class Card {
  constructor (data, cardTemplateSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate () {
    const card = document
    .querySelector(this._cardTemplateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true)
  
    return card;
  }

  _addLike = () => {
    this._likeCardButton.classList.toggle('element__like_add');
  }

  _deleteCard = () => {
    this._card.remove();
    this._card = null;
  }

  _setEventListeners() {
    const deleteCardButton = this._card.querySelector('.element__delete');
    deleteCardButton.addEventListener('click', this._deleteCard);
    this._likeCardButton.addEventListener('click', this._addLike);
    this._cardImage.addEventListener('click', () => {
      this._handleImageClick();
    })
  }

  createCard() {
    this._card = this._getTemplate ();
    this._cardTitle = this._card.querySelector('.element__title');
    this._cardImage = this._card.querySelector('.element__photo');
    this._likeCardButton = this._card.querySelector('.element__like');

    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
      
    this._setEventListeners()

    return this._card;
  }
}