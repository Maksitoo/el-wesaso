# 🗄️ Configuración de MySQL

## Crear Base de Datos

### Opción 1: Usando phpMyAdmin (cPanel)

1. Ve a **cPanel > phpMyAdmin**
2. Haz clic en **"Nueva"** o **"New"** en el panel izquierdo
3. Nombre de la base de datos: `minecraft_server`
4. Intercalación: `utf8mb4_unicode_ci`
5. Haz clic en **"Crear"**

### Opción 2: Usando MySQL desde Terminal

```bash
mysql -u root -p
```

Luego ejecuta:
```sql
CREATE DATABASE minecraft_server CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

## Crear Usuario de Base de Datos

### En cPanel:

1. Ve a **cPanel > MySQL Databases**
2. En **"Nuevo usuario"**:
   - Usuario: `valhallamc_user` (o el que prefieras)
   - Contraseña: Genera una segura
3. Haz clic en **"Crear usuario"**
4. En **"Agregar usuario a base de datos"**:
   - Selecciona el usuario que creaste
   - Selecciona la base de datos `minecraft_server`
   - Haz clic en **"Agregar"**
5. Marca **"ALL PRIVILEGES"** y haz clic en **"Hacer cambios"**

## Importar Estructura de Tablas

### Opción 1: Desde phpMyAdmin

1. Ve a **phpMyAdmin**
2. Selecciona la base de datos `minecraft_server`
3. Haz clic en la pestaña **"Importar"**
4. Selecciona el archivo `database.sql`
5. Haz clic en **"Continuar"**

### Opción 2: Desde Terminal

```bash
mysql -u valhallamc_user -p minecraft_server < database.sql
```

## Variables de Entorno

En cPanel Node.js, agrega estas variables:

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=minecraft_server
DB_USER=valhallamc_user
DB_PASSWORD=tu_password_aqui
```

## Verificar Conexión

Después de configurar todo, inicia la aplicación y verifica que veas:
```
✅ Conectado a MySQL
✅ Modelos sincronizados
```

## Notas Importantes

- **Host**: En cPanel generalmente es `localhost`
- **Puerto**: MySQL usa `3306` por defecto
- **Usuario**: El que creaste en cPanel MySQL Databases
- **Contraseña**: La que generaste para el usuario
- **Base de datos**: `minecraft_server` (o la que hayas creado)

## Troubleshooting

### Error: "Access denied"
- Verifica usuario y contraseña
- Verifica que el usuario tenga permisos en la base de datos

### Error: "Unknown database"
- Verifica que la base de datos exista
- Verifica el nombre en `DB_NAME`

### Error: "Table doesn't exist"
- Importa el archivo `database.sql`
- O deja que Sequelize cree las tablas automáticamente (solo en desarrollo)

