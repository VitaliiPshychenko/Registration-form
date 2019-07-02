const VALID_FULL_NAME = /^[a-zA-Zа-яА-ЯёЁїЇІі'\-]{2,30} [a-zA-Zа-яА-ЯёЁїЇІі'\-]{2,30} ?([a-zA-Zа-яА-ЯёЁїЇІі'\-]{2,30})$/;
const VALID_PHONE = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
const fullName = document.getElementById('full-name');
const phone = document.getElementById('phone');
const prefer = document.getElementById('prefer');
const additionalInfo = document.getElementById('additional-info');
const regions = document.getElementById('regions');
const cities = document.getElementById('cities');
const cityLabel = document.getElementById('city-label');
const regionsList = {
  Center: ['','Cherkasy', 'Dnipro', 'Kropyvnytskyi', 'Poltava', 'Vinnytsia', 'Zhytomyr', 'Not in the list'],
  North: ['','Chernihiv', 'Sumy', 'Not in the list'],
  East: ['','Donetsk', 'Kharkiv', 'Luhansk', 'Not in the list'],
  South: ['','Kherson', 'Mykolaiv', 'Odesa', 'Zaporizhzhia', 'Not in the list'],
  West: ['','Chernivtsi', 'Ivano-Frankivsk', 'Khmelnytskyi', 'Lutsk', 'Lviv', 'Rivne', 'Ternopil', 'Uzhhorod', 'Not in the list']
};
const submitBtn = document.getElementById('submit-btn');

fullName.addEventListener('input', validateFullName);
phone.addEventListener('input', validatePhone);
regions.addEventListener('change', showSelectCities);
prefer.addEventListener('click', hideInfo);
cities.addEventListener('change', validateSelectedCities);

function validateFullName() {
  const regFullName = fullName.value.match(VALID_FULL_NAME);

  validateData(regFullName, fullName);
  isValidForm();
}

function validatePhone() {
  const regPhone = phone.value.match(VALID_PHONE);

  validateData(regPhone, phone);
  isValidForm();
}

function showSelectCities() {
  const valueregionss = regions.value;
  const region = regionsList[valueregionss];

  if (region) {
    const newCities = region.map(city => {
      const tegOption = document.createElement('option');

      cities.innerHTML = '';
      changeClass(cityLabel, 'hidden', 'display');
      tegOption.textContent = city;
      tegOption.setAttribute('value', city);

      return tegOption;
    });
    cities.append(...newCities);
    isValidForm();
  } else {
    changeClass(cityLabel, 'display', 'hidden');
  }

  isValidForm();
}

function validateSelectedCities() {
  isValidForm();
}

function isValidForm() {
  if (prefer.checked && fullName.classList.contains('valid-data')) {
    submitBtn.removeAttribute('disabled', 'disabled');
    return;
  } if (fullName.classList.contains('valid-data')
    && phone.classList.contains('valid-data')
    && regions.value
    && (cities.value || regions.value === 'Kyiv')
  ) {
    submitBtn.removeAttribute('disabled');
    return;
  } else {
    submitBtn.setAttribute('disabled', 'disabled');
  }
}

function hideInfo() {
  additionalInfo.classList.toggle('hidden');
  isValidForm();
}

function changeClass(el, removedClass, addedClass) {
  el.classList.remove(removedClass);
  el.classList.add(addedClass);
}

function validateData(data, el) {
  if (data) {
    changeClass(el, 'non-valid-data', 'valid-data');
    return true;
  } else {
    changeClass(el, 'valid-data', 'non-valid-data');
    return false;
  }
}
