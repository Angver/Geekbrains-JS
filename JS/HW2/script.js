/**
 * @constructor
 */
var validate = function () {
    /**
     * @type {string}
     * @private
     */
    this.requiredClass_ = 'required';
    /**
     * @type {Element}
     * @private
     */
    this.form_ = document.getElementById('register_form');
    /**
     * @type {Element}
     * @private
     */
    this.emailInput_ = this.form_.querySelector('input[type=email]');
    /**
     * @type {Element}
     * @private
     */
    this.submitButton_ = this.form_.querySelector('button[type=submit]');
    /**
     * @type {NodeList}
     * @private
     */
    this.requiredFields_ = this.form_.getElementsByClassName('required');
    /**
     * @type {string}
     * @private
     */
    this.emailPattern_ = '@';

    this.init_();

    this.attachEvents_();
};

/**
 * @private
 */
validate.prototype.init_ = function () {

};

/**
 * @private
 */
validate.prototype.attachEvents_ = function () {
    /**
     * @type {validate}
     */
    var that = this;

    this.form_.onsubmit = function () {
        return false;
    };

    this.submitButton_.onclick = function () {
        that.onSubmitClick_();
    };

    for (var i = 0; i < this.requiredFields_.length; i++) {
        var element = this.requiredFields_[i].getElementsByTagName('input')[0];
        element.onblur = function () {
            that.onBlurElement_(this);
        }
    }
};

validate.prototype.onSubmitClick_ = function () {
    var formValidatedCorrect = true;
    for (var i = 0; i < this.requiredFields_.length; i++) {
        var currentInput = this.requiredFields_[i].getElementsByTagName('input')[0];
        var isValidateError = this.validateInputElement_(currentInput);
        if (isValidateError) {
            this.requiredFields_[i].getElementsByClassName('hidden')[0].classList.remove('hidden');
            formValidatedCorrect = false;
        }
    }

    if (formValidatedCorrect) {
        alert('Вы всё правильно заполнили!');
    }
};

/**
 * @param element {Element}
 * @private
 */
validate.prototype.validateInputElement_ = function (element) {
    element.classList.remove('error');
    element.classList.remove('correct');

    var isValidateError = true;
    switch (element.type) {
        case 'email':
            isValidateError = element.value.search('@') == -1;
        case 'text':
            isValidateError = element.value.trim() == '';
            break;
        case 'checkbox':
            isValidateError = !element.checked;
            break;
    }
    if (isValidateError) {
        element.classList.add('error');
    } else {
        element.classList.add('correct');
    }

    return isValidateError;
};

validate.prototype.onBlurElement_ = function (element) {
    var isValidateError = this.validateInputElement_(element);
    var errorMessageBlock = element.parentElement.getElementsByTagName('span')[0];
    if (isValidateError) {
        errorMessageBlock.classList.remove('hidden');
    } else {
        errorMessageBlock.classList.add('hidden');
    }
};

window.onload = function () {
    new validate();
};