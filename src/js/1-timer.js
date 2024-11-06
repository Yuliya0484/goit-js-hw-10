import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const datePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');

datePicker.setAttribute('placeholder', 'Choose a date');

btnStart.setAttribute('disabled', 'disabled');

const createBtn = document.createElement('button');
const resetBtn = btnStart.insertAdjacentElement('afterend', createBtn);

resetBtn.textContent = 'Reset';
resetBtn.setAttribute('type', 'button');
resetBtn.setAttribute('data-reset', '');
resetBtn.classList.add('is-hidden');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: null,
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = Date.now();

    if (selectedDates[0].getTime() < currentTime) {
      Report.warning('Oops!', 'Please choose future date!', 'Try Again');
    } else {
      btnStart.removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

const reversTimerComponents = {
  getDays: document.querySelector('span[data-days]'),
  getHours: document.querySelector('span[data-hours]'),
  getMinutes: document.querySelector('span[data-minutes]'),
  getSeconds: document.querySelector('span[data-seconds]'),
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

btnStart.addEventListener('click', onClickStartReversTimer);

let intervalId = null;

function onClickStartReversTimer() {
  intervalId = setInterval(updateCounter, 1000);

  function updateCounter() {
    let inputDate = new Date(datePicker.value);
    const currentDate = Date.now();
    const deltaTime = inputDate.getTime() - currentDate;
    const deltaTimeObj = convertMs(deltaTime);

    if (isNaN(inputDate)) {
      Report.warning('Oops!', 'Please choose future date!', 'Try Again');
      clearInterval(intervalId);

      return;
    }

    if (deltaTime < 0) {
      clearInterval(intervalId);
      resetBtn.classList.add('is-hidden');
      btnStart.classList.remove('is-hidden');
      datePicker.value = '';
      return;
    }

    reversTimerComponents.getDays.textContent = addLeadingZero(
      deltaTimeObj.days
    );
    reversTimerComponents.getHours.textContent = addLeadingZero(
      deltaTimeObj.hours
    );
    reversTimerComponents.getMinutes.textContent = addLeadingZero(
      deltaTimeObj.minutes
    );
    reversTimerComponents.getSeconds.textContent = addLeadingZero(
      deltaTimeObj.seconds
    );

    btnStart.classList.add('is-hidden');
    resetBtn.classList.remove('is-hidden');
  }
}

resetBtn.addEventListener('click', onClickClearInterval);

function onClickClearInterval() {
  //
  clearInterval(intervalId);

  reversTimerComponents.getDays.textContent = '00';
  reversTimerComponents.getHours.textContent = '00';
  reversTimerComponents.getMinutes.textContent = '00';
  reversTimerComponents.getSeconds.textContent = '00';

  datePicker.value = '';

  resetBtn.classList.add('is-hidden');
  btnStart.classList.remove('is-hidden');
}
