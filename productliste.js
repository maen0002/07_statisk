const productContainer = document.querySelector(".produktliste_container");
fetch(`https://kea-alt-del.dk/t7/api/products?limit=100`)
  .then((response) => response.json())
  .then((data) => showList(data));

function showList(products) {
  console.log(products);
  const markup = products
    .map(
      (product) =>
        `
            <div class="produkt_card">
                <a class="soldout${product.soldout}" href="produkt.html">
                    <p class="soldout-tag${product.soldout}">Sold Out</p>
                    <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="">
                </a>
                <h2>${product.productdisplayname}</h2>
                <p>${product.articletype} / ${product.brandname}</p>
                <p class="price">${product.price},-</p>
                <div class="discount">
                    <p class="${product.discount}">Nu ${product.price}*${product.discount},-</p>
                    <p class="discount-tag ${product.discount}">${product.discount}%</p>
                </div>
                <a href="produkt.html" class="bottom_link">Læs mere</a>
            </div>
        `
    )
    .join("");
  productContainer.innerHTML = markup;
}
