import { prisma } from '@/shared/utils/prisma/prisma';
import { TaskType } from '@/generated/prisma';


export const db = {
    user: {
        findUnique: async (id: number) => {
            return prisma.user.findUnique({ where: { id } });
        },

        findByTelegramId: async (telegramId: bigint) => {
            return prisma.user.findUnique({ where: { telegram_id: telegramId } });
        },

        findMany: async () => {
            return prisma.user.findMany();
        },

        create: async (data: {
            telegram_id: bigint;
            first_name: string;
            last_name?: string | null;
            username?: string | null;
            photo_url?: string | null;
        }) => {
            return prisma.user.create({ data });
        },

        update: async (id: number, data: {
            first_name?: string;
            last_name?: string | null;
            username?: string | null;
            photo_url?: string | null;
        }) => {
            return prisma.user.update({ where: { id }, data });
        },

        delete: async (id: number) => {
            return prisma.user.delete({ where: { id } });
        },
    },

    workspace: {
        findUnique: async (id: number) => {
            return prisma.workspace.findUnique({
                where: { id },
                include: {
                    tasks: { select: { type: true } },
                    teammates: { select: { user_id: true } },
                },
            });
        },

        findMany: async () => {
            return prisma.workspace.findMany({
                include: {
                    tasks: { select: { type: true } },
                    teammates: { select: { user_id: true } },
                },
            });
        },

        findByUser: async (userId: number) => {
            return prisma.workspace.findMany({
                where: {
                    OR: [
                        { owner_id: userId },
                        { teammates: { some: { user_id: userId } } },
                    ],
                },
                include: {
                    tasks: { select: { type: true } },
                    teammates: { select: { user_id: true } },
                },
            });
        },

        findMyWorkspace: async (userId: number) => {
            return prisma.workspace.findFirst({
                where: {
                    owner_id: userId,
                    is_my_workspace: true,
                },
                include: {
                    tasks: { select: { type: true } },
                    teammates: { select: { user_id: true } },
                },
            });
        },

        findMyWorkspaceId: async (userId: number) => {
            return prisma.workspace.findFirst({
                where: {
                    owner_id: userId,
                    is_my_workspace: true,
                },
                select: { id: true },
            });
        },

        create: async (data: {
            title: string;
            description?: string | null;
            is_my_workspace?: boolean;
            owner_id: number;
        }) => {
            return prisma.workspace.create({ data });
        },

        update: async (id: number, data: {
            title?: string;
            description?: string | null;
            is_my_workspace?: boolean;
        }) => {
            return prisma.workspace.update({ where: { id }, data });
        },

        delete: async (id: number) => {
            return prisma.workspace.delete({ where: { id } });
        },
    },

    userWorkspace: {
        findByWorkspace: async (workspaceId: number) => {
            return prisma.userWorkspace.findMany({
                where: { workspace_id: workspaceId },
                include: { user: true },
            });
        },

        create: async (data: { user_id: number; workspace_id: number }) => {
            return prisma.userWorkspace.create({ data });
        },

        delete: async (userId: number, workspaceId: number) => {
            return prisma.userWorkspace.delete({
                where: { user_id_workspace_id: { user_id: userId, workspace_id: workspaceId } },
            });
        },
    },

    project: {
        findUnique: async (id: number) => {
            return prisma.project.findUnique({
                where: { id },
                include: { tasks: { select: { type: true } } },
            });
        },

        findMany: async () => {
            return prisma.project.findMany({
                include: { tasks: { select: { type: true } } },
            });
        },

        findByWorkspace: async (workspaceId: number) => {
            return prisma.project.findMany({
                where: { workspace_id: workspaceId },
                include: { tasks: { select: { type: true } } },
            });
        },

        create: async (data: {
            workspace_id: number;
            title: string;
            description?: string | null;
            is_starred?: boolean;
            alias: string;
        }) => {
            return prisma.project.create({ data });
        },

        update: async (id: number, data: {
            title?: string;
            description?: string | null;
            is_starred?: boolean;
            alias?: string;
        }) => {
            return prisma.project.update({ where: { id }, data });
        },

        countTasks: async (projectId: number) => {
            return prisma.task.count({
                where: { project_id: projectId },
            });
        },

        delete: async (id: number) => {
            return prisma.project.delete({ where: { id } });
        },
    },

    task: {
        findUnique: async (id: number) => {
            return prisma.task.findUnique({ where: { id } });
        },

        findMany: async () => {
            return prisma.task.findMany();
        },

        findByWorkspace: async (workspaceId: number, projectId?: number) => {
            return prisma.task.findMany({
                where: {
                    workspace_id: workspaceId,
                    ...(projectId !== undefined && { project_id: projectId }),
                },
            });
        },

        findByUser: async (userId: number, type?: TaskType) => {
            return prisma.task.findMany({
                where: {
                    workspace: {
                        OR: [
                            { owner_id: userId },
                            { teammates: { some: { user_id: userId } } },
                        ],
                    },
                    ...(type && { type }),
                },
            });
        },

        create: async (data: {
            workspace_id: number;
            project_id?: number | null;
            title: string;
            is_starred?: boolean;
            priority?: number;
            date: Date;
            type?: TaskType;
            serial: string;
        }) => {
            return prisma.task.create({ data });
        },

        countByMyWorkspace: async (userId: number) => {
            return prisma.task.count({
                where: {
                    workspace: {
                        owner_id: userId,
                        is_my_workspace: true,
                    },
                },
            });
        },

        countByProject: async (projectId: number) => {
            return prisma.task.count({
                where: { project_id: projectId },
            });
        },

        update: async (id: number, data: {
            title?: string;
            is_starred?: boolean;
            priority?: number;
            date?: Date;
            type?: TaskType;
        }) => {
            return prisma.task.update({ where: { id }, data });
        },

        delete: async (id: number) => {
            return prisma.task.delete({ where: { id } });
        },
    },
};
