// Full Menu Database
const fullMenu = [
    {
        id: "b1",
        name: "Classic Cheeseburger",
        price: 8.99,
        category: "burgers",
        desc: "Beef patty, American cheese, lettuce, tomato, onion"
    },
    {
        id: "b2",
        name: "Bacon Double",
        price: 12.99,
        category: "burgers",
        desc: "Two patties, crispy bacon, cheddar, BBQ sauce"
    },
    {
        id: "b3",
        name: "Jalapeño Ranch",
        price: 10.99,
        category: "burgers",
        desc: "Spicy kick with pepper jack & ranch"
    },
    {
        id: "b4",
        name: "Mushroom Swiss",
        price: 10.99,
        category: "burgers",
        desc: "Sautéed mushrooms, Swiss cheese, grilled onions"
    },
    {
        id: "s1",
        name: "Grilled Chicken",
        price: 9.99,
        category: "sandwiches",
        desc: "Marinated chicken breast, mayo, lettuce, tomato"
    },
    {
        id: "s2",
        name: "Philly Cheesesteak",
        price: 11.99,
        category: "sandwiches",
        desc: "Thin sliced beef, peppers, onions, provolone"
    },
    {
        id: "s3",
        name: "Club Stack",
        price: 11.99,
        category: "sandwiches",
        desc: "Turkey, ham, bacon, triple decker"
    },
    {
        id: "s4",
        name: "BLT Deluxe",
        price: 8.99,
        category: "sandwiches",
        desc: "Extra bacon, lettuce, tomato, toasted sourdough"
    },
    {
        id: "hd1",
        name: "Classic Dog",
        price: 5.99,
        category: "hotdogs",
        desc: "All-beef frank, mustard, relish, onions"
    },
    {
        id: "hd2",
        name: "Chili Cheese Dog",
        price: 7.99,
        category: "hotdogs",
        desc: "Homemade chili, shredded cheddar, onions"
    },
    {
        id: "hd3",
        name: "Texas Dog",
        price: 7.99,
        category: "hotdogs",
        desc: "Spicy mustard, jalapeños, bacon bits, BBQ sauce"
    },
    {
        id: "c1",
        name: "Classic Burger Combo",
        price: 13.49,
        category: "combos",
        desc: "Classic Cheeseburger + Fries + Drink"
    },
    {
        id: "c2",
        name: "Bacon Double Combo",
        price: 16.99,
        category: "combos",
        desc: "Bacon Double + Large Fries + Drink"
    },
    {
        id: "c3",
        name: "Philly Steak Combo",
        price: 15.99,
        category: "combos",
        desc: "Philly Cheesesteak + Fries + Drink"
    },
    {
        id: "c4",
        name: "2 Hot Dogs Combo",
        price: 12.49,
        category: "combos",
        desc: "Two hot dogs + fries + drink"
    },
    {
        id: "d1",
        name: "Fountain Drink",
        price: 2.49,
        category: "drinks",
        desc: "Coke, Diet Coke, Sprite, Dr Pepper"
    },
    {
        id: "d2",
        name: "Hand-Spun Milkshake",
        price: 4.99,
        category: "drinks",
        desc: "Vanilla, Chocolate, Strawberry, Oreo"
    },
    {
        id: "d3",
        name: "Iced Tea",
        price: 2.49,
        category: "drinks",
        desc: "Sweet or unsweetened"
    }
];

let currentFilter = "all";
let selectedItem = null;

function renderMenu() {
    const container = document.getElementById("menuContainer");
    const filtered =
        currentFilter === "all"
            ? fullMenu
            : fullMenu.filter(item => item.category === currentFilter);

    container.innerHTML = filtered
        .map(
            item => `
        <div class="menu-item-card" data-id="${item.id}">
            <div class="card-body">
                <div class="item-header">
                    <h3>${item.name}</h3>
                    <span class="item-price">$${item.price.toFixed(2)}</span>
                </div>
                <div class="item-desc">${item.desc}</div>
                <button class="order-trigger" data-id="${item.id}">
                    <i class="fas fa-cart-plus"></i> Customize & Order
                </button>
            </div>
        </div>
    `
        )
        .join("");

    // Attach event listeners
    document.querySelectorAll(".order-trigger").forEach(btn => {
        btn.addEventListener("click", e => {
            e.stopPropagation();
            const id = btn.getAttribute("data-id");
            const item = fullMenu.find(i => i.id === id);
            if (item) openModal(item);
        });
    });
}

