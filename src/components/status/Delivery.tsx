import "../../css/status.css";
import React, { Fragment } from "react";
import { DeliveryListProps, functionType, filterType } from "../../types";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    deliveryList: DeliveryListProps[];
    filteredBy: filterType;
    handlePickedUp: (id: number, type: functionType) => void;
    handleFilter: (type: filterType) => void;
}

export const Delivery = ({
                             deliveryList,
                             filteredBy,
                             handlePickedUp,
                             handleFilter,
                             ...rest
                         }: Props) => {
    return (
        <section {...rest} className="module" data-testid="delivery">
            <div className="title-area margin-bottom-20">
                <p className="left big">Delivery</p>
                <p className="right">
                    Filtered by:{" "}
                    <button
                        aria-label="filter-all"
                        className={`button ${filteredBy === "all" && "button-active"}`}
                        onClick={() => handleFilter("all")}
                    >
                        All
                    </button>{" "}
                    <button
                        aria-label="filter-picked"
                        className={`button ${filteredBy === "picked" && "button-active"}`}
                        onClick={() => handleFilter("picked")}
                    >
                        Picked Up
                    </button>{" "}
                    <button
                        aria-label="filter-open"
                        className={`button ${filteredBy === "open" && "button-active"}`}
                        onClick={() => handleFilter("open")}
                    >
                        Open
                    </button>
                </p>
            </div>
            <div className="order-list-conatiner">
                <table className="orderlist-table">
                    <thead>
                    <tr>
                        <th className="medium">Order Id</th>
                        <th className="medium">Status</th>
                        <th className="medium">Order List</th>
                        <th className="medium">Total Price</th>
                        <th className="medium">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {deliveryList
                        .slice(0)
                        .reverse()
                        .filter((v): DeliveryListProps | any => {
                            if (filteredBy === "all") {
                                return v;
                            }
                            if (v.picked === filteredBy) {
                                return v;
                            }

                            return "";
                        })
                        .map((d) => {
                            let isPicked = d.picked === "picked";
                            return (
                                <tr
                                    className={`margin-bottom-5 ${
                                        isPicked ? "order-open" : "order-close"
                                    }`}
                                    key={d.id}
                                >
                                    <td>#{d.id}</td>
                                    <td>{isPicked ? "Picked up" : "Open"}</td>
                                    <td>
                                        {d.detail.map((list, i) => (
                                            <Fragment key={`key-${i}`}>
                                                <p className="margin-bottom-5">
                                                    {list.name} / {list.count}{" "}
                                                </p>
                                            </Fragment>
                                        ))}
                                    </td>
                                    <td>${d.price}</td>
                                    <td>
                                        <button
                                            aria-label="button-close-delivery"
                                            className="button button-active action-button button-close"
                                            disabled={isPicked && true}
                                            onClick={() => handlePickedUp(d.id, "p")}
                                        >
                                            Picked Up
                                        </button>{" "}
                                        <br />
                                        <button
                                            aria-label="button-undo-delivery"
                                            className="button button-active action-button button-open"
                                            disabled={!isPicked && true}
                                            onClick={() => handlePickedUp(d.id, "u")}
                                        >
                                            Undo
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
};
