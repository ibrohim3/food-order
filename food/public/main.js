const API = './products.json'
const imgPush = () => {
  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      const cards = document.querySelectorAll('.food-card');
      data.forEach((item, index) => {
        if (cards[index]) {
          const img = document.createElement('img');
          img.src = item.img;
          img.alt = 'product image';
          const food_name = cards[index].querySelector('.food-name');
          if (food_name) {
            food_name.textContent = item.name;
          }
          const time = cards[index].querySelector('.time');
          if (time) {
            time.textContent = item.time;
          }
          cards[index].insertBefore(img, cards[index].firstChild);
        }
      });
    })
    .catch((err) => {
      console.log('Xatolik:', err);
    });
};
imgPush();

const orderBtns = document.querySelectorAll('.three-cards .order-btn');
const cartContainer = document.querySelector('.cards');

orderBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        const item = data[index];
        if (!item) return;

        const name = item.name;
        const imgSrc = item.img;
        const price = item.price;

        const orderCard = document.createElement('div');
        orderCard.classList.add('order-card');
        orderCard.innerHTML = `
          <img class="img" src="${imgSrc}"alt="">
          <div class="counter">
            <div class="plus">+</div>
            <span class="count">1</span>
            <div class="minus">-</div>
          </div>
          <div class="info">
            <p  width="60px">${name}</p>
            <strong>${price} руб.</strong>
          </div>
          <button class="close-btn"><i class="fa-solid fa-xmark"></i></button>
        `;

        const closeBtn = orderCard.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
          orderCard.remove();
        });

        const plus = orderCard.querySelector('.plus');
        const minus = orderCard.querySelector('.minus');
        const countSpan = orderCard.querySelector('.count');

        plus.addEventListener('click', () => {
          countSpan.textContent = parseInt(countSpan.textContent) + 1;
        });

        minus.addEventListener('click', () => {
          let count = parseInt(countSpan.textContent);
          if (count > 1) {
            countSpan.textContent = count - 1;
          } else {
            orderCard.remove();
          }
        });

        cartContainer.appendChild(orderCard);
      });
  });
});
