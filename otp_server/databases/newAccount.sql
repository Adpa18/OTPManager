CREATE TABLE Otp (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	issuer TEXT NOT NULL,
	name TEXT NOT NULL,
	otpType TEXT NOT NULL,
	secret TEXT NOT NULL,
	fromBase32 BOOL NOT NULL,
	tokenLength INTEGER NOT NULL,
	hashName TEXT NOT NULL,
	timeOffset INTEGER NOT NULL,
	counter INTEGER NOT NULL
)