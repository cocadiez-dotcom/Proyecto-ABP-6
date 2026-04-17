
        // ========== MENÚ HAMBURGUESA ==========
        const menuBtn = document.getElementById('menuBtn');
        const menuFlotante = document.getElementById('menuFlotante');

        // Abrir/cerrar menú al hacer clic en el botón
        if (menuBtn && menuFlotante) {
            menuBtn.addEventListener('click', function (event) {
                event.stopPropagation();
                menuFlotante.classList.toggle('active');
            });

            // Cerrar al hacer clic fuera
            document.addEventListener('click', function (event) {
                if (!menuBtn.contains(event.target) && !menuFlotante.contains(event.target)) {
                    menuFlotante.classList.remove('active');
                }
            });

            // Cerrar al hacer clic en un enlace
            document.querySelectorAll('.menu-flotante a').forEach(link => {
                link.addEventListener('click', function () {
                    menuFlotante.classList.remove('active');
                });
            });
        }

        // ========== SCROLL PARA LOS ENLACES ==========
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // ========== FORMULARIO DE CONTACTO ==========
        document.addEventListener("DOMContentLoaded", function () {
            const form = document.getElementById('contactForm');
            const alertBox = document.getElementById('formAlert');
            const button = form?.querySelector("button");

            if (!form) {
                console.error("Formulario no encontrado");
                return;
            }

            form.addEventListener('submit', async function (event) {
                event.preventDefault();

                const nombre = form.querySelector('#nombre');
                const email = form.querySelector('#email');
                const mensaje = form.querySelector('#mensaje');

                let isValid = true;

                // Validar nombre
                if (!nombre.value.trim()) {
                    nombre.classList.add('is-invalid');
                    isValid = false;
                } else {
                    nombre.classList.remove('is-invalid');
                    nombre.classList.add('is-valid');
                }

                // Validar email
                if (!email.value.trim() || !email.value.includes('@')) {
                    email.classList.add('is-invalid');
                    isValid = false;
                } else {
                    email.classList.remove('is-invalid');
                    email.classList.add('is-valid');
                }

                // Validar mensaje
                if (!mensaje.value.trim()) {
                    mensaje.classList.add('is-invalid');
                    isValid = false;
                } else {
                    mensaje.classList.remove('is-invalid');
                    mensaje.classList.add('is-valid');
                }

                if (!isValid) {
                    alertBox.classList.remove('d-none', 'alert-success');
                    alertBox.classList.add('alert-danger');
                    alertBox.innerText = "Por favor completa todos los campos correctamente.";
                    return;
                }

                button.innerText = "Enviando...";
                button.disabled = true;

                const data = new FormData(form);

                try {
                    const response = await fetch(form.action, {
                        method: "POST",
                        body: data,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        alertBox.classList.remove('d-none', 'alert-danger');
                        alertBox.classList.add('alert-success');
                        alertBox.innerText = "¡Mensaje enviado correctamente!";

                        form.reset();

                        form.querySelectorAll('.form-control').forEach(el => {
                            el.classList.remove('is-valid', 'is-invalid');
                        });
                    } else {
                        throw new Error();
                    }
                } catch (error) {
                    alertBox.classList.remove('d-none', 'alert-success');
                    alertBox.classList.add('alert-danger');
                    alertBox.innerText = "Error al enviar. Intenta nuevamente.";
                }

                button.innerText = "Enviar";
                button.disabled = false;
            });
        });