// Obtener eventos desde localStorage
function obtenerEventos() {
    return JSON.parse(localStorage.getItem('eventos')) || [];
}

// Guardar eventos en localStorage
function guardarEventos(eventos) {
    localStorage.setItem('eventos', JSON.stringify(eventos));
}

function mostrarLoader() {
    document.getElementById('loader').classList.remove('hidden');
}
function ocultarLoader() {
    document.getElementById('loader').classList.add('hidden');
}

// funciones para mostrar cada seccion
function mostrarFormRegistro(){
    mostrarLoader();
    setTimeout(() => {
        document.getElementById("formFeria").classList.remove("hidden");
        document.getElementById("formEmp").classList.add("hidden");
        document.getElementById("formServ").classList.add("hidden");
        document.getElementById("listaEvents").classList.add("hidden");
        ocultarLoader();
    }, 600);
}

function mostrarFormEmprendimiento(){
    mostrarLoader();
    setTimeout(() => {
        document.getElementById("formFeria").classList.add("hidden");
        document.getElementById("formEmp").classList.remove("hidden");
        document.getElementById("formServ").classList.add("hidden");
        document.getElementById("listaEvents").classList.add("hidden");
        ocultarLoader();
    }, 600);
}

function mostrarFormServicio(){
    mostrarLoader();
    setTimeout(() => {
        document.getElementById("formFeria").classList.add("hidden");
        document.getElementById("formEmp").classList.add("hidden");
        document.getElementById("formServ").classList.remove("hidden");
        document.getElementById("listaEvents").classList.add("hidden");
        ocultarLoader();
    }, 600);
}

function mostrarSeccionEventos(){
    mostrarLoader();
    setTimeout(() => {
        document.getElementById("formFeria").classList.add("hidden");
        document.getElementById("formEmp").classList.add("hidden");
        document.getElementById("formServ").classList.add("hidden");
        document.getElementById("listaEvents").classList.remove("hidden");
        mostrarEventos();
        ocultarLoader();
    }, 600);
}

function borrarFeria(idx) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará la feria y todos sus emprendimientos y servicios asociados.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const eventos = obtenerEventos();
            eventos.splice(idx, 1);
            guardarEventos(eventos);
            mostrarEventos();
            Swal.fire('Eliminado', 'La feria ha sido eliminada.', 'success');
        }
    });
}

function borrarEmprendimiento(idxFeria, idxEmp) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará el emprendimiento y todos sus servicios/productos.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const eventos = obtenerEventos();
            eventos[idxFeria].emprendimientos.splice(idxEmp, 1);
            guardarEventos(eventos);
            mostrarEventos();
            Swal.fire('Eliminado', 'El emprendimiento ha sido eliminado.', 'success');
        }
    });
}