function openModal(item) {
    selectedItem = item;
    document.getElementById("modalItemName").innerHTML = item.name;
    document.getElementById("modalPrice").innerHTML =
        `Base: $${item.price.toFixed(2)}`;
    document.getElementById("itemId").value = item.id;
    document.getElementById("itemPrice").value = item.price;

    // Reset form
    document.getElementById("customizations").value = "";
    document.getElementById("condiments").value = "";
    document.getElementById("timeNote").value = "";
    document.getElementById("customerPhone").value = "";
    document.getElementById("customerName").value = "";
    document.getElementById("deliveryAddress").value = "";

    const pickupRadio = document.querySelector(
        'input[name="orderType"][value="Pickup"]'
    );
    if (pickupRadio) pickupRadio.checked = true;
    document.getElementById("addressGroup").style.display = "none";

    document.getElementById("orderModal").classList.add("active");
}

function closeModal() {
    document.getElementById("orderModal").classList.remove("active");
}

function sendOrder(event) {
    event.preventDefault();

    const item = selectedItem;
    if (!item) return;

    const customizations = document
        .getElementById("customizations")
        .value.trim();
    const condiments = document.getElementById("condiments").value.trim();
    const orderType = document.querySelector(
        'input[name="orderType"]:checked'
    ).value;
    let deliveryAddress = "";
    let extraFee = 0;

    if (orderType === "Delivery") {
        deliveryAddress = document
            .getElementById("deliveryAddress")
            .value.trim();
        if (!deliveryAddress) {
            alert("Please enter delivery address");
            return;
        }
        extraFee = 3.99;
    }

    const timeNote = document.getElementById("timeNote").value.trim();
    const customerPhone = document.getElementById("customerPhone").value.trim();
    const customerName = document.getElementById("customerName").value.trim();

    if (!customerName || !customerPhone) {
        alert("Please enter your name and phone number");
        return;
    }

    const total = item.price + extraFee;

    const emailBody = `
🍔 QUATTROS - NEW ORDER 🍔
━━━━━━━━━━━━━━━━━━━━━━
ITEM: ${item.name}
Base: $${item.price.toFixed(2)}
${extraFee > 0 ? `Delivery: +$${extraFee.toFixed(2)}` : ""}
TOTAL: $${total.toFixed(2)}
━━━━━━━━━━━━━━━━━━━━━━
CUSTOMIZATIONS:
${customizations || "None"}
CONDIMENTS/EXTRAS:
${condiments || "Standard"}
━━━━━━━━━━━━━━━━━━━━━━
ORDER TYPE: ${orderType}
${orderType === "Delivery" ? `ADDRESS: ${deliveryAddress}` : ""}
TIME: ${timeNote || "ASAP"}
━━━━━━━━━━━━━━━━━━━━━━
CUSTOMER: ${customerName}
PHONE: ${customerPhone}
━━━━━━━━━━━━━━━━━━━━━━
Send confirmation to customer when ready.
    `;

    const subject = `New Order: ${item.name} from ${customerName}`;
    const mailtoLink = `mailto:orders@quattrosamarillo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;
    alert(
        `✅ Order sent to Quattros!\n\n${item.name}\n${orderType} · Total: $${total.toFixed(2)}\nWe'll call you at ${customerPhone} shortly.`
    );
    closeModal();
}

// Category filter
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document
            .querySelectorAll(".filter-btn")
            .forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.getAttribute("data-cat");
        renderMenu();
    });
});

// Order type toggle
document.querySelectorAll('input[name="orderType"]').forEach(radio => {
    radio.addEventListener("change", () => {
        const deliveryRadio = document.querySelector(
            'input[name="orderType"][value="Delivery"]'
        );
        const addressGroup = document.getElementById("addressGroup");
        if (deliveryRadio && deliveryRadio.checked) {
            addressGroup.style.display = "block";
        } else {
            addressGroup.style.display = "none";
        }
    });
});

// Modal close handlers
document.querySelector(".close-modal").addEventListener("click", closeModal);
document.getElementById("orderModal").addEventListener("click", e => {
    if (e.target === document.getElementById("orderModal")) closeModal();
});
document.getElementById("orderForm").addEventListener("submit", sendOrder);

// Initialize
renderMenu();
