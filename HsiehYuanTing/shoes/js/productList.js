let items = null; // 原始資料，永不改動
let filteredItems = null;  // 過濾後的資料，用來渲染
const totalPageDom = document.querySelector('.total-page');
const cardsDom = document.querySelector('.cards');
const preDom = document.querySelector('.switch-pre-tab');
const nextDom = document.querySelector('.switch-next-tab');
const selectDom = document.querySelector('.select-ul');

const maxCount = 9; // 一頁 9 個 item
let totalSeriesGlobal = []; // 所有系列
let totalPageGlobal = 0; // 總頁數
let currentPageGlobal = 1; // 紀錄當前頁數
let currentSeriesGlobal = '所有商品'; // 記錄當前選擇的系列 預設是所有商品
fetch('../data/products.json').then(res => res.json())
    .then(data => {
        items = [...data];
        filteredItems = [...data];
        totalSeriesGlobal = selectSeries(items);
        pagination(filteredItems, currentPageGlobal);
    }).catch(err => console.error('資料載入失敗:', err));

function pagination(data, currentPage) {
    const totalCount = data.length;
    totalPageGlobal = Math.ceil(totalCount / maxCount);
    totalPageDom.innerHTML = renderPages(currentPage);
    cardsDom.innerHTML = renderCards(data, currentPage);
    selectDom.innerHTML = renderSeries();
    updatePaginationBtn();
}
// 抓出所有的系列
function selectSeries(data) {
    let series = data.map(item => item.seriesCh);
    series = series.filter((item, index) => {
        return series.indexOf(item) == index;
    })
    series.unshift('所有商品');
    return series;
}
// 依照系列過濾資料 
function filterBySeries(seriesName) {
    currentPageGlobal = 1;
    currentSeriesGlobal = seriesName;
    if (seriesName === '所有商品') {
        filteredItems = [...items];  // 復原全部
    } else {
        filteredItems = items.filter(item => {
            return item.seriesCh == seriesName;
        })
    }
    pagination(filteredItems, currentPageGlobal);
}
//  渲染分頁
function renderPages(currentPage) {
    let str = '';
    // 當前頁的前兩頁跟後兩頁 跟最後一頁才會被印出來 不然就是被加上一個 ...
    if (currentPage > totalPageGlobal) {
        currentPage = totalPageGlobal;
    }
    let pageSet = [
        1,
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        totalPageGlobal
    ];

    pageSet = pageSet.filter(item => {
        return item > 0 && item <= totalPageGlobal
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
            <div class="single-page ${currentPage == i ? `active` : ''}" id="${i}">
                <p>${i}</p>
            </div>
            `
    });
    return str;
}
//  渲染商品列表
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
// 渲染系列選擇器
function renderSeries() {
    let str = '';
    totalSeriesGlobal.forEach((item, index) => {
        str += `
            <li class="${item == currentSeriesGlobal ? 'active' : ''}" id=${index} data-series="${item}">${item}</li>
        `
    })
    return str;
}
//  直接選選擇哪一頁
function switchPage(e) {
    currentPageGlobal = parseInt(e.target.closest('.single-page').id);
    if (currentPageGlobal) { // 如果點到 ... 就不執行切分頁
        pagination(filteredItems, currentPageGlobal);
    }
}
//  上一頁
function prePage() {
    if (currentPageGlobal > 1) {
        currentPageGlobal -= 1;
        pagination(filteredItems, currentPageGlobal);
    }
}
//  下一頁
function nextPage() {
    if (currentPageGlobal < totalPageGlobal) {
        currentPageGlobal += 1;
        pagination(filteredItems, currentPageGlobal);
    }
}
// 抓點擊現在的系列
function takeSelect(e) {
    let selectedLi = e.target.closest('li');
    if (selectedLi) {
        let seriesName = selectedLi.getAttribute('data-series');
        filterBySeries(seriesName);
    }
}

// 分頁按鈕 diabled enabled
function updatePaginationBtn() {
    // 上一頁按鈕
    if (currentPageGlobal === 1) {
        preDom.classList.add('disabled');
        preDom.classList.remove('enabled');
    } else {
        preDom.classList.remove('disabled');
        preDom.classList.add('enabled');
    }

    // 下一頁按鈕
    if (currentPageGlobal === totalPageGlobal) {
        nextDom.classList.add('disabled');
        nextDom.classList.remove('enabled');
    } else {
        nextDom.classList.remove('disabled');
        nextDom.classList.add('enabled');
    }
}

totalPageDom.addEventListener('click', switchPage);
preDom.addEventListener('click', prePage);
nextDom.addEventListener('click', nextPage);
selectDom.addEventListener('click', takeSelect);