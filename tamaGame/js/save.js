/* ============================================================
   SAVE SYSTEM
   Stores the entire pet object in localStorage
   ============================================================ */
function saveGame() {
    // Convert the pet object into a JSON string and store it
    localStorage.setItem("tamaSave", JSON.stringify(pet));
}


/* ============================================================
   LOAD SYSTEM
   Loads save data if it exists and applies it to the pet object
   ============================================================ */
function loadSave() {
    const data = localStorage.getItem("tamaSave");

    // If no save exists → return false so the game knows to start fresh
    if (!data) {
        return false;
    }

    // Parse the saved JSON back into an object
    const savedPet = JSON.parse(data);

    // Merge saved data into the existing pet object
    // (Prevents missing fields if you add new stats later)
    Object.assign(pet, savedPet);

    return true; // Save successfully loaded
}
