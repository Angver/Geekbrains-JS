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

    this.form_.onsubmit = function() {
        return false;
    };

    this.submitButton_.onclick = function() {
        that.onSubmitClick_();
    };
};

validate.prototype.onSubmitClick_ = function() {
    var requiredFields = this.form_.getElementsByClassName('required');
    var formValidatedCorrect = true;
    for (var i = 0; i < requiredFields.length; i++) {
        var currentInput = requiredFields[i].getElementsByTagName('input')[0];
        var validateError = true;
        switch (currentInput.type) {
            case 'email':
            case 'text':
                validateError = currentInput.value.trim() == '';
                break;
            case 'checkbox':
                validateError = !currentInput.checked;
                break;
        }
        if (validateError) {
            currentInput.classList.add('error');
            requiredFields[i].getElementsByClassName('hidden')[0].classList.remove('hidden');
            formValidatedCorrect = false;
        } else {
            currentInput.classList.add('correct');
        }
    }

    if (formValidatedCorrect) {
        alert('Вы всё правильно заполнили!');
    }
};

window.onload = function() {
    new validate();
};