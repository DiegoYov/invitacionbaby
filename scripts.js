document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const openBtn = document.getElementById('open-invitation');
  const closeBtn = document.querySelector('.close');
  const saveBtn = document.getElementById('save-info');
  const nameInput = document.getElementById('name-input');
  const relationInputs = document.querySelectorAll('input[name="relation"]');
  const userInfo = document.getElementById('user-info');
  const displayName = document.getElementById('display-name');

  let savedName = localStorage.getItem('name');
  let savedRelation = localStorage.getItem('relation');

  if (savedName) {
    displayName.textContent = savedName;
    userInfo.style.display = 'block';
  } else {
    userInfo.style.display = 'none';
  }

  openBtn.addEventListener('click', () => {
    if (!savedName || !savedRelation) {
      modal.style.display = 'block';
    } else {
      window.location.href = 'invitacion.html';
    }
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  saveBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    let relation = '';
    relationInputs.forEach(radio => {
      if (radio.checked) relation = radio.value;
    });
    if (name && relation) {
      localStorage.setItem('name', name);
      localStorage.setItem('relation', relation);
      savedName = name;
      savedRelation = relation;
      displayName.textContent = name;
      userInfo.style.display = 'block';
      modal.style.display = 'none';
    } else {
      alert('Por favor ingresa tu nombre y selecciona una relación.');
    }
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});

// Countdown mejorado
const eventDate = new Date("Nov 2, 2025 14:00:00").getTime();
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const countdownContainer = document.querySelector(".countdown-container");

function updateCountdown() {
  const now = new Date().getTime();
  const diff = eventDate - now;

  if (diff < 0) {
    // El evento ya pasó
    countdownContainer.innerHTML = '<div class="countdown-ended">🎉 ¡Hoy es el gran día!</div>';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // Actualizar cada elemento con formato de dos dígitos
  daysElement.textContent = days.toString().padStart(2, '0');
  hoursElement.textContent = hours.toString().padStart(2, '0');
  minutesElement.textContent = minutes.toString().padStart(2, '0');
  secondsElement.textContent = seconds.toString().padStart(2, '0');
}

// Ejecutar inmediatamente y luego cada segundo
updateCountdown();
setInterval(updateCountdown, 1000);

// Personalize with name
const name = localStorage.getItem('name');
const relation = localStorage.getItem('relation');
/*if (name) {
  const h1 = document.querySelector('#bienvenida h1');
  h1.textContent = `Bienvenido ${name} al Baby Shower de Haddasha Salomé`;
}*/
if (name && relation) {
  const textPersonalizado = document.querySelector('.text-personalizado');
  textPersonalizado.textContent = `Querido/a ${name}, como ${relation} de Haddasha Salomé, eres parte de este momento tan especial. Acompáñanos en su Baby Shower y vivamos juntos una tarde de juegos, dulzura y recuerdos únicos.`;
}
