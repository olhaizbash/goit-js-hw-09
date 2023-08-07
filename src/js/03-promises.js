
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
let formData = {
  delay: '',
  step: '',
  amount: '',
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

function onInput(event) {
  formData[event.target.name] = Number(event.target.value);
}

formEl.addEventListener('input', onInput);
formEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  for (let i = 1; i <= formData.amount; i += 1) {
      createPromise(i, formData.delay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
     formData.delay += formData.step;
  }
  formEl.reset();
}

