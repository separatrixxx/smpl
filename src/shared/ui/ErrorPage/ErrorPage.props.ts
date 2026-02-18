import { DetailedHTMLProps, HTMLAttributes  } from 'react';


export interface ErrorPageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	errorText: string,
}

