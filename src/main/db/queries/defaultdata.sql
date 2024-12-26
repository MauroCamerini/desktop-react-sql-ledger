------------------
-- DEFAULT DATA --
------------------
INSERT INTO wallets (name) VALUES 
	('Efectivo'),
	('Cuenta Bancaria'),
	('Aplicación Móvil');

INSERT INTO tags (name) VALUES 
	('Otro'),
	('Desconocido'),
	('Salario'),
	('Financiero'),
	('Suscripciones'),
	('Transporte'),
	('Mercadería'),
	('Servicios'),
	('Bienes'),
	('Salud'),
	('Ocio'),
	('Auto');

INSERT INTO tags (parent_id, name)
VALUES
	((SELECT id FROM tags WHERE name = 'Auto'), 'Seguro'),
	((SELECT id FROM tags WHERE name = 'Auto'), 'Mantenimiento'),
	((SELECT id FROM tags WHERE name = 'Auto'), 'Reparación'),
	((SELECT id FROM tags WHERE name = 'Servicios'), 'Internet'),
	((SELECT id FROM tags WHERE name = 'Servicios'), 'Celular'),
	((SELECT id FROM tags WHERE name = 'Transporte'), 'Combustible'),
	((SELECT id FROM tags WHERE name = 'Transporte'), 'Público');

INSERT INTO contacts (name, description)
VALUES
	('Personal', 'Compañía de telefonía móvil'),
	('Movistar',  'Compañía de servicio de interner'),
	('Youtube Premium', 'Suscripción a Youtube sin anuncios'),
	('Empleador', 'Quién paga los salarios'),
	('Pareja', 'Mi pareja');