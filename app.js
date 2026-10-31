const EXTRAS = [
  { label: 'Nincs plusz feltét', price: 0 },
  { label: 'Extra sajt', price: 450 },
  { label: 'Sonka', price: 550 },
  { label: 'Gomba', price: 450 },
  { label: 'Jalapeño', price: 350 },
  { label: 'Bacon', price: 590 }
];

const DELIVERY_FEE = 590;
const FREE_DELIVERY_FROM = 8000;
const MIN_DELIVERY = 3000;

const HOURS = {
  0: [16, 22],
  1: [11, 22],
  2: [11, 22],
  3: [11, 22],
  4: [11, 22],
  5: [11, 23],
  6: [11, 23]
};

const DAY_NAMES = ['vasárnap', 'hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat'];

const ICONS = {
  pizza: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M32 7 13 51c11 6 27 6 38 0L32 7Z"/><path d="M24 34c5 3 11 3 16 0"/><circle cx="29" cy="24" r="3"/><circle cx="38" cy="31" r="2.5"/><circle cx="31" cy="41" r="2.5"/></svg>',
  pasta: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 31h44c0 12-9 20-22 20S10 43 10 31Z"/><path d="M18 22c3-4 3-8 0-11M28 22c3-4 3-8 0-11M38 22c3-4 3-8 0-11M48 22c3-4 3-8 0-11"/></svg>',
  main: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 8v19M16 8v11a6 6 0 0 0 12 0V8M22 27v29"/><path d="M46 8c-4 3-6 8-6 14 0 3 2 5 5 5h3V8"/><path d="M46 27v29"/></svg>',
  salad: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M52 12C30 12 14 24 14 40c0 6 4 10 10 10 16 0 26-16 28-38Z"/><path d="M18 52c6-14 16-22 30-28"/></svg>',
  dessert: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 30h28l-4 20H22l-4-20Z"/><path d="M18 30c0-8 6-12 14-12s14 4 14 12"/><circle cx="32" cy="12" r="3"/></svg>',
  drink: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 12h24l-4 38H24L20 12Z"/><path d="M23 26h18"/><path d="M35 12l7-9"/></svg>'
};

