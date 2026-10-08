/* ==========================================================================
   INTERACTIVIDAD Y ANIMACIONES: INVITACIÓN WEB DE XV AÑOS - TATIANA TAIRIN
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. MOTOR DE PARTÍCULAS (PÉTALOS VERDE MENTA & POLVO DE ESTRELLAS)
    // ==========================================================================
    const canvas = document.getElementById('particlesCanvas');
    const ctx = canvas.getContext('2d');

    // Configuración del tamaño del canvas adaptado a la pantalla
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Arreglos de partículas
    const petals = [];
    const sparkles = [];
    const maxPetals = 25;   // Cantidad optimizada para rendimiento móvil
    const maxSparkles = 30;

    // Clase para los Pétalos de color Verde Menta / Salvia
    class Petal {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -Math.random() * canvas.height;
            this.size = Math.random() * 12 + 8; // Tamaño de 8px a 20px
            this.speedY = Math.random() * 1.3 + 0.7; // Velocidad de caída
            this.speedX = Math.random() * 1 - 0.5; // Vaivén horizontal
            this.angle = Math.random() * 360;
            this.rotationSpeed = Math.random() * 2 - 1; // Velocidad de rotación
            // Tonos de verde menta, salvia y destello lila basado en la paleta
            const colors = [
                'rgba(206, 251, 233, 0.7)', // Menta muy claro
                'rgba(154, 228, 207, 0.65)', // Menta de acento
                'rgba(84, 110, 106, 0.55)',   // Verde Salvia oscuro
                'rgba(232, 219, 228, 0.6)'    // Lila/rosa grisáceo claro
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.y / 30) * 0.4; // Movimiento sinusoidal suave
            this.angle += this.rotationSpeed;

            // Reiniciar si sale de la pantalla
            if (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.angle * Math.PI) / 180);
            ctx.fillStyle = this.color;
            
            // Dibujar un pétalo estilizado en forma de hoja usando curvas de Bézier
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
            ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
            ctx.fill();
            
            ctx.restore();
        }
    }

    // Clase para el Polvo de Estrellas/Destellos Dorados
    class Sparkle {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 2 + 1;
            this.speedY = Math.random() * 0.8 + 0.3;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.opacity = Math.random() * 0.8 + 0.2;
            this.fadeSpeed = Math.random() * 0.02 + 0.005;
            this.color = `rgba(197, 160, 89, ${this.opacity})`; // Oro metálico
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            
            // Efecto parpadeo
            this.opacity -= this.fadeSpeed;
            if (this.opacity <= 0) {
                this.reset();
            }

            if (this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(197, 160, 89, ${this.opacity})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(197, 160, 89, 0.8)';
            ctx.fill();
            ctx.restore();
        }
    }

    // Inicializar partículas
    for (let i = 0; i < maxPetals; i++) {
        petals.push(new Petal());
    }
    for (let i = 0; i < maxSparkles; i++) {
        sparkles.push(new Sparkle());
    }

    // Ciclo de Animación
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Actualizar y dibujar destellos (fondo)
        sparkles.forEach(sparkle => {
            sparkle.update();
            sparkle.draw();
        });

        // Actualizar y dibujar pétalos menta (frente)
        petals.forEach(petal => {
            petal.update();
            petal.draw();
        });

        requestAnimationFrame(animateParticles);
    }
    animateParticles();


    // ==========================================================================
    // 2. CUENTA REGRESIVA (COUNTDOWN)
    // ==========================================================================
    const countdownEl = document.getElementById('countdown');
    const targetDateString = countdownEl.getAttribute('data-date');
    const targetDate = new Date(targetDateString).getTime();

    const daysVal = document.getElementById('days');
    const hoursVal = document.getElementById('hours');
    const minutesVal = document.getElementById('minutes');
    const secondsVal = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            // El evento ya ocurrió
            daysVal.innerText = '00';
            hoursVal.innerText = '00';
            minutesVal.innerText = '00';
            secondsVal.innerText = '00';
            clearInterval(countdownInterval);
            return;
        }

        // Cálculos de tiempo
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        // Formato con ceros
        daysVal.innerText = d < 10 ? '0' + d : d;
        hoursVal.innerText = h < 10 ? '0' + h : h;
        minutesVal.innerText = m < 10 ? '0' + m : m;
        secondsVal.innerText = s < 10 ? '0' + s : s;
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    // 3. REPRODUCTOR DE MÚSICA FLOTANTE (CON AUTOPLAY INSTANTÁNEO Y TRUCO DE SILENCIO)
    // ==========================================================================
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const musicContainer = document.getElementById('musicContainer');
    
    // Nivel de volumen cómodo
    bgMusic.volume = 0.45;

    // Alternar Reproducción / Pausa
    function toggleMusic() {
        if (bgMusic.paused) {
            bgMusic.muted = false; // Asegurar que no esté silenciado al activar manualmente
            bgMusic.play()
                .then(() => {
                    playIcon.classList.add('hidden');
                    pauseIcon.classList.remove('hidden');
                    musicContainer.classList.add('playing');
                })
                .catch(err => {
                    console.log("Error al reproducir audio:", err);
                });
        } else {
            bgMusic.pause();
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
            musicContainer.classList.remove('playing');
        }
    }

    // El botón flotante detiene/reproduce la música directamente
    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar disparadores de interacción global
        toggleMusic();
    });

    // Iniciar con Autoplay Silenciado (Evita bloqueo del navegador e inicia el buffer de red de inmediato)
    function startMutedAutoplay() {
        bgMusic.muted = true;
        bgMusic.play()
            .then(() => {
                // Autoplay silenciado aceptado por el navegador
                playIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
                musicContainer.classList.add('playing');
            })
            .catch(() => {
                // Incluso silenciado requiere interacción en algunos casos muy estrictos
            });
    }

    // Desmutear o reproducir al primer micro-contacto (touch, scroll, click, mouse)
    function activateAudio() {
        bgMusic.muted = false;
        bgMusic.play()
            .then(() => {
                playIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
                musicContainer.classList.add('playing');
                removeAudioTriggers();
            })
            .catch(err => {
                console.log("Esperando gesto táctil adicional para el audio...", err);
            });
    }

    // Eventos de interacción de pantalla sumamente veloces
    const audioTriggers = ['touchstart', 'mousedown', 'pointerdown', 'keydown'];

    function removeAudioTriggers() {
        audioTriggers.forEach(event => {
            document.removeEventListener(event, activateAudio);
        });
        bgMusic.removeEventListener('canplay', startMutedAutoplay);
    }

    // Registrar disparadores instantáneos (sin 'once' para permitir reintentos si el buffer de red aún no está listo)
    audioTriggers.forEach(event => {
        document.addEventListener(event, activateAudio, { passive: true });
    });

    // Control del botón de "Descubre los detalles" para desbloquear scroll y arrancar música
    const discoverBtn = document.getElementById('discoverBtn');
    if (discoverBtn) {
        discoverBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Evitar comportamiento de enlace por defecto
            
            // 1. Desbloquear el scroll del cuerpo
            document.body.classList.remove('scroll-blocked');
            
            // 2. Arrancar la música con volumen (desmutear)
            bgMusic.muted = false;
            bgMusic.play()
                .then(() => {
                    playIcon.classList.add('hidden');
                    pauseIcon.classList.remove('hidden');
                    musicContainer.classList.add('playing');
                })
                .catch(err => {
                    console.log("El audio fue bloqueado al hacer clic en descubrir:", err);
                });
            
            // 3. Desactivar otros triggers de audio global
            removeAudioTriggers();
            // 4. Desplazamiento suave a la sección de la frase y primera fotografía
            const targetSection = document.getElementById('quote-photo-section') || document.getElementById('countdown-section');
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Iniciar el buffer e intentar reproducir silenciado tan pronto como llegue el audio
    bgMusic.addEventListener('canplay', startMutedAutoplay);
    
    // Intento inicial inmediato por si el navegador es permisivo o el archivo ya está en caché
    startMutedAutoplay();



    // ==========================================================================
    // 4. MODAL DE CÓDIGO DE VESTIMENTA (DRESS CODE) - COMPROBACIÓN SEGURA
    // ==========================================================================
    const dressCodeBtn = document.getElementById('dressCodeBtn');
    const dressCodeModal = document.getElementById('dressCodeModal');
    const closeModal = document.getElementById('closeModal');

    if (dressCodeBtn && dressCodeModal) {
        dressCodeBtn.addEventListener('click', () => {
            dressCodeModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });

        function hideModal() {
            dressCodeModal.classList.remove('show');
            document.body.style.overflow = '';
        }

        if (closeModal) {
            closeModal.addEventListener('click', hideModal);
        }
        
        window.addEventListener('click', (e) => {
            if (e.target === dressCodeModal) {
                hideModal();
            }
        });
    }


    // ==========================================================================
    // 5. ANIMACIONES DE APARICIÓN SUAVE (FADE-IN AL HACER SCROLL)
    // ==========================================================================
    const fadeElements = document.querySelectorAll('.fade-in-scroll');

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(element => {
        scrollObserver.observe(element);
    });


    // ==========================================================================
    // 6. FORMULARIO DE RSVP E INTEGRACIÓN CON WHATSAPP
    // ==========================================================================
    const rsvpForm = document.getElementById('rsvpForm');
    const rsvpSuccess = document.getElementById('rsvpSuccessMessage');
    const submitBtn = document.getElementById('submitBtn');

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const guestName = document.getElementById('guestName').value.trim();
        const attending = document.getElementById('attending').value;
        const phone = document.getElementById('whatsappPhone').value;

        // Formatear Mensaje Elegante
        let message = `*¡Confirmación de Asistencia - XV de Tatiana Tairin!* \n\n`;
        message += `*Nombre:* ${guestName}\n`;
        
        if (attending === 'si') {
            message += `*¿Asistirá?:* ¡Sí asisto! 🎉\n\n`;
            message += `_¡Estoy muy emocionado de acompañar a Tatiana Tairin en esta gran gala de sus Quince Años!_`;
        } else {
            message += `*¿Asistirá?:* No asisto 😔\n\n`;
            message += `_Le deseo un día mágico y lleno de luz a Tatiana Tairin. ¡Muchas felicidades!_`;
        }

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;

        submitBtn.style.opacity = '0.5';
        submitBtn.setAttribute('disabled', 'true');

        rsvpForm.classList.add('hidden');
        rsvpSuccess.classList.remove('hidden');

        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            setTimeout(() => {
                rsvpForm.classList.remove('hidden');
                rsvpSuccess.classList.add('hidden');
                rsvpForm.reset();
                submitBtn.style.opacity = '1';
                submitBtn.removeAttribute('disabled');
            }, 3000);
        }, 1500);
    });


    // ==========================================================================
    // 7. DESPLAZAMIENTO SUAVE ADICIONAL (SMOOTH SCROLL)
    // ==========================================================================
    const scrollButtons = document.querySelectorAll('.scroll-to');
    
    scrollButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
