const list = document.querySelector('.hot-items');
let items = null;
let str = '';
fetch('../data/products.json').then(res => res.json())
    .then(data => {
        items = [...data];
        combineCard(items);
        list.innerHTML = str;
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
