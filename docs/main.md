# Main process modules description

## `api`
This module acts as the central hub of the application. It receives calls from the renderer process via IPC, executes operations through the `db` module, checks the `cache`, and triggers events if necessary. Parameter validation (e.g., preventing SQL injection) is handled exclusively here, as the `db` module focuses on direct database interactions. Additionally, `api` ensures consistent error handling by catching exceptions from other modules and sending detailed error messages to the renderer process.

## `db`
The database management module. It creates the SQLite database file if necessary, opens connections, and performs all read/write operations. It also initializes the current session data during startup.

## `cache`
Implements a `Map` object to cache frequently accessed table data (referred to as Lists). This caching improves performance by reducing redundant database queries.

## `ipc`
Responsible for initializing IPC handlers, this module maps incoming calls from the renderer process to the appropriate `api` functions.

## `triggers`
This module checks when specific conditions are met (consulted by `api` module) and triggers the events.

## `events`
Facilitates communication from the Main Process to the Renderer Process via IPC. It triggers events in the renderer environment based on main process operations.

## `response`
Standardizes the format of responses from `api` calls. This module also includes logging capabilities to track operation results for debugging or analytics purposes.

## `tables`
Defines the structure and metadata for database tables. It specifies how tables are managed and interacted with by the `api` and `db` modules.

## `config`
Houses general configuration options for the application. This module centralizes settings, enabling consistent and maintainable configuration management.