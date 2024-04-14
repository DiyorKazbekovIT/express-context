const express = require("express");

const app = express();

app.use(express.json())

app.use(express.static("public"))

//DB

const students = []

let id = 1;

const findStudentIndexById = (id) => {
    for (let i = 0; i < students.length; i++) {
        if (students[i].id == id) return i;
    }
    return -1;
}

app.get("/api/v1/students", (_, res) => {
    res.send(students)
})

app.get("/api/v1/students/:id", (req, res) => {
    const index = findStudentIndexById(req.params.id);

    if (index > -1){
        res.send(students[index])
    } else{
        res.status(404).send("Student not found");
        console.log(`404 student not found`);
    }

})

app.post("/api/v1/students", (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const student = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
    }

    student.id = id++;

    students.push(student);
    res.send(student);
})

app.delete("/api/v1/students/:id", (req, res) => {
    const index = findStudentIndexById(req.params.id)

    if (index > -1){
        const student = students.splice(index, 1)[0];
        res.send(student);
    }else{
        res.status(404).send("student not found")
    }
})

app.put("/api/v1/students", (req, res) => {
        
    if(!req.body) return res.sendStatus(400);
       
    const id = req.body.id;
    const studentName = req.body.name;
    const studentAge = req.body.age;
       
    const index = findUserIndexById(id);
    if(index > -1){
        // изменяем данные у пользователя
        const student = students[index];
        student.age = studentAge;
        student.name = studentName;
        res.send(student);
    }
    else{
        res.status(404).send("Student not found");
    }
});

app.listen(1488, () => {
    console.log(`
    -- Port http://localhost:1488
    Source
    --http://localhost:1488/api/v1/students/
    `);
})