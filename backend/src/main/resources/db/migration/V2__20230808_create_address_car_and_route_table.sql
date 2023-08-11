CREATE
EXTENSION IF NOT EXISTS pgcrypto;
CREATE INDEX idx_route_departure_location ON route USING GIST(departure_location);



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

INSERT INTO route (departure_address, arrival_address, departure_date, available_seat, driver_id, route_price,departure_location)
VALUES ('Rue de la Loi 16, 1000 Bruxelles', 'Avenue des Arts 10, 1210 Bruxelles', '2023-11-15', 3, 2, 20.0,ST_SetSRID(ST_MakePoint(4.3663459, 50.8464734), 4326)),
       ('Avenue des Arts 10, 1210 Bruxelles', 'Avenue Louise 123, 1050 Bruxelles', '2023-11-20', 4, 2, 25.0,ST_SetSRID(ST_MakePoint(4.3698678, 50.8480114), 4326)),
       ('Chaussée de Waterloo 100, 1050 Bruxelles', 'Rue du Midi 20, 1000 Bruxelles', '2023-11-15', 2, 3, 15.0,ST_SetSRID(ST_MakePoint(4.3449674, 50.8291325), 4326)),
       ('Avenue Louise 123, 1000 Bruxelles', 'Rue Neuve 50, 1000 Bruxelles', '2023-11-15', 1, 1, 10.0,ST_SetSRID(ST_MakePoint(4.360377, 50.8301058), 4326)),
       ('Rue de la Loi 16, 1000 Bruxelles', 'Avenue de Tervuren 200, 1150 Bruxelles', '2023-11-20', 3, 1, 20.0,ST_SetSRID(ST_MakePoint(4.3663459, 50.8464734), 4326)),
       ('Avenue des Arts 10, 1210 Bruxelles', 'Boulevard Anspach 5, 1000 Bruxelles', '2023-11-15', 2, 4, 15.0,ST_SetSRID(ST_MakePoint(4.3698678, 50.8480114), 4326)),
       ('Rue mommaerts 50, 1080 Bruxelles', 'Avenue Brugmann 80, 1180 Bruxelles', '2023-11-15', 4, 9, 25.0,ST_SetSRID(ST_MakePoint(4.3394731, 50.8596544), 4326)),
       ('Rue du Midi 20, 1000 Bruxelles', 'Place Rogier 12, 1210 Bruxelles', '2023-11-15', 3, 8, 20.0,ST_SetSRID(ST_MakePoint(4.350917, 50.84724259999999), 4326)),
       ('Chaussée de Waterloo 100, 1060 Bruxelles', 'Avenue de Tervuren 200, 1150 Bruxelles', '2023-11-15', 2, 5, 15.0,ST_SetSRID(ST_MakePoint(4.3449674, 50.8291325), 4326)),
       ('Avenue Louise 123, 1050 Bruxelles', 'Avenue Brugmann 80, 1180 Bruxelles', '2023-11-20', 1, 5, 10.0,ST_SetSRID(ST_MakePoint(4.360377, 50.8301058), 4326)),
       ('Rue de la Loi 16, 1000 Bruxelles', 'Avenue Brugmann 80, 1180 Bruxelles', '2023-11-20', 3, 9, 20.0,ST_SetSRID(ST_MakePoint(4.3663459, 50.8464734), 4326)),
       ('Rue de la Loi 16, 1000 Bruxelles', 'Avenue Louise 123, 1050 Bruxelles', '2023-11-21', 4, 9, 25.0,ST_SetSRID(ST_MakePoint(4.3663459, 50.8464734), 4326)),
       ('Chaussée de Waterloo 100, 1060 Bruxelles', 'Rue du Midi 20, 1000 Bruxelles', '2023-11-20', 2, 8, 15.0,ST_SetSRID(ST_MakePoint(4.3449674, 50.8291325), 4326)),
       ('Avenue Louise 123, 1000 Bruxelles', 'Rue mommaerts 50, 1020 Bruxelles', '2023-11-21', 1, 8, 10.0,ST_SetSRID(ST_MakePoint(4.360377, 50.8301058), 4326)),
       ('Rue de la Loi 16, 1000 Bruxelles', 'Avenue de Tervuren, 200 1150 Bruxelles', '2023-11-20', 3, 4, 20.0,ST_SetSRID(ST_MakePoint(4.3663459, 50.8464734), 4326)),
       ('Avenue des Arts 10, 1210 Bruxelles', 'Boulevard Anspach 5, 1000 Bruxelles', '2023-11-21', 2, 1, 15.0,ST_SetSRID(ST_MakePoint(4.3698678, 50.8480114), 4326)),
       ('Rue mommaerts 50, 1020 Bruxelles', 'Avenue Brugmann 80, 1180 Bruxelles', '2023-11-21', 4, 2, 25.0,ST_SetSRID(ST_MakePoint(4.3394731, 50.8596544), 4326)),
       ('Rue du Midi 20, 1000 Bruxelles', 'Place Rogier 12, 1210 Bruxelles', '2023-11-21', 3, 3, 20.0,ST_SetSRID(ST_MakePoint(4.350917, 50.84724259999999), 4326));


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
