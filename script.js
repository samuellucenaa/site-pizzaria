const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);
let modalQt = 1;

pizzaJson.map((item, index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    c('.pizza-area').append(pizzaItem);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault()

        pizzaJson.map((item, index)=>{
            let pizzaItem = c('.models .pizza-item').cloneNode(true);
            c('.pizza-area').append(pizzaItem);
        
            pizzaItem.setAttribute('data-key', index);
            pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
            pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
            pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
            pizzaItem.querySelector('.pizza-item--img img').src = item.img;
            pizzaItem.querySelector('a').addEventListener('click', (e)=>{
                e.preventDefault();
        
                let key = e.target.closest('.pizza-item').getAttribute('data-key');
                modalQt = 1;
        
                c('.pizzaWindowArea').style.opacity = 0;
                c('.pizzaWindowArea').style.display = 'flex';
                setTimeout(()=>{
                    c('.pizzaWindowArea').style.opacity = 1;
                }, 200);
                c('.pizzaInfo h1').innerHTML = item.name;
                c('.pizzaInfo--desc').innerHTML = item.description;
                c('.pizzaInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`;
                c('.pizzaBig img').src = item.img;
                c('.pizzaInfo--size').forEach((size, sizeIndex)=>{
                    size.querySelector('span').innerHTML = '123';
                })
            });
        })
        
        let key = e.target.closest('.pizza-item').getAttribute('data-key');

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
    c('.pizzaWindowArea').style.display = 'none';
}