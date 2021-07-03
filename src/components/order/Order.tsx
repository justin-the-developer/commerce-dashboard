import "../../css/order.css";
import React from "react";
import { OrderProps } from "../../types";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    orderList: OrderProps[];
    totalPrice: number;
    addOrder: () => void;
}

export const Order = ({ orderList, addOrder, totalPrice, ...rest }: Props) => {
    return (
        <section {...rest} className="module" data-testid="order">
            <h1 className="left title margin-bottom-20">Order</h1>
            {orderList.length === 0 ? (
                <p className="medium margin-spacing">
                    There is no item in the order yet.
                </p>
            ) : (
                <>
                    <table>
                        <thead>
                        <tr>
                            <th className="medium">Product</th>
                            <th className="medium">Quantity</th>
                            <th className="medium">Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orderList
                            .slice(0)
                            .reverse()
                            .map((o, i) => (
                                <tr key={`key-${i}`} className="padding-5">
                                    <td>{o.name}</td>
                                    <td>{o.count}</td>
                                    <td>${o.price}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                        <tr className="table-foot">
                            <td colSpan={2}>Total value</td>
                            <td>${totalPrice}</td>
                        </tr>
                        </tfoot>
                    </table>
                    <button
                        aria-label="confirm"
                        className="button button-active margin-top-20"
                        onClick={addOrder}
                    >
                        Confirm
                    </button>
                </>
            )}
        </section>
    );
};