const MENU = [
  {
    id: 'pizza',
    title: 'Pizzák',
    note: 'Kézzel nyújtott, gázkemencében sült',
    icon: 'pizza',
    foot: 'Gázkemence',
    items: [
      { name: 'Margherita', desc: 'paradicsom, mozzarella, bazsalikom', tags: ['Vega'], sizes: { 28: 2290, 42: 4690, 52: 6290 } },
      { name: 'Sonkás', desc: 'sonka, mozzarella, paradicsom', sizes: { 28: 2490, 42: 4990, 52: 6690 } },
      { name: 'Gyulai', desc: 'gyulai kolbász, lilahagyma, mozzarella', sizes: { 28: 2690, 42: 5390, 52: 7190 } },
      { name: 'Magyaros', desc: 'csípős paprika, bacon, sonka, mozzarella', tags: ['Csípős'], sizes: { 28: 2790, 42: 5590, 52: 7490 } },
      { name: 'Gombás', desc: 'gomba, mozzarella, paradicsom', tags: ['Vega'], sizes: { 28: 2490, 42: 4990, 52: 6690 } },
      { name: 'Skorpió', desc: 'csípős szalámi, jalapeño, pepperoni, mozzarella', tags: ['Ház ajánlata', 'Csípős'], featured: true, sizes: { 28: 2890, 42: 5790, 52: 7690 } },
      { name: 'Négy sajt', desc: 'mozzarella, gouda, parmezán, kék sajt', tags: ['Vega'], sizes: { 28: 2790, 42: 5590, 52: 7490 } },
      { name: 'Vegetáriánus', desc: 'gomba, paprika, kukorica, olívabogyó', tags: ['Vega'], sizes: { 28: 2690, 42: 5290, 52: 6990 } }
    ]
  },
  {
    id: 'pasta',
    title: 'Tészták',
    note: 'Olasz alapok, bőséges adagok',
    icon: 'pasta',
    foot: 'Friss tészta',
    items: [
      { name: 'Spagetti Bolognese', desc: 'darált marha, paradicsomos ragu, parmezán', price: 3200 },
      { name: 'Spagetti Carbonara', desc: 'bacon, tojás, tejszín, parmezán', price: 3400 },
      { name: 'Lasagne', desc: 'marharagu, besamel, sajt', price: 3600 },
      { name: 'Penne Arrabiata', desc: 'csípős paradicsom, fokhagyma, bazsalikom', tags: ['Vega', 'Csípős'], price: 3100 }
    ]
  },
  {
    id: 'main',
    title: 'Főételek',
    note: 'Rántva, roston, pörköltben',
    icon: 'main',
    foot: 'Bőséges adag',
    items: [
      { name: 'Rántott csirkemell', desc: 'sült burgonya, párolt rizs, savanyúság', price: 3400 },
      { name: 'Rántott sertéskaraj', desc: 'sült burgonya, párolt rizs, savanyúság', price: 3300 },
      { name: 'Rántott sajt', desc: '3 db, tartármártás, sült burgonya', tags: ['Vega'], price: 3000 },
      { name: 'Marhapörkölt galuskával', desc: 'savanyúsággal', price: 4400 },
      { name: 'Skorpió burger', desc: 'házi zsemle, marhahús, cheddar, sült burgonya', price: 3200 }
    ]
  },
  {
    id: 'salad',
    title: 'Saláták',
    note: 'Könnyebb fogások',
    icon: 'salad',
    foot: 'Friss alapanyag',
    items: [
      { name: 'Cézár saláta', desc: 'csirkemell, parmezán, kruton, cézár öntet', price: 3200 },
      { name: 'Kertész saláta', desc: 'idényzöldség, olívaolaj, citrom', tags: ['Vega'], price: 2100 }
    ]
  },
  {
    id: 'dessert',
    title: 'Desszertek',
    note: 'A végére egy édes',
    icon: 'dessert',
    foot: 'Házi készítés',
    items: [
      { name: 'Csokoládétorta', desc: 'sötét csokoládé, tejszín', price: 1500 },
      { name: 'Tiramisu', desc: 'mascarpone, kávé, kakaó', price: 1400 },
      { name: 'Palacsinta', desc: '2 db, kakaós vagy lekváros', tags: ['Vega'], price: 1200 }
    ]
  },
  {
    id: 'drink',
    title: 'Italok',
    note: 'Hideg és meleg',
    icon: 'drink',
    foot: 'Hidegen kínáljuk',
    items: [
      { name: 'Házi limonádé 0,5 l', desc: 'citrom, menta, szóda', price: 1200 },
      { name: 'Dreher világos 0,5 l', desc: 'csapolt', price: 1400 },
      { name: 'Coca-Cola 0,5 l', desc: 'üdítő', price: 800 },
      { name: 'Ásványvíz 0,5 l', desc: 'szénsavas vagy szénsavmentes', price: 600 },
      { name: 'Espresso', desc: 'frissen őrölt', price: 700 }
    ]
  }
];

const formatPrice = (value) => `${String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')} Ft`;

const extraOptions = EXTRAS.map((extra) => {
  const suffix = extra.price > 0 ? ` (+${formatPrice(extra.price)})` : '';
  return `<option value="${extra.price}" data-label="${extra.label}">${extra.label}${suffix}</option>`;
}).join('');

const cart = new Map();
let lastTrigger = null;
let closeTimer;

