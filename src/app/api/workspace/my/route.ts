import { NextRequest, NextResponse } from "next/server";
import { db } from "@/shared/utils/prisma/prismaClient";
import { TaskStatus } from "@/generated/prisma";


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json(
            { error: "userId is required" },
            { status: 400 }
        );
    }

    try {
        const workspace = await db.workspace.findMyWorkspace(Number(userId));

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
