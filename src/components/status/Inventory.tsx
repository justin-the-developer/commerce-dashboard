import "../../css/status.css";
import React from "react";
import { IngredientsProps } from "../../types";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    inventory: IngredientsProps;
}

export const Inventory = ({ inventory, ...rest }: Props) => {
    const capitalize = (str: string): string => {
        if (typeof str !== "string") return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    return (
        <section
            {...rest}
            id="inventory"
            className="module"
            data-testid="inventory"
        >
            <h1 className="title left">Inventory</h1>
            <table className="inventory-table">
                <thead>
                <tr>
                    <th className="medium">Product</th>
                    <th className="medium">Quantity</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(inventory).map((inv, i) => (
                    <tr className={inventory[inv] === 0 ? "red" : ""} key={`key-${i}`}>
                        <td>{`${capitalize(inv)}`}</td>
                        <td>{`${inventory[inv]}`}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
};
