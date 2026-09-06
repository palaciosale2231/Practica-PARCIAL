Investigación: Gestión de Variables de Entorno con dotenv en Node.js1.
 ¿Qué es dotenv?dotenv es un paquete de Node.js de cero dependencias que carga variables de entorno desde un archivo .env al objeto global process.env. Permite separar las configuraciones delicadas y claves secretas del código fuente, siguiendo los principios de las aplicaciones de doce factores (12-Factor App).
 
 2. InstalaciónPara instalar la librería en el proyecto, se ejecuta el siguiente comando en la terminal:Bashnpm install dotenv

3. ConfiguraciónPara utilizar dotenv, se deben seguir estos dos pasos:Crear el archivo .env en la raíz del proyecto para definir las claves en formato CLAVE=VALOR:Fragmento de códigoPORT=3000

DB_NAME=tasks_users_db
DB_USER=root
DB_PASSWORD=tu_contraseña_aqui
DB_HOST=localhost
DB_PORT=3306
Cargar dotenv en el código al inicio de la aplicación. Al utilizar ESModules (import/export), la configuración se inicializa ejecutando dotenv.config():  JavaScriptimport dotenv from 'dotenv';

dotenv.config();
4. Acceso a las Variables desde el CódigoUna vez configurado dotenv, las variables definidas en el archivo .env quedan disponibles globalmente a través del objeto process.env.NOMBRE_DE_VARIABLE.Por ejemplo:JavaScriptconst puerto = process.env.PORT;
const usuarioDB = process.env.DB_USER;