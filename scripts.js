function animateName(element) {
  const name = element.textContent;
  element.textContent = '';
  const userInfo = element.parentElement;
  let i = 0;
  const interval = setInterval(() => {
    if (i < name.length) {
      element.textContent += name[i];
      i++;
    } else {
      clearInterval(interval);
    }
  }, 150);

  // Add stars around the name
  for (let j = 0; j < 10; j++) {
    setTimeout(() => {
      const star = document.createElement('span');
      star.textContent = '✨';
      star.style.position = 'absolute';
      star.style.left = (Math.random() * 80 + 10) + '%';
      star.style.top = (Math.random() * 80 + 10) + '%';
      star.style.fontSize = '1.5rem';
      star.style.pointerEvents = 'none';
      star.style.animation = 'starFade 1.5s ease-in-out';
      star.style.animationDelay = (Math.random() * 0.5) + 's';
      userInfo.appendChild(star);
      setTimeout(() => {
        if (star.parentElement) star.remove();
      }, 1500);
    }, j * 100);
  }
}

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
      animateName(displayName);
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

if (name) {
  const question = document.getElementById('personalized-question');
  question.textContent = `¿${name}, contamos contigo?`;
}

if (name) {
  const juegosH2 = document.querySelector('#juegos .welcome-text');
  juegosH2.textContent = `Ven preparado para la diversión ${name} !`;
}

if (name) {
  const esperamosH2 = document.querySelector('#esperamos h2');
  esperamosH2.textContent = `¡${name}, te esperamos con mucho cariño!`;
}

// Audio control for invitacion.html
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('background-audio');
  const muteBtn = document.getElementById('mute-btn');

  if (audio && muteBtn) {
    audio.volume = 0.3; // Set initial volume to 30%

    let isMuted = false;

    muteBtn.addEventListener('click', () => {
      isMuted = !isMuted;
      audio.muted = isMuted;
      const icon = muteBtn.querySelector('i');
      icon.className = isMuted ? 'bi bi-volume-mute' : 'bi bi-volume-up';
    });
  }
});



// Lógica para el indicador de swipe
document.addEventListener('DOMContentLoaded', () => {
  const swipeIndicator = document.getElementById('swipe-indicator');
  const speechBubble = document.querySelector('.speech-bubble');
  const snapContainer = document.querySelector('.snap-container');
  const esperamosSection = document.getElementById('esperamos');

  function hideSwipeIndicator() {
    swipeIndicator.style.display = 'none';
  }

  // Ocultar después de 2 minutos
  setTimeout(hideSwipeIndicator, 2 * 60 * 1000);

  // Ocultar cuando llegue a la sección "Te esperamos"
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        hideSwipeIndicator();
      }
    });
  }, { threshold: 0.1 });

  if (esperamosSection) {
    observer.observe(esperamosSection);
  }

  if (speechBubble && snapContainer) {
    const hideIndicatorOnFirstScroll = () => {
      // Oculta solo el globo de texto tan pronto como el usuario se desplaza un poco
      if (snapContainer.scrollTop > 20) {
        speechBubble.classList.add('hidden');
        // Elimina el listener para que no se ejecute más
        snapContainer.removeEventListener('scroll', hideIndicatorOnFirstScroll);
      }
    };

    snapContainer.addEventListener('scroll', hideIndicatorOnFirstScroll);
  }
});

// Función para enviar datos a Google Sheets
async function enviarConfirmacion(nombre, acompanantes) {
  const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLi821gZSHUiCr1TXS-K0As6ivLXPgRvNh_ohoptVMaJkAtptU_QkxEE0Nh9fud6ZfH7tZCeIvy0uojrpzLM7pGdqurQK2xJSsLuT9sMpeUIKZ3SzrliRzhb_KSs0NVRdbxNTUdygz_5_BUky1ZUa2zBnoGNwM3jqyDjZ1iU2o9j30-bEF17ZSFjA_RQ9dGAZ2ceiXp7KhcQkBwxrcOD8Gx0CjWX5IBn3ONyTd3f12_jDobeMkn5IjaB9GTdLkEHz8FPNlRPrcxH7r3SXxps3IFUyUYTm2MDVsAtXGmm&lib=MxEWKX0QBc-YFhMMDE1yHVnUvCScSfVSR';

  console.log('Enviando datos:', { nombre, acompanantes });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: nombre,
        acompanantes: acompanantes
      })
    });

    console.log('Respuesta del servidor:', response.status, response.statusText);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Resultado:', result);
    return result;
  } catch (error) {
    console.error('Error al enviar datos:', error);
    return { success: false, message: error.message || 'Error de conexión' };
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const confirmBtn = document.getElementById('confirm-btn');
  const confirmModal = document.getElementById('confirmModal');
  const nameInput = document.getElementById('nameInput');
  /*const storedName = document.getElementById('storedName');*/
  const confirmBtnModal = document.getElementById('confirmBtn');

  const savedName = localStorage.getItem('name');

  if (savedName) {
    nameInput.value = savedName;
    /*storedName.innerText = savedName;*/
  }

  confirmBtn.addEventListener('click', () => {
    confirmModal.style.display = 'block';
  });

  confirmBtnModal.addEventListener('click', async () => {
    const nombre = nameInput.value.trim();
    const acompanantesRadio = document.querySelector('input[name="acompanantes"]:checked');

    if (!nombre) {
      alert('Por favor ingresa tu nombre.');
      return;
    }

    if (!acompanantesRadio) {
      alert('Por favor selecciona si vienes solo o acompañado.');
      return;
    }

    const acompanantes = acompanantesRadio.value;

    // Deshabilitar botón mientras envía
    confirmBtnModal.disabled = true;
    confirmBtnModal.textContent = 'Enviando...';

    const result = await enviarConfirmacion(nombre, acompanantes);

    if (result.success) {
      alert('¡Gracias! Tu confirmación ha sido registrada.');
      confirmModal.style.display = 'none';
    } else {
      alert('Error al enviar: ' + result.message);
    }

    // Rehabilitar botón
    confirmBtnModal.disabled = false;
    confirmBtnModal.textContent = 'Confirmar';
  });

  window.addEventListener('click', (e) => {
    if (e.target === confirmModal) {
      confirmModal.style.display = 'none';
    }
  });
});

function closeModal() {
  document.getElementById('confirmModal').style.display = 'none';
}

function closeWelcomeModal() {
  document.getElementById('welcomeModal').style.display = 'none';
}

// Show welcome modal on page load
document.addEventListener('DOMContentLoaded', () => {
  const welcomeModal = document.getElementById('welcomeModal');
  welcomeModal.style.display = 'block';
});

// Scroll-triggered animations
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
});
