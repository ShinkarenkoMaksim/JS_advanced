class Form {
	constructor (container = '#form') {
		this.container = container;
		this.data = [];
		this.holeForm = [];
		this.init();
	}
	
	init(){
		this._fetchData();
		this._render();
	}
	
	_fetchData(){
		this.data = [
		['Размер', 'radio', 'burger', 
		{title: 'Большой', price: 100, cal: 40, checked: 'checked'},
		{title: 'Маленький', price: 50, cal: 20},
		],
		['Начинка', 'radio', 'topping', 
		{title: 'Сыр', price: 10, cal: 20, checked: 'checked'},
		{title: 'Салат', price: 20, cal: 5},
		{title: 'Картофель', price: 15, cal: 10},
		],
		['Опции', 'checkbox', 'option', 
		{title: 'Приправы', price: 15, cal: 0},
		{title: 'Майонез', price: 20, cal: 5},
		],
		]
	}
	
	_render(){
		const block = document.querySelector(this.container);
		for (let item of this.data){
			const section = new FormSection(item);
			const btn = new Btn();
			this.holeForm.push(section);
			block.insertAdjacentHTML('beforeend', section.render());
		}
	}
}

class FormSection {
	constructor(section){
		this.formTitle = section[0];
		this.inputType = section[1];
		this.inputName = section[2];
		this.section = section;
	}
	render(){ //Уверен, это можно реализовать красивее, но мне не хватает пары вечеров на всё =(
		let str = '';
		str += this._renderStart();
		for(let i = 3; i < this.section.length; i++){
			str += this._renderStr(this.section[i]);
		}
		str += this._renerEnd();
		return str;
	}
	_renderStart(){
		return `<fieldset><legend>${this.formTitle}</legend>`;
	}
	_renderStr(item){
		return `<label><input type="${this.inputType}" name="${this.inputName}" data-price="${item.price}" data-cal="${item.cal}" ${item.checked}>${item.title} $${item.price} cal: ${item.cal}</label><br>`;
	}
	_renerEnd(){
		return `</fieldset>`;
	}
}

// class FormItem {
// 	constructor(item){
// 		this.id = product.id;
// 		this.title = product.title;
// 		this.price = product.price;
// 		this.img = img;
// 	}
// 	render(){
// 		return `<div class='product-item'>
// 		<img src='${this.img}' alt='${this.title}'>
// 		<div class='desc'>
// 		<h3>${this.title}</h3>
// 		<p>$${this.price}</p>
// 		<button class='buy-btn' data-id='${this.id}'>Купить</button>
// 		</div>
// 		</div>`
// 	}
// }



class Btn {
	constructor () {
		this.element = document.querySelector('.btn');
		this.element.addEventListener('click', function(event){
			event.preventDefault();
			const overall = new Overall;
		});
	}
}



class Overall {
	constructor(){
		this.allItems = document.querySelectorAll('#form input');
		this.totalCost = 0;
		this.totalCal = 0;
		this.container = document.querySelector('.overall');
		this.countTotal(this.allItems);
		this.render(this.totalCost, this.totalCal);
	}
	
	countTotal(allItems){
		for(let item of allItems){
			if(item.checked){
				this.totalCost += +item.dataset.price;
				this.totalCal += +item.dataset.cal;
			}
		}
	}
	
	render(totalCost, totalCal){
		this.container.innerHTML = '';
		this.container.insertAdjacentHTML('beforeend', `<p>Общая сумма заказа ${totalCost}</p>
			<p>Общая калорийность ${totalCal}</p>`);
	}
}

const button = new Form;