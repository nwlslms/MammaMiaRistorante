function showErr(id, show) {
  const el = document.getElementById("err-" + id);
  if (el) el.classList.toggle("show", show);
}
function markErr(el, invalid) {
  if (el) el.classList.toggle("error", invalid);
}

// Validasi 1: Nama (text, min 3 karakter, huruf saja)
function cekNama() {
  const val = document.getElementById("nama").value.trim();
  let bener = val.length >= 3;
  if (bener) {
    for (let i = 0; i < val.length; i++) {
      const c = val.charCodeAt(i);
      if (!((c >= 65 && c <= 90) || (c >= 97 && c <= 122) || c === 32)) {
        bener = false;
        break;
      }
    }
  }
  markErr(document.getElementById("nama"), !bener);
  showErr("nama", !bener);
  return bener;
}

// Validasi 2: Nomor Telepon (angka, 10-13 digit, dimulai 0)
function cekTelepon() {
  const val = document.getElementById("telepon").value.trim();
  let bener = val.length >= 10 && val.length <= 13 && val[0] === "0";
  if (bener) {
    for (let i = 0; i < val.length; i++) {
      const c = val.charCodeAt(i);
      if (c < 48 || c > 57) {
        bener = false;
        break;
      }
    }
  }
  markErr(document.getElementById("telepon"), !bener);
  showErr("telepon", !bener);
  return bener;
}

// Validasi 3: Email (format email valid)
function cekEmail() {
  const val = document.getElementById("email").value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const bener = emailRegex.test(val);
  markErr(document.getElementById("email"), !bener);
  showErr("email", !bener);
  return bener;
}

// Validasi 4: Umur (angka, minimal 18 tahun)
function cekUmur() {
  const val = document.getElementById("umur").value.trim();
  const umur = parseInt(val, 10);
  const bener = !isNaN(umur) && umur >= 18 && umur <= 120;
  markErr(document.getElementById("umur"), !bener);
  showErr("umur", !bener);
  return bener;
}

// Validasi 5: Gender (radio button)
function cekGender() {
  const bener = document.querySelector('input[name="gender"]:checked') !== null;
  showErr("gender", !bener);
  return bener;
}

function cekService() {
  const bener =
    document.querySelector('input[name="service-type"]:checked') !== null;
  showErr("service", !bener);
  return bener;
}

function cekDish() {
  const val = document.getElementById("dish").value;
  const bener = val !== "";
  markErr(document.getElementById("dish"), !bener);
  showErr("dish", !bener);
  return bener;
}

function cekTopping() {
  const bener = document.querySelector('input[name^="c"]:checked') !== null;
  showErr("topping", !bener);
  return bener;
}

function cekUtensil() {
  const bener = document.querySelector('input[name^="u"]:checked') !== null;
  showErr("utensil", !bener);
  return bener;
}

function cekPayment() {
  const val = document.getElementById("metode-pembayaran").value;
  const bener = val !== "";
  markErr(document.getElementById("metode-pembayaran"), !bener);
  showErr("payment", !bener);
  return bener;
}

function cekReq() {
  const bener = document.getElementById("req").value.length <= 200;
  markErr(document.getElementById("req"), !bener);
  showErr("req", !bener);
  return bener;
}

function cekSetuju() {
  const bener = document.getElementById("setuju").checked;
  showErr("setuju", !bener);
  return bener;
}

// HANYA VALIDASI SAAT TOMBOL DIKLIK (TIDAK SAAT INPUT)
document.getElementById("formulir").addEventListener("submit", function (e) {
  e.preventDefault();
  const bener = [
    cekNama(),
    cekTelepon(),
    cekEmail(),
    cekUmur(),
    cekGender(),
    cekService(),
    cekDish(),
    cekTopping(),
    cekUtensil(),
    cekPayment(),
    cekReq(),
    cekSetuju(),
  ].every(Boolean);

  if (!bener) {
    const firstErr = document.querySelector(".err-msg.show");
    if (firstErr)
      firstErr.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const nama = document.getElementById("nama").value.trim();
  const telepon = document.getElementById("telepon").value.trim();
  const email = document.getElementById("email").value.trim();
  const umur = document.getElementById("umur").value.trim();
  const gender = document.querySelector(
    'input[name="gender"]:checked',
  ).value;
  const service = document.querySelector(
    'input[name="service-type"]:checked',
  ).value;
  const dish =
    document.getElementById("dish").options[
      document.getElementById("dish").selectedIndex
    ].text;
  const payment =
    document.getElementById("metode-pembayaran").options[
      document.getElementById("metode-pembayaran").selectedIndex
    ].text;
  const req = document.getElementById("req").value.trim();

  const toppings = [];
  document.querySelectorAll('input[name^="c"]:checked').forEach((cb) => {
    toppings.push(cb.nextElementSibling.textContent.trim());
  });

  const utensils = [];
  document.querySelectorAll('input[name^="u"]:checked').forEach((cb) => {
    utensils.push(cb.nextElementSibling.textContent.trim());
  });

  const summary =
    "Please confirm your order:\n\n" +
    "Name       : " +
    nama +
    "\n" +
    "Phone      : " +
    telepon +
    "\n" +
    "Email      : " +
    email +
    "\n" +
    "Age        : " +
    umur +
    "\n" +
    "Gender     : " +
    gender +
    "\n" +
    "Service    : " +
    service +
    "\n" +
    "Menu       : " +
    dish +
    "\n" +
    "Toppings   : " +
    toppings.join(", ") +
    "\n" +
    "Utensils   : " +
    utensils.join(", ") +
    "\n" +
    "Payment    : " +
    payment +
    "\n" +
    (req ? "Notes      : " + req + "\n" : "") +
    "\nProceed?";

  if (!confirm(summary)) return;

  const t = document.getElementById("toast");
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3000);
});
