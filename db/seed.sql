USE employee_db;

INSERT INTO department (name)
VALUES
("Sales");
("Engineer");
("Finance");
("Legal");

INSERT INTO role (title, salary, department_id)
VALUES
("Sales Person", 80000, 1);
("Lead Engineer", 150000, 2);
("Software Engineer", 120000, 2);
("Accountant", 125000, 3);
("Legal Team Lead", 250000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("John", "Doe", 1, 3);
("David", "Silva", 2, 1);
("Jennifer", "Alvarado", 3, null);
("Chris", "Koen", 4, 3);
("Marco", "Lopez", 5, null);
("Blanca", "Laureano", 2, null);
("Tam", "Vo", 4, 7);
("Bob", "Rainbow", 1, 2);