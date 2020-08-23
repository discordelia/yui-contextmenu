import { TemplateType } from "../types/TemplateType";

export interface IMenuItem {
    disabled?: boolean;
    divider?: boolean;
    icon?: string;
    iconTemplate?: TemplateType;
    image?: string;
    menuItems?: IMenuItem[];
    select?: (item?: IMenuItem) => void;
    subtext?: string;
    subtextTemplate?: TemplateType;
    text?: string;
    textTemplate?: TemplateType;
    toggleable?: boolean;
    toggle?: (item?: IMenuItem) => void;
    toggled?: boolean;
    visible?: boolean;
}
