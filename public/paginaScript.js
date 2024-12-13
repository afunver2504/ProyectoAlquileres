function toggleMenu() {
    const menuLateral = document.getElementById('menu-lateral');
    const opcionesMenu = document.getElementById('opciones-menu');
    const contenido = document.querySelector('.contenido');

    if (menuLateral.classList.contains('open')) {
        opcionesMenu.style.display = 'none';
        menuLateral.classList.remove('open');
        contenido.classList.remove('contenido-open');
    } else {
        opcionesMenu.style.display = 'flex';
        menuLateral.classList.add('open');
        contenido.classList.add('contenido-open');
    }
}

function mostrarContenido(opcion) {
    const contenido = document.getElementById('contenido-cambio');
    const menuLateral = document.getElementById('menu-lateral');
    const opcionesMenu = document.getElementById('opciones-menu');

    switch (opcion) {
        case 'horario':
            contenido.innerHTML =
                `<h2 style="text-align: center; color: #2c3e50;">Horario de Atención</h2>
            <p style="text-align: center; color: #555;">Nuestro horario de atención es el siguiente:</p>
            <table style="width: 100%; margin-top: 20px; border-collapse: collapse; background-color: #f8f9fa; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <thead>
                <tr style="background-color: #2c3e50; color: white;">
                    <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ccc;">Día</th>
                    <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ccc;">Horario</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ccc;">Lunes a Viernes</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ccc;">8:00 AM - 8:00 PM</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ccc;">Sábado</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ccc;">10:00 AM - 2:00 PM</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ccc;">Domingo</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ccc; color: #d32f2f;">Cerrado</td>
                </tr>
            </tbody>
            </table>
            <p style="text-align: center; margin-top: 20px; font-size: 14px; color: #777;">
            Si tienes alguna consulta fuera de nuestro horario, puedes contactarnos a través de nuestro correo electrónico o redes sociales. ¡Estaremos encantados de ayudarte!
            </p>`;
            break;

        case 'ubicacion':
            contenido.innerHTML =
                `<h2 style="text-align: center; color: #2c3e50;">Nuestra Ubicación</h2>
            <p style="text-align: center; color: #555;">Estamos ubicados en:</p>
            <p style="text-align: center; font-size: 18px; font-weight: bold; color: #2c3e50;">Carrer de la Riera, 26, 08397 Pineda de Mar, Barcelona</p>
            <div style="text-align: center; margin-top: 20px;">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3136.0732211469863!2d2.681722215203555!3d41.62486107924451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12bb271fa23c57f1%3A0x2bc8a153d5b2e73a!2sCarrer%20de%20la%20Riera%2C%2026%2C%2008397%20Pineda%20de%20Mar%2C%20Barcelona!5e0!3m2!1ses!2ses!4v1696604845641!5m2!1ses!2ses" 
                    width="100%" 
                    height="400" 
                    style="border:0; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);" 
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
            <p style="text-align: center; margin-top: 20px; font-size: 14px; color: #777;">
                Haz clic en el mapa para abrirlo en Google Maps y obtener indicaciones.
            </p>`;
            break;

        case 'catalogo':
            contenido.innerHTML =
                `<h2 style="text-align: center; color: #2c3e50;">Catálogo de Coches</h2>
        <p style="text-align: center; color: #555; margin-bottom: 20px;">Explora nuestra amplia gama de vehículos y selecciona el que mejor se adapte a tus necesidades.</p>
        <div class="categorias">
            ${renderCategoria("Económica", 350, [
                    { _id: "673e1afbc675a2d23d31ae4c", nombre: "Renault Clio Diesel", imagen: "image/RenaultClioDiesel.jfif", descripcion: "Compacto y económico, ideal para ciudad." },
                    { _id: "673e1afbc675a2d23d31ae4c", nombre: "Peugeot 208 Diesel", imagen: "image/Peugeot208Diesel.jfif", descripcion: "Ágil y eficiente, perfecto para trayectos cortos." },
                    { _id: "673e1afbc675a2d23d31ae4c", nombre: "Opel Corsa Gasolina", imagen: "image/OpelCorsaGasolina.webp", descripcion: "Compacto con diseño moderno y versátil." },
                    { _id: "673e1afbc675a2d23d31ae4c", nombre: "Citroen C3 Biplaza Diesel", imagen: "image/CitroenC3BiplazaDiesel.jpg", descripcion: "Diseño único, ideal para parejas o pequeños grupos." },
                ], [
                    { dias: "1-3 días", tarifaBasica: 35, tarifaPlus: 50 },
                    { dias: "4-6 días", tarifaBasica: 33, tarifaPlus: 48 },
                    { dias: "7 días", tarifaBasica: 31, tarifaPlus: 40 },
                    { dias: "1 mes", tarifaBasica: 850, tarifaPlus: 1100 },
                ])}
        
        ${renderCategoria("Gama Media", 400, [
                    { _id: "673e1afbc675a2d23d31ae4d", nombre: "Citroen C4 Diesel", imagen: "image/Citroen C4 Diesel.jfif", descripcion: "Espacioso y cómodo para viajes largos." },
                    { _id: "673e1afbc675a2d23d31ae4d", nombre: "Seat Leon Diesel", imagen: "image/Seat Leon Diesel.jpg", descripcion: "Un clásico confiable para cualquier ocasión." },
                    { _id: "673e1afbc675a2d23d31ae4d", nombre: "Ford Focus Diesel", imagen: "image/Ford Focus Diesel.jfif", descripcion: "Equilibrio perfecto entre comodidad y eficiencia." },
                ], [
                    { dias: "1-3 días", tarifaBasica: 45, tarifaPlus: 60 },
                    { dias: "4-6 días", tarifaBasica: 43, tarifaPlus: 58 },
                    { dias: "7 días", tarifaBasica: 41, tarifaPlus: 50 },
                    { dias: "1 mes", tarifaBasica: 1150, tarifaPlus: 1400 },
                ])}

        ${renderCategoria("Business", 450, [
                    { _id: "673e1afbc675a2d23d31ae4e", nombre: "Fiat Tipo Automático Diesel", imagen: "image/Fiat Tipo Automático Diesel.webp", descripcion: "Diseño elegante y excelente eficiencia." },
                    { _id: "673e1afbc675a2d23d31ae4e", nombre: "Fiat Tipo Manual Gasolina/GLP", imagen: "image/Fiat Tipo Manual Gasolina.jpg", descripcion: "Versátil y económico, adaptado a tus necesidades." },
                    { _id: "673e1afbc675a2d23d31ae4e", nombre: "Opel Insignia Diesel", imagen: "image/Opel Insignia Diesel.webp", descripcion: "Lujo y potencia para un viaje cómodo." },
                    { _id: "673e1afbc675a2d23d31ae4e", nombre: "Ford C-MAX Gasolina", imagen: "image/Ford C-MAX Gasolina.jpg", descripcion: "Espacioso y dinámico, ideal para familias." },
                ], [
                    { dias: "1-3 días", tarifaBasica: 55, tarifaPlus: 70 },
                    { dias: "4-6 días", tarifaBasica: 53, tarifaPlus: 68 },
                    { dias: "7 días", tarifaBasica: 51, tarifaPlus: 60 },
                    { dias: "1 mes", tarifaBasica: 1450, tarifaPlus: 1750 },
                ])}
        
        ${renderCategoria("Gran Turismo", 450, [
                    { _id: "673e1afbc675a2d23d31ae4f", nombre: "Land Rover con bola 300CV Diesel", imagen: "image/Land Rover.jfif", descripcion: "Potencia y lujo, perfecto para grandes desafíos." },
                ], [
                    { dias: "Por día", tarifaBasica: 140 },
                ])}
    </div>`;

            break;
        case 'contactos':
            contenido.innerHTML =
                `<h2 style="text-align: center; color: #2c3e50;">Contacto</h2>
                    <p style="text-align: center; color: #555; margin-bottom: 20px;">
                        ¿Tienes alguna pregunta? Estamos aquí para ayudarte. No dudes en ponerte en contacto con nosotros a través de cualquiera de los siguientes medios.
                    </p>
                    <div class="contacto-container">
                        <div class="contacto-item">
                            <i class="fas fa-phone"></i>
                            <div>
                                <h4>Teléfono</h4>
                                <p><a href="tel:+34664470404">664 47 04 04</a></p>
                            </div>
                        </div>
                        <div class="contacto-item">
                            <i class="fas fa-phone-alt"></i>
                            <div>
                                <h4>Teléfono Fijo</h4>
                                <p><a href="tel:+34937664755">937 664 755</a></p>
                            </div>
                        </div>
                        <div class="contacto-item">
                            <i class="fas fa-envelope"></i>
                            <div>
                                <h4>Correo Electrónico</h4>
                                <p><a href="mailto:correoempresallumacar@gmail.com">correoempresallumacar@gmail.com</a></p>
                            </div>
                        </div>
                        <div class="contacto-item">
                            <i class="fab fa-instagram"></i>
                            <div>
                                <h4>Instagram</h4>
                                <p>@llumacarAlquileres</p>
                            </div>
                        </div>
                        <div class="contacto-item">
                            <i class="fab fa-facebook"></i>
                            <div>
                                <h4>Facebook</h4>
                                <p><a href="https://www.facebook.com/p/Llumacar-Renting-100064239990153/" target="_blank">Llumacar Renting</a></p>
                            </div>
                        </div>
                    </div>`;
            break;

        case 'procedimiento':
            contenido.innerHTML = `
                    <h2 style="text-align: center; color: #2c3e50;">Términos y Condiciones del Alquiler</h2>
                    <p style="text-align: center; color: #555; margin-bottom: 20px;">Antes de realizar tu reserva, por favor lee atentamente los siguientes términos y condiciones. Este documento se complementa con el contrato que recibirás una vez confirmes tu alquiler.</p>
                    
                    <div id="terminos-condiciones">
                        <div class="termino">
                            <h3>1. Contrato de Alquiler</h3>
                            <p>El ARRENDADOR alquila al ARRENDATARIO, que sus circunstancias personales figuran en el contrato de alquiler, y este acepta y recibe el vehículo y accesorios señalados en el presente.</p>
                        </div>
                        <div class="termino">
                            <h3>2. Duración y Condiciones de Devolución</h3>
                            <p>La duración del contrato es la pactada en las condiciones particulares. La fecha de salida y la fecha prevista de devolución son de obligado cumplimiento. Si el ARRENDATARIO decide finalizar el alquiler anticipadamente o comenzar con retraso, no tendrá derecho a ningún reembolso.</p>
                        </div>
                        <div class="termino">
                            <h3>3. Prórroga del Alquiler</h3>
                            <p>En caso que el ARRENDATARIO desee prorrogar el contrato de alquiler, deberá acudir a la oficina donde alquiló el vehículo para proceder con la renovación del contrato, ya que llegado el plazo de devolución, el contrato será considerado caducado.</p>
                        </div>
                        <div class="termino">
                            <h3>4. Devolución del Vehículo</h3>
                            <p>El ARRENDATARIO se compromete a retornar el vehículo en la fecha prevista. En caso de retraso no autorizado, se generará una tarifa adicional por el tiempo extra de alquiler.</p>
                        </div>
                        <div class="termino">
                            <h3>5. Rescisión del Contrato</h3>
                            <p>En caso de incumplimiento por parte del ARRENDATARIO, accidente o avería, el ARRENDADOR puede retirar el vehículo y realizar las comprobaciones necesarias.</p>
                        </div>
                        <div class="termino">
                            <h3>6. Pertenencias Personales</h3>
                            <p>El ARRENDATARIO se compromete a retirar todas sus pertenencias personales del vehículo al momento de la devolución. El ARRENDADOR no se hace responsable de objetos olvidados.</p>
                        </div>
                        <div class="termino">
                            <h3>7. Responsabilidad y Franquicia</h3>
                            <p>La responsabilidad/fianza fijada será de 250€ en la tarifa Básica y de 750€ en la tarifa Plus. La fianza será devuelta una vez el vehículo sea revisado al finalizar el contrato.</p>
                        </div>
                        <div class="termino">
                            <h3>8. Daños no Cubiertos por el Seguro</h3>
                            <p>Si el vehículo sufre daños no cubiertos por el seguro, el importe se descontará de la fianza. Si la fianza no cubre los costos, el ARRENDATARIO se compromete a pagar la diferencia en un plazo máximo de 10 días.</p>
                        </div>
                        <div class="termino">
                            <h3>9. Uso del Vehículo</h3>
                            <p>El ARRENDATARIO se compromete a no usar el vehículo para actividades ilegales, transportar más pasajeros de los permitidos, o cualquier otro uso peligroso o no autorizado.</p>
                        </div>
                        <div class="termino">
                            <h3>10. Condiciones de los Neumáticos y Vehículo</h3>
                            <p>El ARRENDATARIO reconoce haber recibido el vehículo en perfecto estado. Si algún neumático se daña, deberá reemplazarlo por uno de similares características y condiciones.</p>
                        </div>
                        <div class="termino">
                            <h3>11. Pérdida o Daños de Accesorios</h3>
                            <p>El ARRENDATARIO deberá cubrir los gastos de pérdida o daños de accesorios, herramientas o neumáticos, y debe devolver el vehículo en perfectas condiciones para finalizar el contrato.</p>
                        </div>
                        <div class="termino">
                            <h3>12. Responsabilidad por Incidentes</h3>
                            <p>En caso de accidente o robo, el ARRENDATARIO debe informar al ARRENDADOR dentro de las primeras 12 horas. De no hacerlo, será responsable de los daños y perjuicios.</p>
                        </div>
                        <div class="termino">
                            <h3>13. Seguro y Condiciones de Conductores</h3>
                            <p>El seguro cubre solo durante el periodo del alquiler y para conductores autorizados, mayores de 24 años y con al menos 2 años de experiencia. Cualquier incidente debido a uso indebido o mala fe del conductor será responsabilidad del ARRENDATARIO.</p>
                        </div>
                        <div class="termino">
                            <h3>14. Reparaciones y Mantenimiento</h3>
                            <p>El ARRENDATARIO no podrá reclamar por el desgaste mecánico normal ni por reparaciones durante el alquiler. El mantenimiento del vehículo es responsabilidad del ARRENDATARIO.</p>
                        </div>
                        <div class="termino">
                            <h3>15. Carburante y Sanciones</h3>
                            <p>El carburante corre por cuenta del ARRENDATARIO, quien deberá reponer el combustible antes de devolver el vehículo. Además, es responsable de las sanciones derivadas de infracciones de tráfico.</p>
                        </div>
                        <div class="termino">
                            <h3>16. Exenciones del Seguro</h3>
                            <p>El seguro no cubre daños ocasionados por infracciones de tráfico. El ARRENDATARIO se compromete a pagar cualquier sanción impuesta por las autoridades competentes.</p>
                        </div>
                        <div class="termino">
                            <h3>17. Responsabilidad por Accesorios de Menores</h3>
                            <p>El ARRENDADOR no es responsable de la instalación de sistemas de sujeción para menores, ya que no son elementos obligatorios en los vehículos de alquiler según el Reglamento de Circulación.</p>
                        </div>
                        <div class="termino">
                            <h3>18. Jurisdicción</h3>
                            <p>Todas las disputas que surjan del contrato de alquiler serán resueltas por los tribunales de Arenys de Mar, renunciando ambas partes a su propio fuero.</p>
                        </div>
                        
                        <div class="aviso-contrato">
                            <p>Estos términos son un resumen de los puntos más importantes del contrato de alquiler. Todos los detalles completos y legales están especificados en el contrato firmado.</p>
                        </div>
                    </div>
                `;
            break;

        case 'contrato':
            contenido.innerHTML = `
                        <h2 style="text-align: center; color: #2c3e50;">Contrato de Alquiler</h2>
                        <p style="text-align: center; color: #555; margin-bottom: 20px;">
                            Es muy importante que rellenes correctamente todas las partes del contrato antes de proceder con tu reserva. Este contrato es el documento que deberás incluir con tu reserva para formalizar el alquiler.
                        </p>
                        
                        <div id="informacion-contrato" style="text-align: center;">
                            <p style="color: #555; margin-bottom: 20px;">
                                A continuación, puedes descargar el contrato de alquiler en formato PDF. Asegúrate de revisarlo, completarlo y firmarlo. Una vez descargado, este será el documento que deberás adjuntar al realizar la reserva.
                            </p>
                            
                            <button id="descargar-contrato" style="background-color: #2980b9; color: white; border: none; padding: 10px 20px; font-size: 16px; cursor: pointer; border-radius: 5px;">
                                Descargar Contrato
                            </button>
                
                            <p style="color: #555; font-size: 14px; margin-top: 20px;">
                                Haz clic en el botón de arriba para descargar el contrato en formato PDF.
                            </p>
                        </div>
                    `;

            document.getElementById('descargar-contrato').addEventListener('click', function () {
                const contratoUrl = "contrato/MODELO FORMULARIO ALQUILER CONVENCIONAL.pdf";
                window.location.href = contratoUrl;  
            });

            break;

        case 'reserva':
            contenido.innerHTML = `
                    <h2 style="text-align: center; color: #2c3e50;">Reserva un coche</h2>
                    <p style="text-align: center; color: #555; margin-bottom: 20px;">Selecciona un coche y haz tu reserva de forma sencilla.</p>
                    <div id="botones-coches"></div>
                    <div id="detalles-reserva" style="display: none;">
                        <h3>Detalles de la reserva</h3>
                        <div id="tarifa-detalles"></div>
                        <div id="total-precio"></div>
                    
                        <!-- Selección de la tarifa -->
                        <label for="seleccionar-tarifa">Selecciona la tarifa:</label>
                        <select id="seleccionar-tarifa">
                            <option value="Básica">Tarifa Básica</option>
                            <option value="Plus">Tarifa Plus</option>
                        </select>
            
                        <!-- Selector de fechas -->
                        <label for="fecha-inicio">Fecha de inicio:</label>
                        <input type="date" id="fecha-inicio" />
                        <label for="fecha-fin">Fecha de fin:</label>
                        <input type="date" id="fecha-fin" />
                    
                        <label for="contrato-upload">Sube tu contrato firmado (PDF):</label>
                        <input type="file" id="contrato-upload" accept=".pdf" />
                        <button id="confirmar-reserva">Confirmar Reserva</button>
                    </div>
                `;
            renderCochesReserva();
            break;

            case 'tus-reservas':
                contenido.innerHTML = `
                    <h2 style="text-align: center; color: #2c3e50;">Tus Reservas</h2>
                    <p style="text-align: center; color: #555; margin-bottom: 20px;">Visualiza tus reservas realizadas aquí.</p>
                    <div id="lista-reservas" class="reservas-contenedor"></div>
                `;
                renderTusReservas(); 
                break;
        default:
            contenido.innerHTML = '<p>Descripción inicial (Lorem ipsum)</p>';
            break;
    }

    contenido.classList.add('contenido-open');
    opcionesMenu.style.display = 'none';
    menuLateral.classList.remove('open');
    contenido.classList.remove('contenido-open');
}

