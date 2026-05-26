/* ============================================================
   FEEDING SYSTEM
   Handles food availability, hunger increase, and mood changes
   ============================================================ */
function feed() {

    // If no food of any type exists, stop immediately
    if (pet.food.apple + pet.food.cake === 0) {
        showMessage("No food!");
        return;
    }

    // Prefer apples first — if none, use cake
    if (pet.food.apple > 0) {
        pet.food.apple--;      // Use one apple
        pet.hunger += 20;      // Apples restore 20 hunger
    } else {
        pet.food.cake--;       // Use one cake
        pet.hunger += 40;      // Cakes restore 40 hunger
    }

    // Feeding makes the pet happy
    pet.mood = "happy";

    saveGame();
    drawUI();
}


/* ============================================================
   PLAY SYSTEM
   Increases happiness but costs energy
   ============================================================ */
function play() {

    // Prevent playing if the pet is too tired
    if (pet.energy < 20) {
        showMessage("Too tired.");
        return;
    }

    pet.happiness += 20;   // Playing boosts happiness
    pet.energy -= 10;      // Playing drains energy
    pet.mood = "happy";    // Pet becomes happy

    saveGame();
    drawUI();
}


/* ============================================================
   SLEEP SYSTEM
   Restores energy and sets mood
   ============================================================ */
function sleep() {

    pet.energy += 40;                  // Restore energy
    pet.energy = Math.max(0, Math.min(100, pet.energy));  
    // Clamp energy between 0 and 100

    pet.mood = "tired";                // Sleeping mood

    saveGame();
    drawUI();
}


/* ============================================================
   MEDICINE SYSTEM
   Heals sickness if medicine is available
   ============================================================ */
function giveMedicine() {

    // No medicine available
    if (pet.medicine <= 0) {
        showMessage("No medicine!");
        return;
    }

    // Pet is not sick — medicine would be wasted
    if (!pet.sick) {
        showMessage("Your pet is not sick.");
        return;
    }

    pet.medicine--;        // Use one medicine
    pet.sick = false;      // Cure sickness
    pet.mood = "happy";    // Pet becomes happy

    showMessage("Your pet is healed!");

    saveGame();
    drawUI();
}
