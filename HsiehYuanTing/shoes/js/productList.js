const list = document.querySelector('.hot-items');
const series = document.querySelector('.series-items');
let items = null;
let str = '';
let seriesStr = ''
fetch('../data/products.json').then(res => res.json())
    .then(data => {
        items = [...data];
        combineCard(items);
        combineSeriesCard(items);
        list.innerHTML = str;
        series.innerHTML = seriesStr;
    })

function combineCard(data) {
    for (let i = 0; i < 4; i++) {
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
}

function combineSeriesCard(data) {
    for (let i = 0; i < 4; i++) {
        seriesStr +=
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
}
