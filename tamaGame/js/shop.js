/* ============================================================
   SHOP PURCHASE SYSTEM
   Handles buying food and medicine from the shop
   ============================================================ */
function buyItem(type) {
    // Prices for each item
    const prices = { 
        apple: 5, 
        cake: 10, 
        medicine: 20 
    };

    // Not enough coins → stop
    if (pet.coins < prices[type]) {
        showMessage("Not enough coins.");
        return;
    }

    // Deduct coins
    pet.coins -= prices[type];

    // Add purchased item to inventory
    if (type === "medicine") {
        pet.medicine++;
    } else {
        pet.food[type]++;
    }

    // Save + update both UIs
    saveGame();
    drawUI();       // updates main game screen
    drawShopUI();   // updates shop screen
}
