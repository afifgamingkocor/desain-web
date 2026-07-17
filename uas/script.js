const body = document.body;

const menuButton = document.querySelector(".menu-toggle");

const navigation = document.querySelector(".main-nav");

const cartCounter = document.querySelector("[data-cart-count]");

const toast = document.querySelector(".toast");

function initMobileMenu() {

    if (!menuButton || !navigation) return;

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("open");

        body.classList.toggle("menu-open");

        menuButton.setAttribute(
            "aria-expanded",
            navigation.classList.contains("open")
        );

    });

}

let cartTotal = 0;

function updateCart() {

    if (cartCounter) {

        cartCounter.textContent = cartTotal;

    }

}

function addToCart(productName) {

    cartTotal++;

    updateCart();

    showToast(`${productName} berhasil ditambahkan ke tas.`);

}

function initAddCartButtons() {

    const buttons = document.querySelectorAll(".add-cart");

    buttons.forEach((button) => {

        button.addEventListener("click", () => {

            const product = button.dataset.product;

            addToCart(product);

        });

    });

}

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(showToast.timeout);

    showToast.timeout = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

function initQuantitySelector() {

    const output = document.querySelector("[data-quantity]");

    const minus = document.querySelector("[data-quantity-minus]");

    const plus = document.querySelector("[data-quantity-plus]");

    if (!output) return;

    let quantity = 1;

    function render() {

        output.textContent = quantity;

    }

    plus?.addEventListener("click", () => {

        quantity++;

        render();

    });

    minus?.addEventListener("click", () => {

        if (quantity > 1) {

            quantity--;

            render();

        }

    });

}

function initProductSearch() {

    const searchInput = document.querySelector("[data-product-search]");

    if (!searchInput) return;

    const cards = document.querySelectorAll(".product-card");

    const emptyMessage = document.querySelector(".empty-products");

    const total = document.querySelector("[data-product-total]");

    searchInput.addEventListener("input", () => {

        const keyword = searchInput.value.toLowerCase();

        let visible = 0;

        cards.forEach((card) => {

            const product = card.dataset.product.toLowerCase();

            const show = product.includes(keyword);

            card.style.display = show ? "" : "none";

            if (show) visible++;

        });

        if (total) {

            total.textContent = visible;

        }

        if (emptyMessage) {

            emptyMessage.hidden = visible !== 0;

        }

    });

}

function initForms() {

    const forms = document.querySelectorAll("form[data-message]");

    forms.forEach((form) => {

        form.addEventListener("submit", (event) => {

            event.preventDefault();

            showToast(form.dataset.message);

            form.reset();

        });

    });

}

function initYear() {

    const year = document.querySelector("[data-year]");

    if (!year) return;

    year.textContent = new Date().getFullYear();

}

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();

    initAddCartButtons();

    initQuantitySelector();

    initProductSearch();

    initForms();

    initYear();

    updateCart();

});

