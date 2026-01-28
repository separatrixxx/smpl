import { getLocaleText } from "../locale/locale";


export function getWorkspaceTitle(lang?: string, title?: string, isMyWorkspace?: boolean): string {
    const correctTitle = title ? title : getLocaleText(lang, 'workspace');
    
    return isMyWorkspace ? getLocaleText(lang, 'my_workspace') : correctTitle;
}
