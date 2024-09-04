const findAll = "Select * from students";
const findById = "Select * from students where id = $1"
const checkEmailList = "Select s from students s where s.email = $1"
const add = "Insert into students (name, email,age, dob) values ($1,$2,$3,$4)"
const deleteById = "Delete from students where id = $1"
const updateStudent = `
    UPDATE students
    SET name = $1, email = $2 , age = $3 , dob = $4
    WHERE id = $5
`;

module.exports = {
    findAll,
    findById,
    checkEmailList,
    add,
    deleteById,
    updateStudent
}