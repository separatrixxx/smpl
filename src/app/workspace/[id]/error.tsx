'use client';


export default function WorkspaceError({ error }: { error: Error }) {
    return (
        <div>
            <h1>Ошибка</h1>
            <p>{error.message}</p>
        </div>
    );
}
