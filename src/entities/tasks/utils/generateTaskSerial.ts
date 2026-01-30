interface GenerateMyWorkspaceSerialParams {
    username: string | null;
    telegramId: number;
    taskNumber: number;
}

interface GenerateProjectSerialParams {
    projectAlias: string;
    taskNumber: number;
}

export function generateMyWorkspaceSerial(params: GenerateMyWorkspaceSerialParams): string {
    const { username, telegramId, taskNumber } = params;
    const prefix = username || String(telegramId);

    return `${prefix}-${taskNumber}`;
}

export function generateProjectSerial(params: GenerateProjectSerialParams): string {
    const { projectAlias, taskNumber } = params;

    return `${projectAlias}-${taskNumber}`;
}
