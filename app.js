// get only unique categories - HARDEST ONE
// iterate over categories return buttons
// make sure to select buttons when they are available
// 새로운 카테고리의 메뉴 데이터가 추가될 때마다 해당 카테고리도 선택할 수 있는 버튼이 새로 생성될 수 있어야겠지
// 그러려면, menu데이터, 즉 원래 데이터에 무슨 카테고리가 있느냐에 따라 버튼도 그에 맞춰서 새롭게 생성될 수 있도록 해야 함.

'use strict';
// items
// 원래는 외부에서 이런 데이터를 가져오는 거지만 ajax같은 걸 배우는 수업이 아니니까 일단 js에 데이터를 저장해놓았다고 함.
const menu = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "./images/item-1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "./images/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "./images/item-3.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "country delight",
    category: "breakfast",
    price: 20.99,
    img: "./images/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "./images/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "./images/item-6.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "bacon overflow",
    category: "breakfast",
    price: 8.99,
    img: "./images/item-7.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "./images/item-8.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "quarantine buddy",
    category: "shakes",
    price: 16.99,
    img: "./images/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
  {
    id: 10,
    title: "steak dinner",
    category: "dinner",
    price: 39.99,
    img: "./images/item-10.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
];

// DOM content가 load되면 menu array에서 데이터를 가져와서 menu-item들이 화면에 전부 보여지도록 할 예정 
// 그러려면 우선 menu-item들의 공통 부모노드인 .section-center에 접근해야 함.
const sectionCenter = document.querySelector('.section-center');
const btnContainer = document.querySelector('.btn-container');

// load items
// DOMContentLoaded 이벤트는 초기 HTML 문서를 완전히 불러오고 분석했을 때 발생함.
window.addEventListener('DOMContentLoaded', function(){
  // 이 블록안에 있던 내용을 따로 함수로 정리해서 그걸 다시 블록 안으로 가져와서 호출한 것임.
  displayMenuItems(menu);
  displayMenuButtons();
});

// 원래 window.addEventListener()의 콜백함수 블록안에 있던 것을 가져와서 display해주는 전용 함수를 따로 정리해버림.
// 즉, array를 받으면 거기에 있는 데이터를 html string으로 반환해서 .section-center 안에 집어넣는 함수로 따로 만든거임.
// 이걸 왜 하냐면, 버튼 클릭 시 filtering하는 함수를 따로 setting해야 하고, filter된 결과값을 display해주려면
// 또 그걸 display하는 함수를 만들기 귀찮으니까, 아예 display를 전용으로 해주는 함수로 정리해서 재사용하려는 것.
function displayMenuItems(menuItems){
  // forEach() vs map()
  // forEach는 주어진 함수를 배열 요소 각각에 대해 '실행만' 함.
  // map은 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 '새로운 배열을 반환' 함.
  let displayMenu = menuItems.map(function(item){
    // console.log(item);

    // 이런식으로 데이터를 가지고 HTML 요소를 만들어서 새로운 배열로 return하려면
    // `` 백틱 스트링과 ${} template literals를 활용해서 html 요소로 된 string을 만들고
    // 이것을 map()을 이용해 새로운 배열을 반환하여 기존 html구조에 추가할 수 있는 string으로 된 html 데이터 배열이 만들어짐.
    return `<article class="menu-item">
    <img src="${item.img}" class="photo" alt="${item.title}">
    <div class="item-info">
      <header>
        <h4>${item.title}</h4>
        <h4 class="price">${item.price}</h4>
      </header>
      <p class="item-text">
        ${item.desc}
      </p>
    </div>
  </article>`;
  });

  // join() 메소드를 활용하여 displayMenu에 있는 html string 형태의 모든 요소를 연결해서 하나의 문자열로 만들어버림.
  // 이 때 '' 문자열이 리턴됬을때 배열의 각 요소를 구분할 separator를 지정해야 함. 
  // separator를 아무것도 넣지 않으면 기본값, 즉 '쉼표'로 구분이 되잖아. 근데 html 문서 작성할 때 쉼표는 안들어가지?
  // 그렇기 때문에 '' 빈 문자열을 넣어서 모든 요소들 사이에 아무 문자도 없이 연결될 수 있도록 한거임.  
  displayMenu = displayMenu.join('');
  // console.log(displayMenu);
  sectionCenter.innerHTML = displayMenu;
}

