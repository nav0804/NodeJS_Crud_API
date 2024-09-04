const db = require("../../db")
const query = require("./queries")

const getStudents = (req,res) => {
    db.query(query.findAll,(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const getStudentById = (req,res)=>{
    const id = parseInt(req.params.id);
    db.query(query.findById,[id],(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const createStudent = (req,res)=>{
    const {name,email,age,dob} = req.body;

    db.query(query.checkEmailList,[email],(error,results)=>{
        if(results.rows.length){
            res.send("Email already exists!!");
            throw error;
        }
        db.query(query.add,[name,email,age,dob],(error,results)=>{
            if(error) throw error;
            res.status(201).json({message:"Student saved successfully!!"});
        })
    })
}

const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, email, age, dob } = req.body;

    if (!name && !email && !age && !dob) {
        return res.status(400).send('Provide at least one field (name, email, age, or dob) to update.');
    }

    try {
        const query = `
            UPDATE students
            SET name = COALESCE($1, name),
                email = COALESCE($2, email),
                age = COALESCE($3, age),
                dob = COALESCE($4, dob)
            WHERE id = $5
            RETURNING *;
        `;
        const { rows } = await db.query(query, [name, email, age, dob, id]);

        if (rows.length === 0) {
            return res.status(404).send('Student not found!');
        }

        res.status(200).json({ message: "Student updated successfully!", student: rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while updating the student.');
    }
};

const removeStudent = (req,res)=>{
    const id = parseInt(req.params.id);
    db.query(query.findById,(error,results)=>{
        if(!results.rows.length){
            res.status(404).json({message:"Student not found of this id"});
        }
        db.query(query.deleteStudent,[id],(error,results)=>{
            if(error) throw error;
            res.status(204).json({message:"Deleted successfully!!"});
        })
    })
}

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    removeStudent,
    updateStudent
}