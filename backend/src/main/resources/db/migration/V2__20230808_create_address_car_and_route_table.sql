CREATE
    EXTENSION IF NOT EXISTS pgcrypto;
CREATE INDEX idx_route_departure_location ON route USING GIST (departure_location);



INSERT INTO car (brand, model, color, number_available_seat)
VALUES ('Toyota', 'Corolla', 'Light Red', 5),
       ('Honda', 'Civic', 'White', 4),
       ('Ford', 'Focus', 'Black', 4),
       ('Volkswagen', 'Golf', 'Light Gray', 4),
       ('Renault', 'Clio', 'Midnight Blue', 4),
       ('Hyundai', 'Elantra', 'Silver grey', 4),
       ('Nissan', 'Sentra', 'Green', 4),
       ('Chevrolet', 'Cruze', 'Brown', 4),
       ('Mazda', '3', 'Dark Grey', 4),
       ('Kia', 'Forte', 'Yellow', 4),
       ('Renault', 'Espace', 'Black', 6);


INSERT INTO "user" (lastname, firstname, email, password, birthdate, phone_number, rating, car_id, role)
VALUES ('Azoud', 'Mustafa', 'azoud@example.com', crypt('Mustafa@123', gen_salt('bf')), '1985-01-15', null,null, null,
        'ROLE_ADMIN'),
       ('Samiha', 'Draa', 'draa@example.com', crypt('Samiha@123', gen_salt('bf')), '1982-10-22', null,4.2, 2, 'ROLE_USER'),
       ('Tahtah', 'Nasseira', 'tahtah@example.com', crypt('Nasseira@123', gen_salt('bf')), '1990-02-15', null,4.2, 3,
        'ROLE_USER'),
       ('Verhaegen', 'Boris', 'verhaegen@example.com', crypt('Boris@123', gen_salt('bf')), '1984-03-03', null,4.6, 9,
        'ROLE_USER'),
       ('Penelle', 'Benoît', 'penelle@example.com', crypt('Benoit@123', gen_salt('bf')), '1983-11-25', null,4.7, 11,
        'ROLE_USER'),
       ('Lacroix', 'Bruno', 'lacroix@example.com', crypt('Bruno@123', gen_salt('bf')), '1978-07-12', null,4.9, 1,
        'ROLE_USER'),
       ('Pigeolet', 'Xavier', 'pigeolet@example.com', crypt('Xavier@123', gen_salt('bf')), '1991-09-08', null, 4.5,4,
        'ROLE_USER'),
       ('Michel', 'Marc', 'michel@example.com', crypt('Marc@123', gen_salt('bf')), '1988-04-18', null, 4.5,5, 'ROLE_USER'),
       ('Depaepe', 'Jean-Michel', 'depaepe@example.com', crypt('Jeanmichel@123', gen_salt('bf')), '1978-12-30', null, 4.9,8,
        'ROLE_USER'),
       ('Baland', 'Stéphanie', 'baland@example.com', crypt('Stephanie@123', gen_salt('bf')), '1980-02-22', null,null, NULL,
        'ROLE_USER');
INSERT INTO route (departure_address, arrival_address, departure_date, departure_time, available_seat, driver_id,
                   route_price,
                   departure_location, arrival_location)