function renderCategoria(nombre, fianza, vehiculos, tarifas) {
    const vehiculosHtml = vehiculos.map(v => `
        <li onclick="mostrarDetalles('${v._id}', '${v.nombre}', '${v.descripcion}', '${v.imagen}')">
            <img src="${v.imagen}" alt="${v.nombre}" style="width: 150px; height: 100px; object-fit: cover;">
            <h4>${v.nombre}</h4>
            <p>${v.descripcion}</p>
        </li>
    `).join('');

    const tarifasHtml = tarifas.map(t => `
        <tr>
            <td>${t.dias}</td>
            <td>${t.tarifaBasica}€</td>
            <td>${t.tarifaPlus ? t.tarifaPlus + "€" : "N/A"}</td>
        </tr>
    `).join('');

    return `
        <div class="categoria">
            <h3>${nombre}</h3>
            <p>Fianza: ${fianza}€</p>
            <ul class="vehiculos">${vehiculosHtml}</ul>
            <table class="tarifas">
                <thead>
                    <tr>
                        <th>Días</th>
                        <th>Tarifa Básica</th>
                        <th>Tarifa Plus</th>
                    </tr>
                </thead>
                <tbody>${tarifasHtml}</tbody>
            </table>
        </div>
    `;
}


function mostrarDetalles(id, nombre, descripcion, imagen) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${nombre}</h2>
            <p>${descripcion}</p>
            <img src="${imagen}" alt="${nombre}" />
            <button onclick="cerrarModal()">Cerrar</button>
        </div>
    `;
    document.body.appendChild(modal);

}

async function renderCochesReserva() {
    try {
        const response = await fetch('http://localhost:5000/vehicles/');
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        const coches = await response.json();

        const botonesCoches = document.getElementById("botones-coches");
        if (!botonesCoches) {
            throw new Error("Elemento 'botones-coches' no encontrado.");
        }

        botonesCoches.innerHTML = '';

        coches.forEach(coche => {
            const imagenCoche = obtenerRutaImagen(coche.name);
            const button = document.createElement("button");
            button.classList.add("boton-coche");
            button.onclick = () => seleccionarCoche(coche._id, coche.name);
            button.innerHTML = `
                <img src="${imagenCoche}" style="width: 150px; height: 100px; object-fit: cover;">
                <h4>${coche.name}</h4>
            `;
            botonesCoches.appendChild(button);
        });
    } catch (error) {
        console.error("Error al cargar los coches:", error);
        alert("No se pudieron cargar los coches.");
    }
}

function obtenerRutaImagen(nombreCoche) {
    const imagenes = {
        "Renault Clio Diesel": "image/RenaultClioDiesel.jfif",
        "Peugeot 208 Diesel": "image/Peugeot208Diesel.jfif",
        "Opel Corsa Gasolina": "image/OpelCorsaGasolina.webp",
        "Citroen C3 Biplaza Diesel": "image/CitroenC3BiplazaDiesel.jpg",
        "Citroen C4 Diesel": "image/Citroen C4 Diesel.jfif",
        "Seat Leon Diesel": "image/Seat Leon Diesel.jpg",
        "Ford Focus Diesel": "image/Ford Focus Diesel.jfif",
        "Fiat Tipo Automático Diesel": "image/Fiat Tipo Automático Diesel.webp",
        "Fiat Tipo Manual Gasolina/GLP": "image/Fiat Tipo Manual Gasolina.jpg",
        "Opel Insignia Diesel": "image/Opel Insignia Diesel.webp",
        "Ford C-MAX Gasolina": "image/Ford C-MAX Gasolina.jpg",
        "Land Rover con bola 300CV Diesel": "image/Land Rover.jfif"
    };

    return imagenes[nombreCoche]
}

async function seleccionarCoche(cocheId, cocheNombre) {
    try {
        const response = await fetch(`http://localhost:5000/vehicles/${cocheId}`);
        
        if (!response.ok) {
            throw new Error('Error al obtener los detalles del coche.');
        }
        
        document.getElementById('detalles-reserva').style.display = 'block';
        document.getElementById('botones-coches').style.display = 'none';

        const detallesReserva = `
            <h3>Reserva para ${cocheNombre}</h3>
        `;
        document.getElementById('tarifa-detalles').innerHTML = detallesReserva;

        document.getElementById('fecha-inicio').addEventListener('change', () => actualizarPrecio());
        document.getElementById('fecha-fin').addEventListener('change', () => actualizarPrecio());
        document.getElementById('seleccionar-tarifa').addEventListener('change', () => actualizarPrecio());
        document.getElementById('confirmar-reserva').addEventListener('click', () => confirmarReserva(cocheId, cocheNombre));
    } catch (error) {
        console.error('Error al seleccionar el coche:', error);
        alert('No se pudieron cargar los detalles del coche.');
    }
}


