document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.querySelector('.envelope');
    const music = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const rsvpButton = document.querySelector('.rsvp-button');
    const envelopeShine = document.querySelector('.envelope-shine');

    // Configuración inicial de volumen
    music.volume = 0.3;
    
    // Función para activar la animación de brillo
    const activateShine = () => {
        envelopeShine.style.opacity = '1';
        setTimeout(() => {
            envelopeShine.style.opacity = '0';
        }, 4000);
    };
    
    // Activar brillo periódicamente en el sobre
    setInterval(activateShine, 8000);
    
    // Reproducir música automáticamente al cargar
    const playMusic = () => {
        const playPromise = music.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Reproducción automática exitosa
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            })
            .catch(error => {
                // La reproducción automática falló
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                console.log("Reproducción automática bloqueada por el navegador");
            });
        }
    };
    
    // Intentar reproducir automáticamente
    playMusic();

    // Control de reproducción de música
    playPauseBtn.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            music.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    // Control de volumen
    volumeSlider.addEventListener('input', () => {
        music.volume = volumeSlider.value;
    });

    // Animación de apertura del sobre
    envelope.addEventListener('click', () => {
        // Añadir clase para activar efectos CSS adicionales
        envelope.classList.add('opened');
        
        // Animaciones con GSAP
        gsap.to(envelope, {
            duration: 1.5,
            rotationY: 180,
            transformOrigin: "center center",
            ease: "power3.inOut",
            onComplete: () => {
                // Animar elementos dentro de la tarjeta
                gsap.from('.wedding-details', {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    delay: 0.3
                });
                
                gsap.from('.location-section', {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    delay: 0.5
                });
                
                gsap.from('.reception-info', {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    delay: 0.6
                });
                
                gsap.from('.rsvp-section', {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    delay: 0.7,
                    scale: 0.9
                });
            }
        });
        
        // Asegurarnos de que la música esté reproduciendo cuando se abre la invitación
        playMusic();
    });

    // Confirmación de asistencia simplificada
    rsvpButton.addEventListener('click', () => {
        // Crear elementos de confeti
        const colors = ['#FFD700', '#FF6347', '#8B4513', '#D2B48C', '#E8C39E', '#FFF'];
        
        // Función para crear animación de serpentinas
        function createConfetti() {
            for (let i = 0; i < 100; i++) {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = Math.random() * 10 + 5 + 'px';
                confetti.style.height = Math.random() * 5 + 15 + 'px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = -20 + 'px';
                confetti.style.borderRadius = '2px';
                confetti.style.zIndex = '9999';
                document.body.appendChild(confetti);
                
                // Animación de caída
                gsap.to(confetti, {
                    y: window.innerHeight + 100,
                    x: '+=' + (Math.random() * 100 - 50),
                    rotation: Math.random() * 360,
                    duration: Math.random() * 3 + 2,
                    ease: 'power1.out',
                    onComplete: () => {
                        document.body.removeChild(confetti);
                    }
                });
            }
        }
        
        // Mostrar mensaje de confirmación
        Swal.fire({
            title: '¡Gracias por confirmar!',
            html: `
                <div style="line-height: 1.6; padding: 10px;">
                    <p style="font-size: 1.2rem; margin-bottom: 15px;">Te esperamos en nuestra boda</p>
                    <p style="font-family: 'Great Vibes', cursive; font-size: 1.8rem; color: #8B4513;">¡Será un día inolvidable!</p>
                </div>
            `,
            icon: 'success',
            confirmButtonColor: '#8B4513',
            background: '#F9F5EB',
            confirmButtonText: 'Estamos felices',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            didOpen: () => {
                createConfetti();
            }
        });
    });
    
    // Efecto hover en el mapa
    const mapContainer = document.querySelector('.map-container');
    mapContainer.addEventListener('mouseenter', () => {
        gsap.to(mapContainer, {
            scale: 1.02,
            duration: 0.3,
            ease: "power1.out"
        });
    });
    
    mapContainer.addEventListener('mouseleave', () => {
        gsap.to(mapContainer, {
            scale: 1,
            duration: 0.3,
            ease: "power1.out"
        });
    });
});