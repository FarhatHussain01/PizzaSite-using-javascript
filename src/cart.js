let basket = JSON.parse(localStorage.getItem("myData")) || []

let label = document.getElementById("label")
let shoppingCart = document.getElementById("shopping-cart")


const calculation = (id) => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => {
        return x.item
    }).reduce((previous, current) => {
        return previous + current
    }, 0)
}

calculation()

let generateCartItems = () => {

    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            // this search ftn is for if you fing the id matching the id in data.js return that else return empty array
            let search = shopItemsData.find((y) => y.id === id) || []
            return `
    <div class = "cart-item"> 
    <img width = "105" src = ${search.img}></img>
    <div class= "details">
    <div class = "title-price-x">
      <h4 class= "title-price">
      <p>${search.name}</p>
      <p class = "cart-item-price">$${search.price}</p>
      </h4>
        <i onclick= "removeItem(${id})"  class="bi bi-x-lg"></i>
    </div>

    <div class="buttons">
        <i onclick= "increment(${id})" class="bi bi-plus-lg"></i>
        <div id = ${id} class="quantity">${item}</div> 
        <i onclick= "decrement(${id})" class="bi bi-dash-lg"></i>
</div>
<h3>$${item* search.price}<h3>
    </div>
    </div>
    `

            //  <div id = ${id} class="quantity">${item}</div>
            // this item is comming from basket 
        }).join(""))

    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h3>Your Cart is empty</h3>
        <a href = "index.html">
        <button class = "homeBtn"> Back to Home</button>
        </a>
        `
    }
}

generateCartItems()

const increment = (id) => {

    let selectedItem = id;

    search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        })
    } else {
        search.item += 1;
    }
    update(selectedItem.id)
    generateCartItems()

    localStorage.setItem("myData", JSON.stringify(basket))
}


const decrement = (id) => {


    let selectedItem = id;

    search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    update(selectedItem.id)
    basket = basket.filter((x) => x.item !== 0)
    generateCartItems() // this will remove the items with o quantity bcz above filter item which have 0 quantity
    localStorage.setItem("myData", JSON.stringify(basket))
}

const update = (id) => {
    search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;

 
    totalAmount() // to automatically change the price
    calculation(id)
}

const removeItem = (id) =>{
let selectedItem = id;

basket = basket.filter((x)=>x.id !== selectedItem.id)
// this line is remove while basket array is filtered
generateCartItems() // invokive this function here bcz we want to rerender our cart or to remove the cart
totalAmount()
calculation()
localStorage.setItem("myData", JSON.stringify(basket))
}


let clearCart = () =>{
    basket = [];
    generateCartItems()
    calculation()
    localStorage.setItem("myData", JSON.stringify(basket)); // to update the locolstorage
}

const totalAmount = () =>{
    
    if (basket.length !== 0){
        let amount = basket.map((x)=>{
            let {id , item} = x
            let search = shopItemsData.find((y)=>y.id === id) || []

            return item * search.price
        }).reduce((previous ,current)=>{
 return previous + current
        })
        // console.log(amount);

        label.innerHTML = `
        <h2>TotalBill : $${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick = "clearCart()" class="removeAll">Clear Cart</button>
        `
    }
    else return;
    
}

totalAmount()


