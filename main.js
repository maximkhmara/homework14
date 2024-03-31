document.addEventListener('DOMContentLoaded', function () {
	const loginEmail = document.querySelector('.login-email');
	const loginPass = document.querySelector('.login-pass');
	const loginBtn = document.querySelector('.login-btn');
	const loader = document.querySelector('.loader');

	function activateBtn() {
		if (loginEmail.value && loginPass.value) {
			loginBtn.classList.remove('disable');
		} else {
			loginBtn.classList.add('disable');
		}
	}

	loginEmail.addEventListener('input', activateBtn);
	loginPass.addEventListener('input', activateBtn);

	loginBtn.addEventListener('click', (e) => {
		e.preventDefault();
		loader.classList.add('show');
		console.log(loginEmail.value, loginPass.value);
		setTimeout(function () {
			location.href = 'profile.html';
		}, 2000);
	});
});
