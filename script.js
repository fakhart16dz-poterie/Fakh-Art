const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzdeVPD8dGFqNNJRjnDUr9COWnZUMjR_P6xLj27SkGGzCKNd10GSqVQ-SuW48gbCs51/exec";

document.addEventListener("DOMContentLoaded", function () {
  const orderForm = document.getElementById("orderForm");

  if (orderForm) {
    // إنشاء عنصر iframe مخفي لإرسال البيانات عن طريقه
    let iframe = document.getElementById("hidden_iframe");
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.name = "hidden_iframe";
      iframe.id = "hidden_iframe";
      iframe.style.display = "none";
      document.body.appendChild(iframe);
    }

    orderForm.setAttribute("action", SCRIPT_URL);
    orderForm.setAttribute("method", "POST");
    orderForm.setAttribute("target", "hidden_iframe");

    orderForm.addEventListener("submit", function () {
      const submitBtn = orderForm.querySelector("button[type='submit']");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = "جاري إرسال الطلب...";
      }

      setTimeout(() => {
        alert("تـم إرسال طلبك بنجاح! سنتصل بك قريبًا لتأكيد الطلبية.");
        orderForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = "إرسال الطلب";
        }
      }, 1500);
    });
  }
});
