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

if (document.querySelector('.needsclick img')) {
  KlaviyoReady();
} else {
  const klaviyoWatcher = new MutationObserver(function (mutations, obs) {
    if (document.querySelector('.needsclick img')) {
      KlaviyoReady();
      obs.disconnect();
    }
  });
  klaviyoWatcher.observe(document.body, { childList: true, subtree: true });
  setTimeout(function () { klaviyoWatcher.disconnect(); }, 15000);
}


function onScroll200() {
  const displaytext = document.querySelector(".footer__content-bottom-wrapper .footer__copyright");
  displaytext.style.display = "block";
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 200) {
    onScroll200();
  }
});
