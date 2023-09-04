CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE car
(
    id                    INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
    brand                 varchar(255)                                     NOT NULL,
    model                 varchar(50)                                      NOT NULL,
    color                 varchar(50)                                      NOT NULL,
    number_available_seat INT                                              NOT NULL
);

CREATE TABLE "user"
(
    id           BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    lastname     VARCHAR(255)                            NOT NULL,
    firstname    VARCHAR(255)                            NOT NULL,
    email        VARCHAR(255)                            NOT NULL UNIQUE,
    password     VARCHAR(255)                            NOT NULL,
    birthdate    Date,
    phone_number VARCHAR(255),
    rating       DOUBLE PRECISION,
    car_id       INT,
    role         VARCHAR(255),
    CONSTRAINT pk_user PRIMARY KEY (id),
    FOREIGN KEY (car_id) REFERENCES car (id)
);
CREATE TABLE route
(
    id                 SERIAL PRIMARY KEY,
    departure_address  varchar(255)           NOT NULL,
    arrival_address    varchar(255)           NOT NULL,
    departure_date     DATE                   NOT NULL,
    departure_time     TIME WITHOUT TIME ZONE NOT NULL,
    available_seat     INT                    NOT NULL,
    driver_id          INT,
    route_price        DOUBLE PRECISION       NOT NULL,
    departure_location geography(Point, 4326),
    arrival_location   geography(Point, 4326),

    FOREIGN KEY (driver_id) REFERENCES "user" (id)
);

CREATE TABLE message
(
    id SERIAL PRIMARY KEY ,
    content TEXT NOT NULL ,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sender_id INT NOT NULL ,
    receiver_id INT NOT NULL ,
    route_id INT NOT NULL ,
    FOREIGN KEY (sender_id) REFERENCES "user" (id),
    FOREIGN KEY (receiver_id) REFERENCES "user" (id),
    FOREIGN KEY (route_id) REFERENCES route (id)
);


CREATE TABLE route_passenger
(
    route_id     INT NOT NULL,
    passenger_id INT NOT NULL,
    PRIMARY KEY (route_id, passenger_id),
    FOREIGN KEY (route_id) REFERENCES route (id),
    FOREIGN KEY (passenger_id) REFERENCES "user" (id)
);