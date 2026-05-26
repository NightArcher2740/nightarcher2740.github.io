/* ============================================================
   PET ANIMATION SYSTEM
   Handles sprite selection and frame cycling based on mood
   ============================================================ */
function animatePet() {
    const img = document.getElementById("pet");

    // Sprite lists for each mood
    const sprites = {
        idle:   ["sprites/pet_idle1.png", "sprites/pet_idle2.png"], // 2‑frame idle animation
        happy:  ["sprites/pet_happy.png"],                          // Single-frame moods
        sad:    ["sprites/pet_sad.png"],
        hungry: ["sprites/pet_hungry.png"],
        tired:  ["sprites/pet_tired.png"],
        sick:   ["sprites/pet_sick.png"]
    };

    // Get the correct sprite list for the pet's current mood
    const frames = sprites[pet.mood];

    // Cycle through frames (loops back to 0)
    pet.frame = (pet.frame + 1) % frames.length;

    // Update the image source
    img.src = frames[pet.frame];
}


/* ============================================================
   BACKGROUND SYSTEM
   Changes background based on sickness + day/night cycle
   ============================================================ */
function updateBackground() {
    const bg = document.getElementById("background");

    // Sick pets always use the sickroom background
    if (pet.sick) {
        bg.src = "backgrounds/bg_sickroom.png";
        return;
    }

    // Simple day/night cycle based on age:
    // Even ages → day, odd ages → night
    if (pet.age % 2 < 1) {
        bg.src = "backgrounds/bg_day.png";
    } else {
        bg.src = "backgrounds/bg_night.png";
    }
}
