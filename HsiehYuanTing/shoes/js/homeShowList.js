const list = document.querySelector('.hot-items');
const series = document.querySelector('.series-items');
let items = null;
let maxCount = 4;
fetch('../data/products.json').then(res => res.json())
    .then(data => {
        items = [...data];
        combineCard(items);
        combineSeriesCard(items);
        list.innerHTML = combineCard(data);
        series.innerHTML = combineSeriesCard(data);
    }).catch(err => console.error('資料載入失敗:', err));

function combineCard(data) {
    let str = ''
    for (let i = 0; i < maxCount; i++) {
        str +=
            `
            <div class="hot-item">
                <img src="${data[i].pic}.png" alt="product-card">
                <div class="hot-tag">
                    <p  class="hot-tag-text">人氣 No.1</p>
                </div>
            </div>
        `
    }
    return str;
}

function combineSeriesCard(data) {
    let str = ''
    for (let i = 0; i < maxCount; i++) {
        str +=
            `
            <div class="series-item">
                    <img src="${data[i].pic}.png" alt="product-card">
                    <div class="series-tag">
                        <p class="series-tag-text">${data[i].series}</p>
                        <p class="series-tag-text">${data[i].seriesCh}</p>
                    </div>
            </div>
        `
    }
    return str;
}
