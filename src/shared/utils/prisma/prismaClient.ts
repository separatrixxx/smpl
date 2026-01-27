import { prisma } from '@/shared/utils/prisma/prisma';
import { TaskStatus } from '@/generated/prisma';


export const db = {
    user: {
        findUnique: async (id: number) => {
            return prisma.user.findUnique({ where: { id } });
        },

        findMany: async () => {
            return prisma.user.findMany();
        },

        create: async (data: {
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
                    tasks: true,
                    teammates: { select: { user_id: true } },
                },
            });
        },

        findMany: async () => {
            return prisma.workspace.findMany({
                include: {
                    tasks: true,
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
                    tasks: true,
                    teammates: { select: { user_id: true } },
                },
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
                include: { tasks: true },
            });
        },

        findMany: async () => {
            return prisma.project.findMany({
                include: { tasks: true },
            });
        },

        findByWorkspace: async (workspaceId: number) => {
            return prisma.project.findMany({
                where: { workspace_id: workspaceId },
                include: { tasks: true },
            });
        },

        create: async (data: {
            workspace_id: number;
            title: string;
            description?: string | null;
            is_starred?: boolean;
        }) => {
            return prisma.project.create({ data });
        },

        update: async (id: number, data: {
            title?: string;
            description?: string | null;
            is_starred?: boolean;
        }) => {
            return prisma.project.update({ where: { id }, data });
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

        findByUser: async (userId: number, status?: TaskStatus) => {
            return prisma.task.findMany({
                where: {
                    workspace: {
                        OR: [
                            { owner_id: userId },
                            { teammates: { some: { user_id: userId } } },
                        ],
                    },
                    ...(status && { status }),
                },
            });
        },

        create: async (data: {
            workspace_id: number;
            project_id?: number | null;
            title: string;
            is_starred?: boolean;
            priority?: number;
            date?: Date;
            status?: TaskStatus;
        }) => {
            return prisma.task.create({ data });
        },

        update: async (id: number, data: {
            title?: string;
            is_starred?: boolean;
            priority?: number;
            date?: Date;
            status?: TaskStatus;
        }) => {
            return prisma.task.update({ where: { id }, data });
        },

        delete: async (id: number) => {
            return prisma.task.delete({ where: { id } });
        },
    },
};
