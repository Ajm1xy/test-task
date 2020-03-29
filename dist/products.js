'use strict';

var requestURL = 'products.json';
var productsArea = document.querySelector('.product__area');

/*Функция, принимающая данные из products.json*/
function sendRequest(url) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {

        displayProducts(xhr.response);

        var products = document.querySelectorAll('.product');

        products.forEach(function (product) {
            product.addEventListener('click', function (event) {
                var cnt = product.querySelector('.product__count').value;
                var up = product.querySelector('.up');
                var down = product.querySelector('.down');
                var pack = product.querySelector('#package');
                var metr = product.querySelector('#metr');
                var price = product.querySelector('.goldPrice');
                var retailPrice = product.querySelector('.retailPrice');

                if (event.target == metr) {
                    pack.parentElement.classList.remove('unit--active');
                    metr.parentElement.classList.add('unit--active');
                    price.textContent = price.dataset.pricealt;
                    retailPrice.textContent = retailPrice.dataset.retailalt;
                }
                if (event.target == pack) {
                    metr.parentElement.classList.remove('unit--active');
                    pack.parentElement.classList.add('unit--active');
                    price.textContent = Math.round(price.dataset.price);
                    retailPrice.textContent = Math.round(retailPrice.dataset.retail);
                }

                if (event.target == up) cnt++;
                if (event.target == down && cnt > 1) cnt--;
                product.querySelector('.product__count').value = cnt;
            });
        });
    };
    xhr.onerror = function (err) {
        var errorHTML = document.createElement('h1');
        errorHTML.innerHTML = '\u0414\u0430\u043D\u043D\u044B\u0435 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u044B';
        errorHTML.style.width = '100vw';
        errorHTML.style.textAlign = 'center';
        productsArea.appendChild(errorHTML);
        console.log(err);
    };
    xhr.send();
}
//Функция вывода всех карточек товара
function displayProducts(data) {
    var html = '';

    data.forEach(function (product) {
        html += '\n    <div class="products_section">\n        <div class="products_page pg_0">\n            <div class="product product_horizontal" id="' + product.productId + '">                                \n                <span class="product_code">\u041A\u043E\u0434: ' + product.code + '</span>\n                <div class="product_status_tooltip_container">\n                    <span class="product_status">\u041D\u0430\u043B\u0438\u0447\u0438\u0435</span>\n                </div>                                \n                <div class="product_photo">\n                    <a href="#" class="url--link product__link">\n                        <img src="' + product.primaryImageUrl.slice(0, product.primaryImageUrl.lastIndexOf('.')) + '_220x220_1' + product.primaryImageUrl.slice(product.primaryImageUrl.lastIndexOf('.')) + '">\n                    </a>                                    \n                </div>\n                <div class="product_description">\n                    <a href="#" class="product__link">' + product.title + '</a>\n                </div>\n                <div class="product_tags hidden-sm">\n                <p>\u041C\u043E\u0433\u0443\u0442 \u043F\u043E\u043D\u0430\u0434\u043E\u0431\u0438\u0442\u044C\u0441\u044F:</p>\n    ';
        product.assocProducts.split(';').forEach(function (item) {
            html += '\n        <a href="#" class="url--link">' + item + '</a>\n        ';
        });

        html += '\n                </div>\n                <div class="product_units">\n                    <div class="unit--wrapper">\n                        <div class="unit--select unit--active">\n                            <p class="ng-binding" id="metr">\u0417\u0430 \u043C. \u043A\u0432.</p>\n                        </div>\n                        <div class="unit--select">\n                            <p class="ng-binding" id="package">\u0417\u0430 \u0443\u043F\u0430\u043A\u043E\u0432\u043A\u0443</p>\n                        </div>\n                    </div>\n                </div>\n                <p class="product_price_club_card">\n                    <span class="product_price_club_card_text">\u041F\u043E \u043A\u0430\u0440\u0442\u0435<br>\u043A\u043B\u0443\u0431\u0430</span>\n                    <span class="goldPrice" data-pricealt="' + product.priceGold + '" data-price="' + product.priceGoldAlt + '">\n                    ' + product.priceGold + '</span>\n                    <span class="rouble__i black__i">\n                        <svg version="1.0" id="rouble__b" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="30px" height="22px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">\n                           <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rouble_black"></use>\n                        </svg>\n                     </span>\n                </p>\n                <p class="product_price_default">\n                    <span class="retailPrice" data-retailalt="' + product.priceRetail + '" data-retail="' + product.priceRetailAlt + '">\n                    ' + product.priceRetail + '</span>\n                    <span class="rouble__i black__i">\n                        <svg version="1.0" id="rouble__g" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="30px" height="22px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">\n                           <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rouble_gray"></use>\n                        </svg>\n                     </span>\n                </p>\n                <div class="product_price_points">\n                    <p class="ng-binding">\u041C\u043E\u0436\u043D\u043E \u043A\u0443\u043F\u0438\u0442\u044C \u0437\u0430 231,75 \u0431\u0430\u043B\u043B\u0430</p>\n                </div>\n                <div class="list--unit-padd"></div>\n                <div class="list--unit-desc">\n                    <div class="unit--info">\n                        <div class="unit--desc-i"></div>\n                        <div class="unit--desc-t">\n                            <p>\n                                <span class="ng-binding">\u041F\u0440\u043E\u0434\u0430\u0435\u0442\u0441\u044F \u0443\u043F\u0430\u043A\u043E\u0432\u043A\u0430\u043C\u0438:</span>\n                                <span class="unit--infoInn">1 \u0443\u043F\u0430\u043A. = 2.47 \u043C. \u043A\u0432. </span>\n                            </p>\n                        </div>\n                    </div>\n                </div>\n                <div class="product__wrapper">\n                    <div class="product_count_wrapper">\n                        <div class="stepper">\n                            <input class="product__count stepper-input" type="text" value="1">\n                            <span class="stepper-arrow up"></span>\n                            <span class="stepper-arrow down"></span>                                            \n                        </div>\n                    </div>\n                    <span class="btn btn_cart" data-url="/cart/" data-product-id="' + product.productId + '">\n                        <svg class="ic ic_cart">\n                           <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart"></use>\n                        </svg>\n                        <span class="ng-binding">\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0443</span>\n                    </span>\n                </div>\n            </div>\n        </div>\n    </div>\n    ';
        productsArea.innerHTML = html;
    });
}

sendRequest(requestURL);