// ضع رابط Google Apps Script الخاص بك هنا
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_URL_HERE";

// دالة تحديد المنتج تلقائياً
function selectSingleProduct(productName) {
    const select = document.getElementById('productSelect');
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === productName) {
            select.selectedIndex = i;
            break;
        }
    }
}

// التحكم بالسحب وتغيير نقاط الصور
document.querySelectorAll('.product-gallery').forEach(gallery => {
    const track = gallery.querySelector('.gallery-track');
    const dots = gallery.querySelectorAll('.dot');

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
});

// التحكم في إرسال استمارة الطلب
document.getElementById('fakhArtOrderForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');

    const phoneInput = document.getElementById('phoneNumber').value.trim();
    const phoneRegex = /^(05|06|07)[0-9]{8}$/;

    if (!phoneRegex.test(phoneInput)) {
        alert("يرجى إدخال رقم هاتف جزائري صحيح (05 أو 06 أو 07)");
        return;
    }

    submitBtn.disabled = true;
    btnText.innerText = "جاري إرسال الطلب...";

    const formData = new FormData(this);
    const payload = {
        fullName: formData.get('fullName'),
        phone: formData.get('phone'),
        wilaya: formData.get('wilaya'),
        address: formData.get('address'),
        product: formData.get('product'),
        quantity: formData.get('quantity'),
        date: new Date().toLocaleString('ar-DZ')
    };

    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(() => {
        btnText.innerText = "تأكيد الطلب الآن 🚀";
        submitBtn.disabled = false;
        successMessage.classList.remove('hidden');
        document.getElementById('fakhArtOrderForm').reset();
    })
    .catch(error => {
        console.error('Error!', error);
        btnText.innerText = "تأكيد الطلب الآن 🚀";
        submitBtn.disabled = false;
        errorMessage.classList.remove('hidden');
    });
});
