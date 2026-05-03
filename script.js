




  const container = document.querySelector('.animation-form');
  const animation = container.querySelector('wa-animation');
  const button = container.querySelector('wa-button');

  button.addEventListener('click', () => {
    animation.play = true;
  });


document.addEventListener("DOMContentLoaded", () => {
    async function getProducts() {
        let response = await fetch("data.json")
        let products = await response.json()
        return products
    }

    function createProductCard(product) {
        return `
            <div class="card me-3" style="width: 18rem;">
                <img src="${product.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.price}</p>
                    <a href="#" class="btn btn-primary">Купити</a>
                </div>
            </div>
        `
    }

    getProducts().then(products => {
        const productList = document.querySelector('#games-grid')
        productList.innerHTML= '';
        products.forEach(product => {
            productList.innerHTML+=createProductCard(product)
        });
    })

});