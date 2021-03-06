import inputValidation from '../../js/utils/inputValidation';

export default class Form {
  constructor(mainApi) {
    this.domElement = this._createDomElement();
    this._mainApi = mainApi;
    this._responseError = this.domElement.querySelector('.form__input-response-error');
    this._formButton = this.domElement.querySelector('.form__button');
    this._inputsArray = this.domElement.querySelectorAll('.form__input');
    this._errorsArray = this.domElement.querySelectorAll('.form__input-error');
    this._emailInput = this.domElement.querySelector('.form__input_email');
    this._passwordInput = this.domElement.querySelector('.form__input_password');
    this._form = this.domElement.querySelector('.form');
    this._form.addEventListener('input', this._validateInputKeyPress.bind(this));
    this._form.addEventListener('focusout', this._validateInputFocusout.bind(this));
    this._form.addEventListener('submit', this._validateForm.bind(this));
    this._linkHandler = null;
  }

  clear() {
    this._formButton.removeAttribute('disabled');
    this._inputsArray.forEach((i) => { i.value = ''; });
    this._errorsArray.forEach((i) => { i.textContent = ''; });
    this._responseError.textContent = '';
    this._formButton.classList.remove('form__button_is-active');
  }

  // После создания зависимых друг от друга экземпляров кслассов
  // дополнительно связываем их друг с другом, передавая нужные методы
  setLinkHandler(handler) {
    this._linkHandler = handler;
    this._footerLink.addEventListener('click', this._linkHandler);
  }

  _disableForm() {
    this._inputsArray.forEach((i) => { i.setAttribute('disabled', true); });
    this._formButton.setAttribute('disabled', true);
  }

  _enableForm() {
    this._inputsArray.forEach((i) => { i.removeAttribute('disabled'); });
    this._formButton.removeAttribute('disabled');
  }

  _validateInputFocusout(event) {
    // Обработка отдельного инпута при потере фокуса с выводом ошибки
    if (event.target.classList.contains('form__input')) {
      const { isValid, message } = inputValidation(event.target);
      const errorContainer = event.target.nextSibling;
      if (!isValid) {
        errorContainer.textContent = message;
      } else {
        errorContainer.textContent = '';
      }
    }
  }

  _validateInputKeyPress(event) {
    // Обработка отдельного инпута при вводе без вывода ошибки и с обнулением предыдущей
    if (event.target.classList.contains('form__input')) {
      const { isValid } = inputValidation(event.target);
      const errorContainer = event.target.nextSibling;
      if (isValid) {
        errorContainer.textContent = '';
      }
    }

    // Обработка всех инпутов для валидации кнопки
    const inputs = this._form.querySelectorAll('.form__input');
    if (Array.from(inputs).every((i) => inputValidation(i).isValid)) {
      this._formButton.classList.add('form__button_is-active');
    } else {
      this._formButton.classList.remove('form__button_is-active');
    }
  }


  // Валижация по сабмиту
  _validateForm(event) {
    event.preventDefault();
    let counter = 0;
    const inputs = this._form.querySelectorAll('.form__input');
    inputs.forEach((item) => {
      const { isValid, message } = inputValidation(item);
      const errorContainer = item.nextSibling;
      if (!isValid) {
        errorContainer.textContent = message;
      } else {
        errorContainer.textContent = '';
        counter += 1;
      }
    });
    if (counter === inputs.length) {
      this._fetch();
    }
  }
}
