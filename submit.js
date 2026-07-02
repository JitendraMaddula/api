const { neon } = require('@neondatabase/serverless');
export default async function handler(req, res) {
    const sql = neon(process.env.DATABASE_URL);
    const { name, age, motherName, fatherName, birthDate, phone, email, course, joinDate, address } = req.body;
    await sql`INSERT INTO students (student_name, age, mother_name, father_name, birth_date, phone, email, course_details, join_date, address) 
              VALUES (${name}, ${age}, ${motherName}, ${fatherName}, ${birthDate}, ${phone}, ${email}, ${course}, ${joinDate}, ${address})`;
    res.status(200).json({ status: "success" });
}