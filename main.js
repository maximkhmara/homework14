const shopProduct = document.querySelector('.shop-product');
const buyBtn = document.querySelector('.shop-product-buy');
const buyForm = document.querySelector('.buy-form');
const formFields = document.querySelectorAll('.form-field');
const order = document.querySelector('.order');
const orderContent = document.querySelector('.order-content');

buyBtn.addEventListener('click', () => {
	buyForm.classList.add('show');
});

buyForm.addEventListener('submit', function (event) {
	let isEmpty = false;
	formFields.forEach((el) => {
		if (!el.value.trim()) {
			el.closest('.field-wpapper').classList.add('error');
			isEmpty = true;
		} else {
			el.closest('.field-wpapper').classList.remove('error');
		}
	});
	if (isEmpty) {
		event.preventDefault();
	} else {
		event.preventDefault();
		shopProduct.classList.add('hide');
		buyForm.classList.remove('show');
		order.classList.add('show');

		const formData = new FormData(this);
		const formObject = {};

		formData.forEach((value, key) => {
			formObject[key] = value;
		});

		const orderName = document.createElement('div');
		const orderCity = document.createElement('div');
		const orderPost = document.createElement('div');
		const orderPay = document.createElement('div');
		const orderQuantity = document.createElement('div');
		const comment = document.createElement('div');

		orderName.textContent = `Ваше ім'я: ${formObject.username}`;
		orderCity.textContent = `Ваше місто: ${formObject.citybuy}`;
		orderPost.textContent = `Відділення Нової пошти: ${formObject.branch}`;
		orderPay.textContent = `Спосіб оплати: ${formObject.typepay}`;
		orderQuantity.textContent = `Кількість товару: ${formObject.quantity}`;
		comment.textContent = `Коментар: ${formObject.comment}`;

		[orderName, orderCity, orderPost, orderPay, orderQuantity, comment].forEach(
			(element) => {
				orderContent.appendChild(element);
			}
		);
	}
});
