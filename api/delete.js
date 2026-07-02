const { neon } = require('@neondatabase/serverless');

export default async function handler(req, res) {
    const sql = neon(process.env.DATABASE_URL);
    const { name } = req.body;
    try {
        await sql`DELETE FROM students WHERE student_name = ${name}`;
        res.status(200).json({ message: "Student deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
