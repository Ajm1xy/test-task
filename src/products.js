const requestURL = 'products.json'
let productsArea = document.querySelector('.product__area')


/*Функция, принимающая данные из products.json*/
function sendRequest(url) {
    let xhr = new XMLHttpRequest()

    xhr.open('GET', url)
    xhr.responseType = 'json'
    xhr.onload = () => {  
        
        displayProducts(xhr.response)
        
        let products = document.querySelectorAll('.product')
    
        products.forEach(product => {
            product.addEventListener('click', event => {
                let cnt = product.querySelector('.product__count').value
                let up = product.querySelector('.up')
                let down = product.querySelector('.down')
                let pack = product.querySelector('#package')
                let metr = product.querySelector('#metr')
                let price = product.querySelector('.goldPrice')
                let retailPrice = product.querySelector('.retailPrice')

                if (event.target == metr) {
                    pack.parentElement.classList.remove('unit--active')
                    metr.parentElement.classList.add('unit--active')
                    price.textContent = price.dataset.pricealt
                    retailPrice.textContent = retailPrice.dataset.retailalt
                }
                if (event.target == pack) {
                    metr.parentElement.classList.remove('unit--active')
                    pack.parentElement.classList.add('unit--active')
                    price.textContent = Math.round(price.dataset.price)
                    retailPrice.textContent = Math.round(retailPrice.dataset.retail)
                }

                if (event.target == up) cnt++
                if (event.target == down && cnt > 1) cnt--
                product.querySelector('.product__count').value = cnt
            })
        })
    }
    xhr.onerror = (err) => {
        const errorHTML = document.createElement('h1')
        errorHTML.innerHTML = `Данные не загружены`
        errorHTML.style.width = '100vw'
        errorHTML.style.textAlign = 'center'
        productsArea.appendChild(errorHTML)
        console.log(err)
    }
    xhr.send()
}
//Функция вывода всех карточек товара
function displayProducts(data) {
  let html = '' 

  data.forEach(product => {
    html += `
    <div class="products_section">
        <div class="products_page pg_0">
            <div class="product product_horizontal" id="${product.productId}">                                
                <span class="product_code">Код: ${product.code}</span>
                <div class="product_status_tooltip_container">
                    <span class="product_status">Наличие</span>
                </div>                                
                <div class="product_photo">
                    <a href="#" class="url--link product__link">
                        <img src="${product.primaryImageUrl.slice(0, product.primaryImageUrl.lastIndexOf('.'))}_220x220_1${product.primaryImageUrl.slice(product.primaryImageUrl.lastIndexOf('.'))}">
                    </a>                                    
                </div>
                <div class="product_description">
                    <a href="#" class="product__link">${product.title}</a>
                </div>
                <div class="product_tags hidden-sm">
                <p>Могут понадобиться:</p>
    `
    product.assocProducts.split(';').forEach(item => {
        html += `
        <a href="#" class="url--link">${item}</a>
        `
    })

    html += `
                </div>
                <div class="product_units">
                    <div class="unit--wrapper">
                        <div class="unit--select unit--active">
                            <p class="ng-binding" id="metr">За м. кв.</p>
                        </div>
                        <div class="unit--select">
                            <p class="ng-binding" id="package">За упаковку</p>
                        </div>
                    </div>
                </div>
                <p class="product_price_club_card">
                    <span class="product_price_club_card_text">По карте<br>клуба</span>
                    <span class="goldPrice" data-pricealt="${product.priceGold}" data-price="${product.priceGoldAlt}">
                    ${product.priceGold}</span>
                    <span class="rouble__i black__i">
                        <svg version="1.0" id="rouble__b" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="30px" height="22px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                           <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rouble_black"></use>
                        </svg>
                     </span>
                </p>
                <p class="product_price_default">
                    <span class="retailPrice" data-retailalt="${product.priceRetail}" data-retail="${product.priceRetailAlt}">
                    ${product.priceRetail}</span>
                    <span class="rouble__i black__i">
                        <svg version="1.0" id="rouble__g" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="30px" height="22px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                           <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rouble_gray"></use>
                        </svg>
                     </span>
                </p>
                <div class="product_price_points">
                    <p class="ng-binding">Можно купить за 231,75 балла</p>
                </div>
                <div class="list--unit-padd"></div>
                <div class="list--unit-desc">
                    <div class="unit--info">
                        <div class="unit--desc-i"></div>
                        <div class="unit--desc-t">
                            <p>
                                <span class="ng-binding">Продается упаковками:</span>
                                <span class="unit--infoInn">1 упак. = 2.47 м. кв. </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="product__wrapper">
                    <div class="product_count_wrapper">
                        <div class="stepper">
                            <input class="product__count stepper-input" type="text" value="1">
                            <span class="stepper-arrow up"></span>
                            <span class="stepper-arrow down"></span>                                            
                        </div>
                    </div>
                    <span class="btn btn_cart" data-url="/cart/" data-product-id="${product.productId}">
                        <svg class="ic ic_cart">
                           <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart"></use>
                        </svg>
                        <span class="ng-binding">В корзину</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
    `
    productsArea.innerHTML = html
  })

}

sendRequest(requestURL)
