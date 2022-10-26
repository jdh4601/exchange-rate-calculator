const currencyEl_1 = document.querySelector('#currency-one');
const amountEl_1 = document.querySelector('#amount-one');

const currencyEl_2 = document.querySelector('#currency-two');
const amountEl_2 = document.querySelector('#amount-two');

const rateElement = document.querySelector('#rate');
const swapElement = document.querySelector('#swap');

// Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyEl_1.value;
  const currency_two = currencyEl_2.value;
  // fetch('url', [method, headers, body]), get은 따로 설정 필요 x
  fetch(
    `https://v6.exchangerate-api.com/v6/e790fa1057bb00573dc4b73b/latest/${currency_one}`
  )
    .then(res => res.json())
    .then(data => {
      const rate = data.conversion_rates[currency_two];
      console.log(rate);
      rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_2.value = (amountEl_1.value * rate).toFixed(2);
    });
}

currencyEl_1.addEventListener('change', calculate);
amountEl_1.addEventListener('input', calculate);
currencyEl_2.addEventListener('change', calculate);
amountEl_2.addEventListener('input', calculate);

swapElement.addEventListener('click', () => {
  const temp = currencyEl_1.value; // temp에 ele1 저장
  currencyEl_1 = currencyEl_2.value; // 현재 2값을 1에 할당
  currencyEl_2 = temp; // 저장된 1값을 2에 할당
  calculate();
});

calculate();
