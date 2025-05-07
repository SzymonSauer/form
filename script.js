const errorMsg = document.querySelector('.error');
const submitBtn = document.querySelector('.submit');
const noteText = document.querySelector('.note-body');
const therapyType = document.querySelector('.type');
const therapyTypeDiv = document.querySelector('.form-box-therapy-type');
const emailDiv = document.querySelector('.form-box-email');
const emailInput = document.querySelector('#email');
const dateDiv = document.querySelector('.form-box-date');
const dateInput = document.querySelector('.date');
const hourDiv = document.querySelector('.form-box-hour');
const hourInput = document.querySelector('.hour');
const divPopup = document.querySelector('.popup');

const inputsArray = [
	therapyType.value,
	dateInput.value,
	hourInput.value,
	emailInput.value,
];

const showError = (input, message) => {
	input.classList.add('error-visible');
	input.textContent = message;
};

const removeError = (input) => {
	input.classList.remove('error-visible');
};

const checkEmail = (input) => {
	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if (input.value.match(re)) {
		removeError(errorMsg);
	} else if (input.value == '') {
		showError(errorMsg, 'The field is empty, fill in the data!');
	} else {
		showError(errorMsg, 'The form contains errors, please correct your email.');
	}
};

noteText.textContent = 'Add a note (optional)';
const makeNote = (e) => {
	console.log(e.target.classList.value);

	if (e.target.classList.value === 'note-body') {
		noteText.style.color = 'black';
		noteText.textContent = '';
	}
};

const changeColorInput = (input) => {
	if (input.value !== '') {
		input.classList.add('input-color');
	} else {
		input.classList.remove('input-color');
	}
};

const test = (e) => {
	console.log(e);
};

//Pomysł na funkcję jest dobry - ze popup sie pokazuje gdy wszystkie pola są wypełnione. Tylko jak sprawdzić czy są wypełnione? Nie można zrobić if input.value !== '' to pokaż popup, bo nie wszystkie inputy
//mają '' kiedy nic nie jest wybrane. Dlatego postaraj się znaleźć za pomocą event jakis element który jest taki sam dla wszystkich inputów, gdy nic nie jest wybrane. (Może nie ma czegoś takiego - wtedy trzeba wymyślić coś innego)

//Każdy z inputów czy selectów ma coś takiego jak input.defaultValue. W przypadku typów terapii i godziny te wartości są undifined (może można im przydzielić domyślną wartość?).
//Wtedy można w funkcji showPopup znliczać błędy na tej podstawie, tzn. if (input.value == input.defaultValue){ counter++}. Zastanów się

const showPopup = () => {
	const inputsArray = [dateInput.value, hourInput.value, emailInput.value];
	let numberOfInputs = inputsArray.length + 1;
	let counter = 0;

	for (let i = 0; i < numberOfInputs; i++) {
		if (
			therapyType.selectedIndex == '0' ||
			inputsArray[i] == '' ||
			inputsArray[i] == '' ||
			inputsArray[i] == '7:00 am'
		) {
			counter++;
		}
	}

	if (counter == 0) {
		divPopup.classList.add('show-popup');
	}

	console.log(counter);
};

dateDiv.addEventListener('input', function () {
	changeColorInput(dateDiv);
});

hourDiv.addEventListener('input', function () {
	changeColorInput(hourDiv);
});

therapyTypeDiv.addEventListener('input', function () {
	changeColorInput(therapyTypeDiv);
});

noteText.addEventListener('click', makeNote);
changeColorInput(emailDiv);

submitBtn.addEventListener('click', (e) => {
	e.preventDefault();
	checkEmail(emailInput);
	showPopup();
});
