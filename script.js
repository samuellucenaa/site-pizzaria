const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

let cart = [];
let modalQt = 1;
let modalKey = 0;

pizzaJson.map((item, index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    c('.pizza-area').append(pizzaItem);
    modalQt = 1;
    

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;

        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);
        c('.pizzaInfo h1').innerHTML = item.name;
        c('.pizzaInfo--desc').innerHTML = item.description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`;
        c('.pizzaBig img').src = item.img;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex === 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        })
        c('.pizzaInfo--qt').innerHTML = modalQt;
    });
})

function cancelar(){
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none';
    },500);
}

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', cancelar)
});

c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1){
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;
    } else{
        modalQt = 1;
    }
});

c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;
});

cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    })
});

c('.pizzaInfo--addButton').addEventListener('click', ()=>{
    let size =  c('.pizzaInfo--size.selected').getAttribute('data-key');
    let identifier = pizzaJson[modalKey].id+'@'+size;
    let key = cart.findIndex((item)=>item.identifier == identifier);

    if(key > -1){
        cart[key].qt += modalQt;
    } else{
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQt,
        });
    }
    
    atualizarCart();
    cancelar();
});

c('.menu-openner').addEventListener('click', ()=>{
    if(cart.length > 0){
        c('aside').style.left = '0';
    }
})

c('.menu-closer').addEventListener('click', ()=>{
    c('aside').style.left = '100vw';
})

function atualizarCart(){
    c('.menu-openner span').innerHTML = cart.length;
    
    if(cart.length > 0){
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';
        
        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart){
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);
            let cartItem = c('.models .cart--item').cloneNode(true);
            let pizzaSizeName;

            subtotal += cart[i].qt * pizzaItem.price;

            switch(cart[i].size){
                case '0':
                    pizzaSizeName = 'P';
                    break;

                case '1':
                    pizzaSizeName = 'M';
                    break;    
            
                case '2':
                    pizzaSizeName = 'G';
                    break;
            }

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = `${pizzaItem.name} (${pizzaSizeName})`;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt ++;
                atualizarCart();
            });
            
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qt > 1){
                    cart[i].qt --;
                } else{
                    cart.splice(i, 1)
                }
                
                atualizarCart();
            });

            c('.cart').append(cartItem);

        }
        
        desconto = subtotal * 0.1;
        total = subtotal - desconto;
        
        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    } else {
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }
}