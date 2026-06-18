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


// ===== 5. Login ===== ✅ FIXED
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
      // ✅ Login hone pe user save karo
      localStorage.setItem("zomato_loggedin", JSON.stringify(match));
      loginMsg.style.color = "#00c853";
      loginMsg.textContent = "Welcome back, " + match.name + "! 🎉";
      // ✅ Profile pe redirect karo
      setTimeout(() => {
        window.location.href = "profile.html";
      }, 1500);
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

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function clearCart() {
  localStorage.removeItem("cart");
  location.reload();
}


// ===== 10. Admin Panel =====
function adminAdd() {
  const name     = document.getElementById("adminName").value.trim();
  const location = document.getElementById("adminLocation").value.trim();
  const cuisine  = document.getElementById("adminCuisine").value.trim();
  const rating   = parseFloat(document.getElementById("adminRating").value);
  const msg      = document.getElementById("adminMsg");

  if (!name || !location || !cuisine || !rating) {
    msg.style.color = "#ff4d4d";
    msg.textContent = "Please fill in all fields.";
    return;
  }

  if (rating < 1 || rating > 5) {
    msg.style.color = "#ff4d4d";
    msg.textContent = "Rating must be between 1 and 5.";
    return;
  }

  const restaurants = JSON.parse(localStorage.getItem("zomato_restaurants") || "[]");
  restaurants.push({ name, location, cuisine, rating });
  localStorage.setItem("zomato_restaurants", JSON.stringify(restaurants));

  msg.style.color = "#00c853";
  msg.textContent = `"${name}" added successfully! ✅`;

  document.getElementById("adminName").value     = "";
  document.getElementById("adminLocation").value = "";
  document.getElementById("adminCuisine").value  = "";
  document.getElementById("adminRating").value   = "";

  showRestaurants();
}

function showRestaurants() {
  const list = document.getElementById("restaurantList");
  if (!list) return;

  const restaurants = JSON.parse(localStorage.getItem("zomato_restaurants") || "[]");

  if (restaurants.length === 0) {
    list.innerHTML = `<p style="color:#888; text-align:center;">No restaurants added yet.</p>`;
    return;
  }

  list.innerHTML = "<h3 style='color:#ff4d4d; margin-bottom:10px;'>Added Restaurants:</h3>";
  restaurants.forEach((r, i) => {
    list.innerHTML += `
      <div style="display:flex; justify-content:space-between; align-items:center;
                  padding:10px; border:1px solid #eee; border-radius:8px; margin-bottom:8px;">
        <span style="color:#e2e8f0;">${r.name} — ${r.location} — ${r.cuisine} — ⭐${r.rating}</span>
        <button onclick="deleteRestaurant(${i})"
          style="background:#ff4d4d; color:white; border:none;
                 padding:4px 10px; border-radius:5px; cursor:pointer;">
          Delete
        </button>
      </div>
    `;
  });
}

function deleteRestaurant(index) {
  const restaurants = JSON.parse(localStorage.getItem("zomato_restaurants") || "[]");
  restaurants.splice(index, 1);
  localStorage.setItem("zomato_restaurants", JSON.stringify(restaurants));
  showRestaurants();
}

if (document.getElementById("restaurantList")) {
  showRestaurants();
}


// ===== 11. Orders Page =====
const ordersList = document.getElementById("ordersList");

if (ordersList) {
  const orders = JSON.parse(localStorage.getItem("zomato_orders") || "[]");

  if (orders.length === 0) {
    ordersList.innerHTML = `
      <div class="orders-empty">
        <p>No orders yet 🍽️</p>
       <a href="../index.html">Home</a>
      </div>
    `;
  } else {
    orders.forEach((order, index) => {
      ordersList.innerHTML += `
        <div class="order-card">
          <div class="order-card-header">
            <h3>Order #${index + 1}</h3>
            <span class="order-status">${order.status || "Delivered"}</span>
          </div>
          <p class="order-info">📍 ${order.restaurant || "Spice Hub"}</p>
          <p class="order-info">🕒 ${order.date || new Date().toLocaleDateString()}</p>
          <p class="order-total">Total: ₹${order.total || 0}</p>
        </div>
      `;
    });
  }
}


// ===== 12. Profile Page ===== ✅ FIXED
const profileName   = document.getElementById("profileName");
const profileEmail  = document.getElementById("profileEmail");
const profileCart   = document.getElementById("profileCart");
const profileOrders = document.getElementById("profileOrders");

if (profileName) {
  const cart   = JSON.parse(localStorage.getItem("cart")          || "[]");
  const orders = JSON.parse(localStorage.getItem("zomato_orders") || "[]");

  // ✅ loggedin user se data lo
  const loggedIn = localStorage.getItem("zomato_loggedin");

  if (loggedIn) {
    const user = JSON.parse(loggedIn);
    profileName.textContent  = user.name;
    profileEmail.textContent = user.email;
  }

  profileCart.textContent   = cart.length;
  profileOrders.textContent = orders.length;
  document.getElementById("profileDate").textContent =
    new Date().getFullYear();
}

// ✅ Logout
function logoutUser() {
  localStorage.removeItem("cart");
  localStorage.removeItem("zomato_loggedin");
  window.location.href = "login.html";
}


// ===== 13. Dashboard =====
const totalUsers = document.getElementById("totalUsers");
if (totalUsers) {
  const users       = JSON.parse(localStorage.getItem("zomato_users")       || "[]");
  const restaurants = JSON.parse(localStorage.getItem("zomato_restaurants") || "[]");
  const cart        = JSON.parse(localStorage.getItem("cart")               || "[]");

  document.getElementById("totalUsers").textContent       = users.length;
  document.getElementById("totalRestaurants").textContent = restaurants.length;
  document.getElementById("totalCart").textContent        = cart.length;
}


// ===== 14. Hamburger Menu =====
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