VALUES ('Rue de la Loi 16, 1000 Bruxelles', 'Aéroport de Bruxelles', '2023-11-15','10:00', 1, 2, 20,
        ST_SetSRID(ST_MakePoint(4.3663459, 50.8464734), 4326),
        ST_SetSRID(ST_MakePoint(4.485941899999999, 50.9002379), 4326)),
       ('Avenue des Arts 10, 1210 Bruxelles', 'Aéroport de charleroi', '2023-11-20','19:45', 4, 1, 25.0,
        ST_SetSRID(ST_MakePoint(4.3698678, 50.8480114), 4326),
        ST_SetSRID(ST_MakePoint(4.459823699999999, 50.4625654), 4326)),
       ('Chaussée de Waterloo 100, 1050 Bruxelles', 'Gare du nord, 1000 Bruxelles', '2023-11-15','06:00', 1, 3, 15.0,
        ST_SetSRID(ST_MakePoint(4.3449674, 50.8291325), 4326), ST_SetSRID(ST_MakePoint(4.3608795, 50.8603166), 4326)),
       ('Avenue Louise 123, 1000 Bruxelles', 'Aéroport de Bruxelles', '2023-11-15','16:30', 4, 5, 10.0,
        ST_SetSRID(ST_MakePoint(4.360377, 50.8301058), 4326),
        ST_SetSRID(ST_MakePoint(4.485941899999999, 50.9002379), 4326)),
       ('Rue de la Loi 16, 1000 Bruxelles', 'Chaussée de gand 1150, 1082 Bruxelles', '2023-11-20','17:25', 3,5 , 20.0,
        ST_SetSRID(ST_MakePoint(4.3663459, 50.8464734), 4326), ST_SetSRID(ST_MakePoint(4.2978247, 50.8647702), 4326)),
       ('Avenue des Arts 10, 1210 Bruxelles', 'Boulevard Anspach 5, 1000 Bruxelles', '2023-11-15','15:15', 2, 4, 15.0,
        ST_SetSRID(ST_MakePoint(4.3698678, 50.8480114), 4326), ST_SetSRID(ST_MakePoint(4.3513328, 50.8503206), 4326)),
       ('Rue mommaerts 50, 1080 Bruxelles', 'Aéroport de charleroi', '2023-11-15','08:35', 2, 6, 25.0,
        ST_SetSRID(ST_MakePoint(4.3394731, 50.8596544), 4326),
        ST_SetSRID(ST_MakePoint(4.459823699999999, 50.4625654), 4326)),
       ('Rue du Midi 20, 1000 Bruxelles', 'Gare de Tubize, 1480 Tubize', '2023-11-15','16:50', 3, 8, 20.0,
        ST_SetSRID(ST_MakePoint(4.350917, 50.84724259999999), 4326),
        ST_SetSRID(ST_MakePoint(4.20573, 50.69171), 4326)),
       ('Chaussée de Waterloo 100, 1060 Bruxelles', 'Plage Ostende, 8400 Oostende', '2023-11-15','09:00', 1, 9, 15.0,
        ST_SetSRID(ST_MakePoint(4.3449674, 50.8291325), 4326),
        ST_SetSRID(ST_MakePoint(2.9161003, 51.23530539999999), 4326)),
       ('Avenue Louise 123, 1050 Bruxelles', 'Hopital Brugmann, 1020 Bruxelles', '2023-11-20','09:25', 4, 5, 10.0,
        ST_SetSRID(ST_MakePoint(4.360377, 50.8301058), 4326), ST_SetSRID(ST_MakePoint(4.3327567, 50.8862727), 4326)),
       ('Rue de la Loi 16, 1000 Bruxelles', 'Aéroport de charleroi', '2023-11-20','07:30', 3, 9, 20.0,
        ST_SetSRID(ST_MakePoint(4.3663459, 50.8464734), 4326),
        ST_SetSRID(ST_MakePoint(4.459823699999999, 50.4625654), 4326)),
       ('Rue de la Loi 16, 1000 Bruxelles', 'Otan, Bruxelles', '2023-11-21','17:10', 4, 9, 25.0,
        ST_SetSRID(ST_MakePoint(4.3663459, 50.8464734), 4326), ST_SetSRID(ST_MakePoint(4.4261565, 50.8791181), 4326)),
       ('Chaussée de Waterloo 100, 1060 Bruxelles', 'Liège', '2023-11-20','16:30', 2, 8, 15.0,
        ST_SetSRID(ST_MakePoint(4.3449674, 50.8291325), 4326),
        ST_SetSRID(ST_MakePoint(5.569749799999999, 50.63295859999999), 4326)),
       ('Avenue Louise 123, 1000 Bruxelles', 'Dinant', '2023-11-21','18:00', 1, 8, 15.0,
        ST_SetSRID(ST_MakePoint(4.360377, 50.8301058), 4326), ST_SetSRID(ST_MakePoint(4.9122308, 50.2607382), 4326)),
       ('Rue de la Loi 16, 1000 Bruxelles', 'Wavre', '2023-11-20','06:45', 3, 4, 20.0,
        ST_SetSRID(ST_MakePoint(4.3663459, 50.8464734), 4326),
        ST_SetSRID(ST_MakePoint(4.611248000000001, 50.7133122), 4326)),
       ('Avenue des Arts 10, 1210 Bruxelles', 'Aéroport de Bruxelles', '2023-11-21','05:50', 2, 1, 15.0,
        ST_SetSRID(ST_MakePoint(4.3698678, 50.8480114), 4326),
        ST_SetSRID(ST_MakePoint(4.485941899999999, 50.9002379), 4326)),
       ('Rue mommaerts 50, 1020 Bruxelles', 'Hopital Saint Pierre, Bruxelles', '2023-11-21','07:30', 4, 2, 25.0,
        ST_SetSRID(ST_MakePoint(4.3394731, 50.8596544), 4326),
        ST_SetSRID(ST_MakePoint(4.3471366, 50.83433890000001), 4326)),
       ('Rue du Midi 20, 1000 Bruxelles', 'Anvers', '2023-11-21','16:15', 3, 3, 20.0,
        ST_SetSRID(ST_MakePoint(4.350917, 50.84724259999999), 4326),
        ST_SetSRID(ST_MakePoint(4.4051485, 51.2213404), 4326));


-- Route Passenger
INSERT INTO route_passenger (route_id, passenger_id)
VALUES (1, 4),
       (1, 5),
       (1, 6),
       (2, 4),
       (2, 5),
       (2, 6),
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
       (10, 5);
