import { NextRequest, NextResponse } from "next/server";
import { db } from "@/shared/utils/prisma/prismaClient";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.telegram_id) {
            return NextResponse.json(
                { error: "telegram_id is required" },
                { status: 400 }
            );
        }

        if (!body.first_name || typeof body.first_name !== 'string') {
            return NextResponse.json(
                { error: "first_name is required and must be a string" },
                { status: 400 }
            );
        }

        let telegramId: bigint;
        try {
            telegramId = BigInt(body.telegram_id);
        } catch {
            return NextResponse.json(
                { error: "Invalid telegram_id format" },
                { status: 400 }
            );
        }

        const user = await db.user.create({
            telegram_id: telegramId,
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

        return NextResponse.json({
            id: user.id,
            telegram_id: user.telegram_id.toString(),
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            photo_url: user.photo_url,
        }, { status: 201 });
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
