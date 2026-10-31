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

const currency = new Intl.NumberFormat('hu-HU', { maximumFractionDigits: 0 });
const formatPrice = (value) => `${currency.format(value)} Ft`;

const cart = new Map();
const els = {
  navCount: document.getElementById('navCartCount'),
  cartCount: document.getElementById('cartCount'),
  cartEmpty: document.getElementById('cartEmpty'),
  cartBody: document.getElementById('cartBody'),
  cartStep: document.getElementById('cartStep'),
  cartList: document.getElementById('cartList'),
  goCheckout: document.getElementById('goCheckout'),
  backToCart: document.getElementById('backToCart'),
  checkoutTotal: document.getElementById('checkoutTotal'),
  subtotal: document.getElementById('cartSubtotal'),
  fee: document.getElementById('cartFee'),
  feeLabel: document.getElementById('feeLabel'),
  total: document.getElementById('cartTotal'),
  minHint: document.getElementById('minHint'),
  form: document.getElementById('checkoutForm'),
  cartPanel: document.querySelector('.cart'),
  done: document.getElementById('orderDone'),
  doneNumber: document.getElementById('doneNumber'),
  doneTotal: document.getElementById('doneTotal'),
  doneMode: document.getElementById('doneMode'),
  newOrder: document.getElementById('newOrder'),
  name: document.getElementById('checkoutName'),
  phone: document.getElementById('checkoutPhone'),
  address: document.getElementById('checkoutAddress'),
  addressField: document.getElementById('addressField'),
  note: document.getElementById('checkoutNote'),
  errorName: document.getElementById('errorName'),
  errorPhone: document.getElementById('errorPhone'),
  errorAddress: document.getElementById('errorAddress'),
  errorCart: document.getElementById('errorCart'),
  cartBar: document.getElementById('cartBar'),
  barCount: document.getElementById('barCount'),
  barTotal: document.getElementById('barTotal'),
  toast: document.getElementById('toast'),
  header: document.getElementById('siteHeader'),
  navToggle: document.getElementById('navToggle'),
  openState: document.getElementById('openState')
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

function renderCart() {
  const quantity = totalQuantity();
  const subtotal = cartSubtotal();
  const fee = deliveryFee(subtotal);
  const total = subtotal + fee;
  const delivery = orderMode() === 'delivery';

  els.navCount.textContent = quantity;
  els.cartCount.textContent = `${quantity} tétel`;
  els.barCount.textContent = `${quantity} tétel`;
  els.cartBar.querySelector('small').textContent = delivery && fee > 0 ? 'szállítással' : 'a kosárban';
  els.subtotal.textContent = formatPrice(subtotal);
  els.fee.textContent = formatPrice(fee);
  els.feeLabel.textContent = delivery ? 'Kiszállítás' : 'Elvitel';
  els.total.textContent = formatPrice(total);
  els.checkoutTotal.textContent = formatPrice(total);
  els.barTotal.textContent = formatPrice(total);

  const isEmpty = cart.size === 0;
  els.cartEmpty.hidden = !isEmpty;
  els.cartBody.hidden = isEmpty;
  els.cartBar.hidden = isEmpty;
  document.body.classList.toggle('has-cart-bar', !isEmpty);

  const belowMinimum = delivery && subtotal > 0 && subtotal < MIN_DELIVERY;
  els.minHint.hidden = !belowMinimum;
  els.goCheckout.disabled = delivery && subtotal < MIN_DELIVERY;

  els.addressField.hidden = !delivery;
  els.address.required = delivery;

  els.cartList.replaceChildren();
  cart.forEach((item, key) => {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.dataset.key = key;

    const name = document.createElement('p');
    name.className = 'cart-item-name';
    name.textContent = item.name;

    const meta = document.createElement('p');
    meta.className = 'cart-item-meta';
    meta.textContent = item.meta || '';

    const side = document.createElement('div');
    side.className = 'cart-item-side';

    const price = document.createElement('span');
    price.className = 'cart-item-price';
    price.textContent = formatPrice(item.price * item.qty);

    const qty = document.createElement('div');
    qty.className = 'qty-control';

    const dec = document.createElement('button');
    dec.type = 'button';
    dec.dataset.act = 'dec';
    dec.setAttribute('aria-label', `${item.name} – mennyiség csökkentése`);
    dec.textContent = '−';

    const value = document.createElement('span');
    value.className = 'qty-value';
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
    remove.className = 'cart-remove';
    remove.dataset.act = 'remove';
    remove.setAttribute('aria-label', `${item.name} törlése a kosárból`);
    remove.textContent = '×';

    li.append(name, meta, side, remove);
    els.cartList.append(li);
  });
}

function bumpBadge() {
  els.navCount.classList.remove('bump');
  void els.navCount.offsetWidth;
  els.navCount.classList.add('bump');
}

function populateExtras() {
  document.querySelectorAll('[data-extra]').forEach((select) => {
    EXTRAS.forEach((extra) => {
      const option = document.createElement('option');
      option.value = String(extra.price);
      option.textContent = extra.price > 0 ? `${extra.label} (+${formatPrice(extra.price)})` : extra.label;
      select.append(option);
    });
  });
}

function selectedPizzaPrice(dish) {
  const size = dish.querySelector('input:checked');
  const extra = dish.querySelector('[data-extra]');
  const base = size ? Number(size.dataset.price) : 0;
  const extraPrice = extra ? Number(extra.value) : 0;
  return base + extraPrice;
}

function refreshDishPrice(dish) {
  const priceEl = dish.querySelector('.dish-price');
  if (!priceEl) return;
  priceEl.textContent = formatPrice(selectedPizzaPrice(dish));
}

function setupMenu() {
  populateExtras();

  document.querySelectorAll('.dish-pizza').forEach((dish) => {
    refreshDishPrice(dish);
    dish.querySelectorAll('input[type="radio"]').forEach((input) => {
      input.addEventListener('change', () => refreshDishPrice(dish));
    });
    const extra = dish.querySelector('[data-extra]');
    if (extra) extra.addEventListener('change', () => refreshDishPrice(dish));
  });

  document.querySelectorAll('[data-add]').forEach((button) => {
    const dishName = button.closest('.dish').dataset.name;
    const buttonLabel = button.textContent;
    button.setAttribute('aria-label', `${dishName} – kosárba`);

    button.addEventListener('click', () => {
      const dish = button.closest('.dish');
      const isPizza = dish.classList.contains('dish-pizza');
      const name = dish.dataset.name;
      let meta = '';
      let price = Number(dish.dataset.price || 0);

      if (isPizza) {
        const size = dish.querySelector('input:checked');
        const sizeLabel = size ? `${size.value} cm` : '';
        price = selectedPizzaPrice(dish);
        const extra = dish.querySelector('[data-extra]');
        const extraPrice = extra ? Number(extra.value) : 0;
        const extraLabel = extra && extraPrice > 0 ? extra.selectedOptions[0].textContent.split(' (+')[0] : '';
        meta = [sizeLabel, extraLabel].filter(Boolean).join(' · ');
      }

      const key = `${name}|${meta}`;
      const existing = cart.get(key);
      if (existing) {
        existing.qty = Math.min(20, existing.qty + 1);
      } else {
        cart.set(key, { name, meta, price, qty: 1 });
      }

      renderCart();
      bumpBadge();
      showToast(`${name} – bekerült a kosárba.`);

      button.textContent = 'Hozzáadva ✓';
      button.classList.add('is-added');
      setTimeout(() => {
        button.textContent = buttonLabel;
        button.classList.remove('is-added');
      }, 1200);
    });
  });
}

function setupCartControls() {
  els.cartList.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-act]');
    if (!button) return;
    const item = button.closest('.cart-item');
    if (!item) return;
    const key = item.dataset.key;
    const entry = cart.get(key);
    if (!entry) return;

    if (button.dataset.act === 'inc') {
      entry.qty = Math.min(20, entry.qty + 1);
    } else if (button.dataset.act === 'dec') {
      entry.qty -= 1;
      if (entry.qty <= 0) cart.delete(key);
    } else if (button.dataset.act === 'remove') {
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

function clearErrors() {
  [
    ['name', els.errorName],
    ['phone', els.errorPhone],
    ['address', els.errorAddress]
  ].forEach(([field, errorEl]) => {
    errorEl.textContent = '';
    const input = els[field];
    input.removeAttribute('aria-invalid');
  });
  els.errorCart.textContent = '';
}

function setError(field, errorEl, message) {
  errorEl.textContent = message;
  els[field].setAttribute('aria-invalid', 'true');
}

function validateOrder() {
  clearErrors();
  const errors = [];
  const delivery = orderMode() === 'delivery';

  if (els.name.value.trim().length < 2) {
    setError('name', els.errorName, 'Add meg a neved.');
    errors.push(els.name);
  }

  const digits = els.phone.value.replace(/\D/g, '');
  if (digits.length < 9 || digits.length > 15) {
    setError('phone', els.errorPhone, 'Adj meg egy elérhető telefonszámot.');
    errors.push(els.phone);
  }

  if (delivery && els.address.value.trim().length < 6) {
    setError('address', els.errorAddress, 'Add meg a szállítási címet.');
    errors.push(els.address);
  }

  if (delivery && cartSubtotal() < MIN_DELIVERY) {
    els.errorCart.textContent = `A kiszállításhoz a minimum ${formatPrice(MIN_DELIVERY)}.`;
    errors.push(els.errorCart);
  }

  return errors;
}

function orderNumber() {
  const now = new Date();
  const stamp = String(now.getFullYear()).slice(2)
    + String(now.getMonth() + 1).padStart(2, '0')
    + String(now.getDate()).padStart(2, '0');
  const random = Math.floor(100 + Math.random() * 900);
  return `SK-${stamp}-${random}`;
}

function setupCheckout() {
  els.goCheckout.addEventListener('click', () => {
    if (cart.size === 0) return;
    els.cartStep.hidden = true;
    els.form.hidden = false;
    els.cartPanel.scrollTop = 0;
    els.name.focus();
  });

  els.backToCart.addEventListener('click', () => {
    els.form.hidden = true;
    els.cartStep.hidden = false;
    els.goCheckout.focus();
  });

  ['input', 'change'].forEach((eventName) => {
    els.form.addEventListener(eventName, (event) => {
      const field = event.target;
      if (field === els.name) els.errorName.textContent = '';
      if (field === els.phone) els.errorPhone.textContent = '';
      if (field === els.address) els.errorAddress.textContent = '';
      if (field.matches('input, select')) field.removeAttribute('aria-invalid');
      els.errorCart.textContent = '';
    });
  });

  els.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const errors = validateOrder();
    if (errors.length > 0) {
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
    els.done.hidden = false;
    els.done.querySelector('h4').setAttribute('tabindex', '-1');
    els.done.querySelector('h4').focus();
    els.cartPanel.classList.add('is-done');
    els.cartCount.textContent = 'Rögzítve';
    showToast('Demó: a rendelés nem került továbbításra.');
  });

  els.newOrder.addEventListener('click', () => {
    cart.clear();
    els.form.reset();
    document.querySelector('input[name="orderMode"][value="delivery"]').checked = true;
    clearErrors();
    els.cartPanel.classList.remove('is-done');
    els.done.hidden = true;
    els.form.hidden = true;
    els.cartStep.hidden = false;
    els.cartPanel.scrollTop = 0;
    renderCart();
    document.getElementById('etlap').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function setupFilters() {
  const buttons = document.querySelectorAll('.filter');
  const groups = document.querySelectorAll('.menu-group');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((other) => {
        other.classList.toggle('is-active', other === button);
        other.setAttribute('aria-pressed', String(other === button));
      });

      const filter = button.dataset.filter;
      document.querySelectorAll('.dish[data-cat]').forEach((dish) => {
        dish.hidden = filter !== 'all' && dish.dataset.cat !== filter;
      });

      groups.forEach((group) => {
        const visible = group.querySelectorAll('.dish:not([hidden])').length > 0;
        group.hidden = !visible;
      });
    });
  });
}

function setupNav() {
  const toggleLabel = els.navToggle.querySelector('.nav-toggle-label');

  const setNav = (isOpen) => {
    els.header.classList.toggle('is-open', isOpen);
    els.navToggle.setAttribute('aria-expanded', String(isOpen));
    toggleLabel.textContent = isOpen ? 'Bezárás' : 'Menü';
  };

  els.navToggle.addEventListener('click', () => {
    setNav(!els.header.classList.contains('is-open'));
  });

  document.querySelectorAll('#siteNav a').forEach((link) => {
    link.addEventListener('click', () => setNav(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setNav(false);
  });

  const onScroll = () => {
    els.header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function setupHours() {
  const now = new Date();
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const todayRow = document.querySelector(`.hours-list div[data-day="${day}"]`);
  if (todayRow) todayRow.classList.add('is-today');

  const [open, close] = HOURS[day];
  const isOpen = minutes >= open * 60 && minutes < close * 60;
  els.openState.dataset.state = isOpen ? 'open' : 'closed';
  els.openState.textContent = isOpen ? `most nyitva · ${close}:00-ig` : 'most zárva';
}

setupMenu();
setupCartControls();
setupCheckout();
setupFilters();
setupNav();
setupHours();
renderCart();
