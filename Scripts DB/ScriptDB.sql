CREATE TABLE [Student](
	Id INT PRIMARY KEY,
	StudentName VARCHAR(100) NOT NULL,
)

INSERT INTO [Student] (Id, StudentName) VALUES(1026558606, 'Yoe')
-----------------------------------------------------------------------------------------------------------
CREATE TABLE [Teacher](
	Id INT PRIMARY KEY,
	TeacherName VARCHAR(100) NOT NULL,
)

INSERT INTO [Teacher] (Id, TeacherName) VALUES(35336338, 'Andres')
INSERT INTO [Teacher] (Id, TeacherName) VALUES(12345678, 'Cardenas')
-----------------------------------------------------------------------------------------------------------
CREATE TABLE [Note](
	Id INT IDENTITY(1,1) PRIMARY KEY,
	NoteName VARCHAR(80) NOT NULL,
	IdTeacher INT NOT NULL,
	IdStudent INT NOT NULL,
	FOREIGN KEY (IdTeacher) REFERENCES [Teacher](Id),
	FOREIGN KEY (IdStudent) REFERENCES [Student](Id)
)

-----------------------------------------------------------------------------------------------------------