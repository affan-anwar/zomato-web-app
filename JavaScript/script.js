// =============================================
//  Zomato Clone — script.js
//  Works across: index, login, signup,
//                add-restaurant, investor, cart
// =============================================


// ===== 1. Fade-in on page load (ALL pages) =====
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.8s ease";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = "1";
    });
  });
});


// ===== 2. Footer Year (ALL pages) =====
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


// ===== 3. Scroll Animation for .feature cards =====
const features = document.querySelectorAll(".feature");

if (features.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        } else {
          entry.target.style.opacity = "0";
          entry.target.style.transform = "translateY(50px)";
        }
      });
    },
    { threshold: 0.2 }
  );

  features.forEach((feature) => {
    feature.style.opacity = "0";
    feature.style.transform = "translateY(50px)";
    feature.style.transition = "all 0.5s ease";
    observer.observe(feature);
  });
}


// ===== 4. Search Bar Animation =====
const heroInput = document.querySelector("main section:first-child input");

if (heroInput) {
  heroInput.addEventListener("focus", () => {
    heroInput.style.boxShadow = "0 0 12px #ff4d4d";
    heroInput.style.transform = "scale(1.05)";
  });

  heroInput.addEventListener("blur", () => {
    heroInput.style.boxShadow = "none";
    heroInput.style.transform = "scale(1)";
  });
}


// ===== 5. Login =====
const forgotLink = document.querySelector(".forgot-password");
const loginBtn   = document.querySelector(".form-box .btn");
const loginMsg   = document.getElementById("message");

if (forgotLink && loginBtn && !document.getElementById("name")) {

  loginBtn.addEventListener("click", () => {
    const email    = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      loginMsg.textContent = "Please fill in all fields.";
      return;
    }

    const users = JSON.parse(localStorage.getItem("zomato_users") || "[]");
    const match = users.find(u => u.email === email && u.password === password);

    if (match) {
      loginMsg.style.color = "#00c853";
      loginMsg.textContent = "Welcome back, " + match.name + "! 🎉";
    } else {
      loginMsg.style.color = "#ff4d4d";
      loginMsg.textContent = "Invalid email or password.";
    }
  });
}


// ===== 6. Signup =====
const loginLink  = document.querySelector(".login-link");
const signupBtn  = document.querySelector(".form-box .btn");
const signupMsg  = document.getElementById("message");

if (loginLink && signupBtn) {

  signupBtn.addEventListener("click", () => {
    const name     = document.getElementById("name").value.trim();
    const email    = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
      signupMsg.style.color = "#ff4d4d";
      signupMsg.textContent = "Please fill in all fields.";
      return;
    }

    if (password.length < 6) {
      signupMsg.style.color = "#ff4d4d";
      signupMsg.textContent = "Password must be at least 6 characters.";
      return;
    }

    const users = JSON.parse(localStorage.getItem("zomato_users") || "[]");

    if (users.find(u => u.email === email)) {
      signupMsg.style.color = "#ff4d4d";
      signupMsg.textContent = "Email already registered.";
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("zomato_users", JSON.stringify(users));

    signupMsg.style.color = "#00c853";
    signupMsg.textContent = "Account created! Redirecting to login...";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  });
}


// ===== 7. Add Restaurant =====
const cuisineInput = document.getElementById("cuisine");
const addBtn       = document.querySelector(".form-box .btn");
const addMsg       = document.getElementById("message");

if (cuisineInput && addBtn) {

  addBtn.addEventListener("click", () => {
    const name     = document.getElementById("name").value.trim();
    const location = document.getElementById("location").value.trim();
    const cuisine  = document.getElementById("cuisine").value.trim();
    const rating   = parseFloat(document.getElementById("rating").value);

    if (!name || !location || !cuisine || !rating) {
      addMsg.style.color = "#ff4d4d";
      addMsg.textContent = "Please fill in all fields.";
      return;
    }

    if (rating < 1 || rating > 5) {
      addMsg.style.color = "#ff4d4d";
      addMsg.textContent = "Rating must be between 1 and 5.";
      return;
    }

    const restaurants = JSON.parse(localStorage.getItem("zomato_restaurants") || "[]");

    restaurants.push({ name, location, cuisine, rating });
    localStorage.setItem("zomato_restaurants", JSON.stringify(restaurants));

    addMsg.style.color = "#00c853";
    addMsg.textContent = `"${name}" added successfully! ✅`;

    document.getElementById("name").value     = "";
    document.getElementById("location").value = "";
    document.getElementById("cuisine").value  = "";
    document.getElementById("rating").value   = "";
  });
}


// ===== 8. Flip Cards (index.html) =====
const flipCards = document.querySelectorAll(".feature");

if (flipCards.length > 0 && document.querySelector(".feature-inner")) {
  flipCards.forEach((card) => {
    card.addEventListener("click", () => {
      const isAlreadyFlipped = card.classList.contains("flipped");

      flipCards.forEach((c) => c.classList.remove("flipped"));

      if (!isAlreadyFlipped) {
        card.classList.add("flipped");
      }
    });
  });
}


// ===== 9. Cart (cart.html) =====
const cartContainer = document.getElementById("cart");

if (cartContainer) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <p style="text-align:center; margin-top:40px; color:#888;">
        Your cart is empty 🛒
      </p>`;
  } else {
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price;
      cartContainer.innerHTML += `
        <div style="display:flex; justify-content:space-between; align-items:center;
                    padding:12px 20px; border-bottom:1px solid #eee;">
          <p>${item.name}</p>
          <p>₹${item.price}</p>
          <button onclick="removeItem(${index})"
            style="background:#ff4d4d; color:white; border:none;
                   padding:5px 10px; border-radius:5px; cursor:pointer;">
            Remove
          </button>
        </div>
      `;
    });

    cartContainer.innerHTML += `
      <h3 style="text-align:right; padding:20px; color:#ff4d4d;">
        Total: ₹${total}
      </h3>
      <div style="text-align:center; padding-bottom:30px;">
        <button onclick="clearCart()"
          style="background:#ff4d4d; color:white; border:none;
                 padding:10px 30px; border-radius:8px; cursor:pointer;
                 font-size:1rem; font-weight:bold;">
          Clear Cart
        </button>
      </div>
    `;
  }
}


// ===== Remove Single Item =====
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}


// ===== Clear Full Cart =====
function clearCart() {
  localStorage.removeItem("cart");
  location.reload();
}

// ===== Hamburger Menu =====
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  nav.classList.toggle("nav-hidden");
  nav.classList.toggle("nav-open");
}

document.addEventListener("click", (e) => {
  const nav = document.getElementById("navMenu");
  const hamburger = document.querySelector(".hamburger");
  if (nav && hamburger) {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
      nav.classList.add("nav-hidden");
      nav.classList.remove("nav-open");
    }
  }
});