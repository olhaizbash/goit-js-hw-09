import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const refs = {
    inputEl: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}
let timerId = null;
let selectedTime;
refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] <= options.defaultDate) {
          window.alert("Please choose a date in the future");
          
      } else {
          refs.startBtn.disabled = false;
          selectedTime = selectedDates[0];
      }
    },
};
flatpickr(refs.inputEl, options);

function onClick(event) {
    counterTime();
}

function counterTime() {
    timerId = setInterval(() => {
        let differenseTime = selectedTime - new Date();
        refs.startBtn.disabled = true;
        refs.inputEl.disabled = true;
        if (differenseTime >= 0) {
            let timerData = convertMs(differenseTime);
            refs.days.textContent = timerData.days;
            refs.hours.textContent = timerData.hours;
            refs.minutes.textContent = timerData.minutes;
            refs.seconds.textContent = timerData.seconds;
        } else {
            clearInterval(timerId);
            refs.inputEl.disabled = false;
        }
    }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
    return String(value).padStart(2, '0');
}