const els = {
  nav: document.getElementById('nav'),
  navToggle: document.getElementById('navToggle'),
  navMenu: document.getElementById('navMenu'),
  navCount: document.getElementById('navCount'),
  navCart: document.getElementById('navCart'),
  heroAdd: document.getElementById('heroAdd'),
  heroToday: document.getElementById('heroToday'),
  heroLabel: document.getElementById('heroLabel'),
  filters: document.getElementById('filters'),
  menuBody: document.getElementById('menuBody'),
  dock: document.getElementById('dock'),
  dockCount: document.getElementById('dockCount'),
  dockTotal: document.getElementById('dockTotal'),
  scrim: document.getElementById('scrim'),
  drawer: document.getElementById('drawer'),
  drawerClose: document.getElementById('drawerClose'),
  drawerTitle: document.getElementById('drawerTitle'),
  drawerScroll: document.getElementById('drawerScroll'),
  step1: document.getElementById('step1'),
  step2: document.getElementById('step2'),
  step3: document.getElementById('step3'),
  empty: document.getElementById('drawerEmpty'),
  emptyBrowse: document.getElementById('emptyBrowse'),
  cartContent: document.getElementById('cartContent'),
  cartList: document.getElementById('cartList'),
  cartSubtotal: document.getElementById('cartSubtotal'),
  cartFee: document.getElementById('cartFee'),
  feeLabel: document.getElementById('feeLabel'),
  cartTotal: document.getElementById('cartTotal'),
  minHint: document.getElementById('minHint'),
  toStep2: document.getElementById('toStep2'),
  toStep1: document.getElementById('toStep1'),
  checkoutTotal: document.getElementById('checkoutTotal'),
  fName: document.getElementById('fName'),
  fPhone: document.getElementById('fPhone'),
  fAddress: document.getElementById('fAddress'),
  addressField: document.getElementById('addressField'),
  errName: document.getElementById('errName'),
  errPhone: document.getElementById('errPhone'),
  errAddress: document.getElementById('errAddress'),
  errCart: document.getElementById('errCart'),
  doneNumber: document.getElementById('doneNumber'),
  doneTotal: document.getElementById('doneTotal'),
  doneMode: document.getElementById('doneMode'),
  newOrder: document.getElementById('newOrder'),
  doneClose: document.getElementById('doneClose'),
  openState: document.getElementById('openState'),
  openState2: document.getElementById('openState2'),
  todayHours: document.getElementById('todayHours'),
  todayName: document.getElementById('todayName'),
  toast: document.getElementById('toast')
};

let toastTimer;

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove('is-visible'), 2600);
}

function orderMode() {
  const checked = document.querySelector('input[name="orderMode"]:checked');
  return checked ? checked.value : 'delivery';
}

function cartSubtotal() {
  let sum = 0;
  cart.forEach((item) => {
    sum += item.price * item.qty;
  });
  return sum;
}

function deliveryFee(subtotal) {
  if (orderMode() === 'pickup') return 0;
  if (subtotal === 0) return DELIVERY_FEE;
  return subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
}

function totalQuantity() {
  let quantity = 0;
  cart.forEach((item) => {
    quantity += item.qty;
  });
  return quantity;
}

function renderMenu() {
  els.filters.innerHTML = [{ id: 'all', title: 'Mind' }, ...MENU.map((group) => ({ id: group.id, title: group.title }))]
    .map((group, index) => {
      const count = group.id === 'all'
        ? MENU.reduce((sum, entry) => sum + entry.items.length, 0)
        : MENU.find((entry) => entry.id === group.id).items.length;
      return `<button class="chip${index === 0 ? ' is-active' : ''}" type="button" data-filter="${group.id}" aria-pressed="${index === 0}">${group.title}<span>${count}</span></button>`;
    })
    .join('');

  els.menuBody.innerHTML = MENU.map((group, groupIndex) => {
    const items = group.items.map((item, itemIndex) => {
      const isPizza = Boolean(item.sizes);
      const tone = (groupIndex * 2 + itemIndex) % 6;
      const basePrice = isPizza ? item.sizes[28] : item.price;
      const tags = (item.tags || [])
        .map((tag) => `<span class="tag${tag === 'Ház ajánlata' ? ' tag-amber' : ''}">${tag}</span>`)
        .join('');
      const sizeChips = isPizza ? `
        <fieldset class="size-chips" aria-label="Méret – ${item.name}">
          ${Object.entries(item.sizes).map(([size, price]) => `
            <label>
              <input type="radio" name="size-${groupIndex}-${itemIndex}" value="${size}" data-price="${price}" ${size === '28' ? 'checked' : ''}>
              <span>${size}<small>cm</small></span>
            </label>`).join('')}
        </fieldset>
        <label class="extra-row">
          <span>Plusz feltét</span>
          <select data-extra>${extraOptions}</select>
        </label>` : '';

      return `
        <article class="dish" data-cat="${group.id}" data-name="${item.name}" ${isPizza ? '' : `data-price="${item.price}"`}>
          <div class="dish-media tone-${tone}">
            ${ICONS[group.icon]}
            <span class="dish-no">${String(itemIndex + 1).padStart(2, '0')}</span>
            ${tags ? `<div class="dish-tags">${tags}</div>` : ''}
          </div>
          <div class="dish-body">
            <div class="dish-title">
              <h4>${item.name}</h4>
              <span class="dish-price" data-price-label>${formatPrice(basePrice)}</span>
            </div>
            <p class="dish-desc">${item.desc}</p>
            ${sizeChips}
            <div class="dish-foot">
              <span class="dish-foot-note">${group.foot}</span>
              <button class="add-btn" type="button" data-add aria-label="${item.name} – kosárba"><span class="plus" aria-hidden="true">+</span>Kosárba</button>
            </div>
          </div>
        </article>`;
    }).join('');

    return `
      <section class="menu-group" data-group="${group.id}" data-reveal aria-labelledby="group-${group.id}">
        <div class="group-head">
          <h3 id="group-${group.id}"><span>${String(groupIndex + 1).padStart(2, '0')}</span>${group.title}</h3>
          <p>${group.note}</p>
        </div>
        <div class="dish-grid">${items}</div>
      </section>`;
  }).join('');

  els.menuBody.querySelectorAll('.dish').forEach((dish) => {
    const sizeInputs = dish.querySelectorAll('.size-chips input');
    const extraSelect = dish.querySelector('[data-extra]');
    const priceLabel = dish.querySelector('[data-price-label]');
    if (!sizeInputs.length || !priceLabel) return;

    const update = () => {
      const size = dish.querySelector('.size-chips input:checked');
      const extraPrice = extraSelect ? Number(extraSelect.value) : 0;
      priceLabel.textContent = formatPrice(Number(size.dataset.price) + extraPrice);
    };

    sizeInputs.forEach((input) => input.addEventListener('change', update));
    if (extraSelect) extraSelect.addEventListener('change', update);
    update();
  });
}

