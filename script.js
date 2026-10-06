// Google Apps Script Web App URL
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzXp6C4KyJ6ggYlhl1RMdeCWGBHbnP3gHa_A9j0SnJeQCesSxXL6SNZ65YM2a9X9VGP/exec";

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

      // جمع البيانات من النموذج
      const formData = {
        fullName: document.getElementById("fullName") ? document.getElementById("fullName").value : "",
        phone: document.getElementById("phone") ? document.getElementById("phone").value : "",
        wilaya: document.getElementById("wilaya") ? document.getElementById("wilaya").value : "",
        address: document.getElementById("address") ? document.getElementById("address").value : "",
        product: document.getElementById("productName") ? document.getElementById("productName").value : "منتج فخار",
        quantity: document.getElementById("quantity") ? document.getElementById("quantity").value : "1"
      };

      // إرسال البيانات إلى Google Sheets
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
        console.error("Error:", error);
        alert("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.");
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