function actualizarPrecio(car) {
    const fechaInicio = document.getElementById('fecha-inicio').value;
    const fechaFin = document.getElementById('fecha-fin').value;
    const tarifaSeleccionada = document.getElementById('seleccionar-tarifa').value;

    if (fechaInicio && fechaFin) {
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);

        if (inicio > fin) {
            alert('La fecha de inicio no puede ser posterior a la fecha de fin.');
            return;
        }

        const diasReserva = calcularDiasReserva(fechaInicio, fechaFin);

        const tarifa = car.tariff.find(
            t => t.type.toLowerCase().trim() === tarifaSeleccionada.toLowerCase().trim()
        );

        if (!tarifa) {
            alert('Tarifa no encontrada para este vehículo.');
            return;
        }

        let precioDiario = 0;
        if (diasReserva >= 1 && diasReserva <= 3) {
            precioDiario = tarifa.prices["1-3_days"];
        } else if (diasReserva >= 4 && diasReserva <= 6) {
            precioDiario = tarifa.prices["4-6_days"];
        } else if (diasReserva === 7) {
            precioDiario = tarifa.prices["7_days"];
        } else if (diasReserva >= 30) {
            precioDiario = tarifa.prices["1_month"];
        }

        if (precioDiario === 0) {
            alert('La duración de la reserva no es válida.');
            return;
        }

        const precioTotal = precioDiario * diasReserva;
        document.getElementById('precio-tarifa').innerText = `${precioTotal}`;
    }
}


