// 1.Універсальна функція для збереження будь-яких даних (масивів/об'єктів) у

function getJsonCookie(cookieName) {
    const allCookies = document.cookie.split('; ');
    const targetCookie = allCookies.find(row => row.startsWith(cookieName + '='));
    if (targetCookie) {
        const encodedData = targetCookie.split('=')[1];
        return JSON.parse(decodeURIComponent(encodedData));
    }
    return null;
}

// 2. Універсальна функція для збереження будь-яких даних (масивів/об'єктів) у
function saveJsonCookie(cookieName, data, seconds) {
    const jsonString = JSON.stringify(data);
    const safeString = encodeURIComponent(jsonString);
    document.cookie = `${cookieName}=${safeString}; max-age=${seconds}; path=/`;

}


let cart = [];
let products = [];
const cartContainer = document.querySelector('#cart-items');





let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Якщо гортаємо вниз і прокрутили більше ніж 100px
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('header-hidden'); // Ховаємо
    } 
    // Якщо гортаємо вгору
    else {
        header.classList.remove('header-hidden'); // Показуємо
    }

    lastScroll = currentScroll; // Запам'ятовуємо позицію для наступного разу
});

  const container = document.querySelector('.animation-form');
  const animation = container.querySelector('wa-animation');
  const button = container.querySelector('wa-button');

  button.addEventListener('click', () => {
    animation.play = true;
  });

 function createProductCard(product) {
        return `
            <div class="card me-3" style="width: 18rem;">
                <img src="${product.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.price}</p>
                    <a href="#" class="btn btn-primary" onclick="addToCart(${product.id})" >Купити</a>
                </div>
            </div>
        `
    }




function addToCart(productId) {
    let product = products.find(p => p.id == productId);
    if (!product) return;

    let cartItem = cart.find(item => item.id == productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    console.log(cart);
    saveJsonCookie('cart', cart, 3600 * 24 * 14); // Зберігаємо кошик у cookie на 1 годину
    displayCart();
    modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
}

function displayCart() {
    cartContainer.innerHTML = '';
    cart.forEach(item => {
        cartContainer.innerHTML += `
            <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-4">
                <img src="img/${item.image}" height="70" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-8">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.price} грн</p>
                    <p class="card-text"><small class="text-body-secondary">Quantity: ${item.quantity}</small></p>
                </div>
                </div>
            </div>
            </div>
        `;
    })
}

function loadCart() {
    const savedCart = getJsonCookie('cart');
    if (savedCart) {
        cart = savedCart;
        displayCart();
    }   
}

document.addEventListener("DOMContentLoaded", () => {
    async function getProducts() {
        let response = await fetch("data.json")
        let products = await response.json()
        return products
    }

 

    getProducts().then(products => {
        const productList = document.querySelector('#games-grid')
        productList.innerHTML= '';
        products.forEach(product => {
            productList.innerHTML+=createProductCard(product)
        });
    })

});