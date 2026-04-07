import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    const locations = await sql`
      SELECT university_id, COUNT(*) as student_count 
      FROM student_locations 
      GROUP BY university_id
    `;
    return NextResponse.json(locations);
  } catch (error) {
    console.error("Database query failed:", error);
    // Fallback to empty if table doesn't exist yet
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const { universityId } = await request.json();
    if (!universityId) return NextResponse.json({ error: "Missing universityId" }, { status: 400 });

    await sql`
      INSERT INTO student_locations (university_id) 
      VALUES (${universityId})
    `;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database insertion failed:", error);
    return NextResponse.json({ error: "Failed to persist location" }, { status: 500 });
  }
}
