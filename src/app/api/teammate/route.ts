import { NextRequest, NextResponse } from "next/server";
import { db } from "@/shared/utils/prisma/prismaClient";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.user_id || typeof body.user_id !== 'number') {
            return NextResponse.json(
                { error: "user_id is required and must be a number" },
                { status: 400 }
            );
        }

        if (!body.workspace_id || typeof body.workspace_id !== 'number') {
            return NextResponse.json(
                { error: "workspace_id is required and must be a number" },
                { status: 400 }
            );
        }

        const userWorkspace = await db.userWorkspace.create({
            user_id: body.user_id,
            workspace_id: body.workspace_id,
        });

        return NextResponse.json(userWorkspace, { status: 201 });
    } catch (error) {
        console.error("Database error:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.user_id || typeof body.user_id !== 'number') {
            return NextResponse.json(
                { error: "user_id is required and must be a number" },
                { status: 400 }
            );
        }

        if (!body.workspace_id || typeof body.workspace_id !== 'number') {
            return NextResponse.json(
                { error: "workspace_id is required and must be a number" },
                { status: 400 }
            );
        }

        await db.userWorkspace.delete(body.user_id, body.workspace_id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Database error:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
