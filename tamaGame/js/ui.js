/* ============================================================
   MAIN GAME UI
   Updates stats panel + inventory panel on the main screen
   ============================================================ */
function drawUI() {

    // Update stats panel (name, hunger, happiness, etc.)
    document.getElementById("stats").innerHTML = `
        <strong>${pet.name}</strong><br>
        Hunger: ${pet.hunger.toFixed(0)}<br>
        Happiness: ${pet.happiness.toFixed(0)}<br>
        Energy: ${pet.energy.toFixed(0)}<br>
        Age: ${pet.age.toFixed(1)} years<br>
        Coins: £${pet.coins}<br>
    `;

    // Update small inventory preview on the main screen
    document.getElementById("inventory").innerHTML = `
        Apples: ${pet.food.apple}<br>
        Cakes: ${pet.food.cake}<br>
        Medicine: ${pet.medicine}<br>
    `;
}


/* ============================================================
   MESSAGE SYSTEM
   Shows temporary notifications (2 seconds)
   ============================================================ */
function showMessage(msg) {
    const m = document.getElementById("message");

    m.innerText = msg;     // Display message

    // Clear message after 2 seconds
    setTimeout(() => {
        m.innerText = "";
    }, 2000);
}


/* ============================================================
   SHOP UI
   Updates the coin display inside the shop screen
   ============================================================ */
function drawShopUI() {
    document.getElementById("shopCoins").innerText = `Coins: £${pet.coins}`;
}


/* ============================================================
   INVENTORY POPUP UI
   Builds the item selection list depending on mode:
   - "feed"     → show apples + cakes
   - "medicine" → show medicine only
   ============================================================ */
function drawInventoryUI() {
    const inv = document.getElementById("inventoryItems");

    // Feeding mode → show food items
    if (inventoryMode === "feed") {
        inv.innerHTML = `
            <p>Apples: ${pet.food.apple} 
                <button onclick="selectItem('apple')">Use</button>
            </p>
            <p>Cakes: ${pet.food.cake} 
                <button onclick="selectItem('cake')">Use</button>
            </p>
        `;
    }

    // Medicine mode → show medicine only
    else if (inventoryMode === "medicine") {
        inv.innerHTML = `
            <p>Medicine: ${pet.medicine} 
                <button onclick="selectItem('medicine')">Use</button>
            </p>
        `;
    }
}
