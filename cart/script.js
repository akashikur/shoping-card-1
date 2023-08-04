const endpoint = "https://fakestoreapi.com/products";
const product = [];
async function getApi() {
  const response = await fetch(endpoint, { method: "GET" });
  const result = await response.json();
  let getstr = localStorage.getItem("ids");
  let num = JSON.parse(getstr);
  num.forEach((items) => {
    displayItems(result, items);
  });
  // console.log(result);
}
const card = document.getElementById("card");
const orderlist = document.getElementById("orderlist");
const total = document.getElementById("total");
let totalval = 0;

// display the caed which are added
function displayItems(data, value) {
  const div = document.createElement("div");
  const li = document.createElement("li");
  div.innerHTML = ``;
  data
    .filter((data) => data.id === value)
    .forEach((item) => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `
    <img src=${item.image} alt="Item" />
    <div class="info">
      <div class="row">
        <div class="title">Title :${item.title}</div>
        <div class="price">Price :$${item.price}</div>
      </div>
    </div>
    <button id="removebtn" onclick="removeItem(${item.id})">Remove to Cart</button>`;
      card.appendChild(div);
      li.innerHTML = `<span class="title">${item.title}</span><span>${item.price}</span>`;
      orderlist.appendChild(li);
      totalval += item.price;
    });
  total.innerText = `Rs ${totalval.toFixed(2)}/-`;
}
// remove the card from the local storage
function removeItem(item) {
  let getstr = localStorage.getItem("ids");
  let num = JSON.parse(getstr);
  const up = [];
  for (let i = 0; i < num.length; i++) {
    if (num[i] === item) {
      continue;
    } else {
      up.push(num[i]);
    }
  }
  const obj = JSON.stringify(up);
  localStorage.setItem("ids", obj);
  location.reload();
}
// payment method
function pay() {
  localStorage.setItem("total", totalval.toFixed(2));
  location.href = "/razorpay/index.html";
}
getApi();
