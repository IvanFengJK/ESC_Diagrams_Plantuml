// Load .env variables
require("dotenv").config({ path: ".env" });
const { MongoClient } = require("mongodb");
async function main() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = process.env.MONGODB_CONNECTION_STRING;

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    const dbo = await client.connect();

    // Connect to students collection in sutd database
    const studentsCollection = await dbo.db("sutd").collection("students");

    // Uncomment this line to reset the collection;
    // Otherwise, everytime you run this, 20 more students will be added instead of ensuring that there are only 20 students within the collection
    // studentsCollection.deleteMany();

    const students = new Array(20);
    // Create 20 student documents
    for (let i = 0; i < students.length; i++) {
      students[i] = {
        student_id: i,
        average_grade: 0,
        full_name: `student${i}`,
        grades: [],
        term: 0,
      };
    }
    // Insert all 20 student documents into our collection
    await studentsCollection.insertMany(students);

    // Retrieve documents again from remote
    const studentsOnMongo = await studentsCollection.find();

    // For each student
    while (await studentsOnMongo.hasNext()) {
      const studentDoc = await studentsOnMongo.next();
      // For each term
      for (let i = 0; i < 8; i++) {
        // Add 4 grades to grades array
        for (let j = 0; j < 4; j++) {
          studentDoc.grades.push(Math.floor(Math.random() * 101));
        }
        // Increment term number by 1
        studentDoc.term += 1;
      }
      // After all 8 terms, calculate average grade
      const totalScore = studentDoc.grades.reduce((prev, cur) => prev + cur, 0);
      // 8 * 4 = 8 terms * (4 grades (modules) per term)
      studentDoc.average_grade = totalScore / (8 * 4);

      await studentsCollection.updateOne(
        { student_id: studentDoc.student_id },
        { $set: studentDoc }
      );
    }

    // Finally, display list of students, arranged from highest score first
    const sortedStudentsFromMongo = await studentsCollection
      .find()
      .sort({ average_grade: -1 })
      .toArray();

    console.log("Grades (highest to lowest)", sortedStudentsFromMongo);
    console.log(
      `Successfully retrieved and sorted ${sortedStudentsFromMongo.length} students`
    );
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
