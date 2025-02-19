import { neon } from "@neondatabase/serverless";

export async function GET() {
    "use server";

    try {
        const sql = neon(`${process.env.DATABASE_URL}`);

        await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`;

        await sql`
      CREATE TABLE IF NOT EXISTS dashboards (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name TEXT NOT NULL,
        tasks JSONB DEFAULT '[]'
      );
    `;
        // 초기 데이터 삽입
        // await sql`
        //   INSERT INTO dashboards (id, name, tasks)
        //   VALUES
        //   (gen_random_uuid(), 'Backlog', '[
        //     {"id": 1, "title": "과제하기"},
        //     {"id": 2, "title": "UI 디자인"}
        //   ]'::JSONB),
        //   (gen_random_uuid(), 'In Progress', '[
        //     {"id": 1, "title": "데이터베이스 스키마 설계"}
        //   ]'::JSONB),
        //   (gen_random_uuid(), 'Done', '[
        //     {"id": 1, "title": "배포하기"},
        //     {"id": 2, "title": "Next.js Init"}
        //   ]'::JSONB);
        // `;

        return new Response(
            JSON.stringify({
                message: "데이터베이스가 성공적으로 초기화되었습니다.",
            }),
            { status: 200 }
        );
    } catch (error) {
        throw new Error("데이터베이스 초기화에 실패했습니다.");
    }
}
