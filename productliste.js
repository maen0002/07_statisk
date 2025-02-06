// Finder alt efter ?
const queryString = window.location.search;

//Finder en bestemt parameter efter ?
const urlParams = new URLSearchParams(queryString);

//Henter color parameteren
const category = urlParams.get("category");
console.log("category", category);

const productContainer = document.querySelector(".produktliste_container");
fetch(`https://kea-alt-del.dk/t7/api/products?category=${category}`)
  .then((response) => response.json())
  .then((data) => showProducts(data));

function showProducts(products) {
  console.log(products);
  const markup = products
    .map(
      (product) =>
        `
            <article class="produkt_card">
                <a class="${product.soldout && "soldout"}" href="produkt.html?product_id=${product.id}">
                    <p class="${product.soldout ? "soldout-tag" : "hide"}">Sold Out</p>
                    <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="">
                </a>
                <h2>${product.productdisplayname}</h2>
                <p>${product.articletype} / ${product.brandname}</p>
                <p class="price">${product.price},-</p>
                <div class=" ${product.soldout && "hide"} ${!product.discount && "hide"} ${product.discount && "discount"}">
                    <p>Nu ${Math.floor(product.price - (product.price * product.discount) / 100)},-</p>
                    <p class="discount-tag ${!product.discount && "hide"}">${product.discount}%</p>
                </div>
                <a href="produkt.html?product_id=${product.id}" class="bottom_link">Læs mere</a>
            </article>
        `
    )
    .join("");
  productContainer.innerHTML = markup;
}

document.querySelectorAll("button").forEach((knap) => knap.addEventListener("click", showFiltered));

function showFiltered() {
  const filter = this.dataset.gender;
  if (filter == "All") {
    showProducts(allData);
  } else if (filter == "onSale") {
    fraction = allData.filter((product) => product.discount > 0);
    showProducts(fraction);
  } else if (filter == "notSoldOut") {
    fraction = allData.filter((product) => product.soldout == false);
    showProducts(fraction);
  }
}

let allData;

fetch(`https://kea-alt-del.dk/t7/api/products?category=${category}`)
  .then((response) => response.json())
  .then((json) => {
    allData = json;
    showProducts(allData);
  });