// Mostrar eventos ordenados por fecha de inicio con sus emprendimientos y servicios
function mostrarEventos() {
    const contenedor = document.getElementById('listaEventos');
    const eventos = obtenerEventos().sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio));
    contenedor.innerHTML = '';

    eventos.forEach((evento, iEvento) => {
        const div = document.createElement('div');
        div.className = 'evento';
        div.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                <h3>${evento.nombre}</h3>
                <button class="btn-borrar-feria" onclick="borrarFeria(${iEvento})">🗑️</button>
            </div>
            <p><strong>Fecha de inicio:</strong> ${evento.fechaInicio}</p>
            <p><strong>Fecha de finalización:</strong> ${evento.fechaFin}</p>
            <p><strong>Horario:</strong> ${evento.horaInicio} - ${evento.horaFin}</p>
            <h4>Emprendimientos:</h4>
            <ul>
                ${evento.emprendimientos.map((emp, iEmp) => `
                    <li style="margin-bottom:10px;">
                        <div style='display:flex;justify-content:space-between;align-items:center;gap:8px;'>
                            <span><strong>${emp.nombre}</strong> (<em>${emp.categoria}</em>)</span>
                            <button class="btn-borrar-emp" onclick="borrarEmprendimiento(${iEvento},${iEmp})">🗑️</button>
                        </div>
                        <span>${emp.descripcion}</span><br>
                        <a href="${emp.enlace}" target="_blank">${emp.enlace}</a>
                        <ul>
                            <strong>Servicios/Productos:</strong>
                            ${emp.servicios && emp.servicios.length > 0 ? emp.servicios.map(serv => `
                                <li>
                                    <b>${serv.nombre}</b> - $${serv.precio}<br>
                                    ${serv.descripcion}<br>
                                    ${serv.img ? `<img src="${serv.img}" alt="${serv.nombre}" style="max-width:100px;max-height:100px;">` : ''}
                                </li>
                            `).join('') : '<li>No hay servicios/productos registrados.</li>'}
                        </ul>
                    </li>
                `).join('')}
            </ul>
        `;
        contenedor.appendChild(div);
    });

    actualizarSelectEventos();
    actualizarSelectsServicios();
}

// Actualizar el <select> de eventos para registrar emprendimientos
function actualizarSelectEventos() {
    const select = document.getElementById('eventoSelect');
    if (!select) return;
    const eventos = obtenerEventos();
    select.innerHTML = '<option value="" disabled selected>Selecciona un evento</option>' +
        eventos.map((e, i) => `<option value="${i}">${e.nombre}</option>`).join('');
}

// Actualizar los <select> de eventos y emprendimientos para registrar servicios
function actualizarSelectsServicios() {
    const eventoSelect = document.getElementById('eventoServicioSelect');
    const empSelect = document.getElementById('emprendimientoServicioSelect');
    const eventos = obtenerEventos();
    if (!eventoSelect || !empSelect) return;
    eventoSelect.innerHTML = '<option value="" disabled selected>Selecciona un evento</option>' +
        eventos.map((e, i) => `<option value="${i}">${e.nombre}</option>`).join('');
    empSelect.innerHTML = '<option value="" disabled selected>Selecciona un emprendimiento</option>';
    eventoSelect.onchange = function() {
        const idx = this.value;
        if (eventos[idx] && eventos[idx].emprendimientos.length > 0) {
            empSelect.innerHTML = eventos[idx].emprendimientos.map((emp, i) => `<option value="${i}">${emp.nombre}</option>`).join('');
        } else {
            empSelect.innerHTML = '<option value="" disabled selected>No hay emprendimientos</option>';
        }
    };
}

// Evento: Registrar evento o feria
// Incluye validación básica y validaciones realistas

document.getElementById('formEvento').addEventListener('submit', function (e) {
    e.preventDefault();
    const nombre = document.getElementById('nombreEvento').value.trim();
    const fechaInicio = document.getElementById('fechaEventoInicio').value;
    const fechaFin = document.getElementById('fechaEventoFinal').value;
    const horaInicio = document.getElementById('horaInicio').value;
    const horaFin = document.getElementById('horaFin').value;

    // Validaciones realistas
    if (nombre.length < 3) {
        Swal.fire({ title: "Nombre muy corto", text: "El nombre del evento debe tener al menos 3 caracteres.", icon: "warning" });
        return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaInicio) || !/^\d{4}-\d{2}-\d{2}$/.test(fechaFin)) {
        Swal.fire({ title: "Fecha inválida", text: "Las fechas deben tener el formato correcto.", icon: "warning" });
        return;
    }
    if (fechaFin < fechaInicio) {
        Swal.fire({ title: "La fecha de fin no puede ser antes que la fecha de inicio", text: "", icon: "warning" });
        return;
    }
    if (!/^\d{2}:\d{2}$/.test(horaInicio) || !/^\d{2}:\d{2}$/.test(horaFin)) {
        Swal.fire({ title: "Hora inválida", text: "Debes ingresar horas válidas (ej: 08:00)", icon: "warning" });
        return;
    }
    if (horaFin <= horaInicio) {
        Swal.fire({ title: "Hora final inválida", text: "La hora final debe ser mayor que la hora de inicio.", icon: "warning" });
        return;
    }
    if (!nombre || !fechaInicio || !fechaFin || !horaInicio || !horaFin) {
        Swal.fire({ title: "Campos Incompletos", text: "Por favor completa todos los campos", icon: "warning" });
        return;
    }
    const eventos = obtenerEventos();
    eventos.push({ nombre, fechaInicio, fechaFin, horaInicio, horaFin, emprendimientos: [] });
    guardarEventos(eventos);
    this.reset();
    Swal.fire({ title: "Feria Registrada con Exito", text: "", icon: "success" });
    mostrarEventos();
});

// Evento: Registrar emprendimiento en evento
if(document.getElementById('formEmprendimiento')){
    document.getElementById('formEmprendimiento').addEventListener('submit', function (e) {
        e.preventDefault();
        const index = document.getElementById('eventoSelect').value;
        const nombre = document.getElementById('nombreEmprendimiento').value.trim();
        const categoria = document.getElementById('categoria').value.trim();
        const descripcion = document.getElementById('descripcionEmp').value.trim();
        const enlace = document.getElementById('enlace').value.trim();
        // Validaciones realistas
        if (nombre.length < 3) {
            Swal.fire({ title: "Nombre muy corto", text: "El nombre del emprendimiento debe tener al menos 3 caracteres.", icon: "warning" });
            return;
        }
        if (categoria.length < 3) {
            Swal.fire({ title: "Categoría muy corta", text: "La categoría debe tener al menos 3 caracteres.", icon: "warning" });
            return;
        }
        if (descripcion.length < 10) {
            Swal.fire({ title: "Descripción muy corta", text: "La descripción debe tener al menos 10 caracteres.", icon: "warning" });
            return;
        }
        if (!/^https?:\/\//.test(enlace)) {
            Swal.fire({ title: "Enlace inválido", text: "El enlace debe comenzar con http:// o https://", icon: "warning" });
            return;
        }
        if(index === '' || !nombre || !categoria || !descripcion || !enlace){
            Swal.fire({ title: "Campos Incompletos", text: "Por favor completa todos los campos", icon: "warning" });
            return;
        }
        const eventos = obtenerEventos();
        eventos[index].emprendimientos.push({ nombre, categoria, descripcion, enlace, servicios: [] });
        guardarEventos(eventos);
        this.reset();
        Swal.fire({ title: "Emprendimiento Registrado con Exito", text: "", icon: "success" });
        mostrarEventos();
    });
}

// Evento: Registrar servicio en emprendimiento
if(document.getElementById('formServicio')){
    document.getElementById('formServicio').addEventListener('submit', function (e) {
        e.preventDefault();
        const idxEvento = document.getElementById('eventoServicioSelect').value;
        const idxEmp = document.getElementById('emprendimientoServicioSelect').value;
        const nombre = document.getElementById('nombreServicio').value.trim();
        const precio = parseFloat(document.getElementById('precio').value);
        const descripcion = document.getElementById('descripcionServicio').value.trim();
        const fotoInput = document.getElementById('foto');
        // Validaciones realistas
        if (nombre.length < 3) {
            Swal.fire({ title: "Nombre muy corto", text: "El nombre del servicio debe tener al menos 3 caracteres.", icon: "warning" });
            return;
        }
        if (isNaN(precio) || precio <= 0) {
            Swal.fire({ title: "Precio inválido", text: "El precio debe ser un número positivo.", icon: "warning" });
            return;
        }
        if (descripcion.length < 10) {
            Swal.fire({ title: "Descripción muy corta", text: "La descripción debe tener al menos 10 caracteres.", icon: "warning" });
            return;
        }
        if(idxEvento === '' || idxEmp === '' || !nombre || isNaN(precio) || !descripcion){
            Swal.fire({ title: "Campos Incompletos", text: "Por favor completa todos los campos", icon: "warning" });
            return;
        }
        // Imagen opcional
        if(fotoInput.files && fotoInput.files[0]){
            const reader = new FileReader();
            reader.onload = function(evt) {
                const img = evt.target.result;
                const eventos = obtenerEventos();
                eventos[idxEvento].emprendimientos[idxEmp].servicios.push({ nombre, precio, descripcion, img });
                guardarEventos(eventos);
                document.getElementById('formServicio').reset();
                mostrarEventos();
            };
            reader.readAsDataURL(fotoInput.files[0]);
        } else {
            const eventos = obtenerEventos();
            eventos[idxEvento].emprendimientos[idxEmp].servicios.push({ nombre, precio, descripcion });
            guardarEventos(eventos);
            document.getElementById('formServicio').reset();
            Swal.fire({ title: "Producto Registrado con Exito", text: "", icon: "success" });
            mostrarEventos();
        }
    });
}

// Inicializar: cargar eventos y limitar fechas
window.addEventListener('DOMContentLoaded', () => {
    mostrarEventos();
    // Limitar fechas de inicio y fin
    const hoy = new Date().toISOString().split('T')[0];
    if(document.getElementById('fechaEventoInicio'))
        document.getElementById('fechaEventoInicio').min = hoy;
    if(document.getElementById('fechaEventoFinal'))
        document.getElementById('fechaEventoFinal').min = hoy;
});

// Menú hamburguesa responsive
window.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburgerMenu');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            hamburger.setAttribute('aria-expanded', navLinks.classList.contains('show'));
        });
        // Cerrar menú al hacer clic en una opción
        navLinks.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                navLinks.classList.remove('show');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }
});