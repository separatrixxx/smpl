import { describe, expect, it } from 'vitest';
import { generateMyWorkspaceSerial, generateProjectSerial } from './generateTaskSerial';


describe('generateMyWorkspaceSerial', () => {
    it('uses username when provided', () => {
        const result = generateMyWorkspaceSerial({
            username: 'johndoe',
            telegramId: 123456789,
            taskNumber: 1,
        });

        expect(result).toBe('johndoe-1');
    });

    it('uses telegram id when username is null', () => {
        const result = generateMyWorkspaceSerial({
            username: null,
            telegramId: 123456789,
            taskNumber: 5,
        });

        expect(result).toBe('123456789-5');
    });

    it('handles large task numbers', () => {
        const result = generateMyWorkspaceSerial({
            username: 'user',
            telegramId: 1,
            taskNumber: 9999,
        });

        expect(result).toBe('user-9999');
    });

    it('handles username with special characters', () => {
        const result = generateMyWorkspaceSerial({
            username: 'user_name123',
            telegramId: 1,
            taskNumber: 3,
        });

        expect(result).toBe('user_name123-3');
    });
});

describe('generateProjectSerial', () => {
    it('generates serial with project alias', () => {
        const result = generateProjectSerial({
            projectAlias: 'PROJ',
            taskNumber: 1,
        });

        expect(result).toBe('PROJ-1');
    });

    it('handles lowercase alias', () => {
        const result = generateProjectSerial({
            projectAlias: 'myproj',
            taskNumber: 42,
        });

        expect(result).toBe('myproj-42');
    });

    it('handles alias with numbers', () => {
        const result = generateProjectSerial({
            projectAlias: 'SMPL2024',
            taskNumber: 100,
        });

        expect(result).toBe('SMPL2024-100');
    });
});
