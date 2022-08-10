const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

const students = [
    {student_id: 1005269, average_grade: 0, full_name: "Student 1", grades: [], term: 0},
    {student_id: 1005070, average_grade: 1, full_name: "Student 2", grades: [], term: 0},
    {student_id: 1005071, average_grade: 2, full_name: "Student 3", grades: [], term: 0},
    {student_id: 1005072, average_grade: 3, full_name: "Student 4", grades: [], term: 0},
    {student_id: 1005073, average_grade: 4, full_name: "Student 5", grades: [], term: 0},
    {student_id: 1005074, average_grade: 5, full_name: "Student 6", grades: [], term: 0},
    {student_id: 1005075, average_grade: 6, full_name: "Student 7", grades: [], term: 0},
    {student_id: 1005076, average_grade: 7, full_name: "Student 8", grades: [], term: 0},
    {student_id: 1005077, average_grade: 8, full_name: "Student 9", grades: [], term: 0},
    {student_id: 1005078, average_grade: 9, full_name: "Student 10", grades: [], term: 0},
    {student_id: 1005079, average_grade: 10, full_name: "Student 11", grades: [], term: 0},
    {student_id: 1005080, average_grade: 11, full_name: "Student 12", grades: [], term: 0},
    {student_id: 1005081, average_grade: 12, full_name: "Student 13", grades: [], term: 0},
    {student_id: 1005082, average_grade: 13, full_name: "Student 14", grades: [], term: 0},
    {student_id: 1005083, average_grade: 14, full_name: "Student 15", grades: [], term: 0},
    {student_id: 1005084, average_grade: 15, full_name: "Student 16", grades: [], term: 0},
    {student_id: 1005085, average_grade: 16, full_name: "Student 17", grades: [], term: 0},
    {student_id: 1005086, average_grade: 17, full_name: "Student 18", grades: [], term: 0},
    {student_id: 1005087, average_grade: 18, full_name: "Student 19", grades: [], term: 0},
    {student_id: 1005088, average_grade: 19, full_name: "Student 20", grades: [], term: 0},
]

async function insertStudents (collec){
    for (let i =0; i<students.length; i++) {
        await collec.updateOne(
            { "student_is" : students[i].student_id },
            { $set: students[i]},
            { upsert: true }
        );
    }
}

async function goThroughSchool (collec){
    for (let term = 0; term < 8; term++){
        for (let index = 0; index < students.length; index++){
            for (let test = 0; test < 4; test++){
                var score = (Math.floor(Math.random() * 101));
                await collec.updateOne(
                    { "student_id": students[index].student_id  }, 
                    { $push: { "grades": score } } 
                );
            }
            await collec.updateOne(
                { "student_id": students[index].student_id  }, 
                { $inc: {"term": 1 }}  
            );
        }
    }
}

async function updateAverageGrade(collec){
    for (let x=0; x<students.length; x++) {
        var reportCard = await collec.find({"student_id": students[x].student_id }).toArray();
        var reportCard = reportCard [0].grades;
        var sum = await reportCard.reduce((a, b) => a + b, 0);
        var avg = await (sum / reportCard.length) || 0;
        await collec.updateOne(
            { "student_id": students[x].student_id  }, 
            { $set: {"average_grade": avg }}  
        );
    }
}

async function outputStudentsSortedByAverageGrades (collec){
    var sorted = await collec.find({}).sort({average_grade: -1}).toArray();
        for (let x=0; x<students.length; x++) {
            console.log(JSON.stringify(sorted[x]));
        }
}

async function CE9() {
    try {
        // Task 1
        const dbo = client.db('sutd');
        // Task 2
        const collec = dbo.collection('students')
        // Task 3
        await insertStudents(collec);
        // Task 4
        await goThroughSchool(collec);
        // Task 5
        await updateAverageGrade(collec);
        // Task 6
        await outputStudentsSortedByAverageGrades(collec);

    } finally{
        await client.close();
    } 
}

CE9().catch(console.dir);