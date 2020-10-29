      const API_KEY = "your key here";
      async function search() {
        const productsContainer = document.getElementById("products");
        productsContainer.innerHTML = "Loading...";

        const { products } = await searchProducts(
          document.getElementById("searchTerm").value
        );
        productsContainer.innerHTML = products
          .map(
            (product) => `
      <li class="product grid cols">
        <span class="thumbnail"><img src="${product.thumbnail}"></span>
        <div class="metadata grid medium">
          <a class="title link10" href="${product.url}">${product.title}</a>
          <h2 class="rating"><b>Overall Rating:</b> ${product.reviews.rating} / 5</h2>
          <h2 class="price"><b>Price:</b> $${product.price.current_price}</h2>
          <br />
          <div class="reviews"> 
            <button class="subtle" onclick="showReviews(this.parentElement, '${product.asin}')">See Reviews</button>
            <br />
            <br />
          </div>
        </div>
      </li>
    `
          )
          .join("");
      }

      async function showReviews(reviewsContainer, asin) {
        reviewsContainer.innerHTML = "Loading...";

        const { reviews } = await getReviews(asin);
        reviewsContainer.innerHTML = `
      <br />
      <h1>Reviews</h1>
      <br />
      <ul class="grid">
      ${reviews
        .map(
          (review) => `
        <li class="grid small table detai">
          <span><b>Rating:</b> ${review.rating} / 5</span>
          <span><b>Title:</b> ${review.title}</span>
          <span><b>Review:</b>
            <span>
              ${review.review.slice(0, 100)}...
              <a href='#' style="color:inherit" onclick='
                var full = this.nextElementSibling;
                this.parentElement.replaceWith(full);
                full.hidden = false;
                return false;
              '>
                Read more..
              </a>
              <span hidden>${review.review}</span>
             </span>
            </span>
          <br />
          <br />
        </li>
      `
        )
        .join("")}
      </ul >
    `;
      }

      async function searchProducts(term) {
        const response = await fetch(
          "https://amazon-product-reviews-keywords.p.rapidapi.com/product/search?country=US&keyword=" +
            term,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host":
                "amazon-product-reviews-keywords.p.rapidapi.com",
              "x-rapidapi-key": API_KEY,
            },
          }
        );
        const body = await response.json();
        console.log(body);
        return body;
      }

      async function getReviews(asin) {
        const response = await fetch(
          "https://amazon-product-reviews-keywords.p.rapidapi.com/product/reviews?country=US&asin=" +
            asin,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host":
                "amazon-product-reviews-keywords.p.rapidapi.com",
              "x-rapidapi-key": API_KEY,
            },
          }
        );
        const body = await response.json();
        console.log(body);
        return body;
      }