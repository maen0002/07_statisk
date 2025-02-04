// Finder alt efter ?
const queryString = window.location.search;

//Finder en bestemt parameter efter ?
const urlParams = new URLSearchParams(queryString);

//Henter color parameteren
const productId = urlParams.get("product_id");
console.log("product_id", productId);

let productContainer = document.querySelector(".produktet");
fetch(`https://kea-alt-del.dk/t7/api/products/${productId}`)
  .then((response) => response.json())
  .then((data) => {
    productContainer.innerHTML = `
                <div class="soldout${data.soldout}">
                <p class="soldout-tag${data.soldout}">Sold Out</p>
                <img src="https://kea-alt-del.dk/t7/images/webp/640/${data.id}.webp" alt="">
            </div>
            <div class="product_information">
                <h2>${data.productdisplayname}</h2>
                <p class="color">${data.basecolour}</p>
                <p class="price">${data.price},-</p>
                <div class="discount-${data.discount}" class="0">
                    <p>Nu 647,-</p>
                    <p class="discount-tag-${data.discount}">28%</p>
                </div>
                <p>Inventory number: 1163</p>
                <form>
                    <label for="size">Choose a size:</label>
                    <select id="size" name="size">
                        <option value="small">small</option>
                        <option value="medium">medium</option>
                        <option value="large">large</option>
                        <option value="extra large">extra large</option>
                    </select>
                    <input type="submit" value="Order">
                </form>
            </div>
`;
  });
