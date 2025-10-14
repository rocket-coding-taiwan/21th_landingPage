// homework
// 寫一個data.json
// 商品頁切換分頁

let items = null;

const totalPageDom = document.querySelector('.total-page');
const cardsDom = document.querySelector('.cards');

const maxCount = 9 // 一頁 9 個 item

fetch('../data/products.json').then(res => res.json())
    .then(data => {
        items = [...data];
        pagination(items, 1);
    }).catch(err => console.error('資料載入失敗:', err));


function pagination(data, currentPage) {
    const totalCount = data.length;
    totalPageDom.innerHTML = renderPages(totalCount, currentPage);
    cardsDom.innerHTML = renderCards(data, currentPage);
}

//渲染分頁
function renderPages(totalCount, currentPage) {
    let str = '';
    let totalPage = Math.ceil(totalCount / maxCount);
    // 當前頁的前兩頁跟後兩頁 跟最後一頁才會被印出來 不然就是被加上一個 ...
    if (currentPage > totalPage) {
        currentPage = pageTotal;
    }
    pageSet = [
        1,
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        totalPage
    ];

    pageSet = pageSet.filter(item => {
        return item > 0 && item <= totalPage
    });

    // 移除重複的頁碼 
    pageSet = pageSet.filter((item, index) => {
        return pageSet.indexOf(item) === index;
    });

    // 從小排到大
    pageSet.sort((a, b) => a - b);

    pageSet.forEach((i, index) => {
        if (index > 0 && i - pageSet[index - 1] > 1) {
            str += `
            <div class="single-page" >
                <p>...</p>
            </div>
            `
        }
        str += `
            <div class="single-page" id="${i}">
                <p>${i}</p>
            </div>
            `
    });
    return str;
}

// 渲染商品列表
function renderCards(data, page) {
    let str = ''
    let start = (page - 1) * maxCount;
    let end = Math.min(page * maxCount, data.length); // 到最後一頁的時候避免超過原本資料的長度
    for (let i = start; i < end; i++) {
        str += `
        <div class="card">
            <img src="${data[i].pic}.png" alt="${data[i].product_name}">
            <p class="card-title">${data[i].product_name}</p>
            <p class="card-price">NT$${data[i].price}</p>
        </div>
        `
    }
    return str;
}


function switchPage(e) {
    e.preventDefault();
    let currentPage = e.target.closest('.single-page').id;
    pagination(items, parseInt(currentPage));
}

totalPageDom.addEventListener('click', switchPage);
