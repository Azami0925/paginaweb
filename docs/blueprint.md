# **App Name**: Novae Auditions

## Core Features:

- Audition Form: Implement a multi-step form for audition applications, including email verification, personal details, and media uploads.
- Landing Page Design: Design a landing page with clear sections for audition details, application process, and FAQs, ensuring a user-friendly experience.
- Email Verification: Implement email verification to validate user identity before allowing form submission.

## Style Guidelines:

- Primary color: Use a modern, clean white (#FFFFFF) for the background to provide a stark and professional feel.
- Secondary color: A dark gray (#333333) for text to ensure readability and contrast against the white background.
- Accent: A vibrant teal (#008080) for buttons and interactive elements to draw attention and signal action.
- Ensure a responsive layout that adapts to different screen sizes.
- Incorporate modern and minimalist icons to represent different sections and categories.
- Use subtle transitions and animations to enhance user experience when navigating between sections.

## Original User Request:
<html lang="es">
<head>
    <meta charset="UTF8-8"/>
    <META name="viewport" content="width=device-with, initial-scale=1.0"/> 
    <title> Audiciones | NOVAE Entreteimen
    </title>
    <link rel="stylesheet" href="style.css"/>
    </head>
    <body>
        <nav>
            <div>
                <strong>
                    NOVAE
                </strong>
            </div>
            <UL>
                <li><a href="#">Audiciones</a></li>
                <li><a href="#">Noticias</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Contacto</a></li>
                <li><a href="#">Español</a></li>
            </UL></nav>
        <header>
            <h1>
                LA NUEVA ERA COMIENZA
            </h1><P>Forma parte de la nueva era de Novae enterteimen</P>
        <button class="button" onclick="scrollToVerification()">Aplicar ahora</a></button></header>
        <section class="section" id="audicion-en-curso">
            <h2>Audición en curso</h2>
            <p><strong>Categorías:</strong> Baile, Canto, Rap</p>
            <p><strong>Género:</strong> Todos</p>
            <p><strong>Edad:</strong> 12 a 24 años</p>
            <p><strong>Periodo de evaluación:</strong> Mensual</p>
            <p><strong>Número máximo de solicitudes:</strong> 1 por persona</p>
          
            <button class="button" onclick="scrollToVerification()">Aplicar a esta audición</button>
          </section>
          <section class="section" id="verificacion-correo">
            <h2>Verificación de correo</h2>
            <p>Escribe tu correo electrónico para recibir un código de verificación:</p>
            <input type="email" id="email" placeholder="correo@ejemplo.com" style="padding: 10px; width: 100%; max-width: 400px;">
            <br><br>
            <button class="button" onclick="enviarCodigo()">Enviar código</button>
          
            <div id="codigo-verificacion" style="display: none; margin-top: 20px;">
              <p>Ingresa el código de verificación enviado a tu correo:</p>
              <input type="text" id="codigo" placeholder="Código de verificación" style="padding: 10px; width: 100%; max-width: 400px;">
              <br><br>
              <button class="button" onclick="verificarCodigo()">Verificar</button>
            </div>
          </section>
        
          <section class="section" id="formulario-audicion" style="display: none;">
            <h2>Formulario de Audición</h2>
            <form id="auditionForm">
              <label>Nombre completo:</label><br>
              <input type="text" name="nombre" required><br><br>
          
              <label>Edad:</label><br>
              <input type="number" name="edad" min="12" max="24" required><br><br>
          
              <label>Correo electrónico:</label><br>
              <input type="email" name="correo" required><br><br>
          
              <label>Categoría de audición:</label><br>
              <select name="categoria" required>
                <option value="vocal">Canto</option>
                <option value="baile">Baile</option>
                <option value="rap">Rap</option>
              </select><br><br>
          
              <label>Foto de perfil (imagen):</label><br>
              <input type="file" name="foto" accept="image/*" required><br><br>
          
              <label>Audición (video o enlace):</label><br>
              <input type="file" name="video" accept="video/*"><br>
              <p style="margin: 5px 0;">o</p>
              <input type="url" name="link" placeholder="Link de YouTube, Drive, etc."><br><br>
          
              <button type="submit" class="button">Enviar Audición</button>
            </form>
            <p id="mensaje-enviado" style="display:none; color: green; margin-top: 20px;">Tu audición fue enviada correctamente. Espera los resultados.</p>
          </section>


        <footer>&copy; 2025 NOVAE Enterteimen. Todos los derechos reservados</footer> 
        <script src="script.js"></script>  
    </body>
</html>   "mejorame esta pagina web y completa los enlaces que le hacen falta"
  