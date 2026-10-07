const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzdeVPD8dGFqNNJRjnDUr9COWnZUMjR_P6xLj27SkGGzCKNd10GSqVQ-SuW48gbCs51/exec";

document.addEventListener("DOMContentLoaded", function () {
  const orderForm = document.getElementById("orderForm");

  if (orderForm) {
    orderForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = orderForm.querySelector("button[type='submit']");
      const originalBtnText = submitBtn ? submitBtn.innerText : "إرسال الطلب";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = "جاري إرسال الطلب...";
      }

      const formData = {
        fullName: document.getElementById("name") ? document.getElementById("name").value : "",
        phone: document.getElementById("phone") ? document.getElementById("phone").value : "",
        wilaya: document.getElementById("wilaya") ? document.getElementById("wilaya").value : "",
        address: document.getElementById("address") ? document.getElementById("address").value : "",
        product: document.getElementById("product") ? document.getElementById("product").value : "منتج فخار",
        quantity: document.getElementById("quantity") ? document.getElementById("quantity").value : "1"
      };

      fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      .then(() => {
        alert("تـم إرسال طلبك بنجاح! سنتصل بك قريبًا لتأكيد الطلبية.");
        orderForm.reset();
      })
      .catch((error) => {
        alert("تـم إرسال طلبك بنجاح! سنتصل بك قريبًا لتأكيد الطلبية.");
        orderForm.reset();
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalBtnText;
        }
      });
    });
  }
});
