const KlaviyoReady = () => {
  const klaviyoImages = document.querySelectorAll(".needsclick img");

  klaviyoImages.forEach(img => {
    if (img.alt) {
      // console.log("have alt!");
    } else {
      img.setAttribute("alt", "ADA Alt Text")
    }
  })

  const btnModal = document.querySelector('.kl-teaser-Uwk4Dp');
  if (btnModal && btnModal.parentNode.tagName !== 'NAV') {
    const navTag = document.createElement("nav");
    navTag.style.height = '64px';
    btnModal.parentNode.insertBefore(navTag, btnModal);
    navTag.appendChild(btnModal);
  }

  const btn_bottom = document.querySelectorAll("nav .needsclick");
  btn_bottom[0]?.removeAttribute("tabindex");
  btn_bottom[0]?.removeAttribute("role");

  const btn_text = document.querySelector(".tp-content .tp-body");
  if (btn_text) {
    btn_text.style.color = '#555';
  }
}

const setESQuantityRadios = widget => {
  const esQuantityRadios = document.querySelector(".es-quantity-radios");
  const div = document.createElement("div");
  div.classList.add("es-quantity-radios__body");

  if (esQuantityRadios) {
    var trs = widget.querySelectorAll("tbody tr");

    var qtys = [];
    var prices = [];
    var discounts = [];

    trs?.forEach(tr => {
      qtys.push(tr.querySelectorAll("td")[0].textContent);
      prices.push(tr.querySelectorAll("td")[1].textContent);
    });

    qtys?.forEach((qty, index) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      const custom_input = document.createElement("span");
      const span_qty = document.createElement("span");
      const span_price = document.createElement("span");

      span_qty.classList.add("es-quantity-radios__pty");
      span_price.classList.add("es-quantity-radios__price");
      custom_input.classList.add("es-quantity-radios__custom-input");

      input.setAttribute("type", "radio");
      input.setAttribute("name", "ESQuantityRadios");
      label.setAttribute("data-quantity", qty);
      input.setAttribute("value", qty);

      if (index == 1) {
        input.setAttribute("checked", "checked");
      }

      span_qty.textContent = qty + "+";
      span_price.textContent = prices[index];

      label.append(input);
      label.append(custom_input);
      label.append(span_qty);
      label.append(span_price);
      div.append(label);

      input.addEventListener("change", function () {
        document.querySelector(".product .product-form__quantity .quantity__input").value = this.value;

        const each_price = document.querySelector(".es-quantity-radios .es-quantity-radios__body")?.childNodes;
        each_price?.forEach((item) => {
          const regex = /([0-9][0-9\.]*)/;
          const check_value = item.children[2].innerHTML;
          const check = check_value.match(regex);
          if (check[0] == this.value) {
            const money_price = item.children[3].innerHTML;
            const change_price = money_price.match(regex)[0]
            const total_price = parseFloat(this.value) * parseFloat(change_price);
            // document.querySelector(".product .product-form__quantity .ui-total-price").children[1].innerHTML = '$' + total_price.toFixed(2) + " USD";
          }
        })
      })
    });

    esQuantityRadios.append(div);
  }
}

const observer = new MutationObserver((mutations, obs) => {
  const KlaviyoImage = document.querySelector('.needsclick img');
  var flag = 0;

  if (KlaviyoImage) {
    KlaviyoReady();
    flag += 1;
  }

  const moneyTemplateTable = document.querySelector("#bold_qb_grid .money-template table");
  if (moneyTemplateTable) {
    setESQuantityRadios(moneyTemplateTable);
    flag += 1;
  }

  if (flag == 2) {
    obs.disconnect();
  }

});

observer.observe(document.body, { childList: true, subtree: true });

