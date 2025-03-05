document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.querySelector('.envelope');
    const music = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const rsvpButton = document.querySelector('.rsvp-button');

    // Configuración inicial de volumen
    music.volume = 0.3;

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
        gsap.to(envelope, {
            duration: 1.5,
            rotationY: 180,
            transformOrigin: "center center",
            ease: "power2.inOut"
        });
    });

    // Confirmación de asistencia
    rsvpButton.addEventListener('click', () => {
        Swal.fire({
            title: 'Confirmar Asistencia',
            html: `
                <input type="text" id="name" class="swal2-input" placeholder="Nombre Completo">
                <input type="number" id="guests" class="swal2-input" placeholder="Número de Invitados">
            `,
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            preConfirm: () => {
                const name = document.getElementById('name').value;
                const guests = document.getElementById('guests').value;
                
                if (!name || !guests) {
                    Swal.showValidationMessage('Por favor, complete todos los campos');
                }
                
                return { name, guests };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    '¡Gracias!',
                    `${result.value.name}, su reserva para ${result.value.guests} persona(s) ha sido confirmada.`,
                    'success'
                );
            }
        });
    });
});