const { neon } = require('@neondatabase/serverless');

export default async function handler(req, res) {
    const sql = neon(process.env.DATABASE_URL);
    const { name, age, motherName, fatherName, birthDate, phone, email, course, joinDate, address } = req.body;

    try {
        await sql`
            INSERT INTO students (
                student_name, age, mother_name, father_name, birth_date, phone, email, course_details, join_date, address
            ) VALUES (
                ${name}, ${age}, ${motherName}, ${fatherName}, ${birthDate}, ${phone}, ${email}, ${course}, ${joinDate}, ${address}
            )
            ON CONFLICT (student_name) 
            DO UPDATE SET 
                age = EXCLUDED.age,
                mother_name = EXCLUDED.mother_name,
                father_name = EXCLUDED.father_name,
                birth_date = EXCLUDED.birth_date,
                phone = EXCLUDED.phone,
                email = EXCLUDED.email,
                course_details = EXCLUDED.course_details,
                join_date = EXCLUDED.join_date,
                address = EXCLUDED.address;
        `;
        res.status(200).json({ message: "Success" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
