/* ============================================================
   FEEDING SYSTEM
   ============================================================ */
function feed(item) {
    if (!pet.food[item] || pet.food[item] <= 0) {
        showMessage("You don't have any!");
        return false;
    }

    pet.food[item]--;

    if (item === "apple") {
        pet.hunger += 20;
    } else if (item === "cake") {
        pet.hunger += 40;
        pet.happiness += 10;
    }

    pet.hunger = Math.min(100, pet.hunger);

    showMessage(`You fed your pet a ${item}!`);
    saveGame();
    return true;
}

/* ============================================================
   MEDICINE SYSTEM
   ============================================================ */
function giveMedicine() {
    if (pet.medicine <= 0) {
        showMessage("No medicine!");
        return false;
    }

    if (!pet.sick) {
        showMessage("Your pet is not sick.");
        return false;
    }

    pet.medicine--;
    pet.sick = false;
    pet.mood = "happy";

    showMessage("Your pet is healed!");
    saveGame();
    return true;
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
   CLEANING SYSTEM
   Pet occasionally becomes dirty → cleaning earns coins
   ============================================================ */
function cleanPet() {
    if (!pet.dirty) {
        showMessage("Nothing to clean.");
        return;
    }

    pet.dirty = false;

    const reward = 5;
    pet.coins += reward;

    showMessage(`You cleaned up! +£${reward}`);

    saveGame();
    drawUI();
}

