export interface InventoryObjectKeys {
    [key: string]: number | undefined;
}

export interface BurgerProps {
    name: string;
    price: number;
    ingredients: IngredientsProps;
}

export interface IngredientsProps extends InventoryObjectKeys {
    bread?: number;
    lettuce?: number;
    tomato?: number;
    cheese?: number;
    bacon?: number;
    turkey?: number;
}

export interface DeliveryListProps {
    id: number;
    picked: filterType;
    price: number;
    detail: DeliveryDetailProps[];
}

interface DeliveryDetailProps {
    name: string;
    count: number;
}

export interface OrderProps {
    name: string;
    count: number;
    price: number;
    included?: boolean;
}

export interface Dictionary<T> {
    [Key: string]: T;
}

export type functionType = "p" | "u";

export type filterType = "all" | "picked" | "open";
