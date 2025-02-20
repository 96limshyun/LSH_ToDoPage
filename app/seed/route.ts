import { neon } from "@neondatabase/serverless";

export async function GET() {
    "use server";

    try {
        const sql = neon(`${process.env.DATABASE_URL}`);

        await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`;

        await sql`
      CREATE TABLE IF NOT EXISTS dashboards (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        position INT NOT NULL
      );
    `;
        await sql`
        CREATE TABLE IF NOT EXISTS tasks (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        content VARCHAR(255) NULL,
        position INT NOT NULL,
        dashboard_id UUID NOT NULL REFERENCES dashboards(id) ON DELETE CASCADE
        );
    `;
        // 초기 데이터 삽입
        // const insertedDashboards = await sql`
        //     INSERT INTO dashboards (id, name, position)
        //     VALUES
        //     (gen_random_uuid(), 'Backlog', 1),
        //     (gen_random_uuid(), 'In Progress', 2),
        //     (gen_random_uuid(), 'Done', 3)
        //     RETURNING id;
        // `;

        // const [backlogId, inProgressId, doneId] = insertedDashboards.map(row => row.id);

        // await sql`
        //     INSERT INTO tasks (content, position, dashboard_id)
        //     VALUES
        //     ('과제하기', 1, ${backlogId}),
        //     ('UI 디자인', 2, ${backlogId}),
        //     ('데이터베이스 스키마 설계', 1, ${inProgressId}),
        //     ('배포하기', 1, ${doneId}),
        //     ('Next.js Init', 2, ${doneId});
        // `;

        return new Response(
            JSON.stringify({
                message: "데이터베이스가 성공적으로 초기화되었습니다.",
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("데이터 베이스 초기화 실패:", error);
        throw new Error("데이터베이스 초기화에 실패했습니다.");
    }
}
