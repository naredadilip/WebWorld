/* -----------------------------------------
   SIDE MENU — OPEN / CLOSE
------------------------------------------ */

function openMenu() {
    const menu = document.getElementById("sideMenu");
    const overlay = document.getElementById("overlay");

    menu.classList.add("open");
    overlay.classList.add("show");

    // Stop background scrolling
    document.body.style.overflow = "hidden";
}

function closeMenu() {
    const menu = document.getElementById("sideMenu");
    const overlay = document.getElementById("overlay");

    menu.classList.remove("open");
    overlay.classList.remove("show");

    // Enable scroll back
    document.body.style.overflow = "auto";
}

/* Close menu when clicking outside */
document.getElementById("overlay").addEventListener("click", closeMenu);


/* -----------------------------------------
   AUTO LIVE DATE + TIME (Hindi + Seconds)
------------------------------------------ */

function updateDateTime() {
    const dateElement = document.getElementById("currentDate");
    if (!dateElement) return;

    const now = new Date();

    const days = [
        "रविवार","सोमवार","मंगलवार",
        "बुधवार","गुरुवार","शुक्रवार","शनिवार"
    ];

    const months = [
        "जनवरी","फ़रवरी","मार्च","अप्रैल","मई","जून",
        "जुलाई","अगस्त","सितंबर","अक्टूबर","नवंबर","दिसंबर"
    ];

    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    const time = `${hours}:${minutes}:${seconds} ${ampm}`;

    dateElement.textContent = `${day}, ${date} ${month} ${year} | ${time}`;
}

window.addEventListener("DOMContentLoaded", () => {
    updateDateTime();
    setInterval(updateDateTime, 1000);
});


/* ======================================================
      WEEKLY RASHIFAL — AUTO SLIDER + TOUCH SWIPE
====================================================== */
const sliderWrapper = document.querySelector('.slider-wrapper');
let isDown = false;
let startX;
let scrollStart;
let autoSlideTimer;

/* START DRAG */
function sliderDragStart(e) {
    isDown = true;
    clearInterval(autoSlideTimer);

    startX = (e.touches ? e.touches[0].pageX : e.pageX);
    scrollStart = sliderWrapper.scrollLeft;
}

/* DRAGGING */
function sliderDragging(e) {
    if (!isDown) return;
    e.preventDefault();

    const x = (e.touches ? e.touches[0].pageX : e.pageX);
    const walk = (x - startX) * 1.5;

    sliderWrapper.scrollLeft = scrollStart - walk;
}

/* DRAG END */
function sliderDragEnd() {
    isDown = false;
    startAutoSlide(); // Restart auto slide
}

/* AUTO SLIDE FUNCTION */
function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
        const slideWidth = sliderWrapper.children[0].clientWidth + 15;

        sliderWrapper.scrollBy({
            left: slideWidth,
            behavior: "smooth"
        });

        // Loop Back
        if (sliderWrapper.scrollLeft + sliderWrapper.clientWidth >= sliderWrapper.scrollWidth - 5) {
            setTimeout(() => {
                sliderWrapper.scrollTo({ left: 0, behavior: "smooth" });
            }, 400);
        }
    }, 3000);
}

/* ATTACH TOUCH + MOUSE EVENTS */
if (sliderWrapper) {
    sliderWrapper.addEventListener("mousedown", sliderDragStart);
    sliderWrapper.addEventListener("touchstart", sliderDragStart);

    sliderWrapper.addEventListener("mousemove", sliderDragging);
    sliderWrapper.addEventListener("touchmove", sliderDragging);

    sliderWrapper.addEventListener("mouseup", sliderDragEnd);
    sliderWrapper.addEventListener("mouseleave", sliderDragEnd);
    sliderWrapper.addEventListener("touchend", sliderDragEnd);

    startAutoSlide();
}

/* ================= DYNAMIC RASHIFAL DATA ================= */

