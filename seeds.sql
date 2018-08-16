USE RaffleAppdb;

INSERT INTO raffles (raffleName)
VALUES ("tucker's car"),("gherig's car"),("Liz's car");
INSERT INTO entries (userName, email, ticket)
VALUES ("lars", "lbergenwhen@gmail.com", "tucker's car");
INSERT INTO winners (winnerName, raffleWon)
VALUES ("lars", "tricycle");