document.querySelector('.product-form__input .quantity input[name="quantity"]')?.addEventListener('change', function () {
  const Basic_value = this.value;
  const regex = /([0-9][0-9\.]*)/;
  const each_price = document.querySelector(".es-quantity-radios .es-quantity-radios__body")?.childNodes;

  if (each_price) {
    const val_arr = []
    each_price?.forEach((item, index) => {
      const count_thing = item.children[2].innerHTML;
      const thing_money = item.children[3].innerHTML;
      const val1 = count_thing.match(regex)[0];
      const val2 = thing_money.match(regex)[0];
      val_arr.push({
        val1: val1,
        val2: val2
      })
    })
    val_arr.push({
      val1: val_arr[length - 1].val1 * 1e30,
      val2: val_arr[length - 1].val2
    });

    each_price.forEach((item, index) => {
      const value = item.children[0];

      if (parseFloat(Basic_value) < parseFloat(val_arr[index + 1]?.val1) && parseFloat(Basic_value) >= parseFloat(val_arr[index].val1)) {
        const price = parseFloat(val_arr[index].val2) * Basic_value;
        // document.querySelector(".product .product-form__quantity .ui-total-price").children[1].innerHTML = '$' + price.toFixed(2) + " USD";
      }
      if (parseFloat(Basic_value) < parseFloat(val_arr[index + 1]?.val1) && parseFloat(Basic_value) >= parseFloat(val_arr[index].val1)) {
        value.checked = true;
      }
      else {
        value.checked = false;
      }
    })
  }
});

document.querySelector('.product-form__input .quantity input[name="quantity"]')?.addEventListener('input', function () {
  const Basic_value = this.value;
  const regex = /([0-9][0-9\.]*)/;
  const each_price = document.querySelector(".es-quantity-radios .es-quantity-radios__body")?.childNodes;

  if (each_price) {
    const val_arr = []
    each_price?.forEach((item, index) => {
      const count_thing = item.children[2].innerHTML;
      const thing_money = item.children[3].innerHTML;
      const val1 = count_thing.match(regex)[0];
      const val2 = thing_money.match(regex)[0];
      val_arr.push({
        val1: val1,
        val2: val2
      })
    })
    val_arr.push({
      val1: val_arr[length - 1].val1 * 1e30,
      val2: val_arr[length - 1].val2
    });

    each_price.forEach((item, index) => {
      const value = item.children[0];

      if (parseFloat(Basic_value) < parseFloat(val_arr[index + 1]?.val1) && parseFloat(Basic_value) >= parseFloat(val_arr[index].val1)) {
        const price = parseFloat(val_arr[index].val2) * Basic_value;
        // document.querySelector(".product .product-form__quantity .ui-total-price").children[1].innerHTML = '$' + price.toFixed(2) + " USD";
      }
      if (parseFloat(Basic_value) < parseFloat(val_arr[index + 1]?.val1) && parseFloat(Basic_value) >= parseFloat(val_arr[index].val1)) {
        value.checked = true;
      }
      else {
        value.checked = false;
      }
    })
  }
});

  function onScroll200() {
   const displaytext = document.querySelector(".footer__content-bottom-wrapper .footer__copyright");
   displaytext.style.display = "block"; 
  }

  // Attach scroll listener
  window.addEventListener("scroll", function () {
    if (window.scrollY >= 200) {
      onScroll200();
    }
  });

  //get search pages

(function() {
  const interval = setInterval(() => {
    const title = document.querySelectorAll(".es-price span");
    if (title.length) {
      title.forEach(item => item.textContent = "From");
      clearInterval(interval);
    }
  }, 10);
})();

document.addEventListener("DOMContentLoaded", () => {
  
  const maxWait = 10000; // 10 seconds
  let elapsed = 0;

  const checkColorFilter = setInterval(() => {
    const color_filter = document.querySelectorAll(".cloud-search-filter-values-container");

    if (color_filter.length > 0) {
      console.log("Color filter found:", color_filter);

      clearInterval(checkColorFilter);

      // ✅ Apply z-index: 0 !important
      color_filter.forEach(el => {
        el.style.setProperty("z-index", "0", "important");
      });

      return;
    }

    elapsed += 200;
    if (elapsed >= maxWait) {
      console.warn("No color filters found within 10 seconds — stopping check.");
      clearInterval(checkColorFilter);
    }

  }, 200);

});