const rashifalData = {
    mesh: {
        name: "मेष",
        icon: "assets/images/rashifal/Aries.png",
        text: `
            इस सप्ताह करियर के लक्ष्यों पर ध्यान देना जरूरी रहेगा।
            आपकी संगठित सोच से जिम्मेदारियां पूरी होंगी।
            खर्च नियंत्रित रखें। यात्रा से लाभ मिलेगा।
            परिवार और प्रेम जीवन में नजदीकियाँ बढ़ेंगी।`
    },
    vrishabh: {
        name: "वृषभ",
        icon: "assets/images/rashifal/Taurus.png",
        text: `
            इस सप्ताह रुका धन मिलने के योग हैं।
            प्रेम संबंधों में मिठास बढ़ेगी।
            नौकरी में नई जिम्मेदारी मिल सकती है।
            घर में शुभ कार्य होने की संभावना है।`
    },
    mithun: {
        name: "मिथुन",
        icon: "assets/images/rashifal/Gemini.png",
        text: `
            इस हफ्ते यात्राओं से लाभ मिलेगा।
            पढ़ाई में सफलता मिलेगी।
            पुराने दोस्तों से सहयोग प्राप्त होगा।
            स्वास्थ्य सामान्य रहेगा।`
    },
    kark: {
        name: "कर्क",
        icon: "assets/images/rashifal/Cancer.png",
        text: `
            परिवार में खुशियों का माहौल रहेगा।
            निवेश में सावधानी रखें।
            नौकरी में प्रगति के योग हैं।
            यात्रा टालें।`
    },
    singh: {
        name: "सिंह",
        icon: "assets/images/rashifal/Leo.png",
        text: `
            मेहनत का फल मिलेगा।
            धन लाभ संभव।
            काम का दबाव बढ़ेगा लेकिन परिणाम अच्छे होंगे।`
    },
    kanya: {
        name: "कन्या",
        icon: "assets/images/rashifal/Virgo.png",
        text: `
            स्वास्थ्य का ध्यान रखें।
            पुराने विवाद खत्म होंगे।
            जीवन में नई शुरुआत के संकेत।`
    },
    tula: {
        name: "तुला",
        icon: "assets/images/rashifal/Libra.png",
        text: `
            प्रेम जीवन अच्छा रहेगा।
            करियर में प्रगति।
            बड़े व्यक्ति से सहयोग मिलेगा।`
    },
    vrishchik: {
        name: "वृश्चिक",
        icon: "assets/images/rashifal/Scorpio.png",
        text: `
            रुकावटें कम होंगी।
            नई डील लाभ देगी।
            परिवार में सामंजस्य।`
    },
    dhanu: {
        name: "धनु",
        icon: "assets/images/rashifal/Sagittarius.png",
        text: `
            यात्रा से लाभ।
            शिक्षा में सफलता।
            नौकरी बदलने के अवसर।`
    },
    makar: {
        name: "मकर",
        icon: "assets/images/rashifal/Capricorn.png",
        text: `
            प्रमोशन के योग।
            परिवार के काम निपटेंगे।
            आर्थिक स्थिति मजबूत।`
    },
    kumbh: {
        name: "कुंभ",
        icon: "assets/images/rashifal/Aquarius.png",
        text: `
            खर्च बढ़ेंगे।
            नया काम शुरू करने का सही समय।
            रिश्तों में सुधार।`
    },
    meen: {
        name: "मीन",
        icon: "assets/images/rashifal/Pisces.png",
        text: `
            भाग्य का साथ मिलेगा।
            रुके काम पूरे।
            स्वास्थ्य बेहतर।`
    }
};


/* ================= FUNCTION — UPDATE UI ================= */

function updateRashifal() {
    const rashi = document.getElementById("rashiSelect").value;

    document.getElementById("rashiTitle").textContent = rashifalData[rashi].name;
    document.getElementById("rashiIcon").src = rashifalData[rashi].icon;
    document.getElementById("rashiContent").innerHTML = `<p>${rashifalData[rashi].text}</p>`;
}

document.getElementById("rashiSelect").addEventListener("change", updateRashifal);

/* Load default */
updateRashifal();

/* ================== LIVE RASHIFAL API FETCH ================== */

async function updateRashifal() {
    const rashi = document.getElementById("rashiSelect").value;

    // API sign format conversion
    const apiSign = {
        mesh: "aries",
        vrishabh: "taurus",
        mithun: "gemini",
        kark: "cancer",
        singh: "leo",
        kanya: "virgo",
        tula: "libra",
        vrishchik: "scorpio",
        dhanu: "sagittarius",
        makar: "capricorn",
        kumbh: "aquarius",
        meen: "pisces"
    }[rashi];

    // API URL
    const url = `https://webworld-rashifal.onrender.com/api/rashi?sign=${apiSign}`;

    // Loading effect
    document.getElementById("rashiContent").innerHTML = "<p>⏳ Loading live rashifal...</p>";

    try {
        const res = await fetch(url);
        const data = await res.json();

        document.getElementById("rashiTitle").textContent = data.name;
        document.getElementById("rashiIcon").src = `assets/images/rashifal/${apiSign}.png`;
        document.getElementById("rashiContent").innerHTML = `<p>${data.horoscope}</p>`;

    } catch (error) {
        document.getElementById("rashiContent").innerHTML =
            "<p style='color:red;'>⚠ Live server busy. Try again later.</p>";
    }
}

// Event Listener
document.getElementById("rashiSelect").addEventListener("change", updateRashifal);

// Initial load
updateRashifal();

/* -----------------------------------------
   AUTO CLOSE MENU WHEN SCREEN > 768PX
------------------------------------------ */
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});