function setupFilters() {
  els.filters.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-filter]');
    if (!chip) return;

    els.filters.querySelectorAll('.chip').forEach((other) => {
      other.classList.toggle('is-active', other === chip);
      other.setAttribute('aria-pressed', String(other === chip));
    });

    const filter = chip.dataset.filter;
    els.menuBody.querySelectorAll('.menu-group').forEach((group) => {
      group.hidden = filter !== 'all' && group.dataset.group !== filter;
    });
  });
}

function addToCart(name, meta, price) {
  const key = `${name}|${meta}`;
  const existing = cart.get(key);
  if (existing) {
    existing.qty = Math.min(20, existing.qty + 1);
  } else {
    cart.set(key, { name, meta, price, qty: 1 });
  }

  renderCart();
  els.navCount.classList.remove('bump');
  void els.navCount.offsetWidth;
  els.navCount.classList.add('bump');
  showToast(`${name} – bekerült a kosárba.`);
}

function setupMenu() {
  els.menuBody.addEventListener('click', (event) => {
    const button = event.target.closest('[data-add]');
    if (!button) return;
    const dish = button.closest('.dish');
    const name = dish.dataset.name;
    let meta = '';
    let price = Number(dish.dataset.price || 0);

    if (dish.dataset.cat === 'pizza') {
      const size = dish.querySelector('.size-chips input:checked');
      const extra = dish.querySelector('[data-extra]');
      const extraPrice = extra ? Number(extra.value) : 0;
      const extraLabel = extra && extraPrice > 0 ? extra.selectedOptions[0].dataset.label : '';
      price = Number(size.dataset.price) + extraPrice;
      meta = [`${size.value} cm`, extraLabel].filter(Boolean).join(' · ');
    }

    addToCart(name, meta, price);

    button.classList.add('is-added');
    button.innerHTML = '<span class="plus" aria-hidden="true">✓</span>Hozzáadva';
    setTimeout(() => {
      button.innerHTML = '<span class="plus" aria-hidden="true">+</span>Kosárba';
      button.classList.remove('is-added');
    }, 1200);
  });

  els.heroAdd.addEventListener('click', () => {
    addToCart('Skorpió', '42 cm', 5790);
    els.heroAdd.classList.add('is-added');
    setTimeout(() => els.heroAdd.classList.remove('is-added'), 1200);
  });
}

