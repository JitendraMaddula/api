const { neon } = require('@neondatabase/serverless');

export default async function handler(req, res) {
    const sql = neon(process.env.DATABASE_URL);
    try {
        // Sorts by the day part of the join_date
        const students = await sql`
            SELECT * FROM students 
            ORDER BY EXTRACT(DAY FROM join_date) ASC`;
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
