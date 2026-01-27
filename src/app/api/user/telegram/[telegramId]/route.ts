import { NextRequest, NextResponse } from "next/server";
import { db } from "@/shared/utils/prisma/prismaClient";


interface RouteParams {
    params: Promise<{ telegramId: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
    const { telegramId: telegramIdParam } = await params;

    let telegramId: bigint;
    try {
        telegramId = BigInt(telegramIdParam);
    } catch {
        return NextResponse.json({ error: "Invalid telegramId" }, { status: 400 });
    }

    try {
        const user = await db.user.findByTelegramId(telegramId);

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            id: user.id,
            telegram_id: user.telegram_id.toString(),
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            photo_url: user.photo_url,
        });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
