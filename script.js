// Function to load products dynamically from JSON file
async function loadProductsFromJSON() {
    const response = await fetch('products.json');
    const products = await response.json();

    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = '';  // Clear the existing content

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image_url}" alt="${product.name}">
            <h2>${product.name}</h2>
            <a href="${product.affiliate_link}" target="_blank">View</a>
        `;
        productsContainer.appendChild(productElement);
    });
}

// Search functionality
document.getElementById('searchBox').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();

    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm)
            );

            document.getElementById('productsContainer').innerHTML = '';
            filteredProducts.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <img src="${product.image_url}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <a href="${product.affiliate_link}" target="_blank">View</a>
                `;
                document.getElementById('productsContainer').appendChild(productElement);
            });
        });
});

// Load products when the page loads
window.onload = () => {
    loadProductsFromJSON();
};
