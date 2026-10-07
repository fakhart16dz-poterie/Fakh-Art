// Front-end order form for fakhart16.dz.
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzdeVPD8dGFqNNJRjnDUr9COWnZUMjR_P6xLj27SkGGzCKNd10GSqVQ-SuW48gbCs51/exec";

function selectSingleProduct(productName) {
  const select =
    document.getElementById("productSelect") ||
    document.getElementById("product");

  if (!select) return;

  for (const option of select.options) {
    if (
      option.value === productName ||
      option.textContent.trim() === productName
    ) {
      select.value = option.value;
      break;
    }
  }
}

function initProductGalleries() {
  document.querySelectorAll(".product-gallery").forEach((gallery) => {
    const track = gallery.querySelector(".gallery-track");
    const dots = gallery.querySelectorAll(".dot");
    if (!track || dots.length === 0) return;

    track.addEventListener("scroll", () => {
      const slideWidth = track.clientWidth;
      if (!slideWidth) return;

      const activeIndex = Math.round(track.scrollLeft / slideWidth);
      if (track.scrollLeft > 20) gallery.classList.add("swiped");

      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === activeIndex);
      });
    });
  });
}

function getFieldValue(ids, fallback = "") {
  for (const id of ids) {
    const field = document.getElementById(id);
    if (field) return String(field.value || "").trim();
  }
  return fallback;
}

function setMessage(element, message, isVisible) {
  if (!element) return;
  if (message) element.textContent = message;
  element.classList.toggle("hidden", !isVisible);
}

function initOrderForm() {
  const orderForm =
    document.getElementById("fakhArtOrderForm") ||
    document.getElementById("orderForm");

  if (!orderForm) return;

  orderForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton =
      document.getElementById("submitBtn") ||
      orderForm.querySelector('button[type="submit"]');
    const buttonText = document.getElementById("btnText");
    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");

    const defaultButtonText = buttonText
      ? buttonText.textContent
      : submitButton
        ? submitButton.textContent
        : "تأكيد الطلب الآن 🚀";

    setMessage(successMessage, "", false);
    setMessage(errorMessage, "", false);

    const order = {
      fullName: getFieldValue(["fullName", "name"]),
      phone: getFieldValue(["phoneNumber", "phone"]),
      wilaya: getFieldValue(["wilaya"]),
      address: getFieldValue(["address"]),
      product: getFieldValue(["productSelect", "product"]),
      quantity: getFieldValue(["quantity"], "1") || "1",
    };

    const phonePattern = /^(05|06|07)[0-9]{8}$/;

    if (!order.fullName || !order.phone || !order.product) {
      const message = "يرجى إدخال الاسم ورقم الهاتف واختيار المنتج.";
      setMessage(errorMessage, message, true);
      if (!errorMessage) alert(message);
      return;
    }

    if (!phonePattern.test(order.phone)) {
      const message = "يرجى إدخال رقم هاتف جزائري صحيح (05 أو 06 أو 07).";
      setMessage(errorMessage, message, true);
      if (!errorMessage) alert(message);
      return;
    }

    const quantity = Number(order.quantity);
    if (!Number.isInteger(quantity) || quantity < 1) {
      const message = "يرجى إدخال كمية صحيحة.";
      setMessage(errorMessage, message, true);
      if (!errorMessage) alert(message);
      return;
    }

    if (submitButton) submitButton.disabled = true;
    if (buttonText) buttonText.textContent = "جاري إرسال الطلب...";
    else if (submitButton) submitButton.textContent = "جاري إرسال الطلب...";

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams(order).toString(),
      });

      orderForm.reset();

      const message = "تم إرسال الطلب، سنتصل بك قريبًا لتأكيده.";
      setMessage(successMessage, message, true);
      if (!successMessage) alert(message);
    } catch (error) {
      console.error("Order submission failed:", error);

      const message = "تعذر إرسال الطلب. تحقق من اتصال الإنترنت وحاول مرة أخرى.";
      setMessage(errorMessage, message, true);
      if (!errorMessage) alert(message);
    } finally {
      if (submitButton) submitButton.disabled = false;
      if (buttonText) buttonText.textContent = defaultButtonText;
      else if (submitButton) submitButton.textContent = defaultButtonText;
    }
  });
}

function initFakhArtOrderPage() {
  initProductGalleries();
  initOrderForm();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFakhArtOrderPage, {
    once: true,
  });
} else {
  initFakhArtOrderPage();
}
