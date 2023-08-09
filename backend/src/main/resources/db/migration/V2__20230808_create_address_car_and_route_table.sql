CREATE
EXTENSION IF NOT EXISTS pgcrypto;



INSERT INTO car (brand, model, number_available_seat)
VALUES ('Toyota', 'Corolla', 5),
       ('Honda', 'Civic', 4),
       ('Ford', 'Focus', 4),
       ('Volkswagen', 'Golf', 5),
       ('Renault', 'Clio', 5),
       ('Hyundai', 'Elantra', 4),
       ('Nissan', 'Sentra', 4),
       ('Chevrolet', 'Cruze', 5),
       ('Mazda', '3', 5),
       ('Kia', 'Forte', 4);

INSERT INTO address (street, city, zip_code, country)
VALUES ('Rue de la Loi 16', 'Brussels', '1000', 'Belgium'),
       ('Avenue des Arts 10', 'Brussels', '1210', 'Belgium'),
       ('Avenue Louise 123', 'Brussels', '1050', 'Belgium'),
       ('Chaussée de Waterloo 100', 'Ixelles', '1050', 'Belgium'),
       ('Rue du Midi 20', 'Brussels', '1000', 'Belgium'),
       ('Rue Neuve 50', 'Brussels', '1000', 'Belgium'),
       ('Avenue de Tervuren 200', 'Woluwe-Saint-Pierre', '1150', 'Belgium'),
       ('Boulevard Anspach 5', 'Brussels', '1000', 'Belgium'),
       ('Avenue Brugmann 80', 'Uccle', '1180', 'Belgium'),
       ('Place Rogier 12', 'Brussels', '1210', 'Belgium');

INSERT INTO "user" (lastname, firstname, email, password, birthdate, phone_number, car_id, role)
VALUES ('Azoud', 'Mustafa', 'azoud@example.com', crypt('Mustafa@123', gen_salt('bf')), '1985-01-15', null, null, 'ROLE_ADMIN'),
       ('Samiha', 'Draa', 'draa@example.com', crypt('Samiha@123', gen_salt('bf')), '1982-10-22', null, 2, 'ROLE_USER'),
       ('Tahtah', 'Nasseira', 'tahtah@example.com', crypt('Nasseira@123', gen_salt('bf')), '1990-02-15', null, 3, 'ROLE_USER'),
       ('Verhaegen', 'Boris', 'verhaegen@example.com', crypt('Boris@123', gen_salt('bf')), '1984-03-03', null, 9, 'ROLE_USER'),
       ('Penelle', 'Benoît', 'penelle@example.com', crypt('Benoit@123', gen_salt('bf')), '1983-11-25', null, NULL, 'ROLE_USER'),
       ('Lacroix', 'Bruno', 'lacroix@example.com', crypt('Bruno@123', gen_salt('bf')), '1978-07-12', null, 1, 'ROLE_USER'),
       ('Pigeolet', 'Xavier', 'pigeolet@example.com', crypt('Xavier@123', gen_salt('bf')), '1991-09-08', null, 4, 'ROLE_USER'),
       ('Michel', 'Marc', 'michel@example.com', crypt('Marc@123', gen_salt('bf')), '1988-04-18', null, 5, 'ROLE_USER'),
       ('Depaepe', 'Jean-Michel', 'depaepe@example.com', crypt('Jeanmichel@123', gen_salt('bf')), '1978-12-30', null, 8, 'ROLE_USER'),
       ('Baland', 'Stéphanie', 'baland@example.com', crypt('Stephanie@123', gen_salt('bf')), '1980-02-22', null, NULL, 'ROLE_USER');

INSERT INTO route (departure_address_id, arrival_address_id, departure_date, available_seat, driver_id, route_price)
VALUES (1, 2, '2023-11-15', 3, 2, 20.0),
       (2, 3, '2023-11-20', 4, 2, 25.0),
       (4, 5, '2023-11-15', 2, 3, 15.0),
       (3, 6, '2023-11-15', 1, 1, 10.0),
       (1, 7, '2023-11-20', 3, 1, 20.0),
       (2, 8, '2023-11-15', 2, 4, 15.0),
       (6, 9, '2023-11-15', 4, 9, 25.0),
       (5, 10, '2023-11-15', 3, 8, 20.0),
       (4, 7, '2023-11-15', 2, 5, 15.0),
       (3, 9, '2023-11-20', 1, 5, 10.0),
       (1, 2, '2023-11-20', 3, 9, 20.0),
       (2, 3, '2023-11-21', 4, 9, 25.0),
       (4, 5, '2023-11-20', 2, 8, 15.0),
       (3, 6, '2023-11-21', 1, 8, 10.0),
       (1, 7, '2023-11-20', 3, 4, 20.0),
       (2, 8, '2023-11-21', 2, 1, 15.0),
       (6, 9, '2023-11-21', 4, 2, 25.0),
       (5, 10, '2023-11-21', 3, 3, 20.0);


-- Route Passenger
INSERT INTO route_passenger (route_id, passenger_id)
VALUES (1, 4),
       (1, 5),
       (1, 6),
       (2, 4),
       (2, 5),
       (2, 6),
       (2, 7),
       (3, 5),
       (3, 6),
       (3, 7),
       (4, 6),
       (4, 7),
       (5, 7),
       (5, 8),
       (5, 9),
       (6, 8),
       (6, 9),
       (7, 9),
       (7, 10),
       (8, 10),
       (9, 4),
       (9, 5),
       (9, 6),
       (10, 4),
       (10, 5),
       (1, 7),
       (1, 8),
       (1, 9),
       (2, 8),
       (2, 9),
       (2, 10);
