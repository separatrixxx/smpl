import Archive from './archive.svg';
import Bell from './bell.svg';
import Burn from './burn.svg';
import Calendar from './calendar.svg';
import CheckMark from './check_mark.svg';
import ChevronDown from './chevron_down.svg';
import ChevronLeft from './chevron_left.svg';
import ChevronRight from './chevron_right.svg';
import ChevronUp from './chevron_up.svg';
import Cross from './cross.svg';
import Folder from './folder.svg';
import Logo from './logo.svg';
import Pencil from './pencil.svg';
import People from './people.svg';
import Plus from './plus.svg';
import Star from './star.svg';


export const icons = {
    archive: Archive,
    bell: Bell,
    burn: Burn,
    calendar: Calendar,
    check_mark: CheckMark,
    chevron_down: ChevronDown,
    chevron_left: ChevronLeft,
    chevron_right: ChevronRight,
    chevron_up: ChevronUp,
    cross: Cross,
    folder: Folder,
    logo: Logo,
    pencil: Pencil,
    people: People,
    plus: Plus,
    star: Star,
} as const;

export type IconType = keyof typeof icons;
