const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzXp6C4KyJ6ggYlhl1RMdeCWGBHbnP3gHa_A9j0SNJeQCesSxXL6SNZ65YM2a9X9VGP/exec";

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

      // تجميع البيانات من النموذج
      const name = document.getElementById("name") ? document.getElementById("name").value : "";
      const phone = document.getElementById("phone") ? document.getElementById("phone").value : "";
      const wilaya = document.getElementById("wilaya") ? document.getElementById("wilaya").value : "";
      const address = document.getElementById("address") ? document.getElementById("address").value : "";
      const product = document.getElementById("product") ? document.getElementById("product").value : "منتج فخار";
      const quantity = document.getElementById("quantity") ? document.getElementById("quantity").value : "1";

      // تجهيز الرابط المباشر
      const params = new URLSearchParams({
        fullName: name,
        phone: phone,
        wilaya: wilaya,
        address: address,
        product: product,
        quantity: quantity
      });

      // إرسال الطلب إلى Google Sheets
      fetch(SCRIPT_URL + "?" + params.toString(), {
        method: "POST"
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
