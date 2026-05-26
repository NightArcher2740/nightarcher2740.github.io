/* ============================================================
   GLOBAL STATE
   ============================================================ */

// Tracks whether the inventory popup is being used for feeding or medicine
let inventoryMode = null; // "feed" or "medicine"


/* ============================================================
   GAME STARTUP
   ============================================================ */

function startGame() {
    const hasSave = loadSave();

    // Hide title screen
    document.getElementById("titleScreen").classList.add("hidden");

    // If no save or no name → go to naming screen
    if (!hasSave || !pet.name) {
        document.getElementById("nameScreen").classList.remove("hidden");
        return;
    }

    // Otherwise load straight into the game
    document.getElementById("game").classList.remove("hidden");

    drawUI();
    updateBackground();

    // Start update loops
    setInterval(updatePet, 1000);
    setInterval(animatePet, 500);
}


/* ============================================================
   NAMING SYSTEM
   ============================================================ */

function confirmName() {
    const input = document.getElementById("petNameInput").value.trim();

    if (input.length === 0) {
        alert("Please enter a name.");
        return;
    }

    pet.name = input;
    saveGame();

    // Switch screens
    document.getElementById("nameScreen").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    drawUI();
    updateBackground();

    // Start loops
    setInterval(updatePet, 1000);
    setInterval(animatePet, 500);
}


/* ============================================================
   SHOP SYSTEM
   ============================================================ */

function openShop() {
    document.getElementById("game").classList.add("hidden");
    document.getElementById("shopScreen").classList.remove("hidden");
    drawShopUI(); // Always refresh shop UI
}

function returnToGame() {
    // Hide all secondary screens
    document.getElementById("settingsScreen").classList.add("hidden");
    document.getElementById("shopScreen").classList.add("hidden");

    // Return to main game
    document.getElementById("game").classList.remove("hidden");
}


/* ============================================================
   SETTINGS + RESET SYSTEM
   ============================================================ */

function openSettings() {
    document.getElementById("game").classList.add("hidden");
    document.getElementById("settingsScreen").classList.remove("hidden");
}

// Show reset confirmation popup
function confirmReset() {
    const overlay = document.getElementById("resetOverlay");
    overlay.classList.remove("hidden");
    overlay.classList.add("show");
}

// Hide reset popup
function closeResetPopup() {
    const overlay = document.getElementById("resetOverlay");
    overlay.classList.remove("show");

    setTimeout(() => {
        overlay.classList.add("hidden");
    }, 300);
}

// Perform full reset
function doReset() {
    localStorage.removeItem("tamaSave");

    // Reset pet to defaults
    pet = {
        hunger: 50,
        happiness: 50,
        energy: 50,
        age: 0,
        coins: 20,
        sick: false,
        food: { apple: 0, cake: 0 },
        medicine: 0,
        lastUpdate: Date.now(),
        mood: "idle",
        frame: 0,
        name: null
    };

    closeResetPopup();

    // Return to naming screen
    document.getElementById("settingsScreen").classList.add("hidden");
    document.getElementById("game").classList.add("hidden");
    document.getElementById("nameScreen").classList.remove("hidden");
}


/* ============================================================
   INVENTORY POPUP SYSTEM (REPLACES OLD INVENTORY SCREEN)
   ============================================================ */

// Open inventory popup for feeding or medicine
function openInventoryPopup(mode) {
    inventoryMode = mode;

    const overlay = document.getElementById("inventoryOverlay");
    const choices = document.getElementById("inventoryChoices");

    // Build popup contents depending on mode
    if (mode === "feed") {
        choices.innerHTML = `
            <p>Apples: ${pet.food.apple} 
                <button onclick="selectInventoryItem('apple')">Use</button>
            </p>
            <p>Cakes: ${pet.food.cake} 
                <button onclick="selectInventoryItem('cake')">Use</button>
            </p>
        `;
    }

    if (mode === "medicine") {
        choices.innerHTML = `
            <p>Medicine: ${pet.medicine} 
                <button onclick="selectInventoryItem('medicine')">Use</button>
            </p>
        `;
    }

    overlay.classList.remove("hidden");
    overlay.classList.add("show");
}

// Close inventory popup
function closeInventoryPopup() {
    const overlay = document.getElementById("inventoryOverlay");
    overlay.classList.remove("show");

    setTimeout(() => {
        overlay.classList.add("hidden");
    }, 300);
}

// Handle item selection
function selectInventoryItem(item) {
    if (inventoryMode === "feed") {
        feedPet(item);
    }

    if (inventoryMode === "medicine") {
        healPet();
    }

    inventoryMode = null;
    closeInventoryPopup();
    drawUI();
}