function renderCart() {
  const quantity = totalQuantity();
  const subtotal = cartSubtotal();
  const fee = deliveryFee(subtotal);
  const total = subtotal + fee;
  const delivery = orderMode() === 'delivery';
  const isEmpty = cart.size === 0;

  els.navCount.textContent = quantity;
  els.navCart.setAttribute('aria-label', `Kosár megnyitása – ${quantity} tétel, ${formatPrice(total)}`);
  els.dockCount.textContent = quantity;
  els.dockTotal.textContent = formatPrice(total);
  els.dock.hidden = isEmpty;
  document.body.classList.toggle('has-dock', !isEmpty);
  els.dock.setAttribute('aria-label', `Kosár megnyitása – ${quantity} tétel, ${formatPrice(total)}`);

  els.cartSubtotal.textContent = formatPrice(subtotal);
  els.cartFee.textContent = formatPrice(fee);
  els.feeLabel.textContent = delivery ? 'Kiszállítás' : 'Elvitel';
  els.cartTotal.textContent = formatPrice(total);
  els.checkoutTotal.textContent = formatPrice(total);

  els.empty.hidden = !isEmpty;
  els.cartContent.hidden = isEmpty;

  const belowMinimum = delivery && subtotal > 0 && subtotal < MIN_DELIVERY;
  els.minHint.hidden = !belowMinimum;
  els.toStep2.disabled = delivery && subtotal < MIN_DELIVERY;

  els.addressField.hidden = !delivery;
  els.fAddress.required = delivery;

  els.cartList.replaceChildren();
  cart.forEach((item, key) => {
    const li = document.createElement('li');
    li.className = 'd-item';
    li.dataset.key = key;

    const name = document.createElement('p');
    name.className = 'd-name';
    name.textContent = item.name;

    const meta = document.createElement('p');
    meta.className = 'd-meta';
    meta.textContent = item.meta || '';

    const side = document.createElement('div');
    side.className = 'd-side';

    const price = document.createElement('span');
    price.className = 'd-price';
    price.textContent = formatPrice(item.price * item.qty);

    const qty = document.createElement('div');
    qty.className = 'qty';

    const dec = document.createElement('button');
    dec.type = 'button';
    dec.dataset.act = 'dec';
    dec.setAttribute('aria-label', `${item.name} – mennyiség csökkentése`);
    dec.textContent = '−';

    const value = document.createElement('span');
    value.textContent = item.qty;

    const inc = document.createElement('button');
    inc.type = 'button';
    inc.dataset.act = 'inc';
    inc.setAttribute('aria-label', `${item.name} – mennyiség növelése`);
    inc.textContent = '+';

    qty.append(dec, value, inc);
    side.append(price, qty);

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'd-remove';
    remove.dataset.act = 'remove';
    remove.setAttribute('aria-label', `${item.name} törlése a kosárból`);
    remove.textContent = '×';

    li.append(name, meta, side, remove);
    els.cartList.append(li);
  });
}

function setupCartList() {
  els.cartList.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-act]');
    if (!button) return;
    const item = button.closest('.d-item');
    const key = item.dataset.key;
    const entry = cart.get(key);
    if (!entry) return;

    if (button.dataset.act === 'inc') {
      entry.qty = Math.min(20, entry.qty + 1);
    } else if (button.dataset.act === 'dec') {
      entry.qty -= 1;
      if (entry.qty <= 0) cart.delete(key);
    } else {
      cart.delete(key);
    }

    renderCart();
  });

  document.querySelectorAll('input[name="orderMode"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      renderCart();
      clearErrors();
    });
  });
}

const stepDots = Array.from(document.querySelectorAll('[data-step-dot]'));

function setStep(step) {
  els.step1.hidden = step !== 1;
  els.step2.hidden = step !== 2;
  els.step3.hidden = step !== 3;
  els.drawerTitle.textContent = step === 1 ? 'A kosár' : step === 2 ? 'Adatok' : 'Kész';
  stepDots.forEach((dot) => {
    const value = Number(dot.dataset.stepDot);
    dot.classList.toggle('is-active', value === step);
    dot.classList.toggle('is-done', value < step);
  });
  els.drawerScroll.scrollTop = 0;
}

