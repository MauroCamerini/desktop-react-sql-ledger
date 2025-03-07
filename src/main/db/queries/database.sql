------------
-- TABLES --
------------

CREATE TABLE "groups" (
	"id"					INTEGER NOT NULL UNIQUE,
	"group_type"	TEXT NOT NULL DEFAULT 'TRF'
								CHECK ("group_type" IN ('TRF', 'EMI')),

	"creation_time"  		TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S:%s', 'now', 'localtime') ),
  "modification_time" TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S:%s', 'now', 'localtime') ),
	"session_uuid"			TEXT NOT NULL,

	PRIMARY KEY("id" AUTOINCREMENT)
	FOREIGN KEY("session_uuid") REFERENCES "sessions"("session_uuid")
);

CREATE TABLE "sessions" (
	"session_uuid"			TEXT NOT NULL UNIQUE,
	"starting_time"			TEXT NOT NULL UNIQUE,
	PRIMARY KEY("session_uuid")
);

CREATE TABLE "wallets" (
	"id"					INTEGER NOT NULL UNIQUE,
	"name"							TEXT NOT NULL,
	"description"				TEXT,
	"starting_balance"	NUMBER NOT NULL DEFAULT 0,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "contacts" (
	"id"				INTEGER NOT NULL UNIQUE,
	"name"							TEXT NOT NULL,
	"description"				TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "tags" (
	"id"			INTEGER NOT NULL UNIQUE,
	"name"				TEXT NOT NULL UNIQUE,
	"description"	TEXT,
	"parent_id"		INTEGER,
	"tag_type"		TEXT NOT NULL DEFAULT 'ORD'
								CHECK ("tag_type" IN ('FIX', 'ORD', 'EXT')),	
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("parent_id") REFERENCES "tags"("id")
);

CREATE TABLE "entries" (
	"id"		INTEGER NOT NULL UNIQUE,
	"date"				TEXT NOT NULL
				CHECK ("date" LIKE '____-__-__' AND 
				substr("date", 1, 4) BETWEEN '0000' AND '9999' AND 
				substr("date", 6, 2) BETWEEN '01' AND '12' AND 
				substr("date", 9, 2) BETWEEN '01' AND '31'), -- YYYY-MM-DD
	"period"	TEXT NOT NULL
				CHECK ("period" LIKE '____-__' AND 
				substr("period", 1, 4) BETWEEN '0000' AND '9999' AND 
				substr("period", 6, 2) BETWEEN '01' AND '12'), -- YYYY-MM (Month)
		
	"amount"		NUMBER NOT NULL
				CHECK ("amount" != 0 AND
				ROUND("amount", 2) == "amount"),


	"tag_id"			INTEGER NOT NULL,	
	"wallet_id"		INTEGER NOT NULL,
	"contact_id"	INTEGER NOT NULL,
	"group_id"		INTEGER,

	"creation_time"  		TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S:%s', 'now', 'localtime') ),
  "modification_time" TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S:%s', 'now', 'localtime') ),
	"session_uuid"			TEXT NOT NULL,

	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("wallet_id") 		REFERENCES "wallets"("id"),
	FOREIGN KEY("tag_id") 			REFERENCES "tags"("id"),
	FOREIGN KEY("group_id") 		REFERENCES "groups"("id"),
	FOREIGN KEY("contact_id") 	REFERENCES "contacts"("id"),
	FOREIGN KEY("session_uuid") REFERENCES "sessions"("session_uuid")
);

-----------
-- VIEWS --
-----------

CREATE VIEW "entries_view"
AS
SELECT 
	e.id AS id,
	"date",
	"period",
	"amount",
	tag_id,
	t.name AS tag_name,
	t.tag_type,
	contact_id,
	c.name AS contact_name,
	wallet_id,
	w.name AS wallet_name,
	"creation_time",
  "modification_time",
	"session_uuid"
FROM entries e 
INNER JOIN tags t ON t.id = e.tag_id
INNER JOIN wallets w ON w.id = e.wallet_id
INNER JOIN contacts c ON c.id = e.contact_id; -- contact_id can be NULL

CREATE VIEW "income_statement" (
    period,
    c_fix, c_ord, c_ext, c_total,
    d_fix, d_ord, d_ext, d_total,
    result
)
AS
SELECT
    period,
    SUM(CASE WHEN amount > 0 AND tag_type = 'FIX' THEN amount ELSE 0 END) AS c_fix,
    SUM(CASE WHEN amount > 0 AND tag_type = 'ORD' THEN amount ELSE 0 END) AS c_ord,
    SUM(CASE WHEN amount > 0 AND tag_type = 'EXT' THEN amount ELSE 0 END) AS c_ext,
    SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) AS c_total,
    SUM(CASE WHEN amount < 0 AND tag_type = 'FIX' THEN amount ELSE 0 END) AS d_fix,
    SUM(CASE WHEN amount < 0 AND tag_type = 'ORD' THEN amount ELSE 0 END) AS d_ord,
    SUM(CASE WHEN amount < 0 AND tag_type = 'EXT' THEN amount ELSE 0 END) AS d_ext,
    SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END) AS d_total,
    SUM(amount) AS result
FROM entries_view
GROUP BY period;


-----------
-- LISTS --
-----------
--
-- Lists are useful for UI components like dropdowns
-- At least they retrieve ID and NAME
--
CREATE VIEW tag_list
AS
WITH RECURSIVE cte_hierarchy(id, parent_id, tag_type, name, description, depth, path) AS (
    -- Base case: Roots
    SELECT id, parent_id, tag_type, name, description, 0 AS depth, name AS path
    FROM tags
    WHERE parent_id IS NULL
    UNION ALL
    -- Recursive case: Children
    SELECT h.id, h.parent_id, h.tag_type, h.name, h.description, cte.depth + 1, printf('%s/%s', cte.path, h.name) AS path
    FROM tags h
    INNER JOIN cte_hierarchy cte ON h.parent_id = cte.id
)
SELECT id, parent_id, tag_type, name, description, depth, path
FROM cte_hierarchy
ORDER BY path;

CREATE VIEW contact_list
AS
SELECT "id", "name", "description"
FROM contacts;

CREATE VIEW wallet_list
AS
SELECT "id", "name", "description", "starting_balance"
FROM wallets;

CREATE VIEW period_list
AS
SELECT DISTINCT "period"
FROM entries;
