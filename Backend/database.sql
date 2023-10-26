CREATE DATABASE Feedback;

CREATE TABLE questionnaire (
    id BIGSERIAL  PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    answer VARCHAR(250) , 
);
CREATE TABLE users(
    id BIGSERIAL  PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,   
);

 CREATE TABLE feedback_response(
 id BIGSERIAL  PRIMARY KEY,
 user_id VARCHAR NOT NULL,
 question_id VARCHAR NOT NULL,
 response VARCHAR(200)
 );