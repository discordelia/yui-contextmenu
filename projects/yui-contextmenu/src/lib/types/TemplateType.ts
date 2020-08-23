import { TemplateRef } from "@angular/core";

export type TemplateType<T = any> = TemplateRef<T> | (() => TemplateRef<T>);
