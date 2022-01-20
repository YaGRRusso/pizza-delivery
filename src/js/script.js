let modalQt = 1
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