function calcularDiasReserva(fechaInicio, fechaFin) {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const diferenciaTiempo = fin - inicio;
    const dias = diferenciaTiempo / (1000 * 3600 * 24);
    return dias;
}

async function obtenerCochePorId(cocheId) {
    console.log("Obteniendo coche con ID:", cocheId);
    try {
        const response = await fetch(`http://localhost:5000/vehicles/${cocheId}`);
        const coche = await response.json();
        if (!response.ok) {
            console.log(coche);
            throw new Error("Coche no encontrado");
        }

        console.log("Coche recuperado:", coche);
        return coche;
    } catch (error) {
        console.error("Error al obtener coche:", error);
    }
}

async function confirmarReserva(cocheId) {
    const fechaInicio = document.getElementById('fecha-inicio').value;
    const fechaFin = document.getElementById('fecha-fin').value;
    const tarifaSeleccionada = document.getElementById('seleccionar-tarifa').value;
    const contratoFile = document.getElementById('contrato-upload').files[0];

    if (!contratoFile || contratoFile.type !== 'application/pdf') {
        alert("El archivo debe ser un PDF.");
        return;
    }

    const coche = await obtenerCochePorId(cocheId);
    if (!coche) {
        alert("No se pudo encontrar los detalles del coche.");
        return;
    }

    const tarifa = coche.tariff.find(t => t.type.toLowerCase().trim() === tarifaSeleccionada.toLowerCase().trim());
    if (!tarifa) {
        alert("Tarifa no encontrada.");
        return;
    }

    let totalPrice = 0;

    const fechaInicioObj = new Date(fechaInicio);
    const fechaFinObj = new Date(fechaFin);
    const diferenciaEnDias = Math.ceil((fechaFinObj - fechaInicioObj) / (1000 * 3600 * 24));

    if (diferenciaEnDias <= 3) {
        totalPrice = tarifa.prices["1-3_days"] * diferenciaEnDias;
    } else if (diferenciaEnDias <= 6) {
        totalPrice = tarifa.prices["4-6_days"] * diferenciaEnDias;
    } else if (diferenciaEnDias <= 7) {
        totalPrice = tarifa.prices["7_days"] * diferenciaEnDias;
    } else {
        totalPrice = tarifa.prices["1_month"];
    }

    totalPrice += tarifa.deposit;

    const formData = new FormData();
    formData.append("carId", cocheId);
    formData.append("tariffType", tarifaSeleccionada);
    formData.append("startDate", fechaInicio);
    formData.append("endDate", fechaFin);
    formData.append("contract", contratoFile);
    formData.append("totalPrice", totalPrice);

    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:5000/reservations/createReservation', {
            method: 'POST',
            body: formData,
            headers: {
                'x-auth-token': token
            }
        });

        if (response.ok) {
            alert("Reserva realizada correctamente.");
        } else {
            const errorData = await response.json();
            console.error("Error en la solicitud:", errorData);
            alert(errorData.message || "Error en la reserva.");
        }
    } catch (error) {
        alert("Error en la reserva.");
    }
}

