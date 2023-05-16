
const shop = document.getElementById("shop")


let basket = JSON.parse(localStorage.getItem("myData") ) || []

const generateShop = () => {

    return (shop.innerHTML = shopItemsData.map((x) => {
        let { id, name, img, desc, price } = x;

        let search = basket.find((x)=> x.id === id) || [] // if id is already present stored it in seach

        return `

    <div id = product-id-${id} class="item">
     <img width="220" src=${img} alt="hanger">
     <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
            <h2>${price}</h2>
     
            <div class="buttons">
                <i onclick= "increment(${id})" class="bi bi-plus-lg"></i>
                <div id = ${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                <i onclick= "decrement(${id})" class="bi bi-dash-lg"></i>
        </div>
    </div>
</div>
</div> 
     `}).join(" "))
}

// <div id = ${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
//  this is used for quantity to stored if the item already exist 
generateShop()

const increment = (id) => {

    let selectedItem = id;

    search = basket.find((x) => x.id === selectedItem.id); // searching for the item that we are selecting

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        })
    } else {
        search.item += 1; // if item is present in the basket increased it by 0ne 
    }

    // console.log(basket);

    update(selectedItem.id) // give the argument of selecteditem ids
    localStorage.setItem("myData" ,JSON.stringify(basket))
}


const decrement = (id) => {


    let selectedItem = id;

    search = basket.find((x) => x.id === selectedItem.id); // searching for the item that we are selecting

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1; // if item is present in the basket increased it by 0ne 
    }


      // console.log(basket);

      update(selectedItem.id)

    // here basket is an array it carries the peoduct we store
    basket = basket.filter((x)=> x.item !== 0) // only select where item is not is equal to zero
    localStorage.setItem("myData", JSON.stringify(basket))
}


const update = (id) => {
    search = basket.find((x) => x.id === id);

    // console.log(search.item); search includes all the object but seach.id includes only the id

    document.getElementById(id).innerHTML = search.item;


    calculation(id)

}


const calculation = (id) => {
    let cartIcon = document.getElementById("cartAmount");

//  cartIcon.innerHtml = 100;

// using x.item bcz we only want to add the item not the whole object
    cartIcon.innerHTML = basket.map((x) => {
        return x.item   // each time when item value is increased it is stored in cartAmount instead of being 0
    }).reduce((previous, current) => {
        return previous + current
    }, 0)
    // console.log(basket);
}

calculation() // every time when application loads calculation function must run