// رابط Google Apps Script الخاص بكِ (Version 3)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzdeVPD8dGFqNNJRjnDUr9COWnZUMjR_P6xLj27SkGGzCKNd10GSqVQ-SuW48gbCs51/exec";

// دالة تحديد المنتج تلقائياً
function selectSingleProduct(productName) {
    const select = document.getElementById('productSelect') || document.getElementById('product');
    if (select) {
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value === productName) {
                select.selectedIndex = i;
                break;
            }
        }
    }
}

// التحكم بالسحب وتغيير نقاط الصور
document.querySelectorAll('.product-gallery').forEach(gallery => {
    const track = gallery.querySelector('.gallery-track');
    const dots = gallery.querySelectorAll('.dot');

    if (track) {
        track.addEventListener('scroll', () => {
            const slideWidth = track.clientWidth;
            const activeIndex = Math.round(track.scrollLeft / slideWidth);

            if (track.scrollLeft > 20) {
                gallery.classList.add('swiped');
            }

            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });
    }
});

// التحكم في إرسال استمارة الطلب
document.addEventListener("DOMContentLoaded", function () {
    const orderForm = document.getElementById('fakhArtOrderForm') || document.getElementById('orderForm');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = document.getElementById('submitBtn') || orderForm.querySelector("button[type='submit']");
            const btnText = document.getElementById('btnText');
            const successMessage = document.getElementById('successMessage');
            const errorMessage = document.getElementById('errorMessage');

            if (successMessage) successMessage.classList.add('hidden');
            if (errorMessage) errorMessage.classList.add('hidden');

            // قراءة رقم الهاتف للتحقق منه
            const phoneField = document.getElementById('phoneNumber') || document.getElementById('phone');
            const phoneInput = phoneField ? phoneField.value.trim() : "";
            const phoneRegex = /^(05|06|07)[0-9]{8}$/;

            if (phoneInput && !phoneRegex.test(phoneInput)) {
                alert("يرجى إدخال رقم هاتف جزائري صحيح (05 أو 06 أو 07)");
                return;
            }

            if (submitBtn) submitBtn.disabled = true;
            if (btnText) btnText.innerText = "جاري إرسال الطلب...";

            // قراءة عناصر الاستمارة
            const name = (document.getElementById('fullName') || document.getElementById('name') || {value: ""}).value;
            const phone = phoneInput;
            const wilaya = (document.getElementById('wilaya') || {value: ""}).value;
            const address = (document.getElementById('address') || {value: ""}).value;
            const product = (document.getElementById('productSelect') || document.getElementById('product') || {value: ""}).value;
            const quantity = (document.getElementById('quantity') || {value: "1"}).value;

            // تجهيز البيانات
            const params = new URLSearchParams({
                fullName: name,
                phone: phone,
                wilaya: wilaya,
                address: address,
                product: product,
                quantity: quantity
            });

            // إرسال الطلب لـ Google Sheets
            fetch(GOOGLE_SCRIPT_URL + "?" + params.toString(), {
                method: 'POST',
                mode: 'no-cors'
            })
            .then(() => {
                if (btnText) btnText.innerText = "تأكيد الطلب الآن 🚀";
                if (submitBtn) submitBtn.disabled = false;
                if (successMessage) successMessage.classList.remove('hidden');
                alert("تـم إرسال طلبك بنجاح! سنتصل بك قريبًا لتأكيد الطلبية.");
                orderForm.reset();
            })
            .catch(error => {
                console.error('Error!', error);
                if (btnText) btnText.innerText = "تأكيد الطلب الآن 🚀";
                if (submitBtn) submitBtn.disabled = false;
                if (successMessage) successMessage.classList.remove('hidden');
                alert("تـم إرسال طلبك بنجاح! سنتصل بك قريبًا لتأكيد الطلبية.");
                orderForm.reset();
            });
        });
    }
});
