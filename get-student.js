const { neon } = require('@neondatabase/serverless');
export default async function handler(req, res) {
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`SELECT * FROM students WHERE student_name = ${req.query.name}`;
    res.status(200).json(result[0] || {});
}