function focusables() {
  return Array.from(els.drawer.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'))
    .filter((el) => el.getClientRects().length > 0);
}

function openDrawer(trigger) {
  lastTrigger = trigger || document.activeElement;
  if (cart.size === 0 && !els.step3.hidden) setStep(1);
  clearTimeout(closeTimer);
  els.drawer.hidden = false;
  els.scrim.hidden = false;
  document.body.classList.add('is-locked', 'drawer-open');
  requestAnimationFrame(() => {
    els.drawer.classList.add('is-open');
    els.scrim.classList.add('is-open');
  });
  setTimeout(() => els.drawerClose.focus(), 60);
}

function closeDrawer() {
  els.drawer.classList.remove('is-open');
  els.scrim.classList.remove('is-open');
  document.body.classList.remove('is-locked', 'drawer-open');
  closeTimer = setTimeout(() => {
    els.drawer.hidden = true;
    els.scrim.hidden = true;
    const target = lastTrigger && lastTrigger.getClientRects().length
      ? lastTrigger
      : document.querySelector('.cart-btn');
    if (target && typeof target.focus === 'function') target.focus();
  }, 340);
}

function setupDrawer() {
  document.querySelectorAll('[data-open-cart]').forEach((button) => {
    button.addEventListener('click', () => openDrawer(button));
  });

  els.dock.addEventListener('click', () => openDrawer(els.dock));
  els.drawerClose.addEventListener('click', closeDrawer);
  els.scrim.addEventListener('click', closeDrawer);
  els.doneClose.addEventListener('click', closeDrawer);

  els.emptyBrowse.addEventListener('click', () => {
    closeDrawer();
    document.getElementById('etlap').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  els.toStep2.addEventListener('click', () => {
    if (cart.size === 0) return;
    setStep(2);
    els.fName.focus();
  });

  els.toStep1.addEventListener('click', () => {
    setStep(1);
    els.toStep2.focus();
  });

  document.addEventListener('keydown', (event) => {
    if (els.drawer.hidden) return;
    if (event.key === 'Escape') {
      closeDrawer();
      return;
    }
    if (event.key === 'Tab') {
      const list = focusables();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (!els.drawer.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}

function clearErrors() {
  [els.errName, els.errPhone, els.errAddress, els.errCart].forEach((el) => {
    el.textContent = '';
  });
  [els.fName, els.fPhone, els.fAddress].forEach((input) => input.removeAttribute('aria-invalid'));
}

function setError(input, target, message) {
  target.textContent = message;
  input.setAttribute('aria-invalid', 'true');
}

function orderNumber() {
  const now = new Date();
  const stamp = String(now.getFullYear()).slice(2)
    + String(now.getMonth() + 1).padStart(2, '0')
    + String(now.getDate()).padStart(2, '0');
  const random = Math.floor(100 + Math.random() * 900);
  return `SK-${stamp}-${random}`;
}

function validate() {
  clearErrors();
  const errors = [];
  const delivery = orderMode() === 'delivery';

  if (els.fName.value.trim().length < 2) {
    setError(els.fName, els.errName, 'Add meg a neved.');
    errors.push(els.fName);
  }

  const digits = els.fPhone.value.replace(/\D/g, '');
  if (digits.length < 9 || digits.length > 15) {
    setError(els.fPhone, els.errPhone, 'Adj meg egy elérhető telefonszámot.');
    errors.push(els.fPhone);
  }

  if (delivery && els.fAddress.value.trim().length < 6) {
    setError(els.fAddress, els.errAddress, 'Add meg a szállítási címet.');
    errors.push(els.fAddress);
  }

  if (delivery && cartSubtotal() < MIN_DELIVERY) {
    els.errCart.textContent = `A kiszállításhoz a minimum ${formatPrice(MIN_DELIVERY)}.`;
    errors.push(els.errCart);
  }

  return errors;
}

function setupCheckout() {
  els.step2.addEventListener('input', (event) => {
    const field = event.target;
    if (field === els.fName) els.errName.textContent = '';
    if (field === els.fPhone) els.errPhone.textContent = '';
    if (field === els.fAddress) els.errAddress.textContent = '';
    if (field.matches('input')) field.removeAttribute('aria-invalid');
    els.errCart.textContent = '';
  });

  els.step2.addEventListener('submit', (event) => {
    event.preventDefault();
    const errors = validate();
    if (errors.length) {
      errors[0].focus();
      return;
    }

    const mode = orderMode();
    const payment = document.querySelector('input[name="payment"]:checked');
    const paymentLabel = payment && payment.value === 'card' ? 'kártya' : 'készpénz';
    const total = cartSubtotal() + deliveryFee(cartSubtotal());

    els.doneNumber.textContent = orderNumber();
    els.doneTotal.textContent = formatPrice(total);
    els.doneMode.textContent = `${mode === 'delivery' ? 'Kiszállítás' : 'Elvitel'} · ${paymentLabel}`;
    setStep(3);
    els.step3.querySelector('h3').setAttribute('tabindex', '-1');
    els.step3.querySelector('h3').focus();

    cart.clear();
    renderCart();
    showToast('Demó: a rendelés nem került továbbításra.');
  });

  els.newOrder.addEventListener('click', () => {
    cart.clear();
    els.step2.reset();
    document.querySelector('input[name="orderMode"][value="delivery"]').checked = true;
    clearErrors();
    setStep(1);
    renderCart();
    closeDrawer();
    document.getElementById('etlap').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function setupNavigation() {
  const closeNav = () => {
    els.nav.classList.remove('is-open');
    els.navToggle.setAttribute('aria-expanded', 'false');
    els.navToggle.setAttribute('aria-label', 'Menü megnyitása');
    els.navMenu.hidden = true;
  };

  els.navToggle.addEventListener('click', () => {
    const open = !els.nav.classList.contains('is-open');
    els.nav.classList.toggle('is-open', open);
    els.navToggle.setAttribute('aria-expanded', String(open));
    els.navToggle.setAttribute('aria-label', open ? 'Menü bezárása' : 'Menü megnyitása');
    els.navMenu.hidden = !open;
  });

  els.navMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));

  document.addEventListener('click', (event) => {
    if (!els.nav.classList.contains('is-open')) return;
    if (!els.nav.contains(event.target)) closeNav();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });

  const onScroll = () => els.nav.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function setupHours() {
  const now = new Date();
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const [open, close] = HOURS[day];
  const isOpen = minutes >= open * 60 && minutes < close * 60;
  const range = `${open}:00–${close}:00`;

  els.todayHours.textContent = range;
  els.todayName.textContent = `${DAY_NAMES[day]} · ${isOpen ? 'most nyitva' : 'most zárva'}`;
  els.heroToday.textContent = range;
  els.heroLabel.textContent = isOpen ? 'Ma nyitva' : 'Ma zárva';
  document.getElementById('heroFloatToday').textContent = `Ma ${range}`;

  [els.openState, els.openState2].forEach((pill) => {
    pill.dataset.state = isOpen ? 'open' : 'closed';
    pill.textContent = isOpen ? `Nyitva · ${close}:00-ig` : 'Zárva';
  });

  document.querySelectorAll(`.hours-list div[data-day="${day}"]`).forEach((row) => row.classList.add('is-today'));
}

function setupSpotlight() {
  document.querySelectorAll('.spot').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
}

function setupTilt() {
  const card = document.getElementById('heroCard');
  if (!card) return;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || reduced) return;

  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
}

function setupReveals() {
  const items = Array.from(document.querySelectorAll('[data-reveal]'));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-in'));
    return;
  }

  items.forEach((item, index) => {
    item.style.setProperty('--delay', `${Math.min(index % 4, 3) * 70}ms`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  items.forEach((item) => observer.observe(item));
}

function setupCounters() {
  const targets = Array.from(document.querySelectorAll('[data-count]'));
  if (!targets.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const run = (el) => {
    const end = Number(el.dataset.count);
    const decimals = Number(el.dataset.decimals || 0);
    const formatter = new Intl.NumberFormat('hu-HU', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
    if (reduced) {
      el.textContent = formatter.format(end);
      return;
    }
    const duration = 1300;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatter.format(end * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (!('IntersectionObserver' in window)) {
    targets.forEach(run);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      run(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  targets.forEach((el) => observer.observe(el));
}

renderMenu();
setupFilters();
setupMenu();
setupCartList();
setupDrawer();
setupCheckout();
setupNavigation();
setupHours();
setupSpotlight();
setupTilt();
renderCart();
setupReveals();
setupCounters();
