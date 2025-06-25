const KlaviyoReady = () => {
  const klaviyoImages = document.querySelectorAll(".needsclick img");

  klaviyoImages.forEach(img => {
    if (img.alt) {
      console.log("have alt!");
    } else {
      img.setAttribute("alt", "ADA Alt Text")
    }
  })
}

const setESQuantityRadios = widget => {
  const esQuantityRadios = document.querySelector(".es-quantity-radios");
  const div = document.createElement("div");
  div.classList.add("es-quantity-radios__body");

  if (esQuantityRadios) {
    console.log(widget);

    var trs = widget.querySelectorAll("tbody tr");

    console.log(trs);

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

      span_qty.textContent = qty + "+";
      span_price.textContent = prices[index];

      label.append(input);
      label.append(custom_input);
      label.append(span_qty);
      label.append(span_price);
      div.append(label);

      input.addEventListener("change", function () {
        console.log(this.value);
        document.querySelector(".product .product-form__quantity .quantity__input").value = this.value;
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
    console.log("moneyTemplateTable", moneyTemplateTable);
    setESQuantityRadios(moneyTemplateTable);
    flag += 1;
  }

  if (flag == 2) {
    obs.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });