// homework
// 寫一個data.json
// 商品頁切換分頁

let items = null;
let totalPageDom = document.querySelector('.total-page');
fetch('../data/products.json').then(res => res.json())
    .then(data => {
        items = [...data];
        totalPageDom.innerHTML = renderTotalPages(items.length);
    }).catch(err => console.error('資料載入失敗:', err));


function renderTotalPages(totalCount) { // 先算總共有幾頁並渲染
    let maxCount = 9; // 一頁 9 個 item
    let str = '';
    let totalPage = totalCount / maxCount;
    if (totalCount % maxCount !== 0) { // 如果有多的要放到下一頁
        totalPage += 1;
    }

    for (let i = 1; i <= totalPage; i++) {
        str += `
        <div class="single-page">
            <p>${i}</p>
        </div>
        `
    }

    return str
}


function renderCards(data, page = 1) {

}