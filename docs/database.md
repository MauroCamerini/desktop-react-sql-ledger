# Database
The database is stored in `/database.db` and managed with `better-sqlite3`. It employs:
- **Check constraints**: To validate data integrity.
- **Foreign keys**: To enforce relationships between tables.
- **Triggers**: To automate consistency and business logic.

The database schema is composed of multiple tables, each with specific roles:
- **`groups`**: Tracks transaction groups, specifying their type 'TRF' transfers and 'EMI' Equated Monthly Installments. Links to sessions.
- **`sessions`**: Logs application sessions with unique identifiers and timestamps.
- **`wallets`**: Stores wallet information, including names and starting balances.
- **`contacts`**: Manages contact details for transactions (who paid or who was paid).
- **`tags`**: Defines categorizations for entries with nesting support.
- **`entries`**: Records financial transactions, referencing wallets, contacts, and tags. Ensures data consistency via constraints and triggers.

Additionally, the database provides various views to simplify data access:
- **`entries_view`**: Combines transaction data with related tags, wallets, and contacts.
- **`income_statement`**: Summarizes income and expenses by period.
- **Lists (e.g., `tag_list`, `contact_list`)**: Support UI components like dropdowns by retrieving essential ID and name data. These tables are stored in `cache`.
