function showmenu(){
  let sidebar = document.querySelector("#page_menu");
  sidebar.style.display="block";
  sidebar.style.paddingTop = "10vh";
  sidebar.style.width = "220px";
  document.querySelector(".close").style.display="block"
  document.querySelector(".open").style.display="none"

}
function hidemenu(){
  document.querySelector("#page_menu").style.display="none";
  document.querySelector(".open").style.display="block";
}
function secondscreen() {
  document.querySelector("#banner").style.display="none";
}
const menu_data = 'https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json';


document.addEventListener("DOMContentLoaded", function() {


  function getMenu(){
    
    fetch(menu_data).then(response => {
      return response.json();
    }).then(data => {
      data.forEach((item,index) => {
        document.getElementById("cards").innerHTML +=`<div class="card">
                    <img src="${item.imgSrc}">
                    <div id="card_div">
                        <div id="nameprice">
                            <p>${item.name}</p>
                            <p>$${item.price}/-</p>
                        </div>
                        <div>
                            <div class="cart-container">
                                <button class=" btn add-button" id="add-button">+</button>
                                <div class="cart-controls" id="cart-controls">
                                    <button class="btn minus-button" id="minus-button">-</button>
                                    <span id="item-count">1</span>
                                    <button class="btn plus-button" id="plus-button">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
      })
    })
  }

  // menu_data.forEach((item,index) => {
      //   document.getElementById("cards").innerHTML +=`<div class="card">
      //               <img src="${item.imgSrc}">
      //               <div id="card_div">
      //                   <div id="nameprice">
      //                       <p>${item.name}</p>
      //                       <p>$${item.price}/-</p>
      //                   </div>
      //                   <div>
      //                       <div class="cart-container">
      //                           <button class=" btn add-button" id="add-button">+</button>
      //                           <div class="cart-controls" id="cart-controls">
      //                               <button class="btn minus-button" id="minus-button">-</button>
      //                               <span id="item-count">1</span>
      //                               <button class="btn plus-button" id="plus-button">+</button>
      //                           </div>
      //                       </div>
      //                   </div>
      //               </div>
      //           </div>`
      // });

  getMenu();

  
  function takeOrder() {
    return new Promise(resolve => {
      setTimeout(() => {
        const burgers = [
          { name: "Cheese Burger", price: 5.99 },
          { name: "Veggie Burger", price: 6.49 },
          { name: "Bacon Burger", price: 7.49 },
          { name: "Chicken Burger", price: 6.99 },
          { name: "Mushroom Burger", price: 6.79 },
          { name: "Double Cheese Burger", price: 8.99 },
          { name: "BBQ Burger", price: 7.99 },
          { name: "Fish Burger", price: 7.29 },
          { name: "Turkey Burger", price: 6.49 },
          { name: "Spicy Burger", price: 7.49 }
        ];
  
        const randomBurgers = [];
        for (let i = 0; i < 3; i++) {
          const randomIndex = Math.floor(Math.random() * burgers.length);
          randomBurgers.push(burgers[randomIndex]);
        }
  
        resolve(randomBurgers);
      }, 2500);
    });
  }
  


  // In This function the status of order and payment statuse are returned.
  function orderPrep(){
    return new Promise(resolve => {
      setTimeout(() => {
        let orderPrepObj = {order_status:true, paid:false}
        resolve(orderPrepObj);
      },1500);
    })
  }


  // In This function the status of order and payment statuse are returned.
  function payOrder(){
    return new Promise(resolve => {
      setTimeout(() => {
        let payOrderObj = {order_status:true, paid:true};
        resolve(payOrderObj);
      }, 1000);
    })
  }


  //In this fuction a thankyou message is returned after the payment is done.
  function thankyou(){
    alert('thankyou for eating with us today!');
  }


  //This is the main function which control the flow of all the function.
  function main() {
    takeOrder()
      .then(order => {
        console.log('Your Order:', order);
        return orderPrep(); // Return the promise
      })
      .then(orderStatus => {
        console.log('Order Preparation Status:', orderStatus);
        return payOrder(); // Return the promise
      })
      .then(payOrderStatus => {
        console.log('Payment Status:', payOrderStatus);
        if (payOrderStatus && payOrderStatus.paid) {
          thankyou();
        }
      })
  }
  

  main();

    const addButton = document.getElementById("add-button");
    const cartControls = document.getElementById("cart-controls");
    const minusButton = document.getElementById("minus-button");
    const plusButton = document.getElementById("plus-button");
    const itemCount = document.getElementById("item-count");
    
    let count = 1;

    addButton.addEventListener("click", function() {
        count = 1;
        itemCount.textContent = count;
        cartControls.style.display = "flex";
        addButton.style.display = "none";
    });

    minusButton.addEventListener("click", function() {
        if (count > 0) {
            count--;
            itemCount.textContent = count;
        }
        if (count === 0) {
            cartControls.style.display = "none";
            addButton.style.display = "block";

        }
    });

    plusButton.addEventListener("click", function() {
        count++;
        itemCount.textContent = count;
        if (count > 1) {
            minusButton.disabled = false;
        }
    });
});