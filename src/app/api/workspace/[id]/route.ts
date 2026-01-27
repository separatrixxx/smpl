import { NextRequest, NextResponse } from "next/server";
import { db } from "@/shared/utils/prisma/prismaClient";


interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
    const { id: idParam } = await params;
    const id = Number(idParam);

    if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    try {
        const workspace = await db.workspace.findUnique(id);

        if (!workspace) {
            return NextResponse.json(
                { error: "Workspace not found" },
                { status: 404 }
            );
        }

        const formattedWorkspace = {
            id: workspace.id,
            title: workspace.title,
            description: workspace.description,
            is_my_workspace: workspace.is_my_workspace,
            owner: workspace.owner_id,
            teammates: workspace.teammates.map((t) => t.user_id),
            tasks_info: {
                completed: workspace.tasks.filter((t) => t.status === 'done').length,
                total: workspace.tasks.length,
            },
        };

        return NextResponse.json(formattedWorkspace);
    } catch (error) {
        console.error("Database error:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
    const { id: idParam } = await params;
    const id = Number(idParam);

    if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    try {
        const body = await req.json();

        const workspace = await db.workspace.update(id, {
            title: body.title,
            description: body.description,
            is_my_workspace: body.is_my_workspace,
        });

        return NextResponse.json(workspace);
    } catch (error) {
        console.error("Database error:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
    const { id: idParam } = await params;
    const id = Number(idParam);

    if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    try {
        await db.workspace.delete(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Database error:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
