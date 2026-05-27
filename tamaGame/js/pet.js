/* ============================================================
   PET DATA (DEFAULT STATE)
   ============================================================ */

let pet = {
    name: "Pet",
    hunger: 50,          // 0 = starving, 100 = full
    happiness: 50,       // 0 = sad, 100 = very happy
    energy: 50,          // 0 = exhausted, 100 = full energy
    dirty: false,
    age: 0,              // increases over time
    coins: 20,           // currency for shop
    sick: false,         // sickness status
    food: { apple: 0, cake: 0 }, // inventory
    medicine: 0,         // medicine count
    lastUpdate: Date.now(), // timestamp for time-based updates
    mood: "idle",        // current mood (affects sprite)
    frame: 0             // animation frame index
};

// Load save immediately after defining pet
loadSave();


/* ============================================================
   MAIN PET UPDATE LOOP
   Runs every second to simulate time passing
   ============================================================ */

function updatePet() {
    const now = Date.now();
    const elapsed = (now - pet.lastUpdate) / 1000; // seconds since last update

    /* ------------------------------
       Natural stat decay over time
       ------------------------------ */
    pet.hunger    -= 0.3 * elapsed;  // gets hungry over time
    pet.happiness -= 0.2 * elapsed;  // gets bored over time
    pet.energy    -= 0.1 * elapsed;  // gets tired over time

    // Age increases slowly (300 seconds = 1 age unit)
    pet.age += elapsed / 300;

    // Random chance to become dirty over time
    if (!pet.dirty && Math.random() < 0.0002 * elapsed) {
        pet.dirty = true;
        showMessage("Your pet made a mess!");
    }

    /* ------------------------------
       Apply sickness effects
       ------------------------------ */
    diseaseCheck(elapsed);

    /* ------------------------------
       Update mood + background
       ------------------------------ */
    updateMood();
    updateBackground();

    /* ------------------------------
       Clamp stats to valid range
       ------------------------------ */
    pet.hunger    = Math.max(0, Math.min(100, pet.hunger));
    pet.happiness = Math.max(0, Math.min(100, pet.happiness));
    pet.energy    = Math.max(0, Math.min(100, pet.energy));

    /* ------------------------------
       Save + redraw UI
       ------------------------------ */
    pet.lastUpdate = now;
    saveGame();
    drawUI();
}


/* ============================================================
   SICKNESS SYSTEM
   Random chance to get sick + sickness stat decay
   ============================================================ */

function diseaseCheck(elapsed) {

    // Small chance to become sick over time
    if (!pet.sick && Math.random() < 0.0005 * elapsed) {
        pet.sick = true;
        showMessage("Your pet got sick!");
    }

    // If sick → stats decay faster
    if (pet.sick) {
        pet.hunger    -= 0.2 * elapsed;
        pet.energy    -= 0.2 * elapsed;
        pet.happiness -= 0.3 * elapsed;
    }
}


/* ============================================================
   MOOD SYSTEM
   Determines which sprite to use
   ============================================================ */

function updateMood() {

    if (pet.sick) {
        pet.mood = "sick";
    }
    else if (pet.hunger < 20) {
        pet.mood = "hungry";
    }
    else if (pet.energy < 20) {
        pet.mood = "tired";
    }
    else if (pet.happiness < 20) {
        pet.mood = "sad";
    }
    else {
        pet.mood = "idle";
    }
}
