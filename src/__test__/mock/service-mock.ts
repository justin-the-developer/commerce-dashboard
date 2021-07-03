import { filterType } from "../../types";

export const DUMMY_MENU = [
    {
        name: "Vegetarian",
        price: 8.99,
        ingredients: {
            bread: 2,
            lettuce: 2,
            tomato: 2,
            cheese: 2
        }
    },
    {
        name: "BLT",
        price: 9.99,
        ingredients: {
            bread: 3,
            lettuce: 1,
            tomato: 1,
            bacon: 2
        }
    },
    {
        name: "Turkey",
        price: 10.99,
        ingredients: {
            bread: 2,
            lettuce: 1,
            tomato: 1,
            cheese: 1,
            turkey: 1
        }
    }
];

export const DUMMY_ORDER_LIST = [
    {
        name: "BTL",
        count: 12,
        price: 8.99
    }
];

export const DUMMY_INVENTORY = {
    bread: 40,
    lettuce: 20,
    tomato: 20,
    cheese: 10,
    bacon: 10,
    turkey: 5
};

export const DUMMY_DELIVERY_LIST = [
    {
        id: 12345,
        picked: "picked" as filterType,
        price: 8.55,
        detail: [
            {
                name: "BLT",
                count: 5
            }
        ]
    }
];
