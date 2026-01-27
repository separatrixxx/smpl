import { NextRequest, NextResponse } from "next/server";
import { db } from "@/shared/utils/prisma/prismaClient";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.first_name || typeof body.first_name !== 'string') {
            return NextResponse.json(
                { error: "first_name is required and must be a string" },
                { status: 400 }
            );
        }

        const user = await db.user.create({
            first_name: body.first_name,
            last_name: body.last_name ?? null,
            username: body.username ?? null,
            photo_url: body.photo_url ?? null,
        });

        await db.workspace.create({
            title: 'My workspace',
            description: null,
            is_my_workspace: true,
            owner_id: user.id,
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error("Database error:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const users = await db.user.findMany();

        return NextResponse.json(users);
    } catch (error) {
        console.error("Database error:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
