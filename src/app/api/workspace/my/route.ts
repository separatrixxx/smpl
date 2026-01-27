import { NextRequest, NextResponse } from "next/server";
import { db } from "@/shared/utils/prisma/prismaClient";
import { TaskStatus } from "@/generated/prisma";


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const telegramId = searchParams.get('userId');

    if (!telegramId) {
        return NextResponse.json(
            { error: "userId (telegramId) is required" },
            { status: 400 }
        );
    }

    try {
        // Сначала находим пользователя по Telegram ID
        const user = await db.user.findByTelegramId(BigInt(telegramId));

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Затем ищем воркспейс по внутреннему ID пользователя
        const workspace = await db.workspace.findMyWorkspace(user.id);

        if (!workspace) {
            return NextResponse.json(
                { error: "My workspace not found" },
                { status: 404 }
            );
        }

        const totalTasks = workspace.tasks.length;
        const completedTasks = workspace.tasks.filter(
            (task) => task.status === TaskStatus.done
        ).length;

        return NextResponse.json({
            id: workspace.id,
            title: workspace.title,
            description: workspace.description,
            is_my_workspace: workspace.is_my_workspace,
            tasks_info: {
                total: totalTasks,
                completed: completedTasks,
            },
            teammates: workspace.teammates.map((t) => t.user_id),
        });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