function displayMenuButtons(){
  // map()으로 하는것보다는, unigue한, 각각의 카테고리별로 하나씩 데이터를 받아서 배열로 return받고 싶은거야.
  // 이럴 때 사용하는 게 reduce()라는데 어렵다고 함.
  const categories = menu.reduce(function(values, item){
    if(!values.includes(item.category)){
      values.push(item.category);
    }
    return values;
  }, ['all']);
  /**
   * menu.reduce(function(values, item){}, ['all']); 
   * 지금 여기서 무슨 일이 일어난건지 정리! 
   * 
   * 그니까, reduce는 본질적으로 '콜백함수의 결과값을 return받아 누적하는 함수'임.
   * 
   * 1. values는 menu의 모든 요소들에 콜백을 호출한 결과값이 누적되는 누산기(accumulator)
   * 2. item은 다른 배열 메소드처럼 콜백함수를 호출하게 되는 배열의 모든 요소들(currentValue)
   * 3. ['all']은 최초의 누산값. 이 값에서부터 누적을 시작한다는 뜻(initialValue). menu.category에 all이라는 값은 없으니까 초기값은 all로 주는게 맞겠지.
   * 
   * 콜백 함수의 블록 안에서 발생한 상황
   * 1. if 조건문에서 현재 요소의 카테고리 값이(item.category) 누산된 배열(values)에 포함되어 있는지 체크함.
   * 그니까, 이미 똑같은 카테고리 이름이 ['all']에서부터 시작한 누산된 배열(values)에 누산되어 있는지, 중복되어 있는지 확인하는거임.
   * 2. 그래서 없다? 즉, !value.includes()가 true면 블록 안의 내용을 실행하는데 그게 뭐야?
   * 누산된 배열 values에 현재 요소의 카테고리 값(item.category)를 배열의 끝부분에 push하라는 거지.
   * 3. 그리고 블록의 마지막에서 누산된 배열 values를 return하는거야.
   * 
   * 이 콜백함수 블록안에 있는 내용을 menu 배열에 모든 요소들에 반복 실행하는거지.
   * 그래서 중복값이 없으면 해당 item.category를 누산된 배열에 집어넣고,
   * 없으면 그냥 push하지 않고 원래의 누산값 values를 return해버리라는 거야.
   * 
   * 이 결과로 unique categories로 이루어진 배열을 반환받아서 const categories에 할당한다는 뜻이야! 
   */
  // console.log(categories);

  // 여기서는 unique categories가 있는 categories를 map()을 이용해 버튼을 만드는 html string들을 각각의 categories마다 생성함.
  const categoryBtns = categories.map(function(category){
    return `<button class="filter-btn" type="button" data-id=${category}>${category}</button>`
  }).join('');
  // console.log(categoryBtns);
  btnContainer.innerHTML = categoryBtns;
  const filterBtns = document.querySelectorAll('.filter-btn');

  // filter items
  // 버튼이 여러개인 경우, 해당 버튼들을 모두 array로 담은 뒤에 forEach 메소드로 각각의 버튼들에 대해 이벤트를 걸면 됨. 
  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(e){
      /**
       * HTMLElement.dataset 읽기 전용 속성은 요소의 사용자 지정 데이터 특성(data-*)에 대한 
       * 읽기와 쓰기 접근 방법을 HTML과 DOM 양측에 제공함.
       * 
       * 그래서 해당 html요소에 'data-' 라는 '사용자 지정 데이터 특성'을 지정하면 해당 데이터를 html과 DOM 사이에서 교환 가능.
       * <element data-keyname="value"> 요런 식으로 html의 해당 요소에 써놓았다면,
       * dataset으로 접근했을때 {key: value}처럼 하나의 오브젝트 형태의 데이터를 확인할 수 있음.
       * 여기서 key와 value는 모두 임의로 지정할 수 있음.
       * 
       * 중요한 건, HTML에서는 data- 으로 지정하고, js에서는 dataset(또는 dataset.key)으로 접근한다는 것! 이것만 기억하면 됨.
       */
      // console.log(e.currentTarget.dataset.id);
      const category = e.currentTarget.dataset.id;
      // filter() 메서드는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환함.
      // 그니까, menu array의 모든 요소중에서 category에 해당하는 item들만 모아서 새로운 배열로 반환하려고 사용하는거임. 
      // 그래서 블록 안의 조건문을 통과하는 애들만 return해서 모아서 새로운 배열로 반환한다는 뜻!
      const menuCategory = menu.filter(function(menuItem){
        // console.log(menuItem.category);
        if(menuItem.category === category){
          return menuItem;
        }
      });
      // console.log(menuCategory);
      // 요거는 menuItem.category 중에서 값이 'all'인 애들이 없으니까, all 버튼을 클릭했을 때
      // menu array 전체를 filter 거치지 않고 바로 displayMenuItems로 바로 보여주면 되겠지
      if(category === 'all'){
        displayMenuItems(menu);
      }
      else{ 
        // 이거는 category가 all이 아닌 경우 즉, breakfast, lunch, shakes중에 하나라면 menuCategory에
        // filter된 array들이 return되서 할당되어있을 것이므로 그거를 가져와서 displayMenuItems를 호출한다는 뜻.
        displayMenuItems(menuCategory);
      }
    });
  })
}
