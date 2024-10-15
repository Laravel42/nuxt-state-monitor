export interface UpdatedState {
    key: string | null;
    newVal: ValueType | null;
    oldVal: ValueType | null;
}

export type ValueType = Array<unknown> | object | boolean | string | number | null | undefined;

export interface DisplayValue {
    tooltip: string;
    shortened: boolean;
}

export interface ViewState {
    open: boolean;
    copyMessage: string;
    openOption: string;
    updatingKey: string;
    updatingKeyValue: unknown;
}

export interface StateData {
    [key: string]: unknown
}
