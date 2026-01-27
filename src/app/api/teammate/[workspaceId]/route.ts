import { NextRequest, NextResponse } from "next/server";
import { db } from "@/shared/utils/prisma/prismaClient";


interface RouteParams {
    params: Promise<{ workspaceId: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
    const { workspaceId: workspaceIdParam } = await params;
    const workspaceId = Number(workspaceIdParam);

    if (isNaN(workspaceId)) {
        return NextResponse.json({ error: "Invalid workspaceId" }, { status: 400 });
    }

    try {
        const userWorkspaces = await db.userWorkspace.findByWorkspace(workspaceId);

        const teammates = userWorkspaces.map((uw) => ({
            id: uw.user.id,
            first_name: uw.user.first_name,
            last_name: uw.user.last_name,
            username: uw.user.username,
            photo_url: uw.user.photo_url,
        }));

        return NextResponse.json({
            workspaceId: workspaceId,
            teammates: teammates,
        });
    } catch (error) {
        console.error("Database error:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
