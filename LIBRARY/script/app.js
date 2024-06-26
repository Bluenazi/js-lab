// dom nodes
const root = document.getElementById("root");
const basket = document.getElementById("basket");


// function
function render(list) {
    let template = `<section class="products">`;
    template += list.map(item => {
        return `
            <div class="product">
                <img src="../image/${item.imgSrc}" alt="${item.title}.jpeg">
                <h2>${item.title}</h2>
                <p>${item.author}</p>
                <p class="price">قیمت: ${item.price}تومان</p>
                ${!BASKET.find(basketItem => basketItem.id === item.id)
                ?
                `<h3 class="add" onclick="handleAddToBasket('${item.id}')"><i class="fa fa-cart-plus" aria-hidden="true"></i></h3>`
                :
                `<h4 class="added"><i class="fa fa-check-square" aria-hidden="true"></i></h4>`
            }
            </div>`;
    }).join("");

    template += '</section>';
    root.innerHTML = template;
    basket.textContent = BASKET.length;
}

function renderBasket() {
    let template = `<section class="baskets">`;
    template += BASKET.map(item => {
        return `
            <div class="product basket">
                <img src="../image/${item.imgSrc}" alt="${item.title}.jpeg">
                <h2>${item.title}</h2>
                <p>${item.author}</p>
                <p >قیمت: ${item.price}تومان</p>
                <h3 onclick="handleRemove(${item.id})" class='remove'><i class="fa fa-times" aria-hidden="true"></i></h3>
            </div>`;
    }).join("");

    template += '</section>';
    root.innerHTML = template;
    basket.textContent = BASKET.length;
}


function handleSearch(event) {
    const value = event.target.value.toLowerCase();
    const searchResult = BOOKS.filter(book =>
        book.title.toLowerCase().includes(value) ||
        book.author.toLowerCase().includes(value)
    );
    render(searchResult);
}

let handleRemove = (productId) => {
    debugger;
    let filtered = BASKET.filter((item) => item.id !== productId);
    BASKET = filtered;
    renderBasket();
};
function handleAddToBasket(productId) {
    const finded = BOOKS.find(item => item.id === +productId);
    BASKET.push(finded);

    Swal.fire({
        title: 'Added to Library',
        text: `Hope you enjoy the book:)`,
        icon: 'success',
        confirmButtonText: 'OK'        
    });
    render(BOOKS)
}

let handleBackToMenu = () => {
    render(BOOKS);
};

let CURRENT_STEP = 0;

function setActiveStep(currentStep) {
  divs.forEach((element, index) => {
    if (index < currentStep) {
        console.log(element)
      element.classList.add("active");

    } else {
      element.classList.remove("active");
    }
  });
}

function handleNext() {
    CURRENT_STEP++;
    setActiveStep(CURRENT_STEP)
}



// events
window.addEventListener("load", () => {
    render(BOOKS)
    document.getElementById("genre-buttons").addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            const genre = event.target.getAttribute("id");
            let filtered;
            if (genre === "همه") {
                filtered = BOOKS;

            } else {
                filtered = BOOKS.filter(book => book.genre === genre);
            }
            render(filtered);
        }
    })

})