async function renderTusReservas() {
    try {
        const userId = localStorage.getItem('userId');
        
        console.log('ID de usuario obtenido:', userId);

        if (!userId) {
            throw new Error('No se encontró el ID del usuario en la sesión.');
        }

        const response = await fetch('http://localhost:5000/reservations/userReservations', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            },
        });
        const listaReservas = document.getElementById('lista-reservas');
        if (!listaReservas) {
            throw new Error("Elemento 'lista-reservas' no encontrado.");
        }

        listaReservas.innerHTML = ''; 

        if (!response.ok) {
            if (response.status === 404) {
                listaReservas.innerHTML = `
                    <div class="sin-reservas">
                        <p style="text-align: center; color: #555; margin-bottom: 20px;">Actualmente no tienes reservas realizadas.</p>
                        <p style="text-align: center; color: #555; margin-bottom: 20px;">¡Anímate a reservar tu vehículo favorito!</p>
                        <img src="image/caraTrostre.png" alt="Sin reservas" style="display: block; margin: 0 auto; width: 100px;">
                    </div>
                `;
                return;
            }
            throw new Error('Error al obtener las reservas.');
        }

        const reservas = await response.json();

        reservas.forEach(reserva => {
            const imagenCoche = obtenerRutaImagen(reserva.nombreVehiculo);
            const reservaHTML = `
                <div class="reserva-item">
                    <div class="reserva-detalle">
                        <h3>${reserva.nombreVehiculo}</h3>
                        <p><strong>Desde:</strong> ${new Date(reserva.fechaInicio).toLocaleDateString()}</p>
                        <p><strong>Hasta:</strong> ${new Date(reserva.fechaFin).toLocaleDateString()}</p>
                        <p><strong>Precio total:</strong> ${reserva.totalPrice}€</p>
                        <p><strong>Fianza:</strong> ${reserva.fianza}€</p>
                        <a href="${reserva.contratoPDF}" target="_blank" class="ver-contrato">Ver contrato (PDF)</a>
                    </div>
                    <div class="reserva-imagen">
                        <img src="${imagenCoche}" alt="${reserva.nombreVehiculo}" class="imagen-coche">
                    </div>
                    <div class="reserva-acciones">
                        <button class="boton-cancelar" onclick="cancelarReserva('${reserva._id}')">Cancelar reserva</button>
                    </div>
                </div>
            `;
            listaReservas.innerHTML += reservaHTML;
        });
    } catch (error) {
        console.error("Error al cargar las reservas:", error);
        alert("No se pudieron cargar las reservas.");
    }
}

