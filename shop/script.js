const menFilter = document.getElementById("menFilter");
const all = document.getElementById("all");
const womenFilter = document.getElementById("womenFilter");
const jewelleryFilter = document.getElementById("jewelleryFilter");
const electronicsFilter = document.getElementById("electronicsFilter");
const search = document.getElementById("search");
const checkBox = document.querySelectorAll('input[name="prange"]');
const applybtn = document.getElementById("applybtn");
const rangeCount = document.getElementById("count");
const men = document.getElementById("men");
const womens = document.getElementById("womens");
const electronics = document.getElementById("electronics");
const jewelery = document.getElementById("jewelery");
const title = document.getElementById("title");
const h1 = document.createElement("h1");
const cloths = document.getElementById("cloths");

const endpoint = "https://fakestoreapi.com/products";
// get the API
async function getApi() {
  const response = await fetch(endpoint, { method: "GET" });
  const result = await response.json();
  // console.log(result);
  // filter implementation
  menFilter.addEventListener("click", (e) => {
    const value = e.target.value;
    menFilter.classList.add("active");
    all.className = "filter";
    womenFilter.className = "filter";
    electronicsFilter.className = "filter";
    jewelleryFilter.className = "filter";
    displayData(value, result);
  });
  womenFilter.addEventListener("click", (e) => {
    const value = e.target.value;
    womenFilter.classList.add("active");
    all.className = "filter";
    menFilter.className = "filter";
    electronicsFilter.className = "filter";
    jewelleryFilter.className = "filter";
    displayData(value, result);
  });
  jewelleryFilter.addEventListener("click", (e) => {
    const value = e.target.value;
    jewelleryFilter.classList.add("active");
    all.className = "filter";
    menFilter.className = "filter";
    electronicsFilter.className = "filter";
    womenFilter.className = "filter";
    displayData(value, result);
  });
  electronicsFilter.addEventListener("click", (e) => {
    const value = e.target.value;
    electronicsFilter.classList.add("active");
    all.className = "filter";
    menFilter.className = "filter";
    jewelleryFilter.className = "filter";
    womenFilter.className = "filter";
    displayData(value, result);
  });
  all.addEventListener("click", () => {
    all.classList.add("active");
    electronicsFilter.className = "filter";
    menFilter.className = "filter";
    jewelleryFilter.className = "filter";
    womenFilter.className = "filter";
    allItems(result);
  });
  allItems(result);

  // search bar implementation
  search.addEventListener("keyup", (e) => {
    let val = e.target.value;
    val = val.toLowerCase();
    if (val != "") {
      searchdisplay(val, result);
    }
  });
  // Apply button implementation
  applybtn.addEventListener("click", () => {
    const cv = [];
    checkBox.forEach((checkbox) => {
      if (checkbox.checked) {
        cv.push(checkbox.value);
      }
    });
    const rating = parseInt(rangeCount.innerText);
    let c = [];
    for (let i = 0; i < cv.length; i++) {
      const sp = cv[i].split("-");
      sp.forEach((e) => {
        c.push(parseInt(e));
      });
    }
    filterDisplay(rating, c, result);
  });
  console.log(result);
}
// display the data for the filter menu
function displayData(value, data) {
  h1.innerText = `${value}`;
  title.insertBefore(h1, title.firstChild);
  men.innerHTML = ``;
  const fil = data
    .filter((data) => data.category === value)
    .forEach((item) => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `
    <img src=${item.image} alt="Item" />
    <div class="info">
      <div class="row">
        <div class="price">$${item.price}</div>
        <div class="sized">S,M,L</div>
      </div>
      <div class="colors">
        Colors:
        <div class="row">
          <div class="circle" style="background-color: #000"></div>
          <div class="circle" style="background-color: #4938af"></div>
          <div class="circle" style="background-color: #203d3e"></div>
        </div>
      </div>
      <div class="row">Rating:${item.rating.rate}</div>
    </div>
    <button id="addBtn" onclick="addCard(${item.id})">Add to Cart</button>`;
      men.appendChild(div);
    });
}
// to display all the items
function allItems(data) {
  h1.innerText = `All Items`;
  title.insertBefore(h1, title.firstChild);
  men.innerHTML = ``;
  const fil = data.forEach((item) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
    <img src=${item.image} alt="Item" />
    <div class="info">
      <div class="row">
        <div class="price">$${item.price}</div>
        <div class="sized">S,M,L</div>
      </div>
      <div class="colors">
        Colors:
        <div class="row">
          <div class="circle" style="background-color: #000"></div>
          <div class="circle" style="background-color: #4938af"></div>
          <div class="circle" style="background-color: #203d3e"></div>
        </div>
      </div>
      <div class="row">Rating:${item.rating.rate}</div>
    </div>
    <button id="addBtn" onclick="addCard(${item.id})">Add to Cart</button>`;
    men.appendChild(div);
  });
}
// to display the paticular items which are searched
function searchdisplay(value, data) {
  men.innerHTML = ``;
  data
    .filter(
      (data) =>
        data.title.toLowerCase().includes(value) ||
        data.category.toLowerCase().includes(value)
    )
    .forEach((item) => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `
          <img src=${item.image} alt="Item" />
          <div class="info">
            <div class="row">
              <div class="price">$${item.price}</div>
              <div class="sized">S,M,L</div>
            </div>
            <div class="colors">
              Colors:
              <div class="row">
                <div class="circle" style="background-color: #000"></div>
                <div class="circle" style="background-color: #4938af"></div>
                <div class="circle" style="background-color: #203d3e"></div>
              </div>
            </div>
            <div class="row">Rating:${item.rating.rate}</div>
          </div>
          <button id="addBtn" onclick="addCard(${item.id})">Add to Cart</button>`;
      men.appendChild(div);
    });
}
// to display in the range
function race(value) {
  rangeCount.innerText = value;
  return value;
}
// to display the particular filter options
function filterDisplay(r, c, data) {
  men.innerHTML = ``;
  console.log(c);
  data
    .filter(
      (data) =>
        data.rating.rate >= r ||
        data.price >= c[0] &&
        (c[1] === 200 ? data.price > 100 : data.price < 100)
    )
    .forEach((item) => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `
          <img src=${item.image} alt="Item" />
          <div class="info">
            <div class="row">
              <div class="price">$${item.price}</div>
              <div class="sized">S,M,L</div>
            </div>
            <div class="colors">
              Colors:
              <div class="row">
                <div class="circle" style="background-color: #000"></div>
                <div class="circle" style="background-color: #4938af"></div>
                <div class="circle" style="background-color: #203d3e"></div>
              </div>
            </div>
            <div class="row">Rating:${item.rating.rate}</div>
          </div>
          <button id="addBtn" onclick="addCard(${item.id})">Add to Cart</button>`;
      men.appendChild(div);
    });
}

// push the card to the local storage which are in the added list
let card = [];
function addCard(id) {
  card.push(id);
  const local = JSON.stringify(card);
  localStorage.setItem("ids", local);
}

getApi();
