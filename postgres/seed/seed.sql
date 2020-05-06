BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('test', 'test@gmail.com', 5, '2018-01-01');
INSERT into login (hash, email) values ('$2a$10$Nvuy9BiGSNHLlJXcq0phyuG15ygmlx5vigoYuMhg9LS0uGm1VPZhG', 'test@gmail.com');

COMMIT;