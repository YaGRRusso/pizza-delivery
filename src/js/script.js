let modalQt = 1
let cart = []
let modalKey = 0

const qs = (el) => document.querySelector(el)
const qsa = (el) => document.querySelectorAll(el)

pizzaJson.map((item, index) => {
  let pizzaItem = qs('.models .pizza-item').cloneNode(true)

  pizzaItem.setAttribute('data-key', index)
  pizzaItem.querySelector('.pizza-item--img img').src = item.img
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.prices[2].toFixed(2)}`
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

  pizzaItem.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault()
    let key = e.target.closest('.pizza-item').getAttribute('data-key')
    modalQt = 1
    modalKey = key

    // console.log(pizzaJson[key])
    qs('.pizzaBig img').src = pizzaJson[key].img
    qs('.pizzaInfo h1').innerHTML = pizzaJson[key].name
    qs('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
    qs('.pizzaInfo--size.selected').classList.remove('selected')
    qsa('.pizzaInfo--size').forEach((size, sizeIndex) => {
      if(sizeIndex === 2) {
        size.classList.add('selected')
      }
      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
    })
    qs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].prices[2].toFixed(2)}`
    qs('.pizzaInfo--qt').innerHTML = modalQt

    // ------------- Display ----------------
    qs('.pizzaWindowArea').style.opacity = 0
    qs('.pizzaWindowArea').style.display = 'flex'
    setTimeout(() => {
      qs('.pizzaWindowArea').style.opacity = 1
    }, 100)
  })

  qs('.pizza-area').append(pizzaItem)
})

//Eventos do modal (map buga as acoes)
function closeModal(){
  qs('.pizzaWindowArea').style.opacity = 0
  setTimeout(() => {
    qs('.pizzaWindowArea').style.display = 'none'
  }, 500)
}
qsa('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
  item.addEventListener('click', closeModal)
})

qs('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
  if (modalQt>1){
    modalQt--
    qs('.pizzaInfo--qt').innerHTML = modalQt
  }
})
qs('.pizzaInfo--qtmais').addEventListener('click', ()=>{
  modalQt++
  qs('.pizzaInfo--qt').innerHTML = modalQt
})
qsa('.pizzaInfo--size').forEach((size)=>{
  let sizePrice = size.getAttribute('data-key')
  size.addEventListener('click', (e) => {
    qs('.pizzaInfo--size.selected').classList.remove('selected')
    size.classList.add('selected')
    switch (sizePrice) {
      case '0':
        qs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[modalKey].prices[0].toFixed(2)}`
      break;

      case '1':
        qs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[modalKey].prices[1].toFixed(2)}`
      break;

      case '2':
        qs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[modalKey].prices[2].toFixed(2)}`
      break;
    }
  })
})
qs('.pizzaInfo--addButton').addEventListener('click', ()=>{
  let size = qs('.pizzaInfo--size.selected').getAttribute('data-key')

  let identifier = pizzaJson[modalKey].id+":"+size

  let key = cart.findIndex((item) => item.identifier === identifier)

  if (key >= 0){
    cart[key].qt += modalQt
  } else {
    cart.push({
      identifier,
      id:pizzaJson[modalKey].id,
      size: size,
      qt: modalQt
    })
  }
  updateCart()
  closeModal()
})

function updateCart() {
  if (cart.length > 0){
    qs('aside').classList.add('show')
    qs('.cart').innerHTML = ''
    for (let i in cart) {

      let pizzaItem = pizzaJson.find((item) => item.id === cart[i].id)
      let cartItem = qs('.models .cart--item').cloneNode(true)

      let sizeName
      switch(cart[i].size){
        case '0':
          sizeName='P'
        break
        case '1':
          sizeName='M'
        break
        case '2':
          sizeName='G'
        break
      }

      let pizzaName = `${pizzaItem.name} (${sizeName})`

      cartItem.querySelector('img').src = pizzaItem.img
      cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
      cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

      qs('.cart').append(cartItem)
    }

  } else {
    qs('aside').classList.remove('show')
  }
}