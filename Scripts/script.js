const main = document.getElementById('main');
const adduserEl = document.getElementById('add-user');
const doubleEl = document.getElementById('double-balance');
const showMillionairesEl = document.getElementById('show-millionaires');
const sortRichestEl = document.getElementById('sort-richest');
const calculateWealthEL = document.getElementById('calculate-wealth');

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();


async function getRandomUser (){
  const res =  await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = await data.results[0];
  const newUser = {
    name : `${user.name.first}  ${user.name.last}`,
    money : Math.trunc(Math.random() * 10000000) 
  } 
  
  addToData(newUser);
}

function addToData (obj){
  data.push(obj);
  updateUI();
  console.log(data);
}

function updateUI (providedData = data){

  main.innerHTML = '<h2><strong>Person</strong>Balance</h2>';

  providedData.forEach(user => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`;
    main.appendChild(element);
  });

}


function formatMoney (number){
  return '₹' +  number.toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
}


function double(){
  data = data.map(data =>{
    return {...data , money: data.money * 2};
  });
  updateUI();
}


function showMillionaires(){
  data = data.filter(data => data.money > 1000000);
  updateUI();
}

function sortByRichest(){
  data.sort((a , b) => b.money - a.money);
  updateUI();
}

function totalWealth() {
  const wealth = data.reduce((accu , data) => (accu+= data.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Amount :<strong>${formatMoney(wealth)}</strong></h3>`
  main.appendChild(wealthEl);

}

adduserEl.addEventListener('click', getRandomUser);
doubleEl.addEventListener('click', double);
sortRichestEl.addEventListener('click', sortByRichest);
showMillionairesEl.addEventListener('click' ,showMillionaires);
calculateWealthEL.addEventListener('click', totalWealth);