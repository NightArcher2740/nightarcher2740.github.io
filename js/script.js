document.addEventListener('DOMContentLoaded', function() {
  const calendar = document.querySelector('.calendar');
  const monthYear = document.getElementById('monthYear');
  const daysContainer = document.querySelector('.days');

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  let today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  let events = {};

  // For yearly repeating events, use 'XXXX-MM-DD' as the key
  function getYearlyDateKey(month, day) {
    return `XXXX-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
  }

  function renderCalendar(month, year) {
    monthYear.textContent = `${months[month]} ${year}`;
    daysContainer.innerHTML = "";

    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      daysContainer.innerHTML += `<div></div>`;
    }

    for (let d = 1; d <= daysInMonth; d++) {
      let isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      let dateKey = getYearlyDateKey(month, d);
      let eventIcon = '';
      if (events[dateKey]) {
        eventIcon = `<img src="${events[dateKey].icon}" alt="${events[dateKey].alt}" title="${events[dateKey].alt}" class="icon" />`;
      }
      daysContainer.innerHTML += `<div class="${isToday ? 'today' : ''}" data-day="${d}">${d}${eventIcon}</div>`;
    }
  }

  // Fetch events from events.json
  fetch('js/json/events.json')
    .then(response => response.json())
    .then(data => {
      events = data;
      renderCalendar(currentMonth, currentYear);
    })
    .catch(error => {
      console.error('Error loading events:', error);
      renderCalendar(currentMonth, currentYear);
    });

  // Sound effect for move buttons
  const moveSound = new Audio('https://github.com/NightArcher2740/nightarcher2740.github.io/blob/main/audio/Move.wav');

  document.getElementById('prevMonth').onclick = function() {
    moveSound.currentTime = 0;
    moveSound.play();
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
  };

  document.getElementById('nextMonth').onclick = function() {
    moveSound.currentTime = 0;
    moveSound.play();
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
  };

  document.getElementById('todayBtn').onclick = function() {
    moveSound.currentTime = 0;
    moveSound.play();
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    renderCalendar(currentMonth, currentYear);
  };

  renderCalendar(currentMonth, currentYear);
});