async function cancelarReserva(reservaId) {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
        try {
            const response = await fetch(`http://localhost:5000/reservations/${reservaId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                },
            });

            if (!response.ok) {
                throw new Error('Error al cancelar la reserva.');
            }

            alert('Reserva cancelada con éxito.');

            await renderTusReservas();

        } catch (error) {
            console.error('Error al cancelar la reserva:', error);
            alert('No se pudo cancelar la reserva.');
        }
    }
}



function cerrarModal() {
    const modal = document.querySelector('.modal');
    if (modal) modal.remove();
}

function toggleMenu() {
    const menuLateral = document.getElementById('menu-lateral');
    const opcionesMenu = document.getElementById('opciones-menu');
    const contenido = document.querySelector('.contenido');

    if (menuLateral.classList.contains('open')) {
        opcionesMenu.style.display = 'none';
        menuLateral.classList.remove('open');
        contenido.classList.remove('contenido-open');
    } else {
        opcionesMenu.style.display = 'flex';
        menuLateral.classList.add('open');
        contenido.classList.add('contenido-open');
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('No estás autorizado');
        window.location.href = '/login';
        return;
    }

    const response = await fetch('http://localhost:5000/api/dashboard', {
        method: 'GET',
        headers: {
            'x-auth-token': token
        }
    });

    const data = await response.json();

    if (response.status === 200 && data.mensaje) {

        window.location.href = '/login';
    }
});

function cerrarSesion() {
    localStorage.removeItem('token');
    alert("Sesión cerrada. Redirigiendo a la página de inicio...");
    window.location.href = "inicio.html";
}


document.addEventListener("DOMContentLoaded", function () {
    const opciones = document.querySelectorAll('#opciones-menu li');
    opciones.forEach(opcion => {
        opcion.addEventListener('click', function () {
            const opcionSeleccionada = this.getAttribute('data-opcion');
            mostrarContenido(opcionSeleccionada);
        });
    });
    const iconoMenu = document.getElementById('icono-menu');
    iconoMenu.addEventListener('click', toggleMenu);
});
