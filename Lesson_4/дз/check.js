class InputForm {
    constructor(){
        this.form = document.querySelector('.form');
        this.formInputs = document.querySelectorAll('.input-text');
        this._setCheckInput(this.form, this.formInputs);
    }

    _setCheckInput(form, elements){
        form.addEventListener('submit', event => {
            for (let item of elements) {
                if (item.name === 'name') {
                    this._removeWarning(item);
                    if (/([^a-zа-я]+)/ig.test(item.value)||item.value === '') {
                        event.preventDefault();
                        this._addWarning(item, `Только буквы`);
                    }
                }
                if (item.name === 'tel') {
                    this._removeWarning(item);
                    if (!/\+\(\d{3}\)\d{3}-\d{4}/.test(item.value)) {
                        event.preventDefault();
                        this._addWarning(item, `+7(000)000-0000`);
                    }
                }
                if (item.name === 'mail') {
                    this._removeWarning(item);
                    if (!/(^[a-z0-9]+([.\-](?=[a-z0-9])[a-z0-9]+)*)+@[a-z]+\.((ru)|(com))/i.test(item.value)) {
                        event.preventDefault();
                        this._addWarning(item, `mail@mail.com`);
                    }
                }
            }
        })
    }

    _addWarning(item, warning){
        item.insertAdjacentHTML('afterend', `<p class="asteriks">*</p>`);
        item.insertAdjacentHTML('afterend', `<p class="alert-item">${warning}</p>`);
        item.classList.add('alert');
    }

    _removeWarning(item){
        item.classList.remove('alert');
        const alertItem = document.querySelector(`#${item.id} + .alert-item`);
        if (alertItem) {
            alertItem.remove();
            const asteriks = document.querySelector(`#${item.id} + .asteriks`);
            asteriks.remove();
        }
    }
}
const inputForm = new InputForm();