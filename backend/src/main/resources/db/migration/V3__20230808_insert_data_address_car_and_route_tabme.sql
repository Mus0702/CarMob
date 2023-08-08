INSERT INTO address (street, city, zip_code, country)
VALUES
    ('Rue de la Loi', 'Brussels', '1000', 'Belgium'),
    ('Avenue Louise', 'Brussels', '1050', 'Belgium'),
    ('Grand-Place', 'Brussels', '1000', 'Belgium'),
    ('Chaussée de Louvain', 'Namur', '5000', 'Belgium')
;

INSERT INTO car (brand, model, number_available_seat)
VALUES
    ('Toyota', 'Corolla', 4),
    ('Volkswagen', 'Golf', 4),
    ('Renault', 'Espace', 6),
    ('BMW', '3 Series', 5)
;

INSERT INTO route (departure_address_id, arrival_address_id, departure_date, passenger_number, route_price, car_id)
VALUES
    (1, 2, '2023-11-15', 3, 25.50, 1),
    (2, 3, '2023-10-25', 2, 15.75, 2),
    (3, 1, '2023-11-10', 4, 30.00, 3)
;
