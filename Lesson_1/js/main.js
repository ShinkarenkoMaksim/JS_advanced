const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 30},
    {id: 3, title: 'Keyboard', price: 55},
    {id: 4, title: 'Gamepad', price: 75},
];
const renderProduct = (title = 'Unnamed', price = 'Call us', id = '0') => `<div class='product-item'><h3>${title}</h3><p>${price}</p><button class='buy-btn' data-id='${id}'>Купить</button></div>`;
const renderPage = list => document.querySelector('.products').innerHTML = list.map(item => renderProduct(item.title, item.price, item.id)).join('');

//Запятая выводилась, т.к. метод innerHTML вставлял в код страницы массив как есть, и браузер как смог, так его и обработал (сохраняя кавычки и запятые). Методом join() я составил из массива строку, в которой разделителем элементов массива послужила пустая строка ''.


/*Как вариант, можно было использовать еще более короткую запись:

const renderPage = list => document.querySelector('.products').innerHTML = list.map(item => `<div class="product-item"><h3>${item.title = item.title || 'Unnamed'}</h3><p>${item.price = item.price || 'Call us'}</p><button class="buy-btn">Купить</button></div>`).join('');

*/


renderPage(products);

