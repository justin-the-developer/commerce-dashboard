import "../../css/order.css";
import React, { useState } from "react";
import { BurgerProps, IngredientsProps } from "../../types";

interface Props extends React.HTMLAttributes<HTMLFormElement> {
    menu: BurgerProps[];
    inventoryData: IngredientsProps;
    handleOrder: (strArr: string[]) => void;
}

export const Form = ({ menu, inventoryData, handleOrder, ...rest }: Props) => {
    const [selectValue, setSelectValue] = useState<string[]>([]);

    const handleChange = (name: string) => {
        const index = selectValue.indexOf(name);

        if (index > -1) {
            setSelectValue((prevState) => {
                prevState.splice(index, 1);
                return [...prevState];
            });
        } else {
            setSelectValue((prevState) => [...prevState, name]);
        }
    };

    const isSellable = (obj: IngredientsProps): boolean => {
        if (inventoryData) {
            let checkArray = Object.keys(obj).filter((v) => {
                const curObj = obj[v];
                const inventoryObj = inventoryData[v];
                if (curObj && inventoryObj) {
                    return inventoryObj < curObj;
                }

                return true;
            });
            return checkArray.length > 0;
        }

        return false;
    };

    return (
        <section className="module" data-testid="form">
            <h1 className="left title margin-bottom-20">Menu</h1>
            <form onSubmit={(e) => e.preventDefault()} {...rest} className="form">
                {menu.map((m, i) => {
                    let isEmpty = isSellable(m.ingredients);
                    let isIncludeName = selectValue.includes(m.name);
                    return (
                        <div
                            aria-label={`menu-${m.name}`}
                            key={`index-${i}`}
                            className={`menu box-shadow ${isIncludeName ? "active" : ""} 
              ${isEmpty && "disabled"}
              `}
                            onClick={() => {
                                if (!isEmpty) {
                                    handleChange(m.name);
                                }
                            }}
                        >
                            <p>
                                <span className="small">Best sandwich ever</span>
                                <label className="big" htmlFor={m.name}>
                                    {m.name}
                                </label>
                            </p>
                            <input
                                multiple
                                type="checkbox"
                                name={m.name}
                                value={m.name}
                                checked={isEmpty ? false : isIncludeName}
                                disabled={isEmpty && true}
                                readOnly
                            />
                            <p className="medium">${m.price}</p>
                        </div>
                    );
                })}
                <br />
            </form>
            <button
                aria-label="add-to-order"
                className={`button margin-top-20 add-cart ${
                    selectValue.length > 0 && "button-active"
                }`}
                onClick={(e) => {
                    e.preventDefault();
                    handleOrder(selectValue);
                    setSelectValue([]);
                }}
            >
                Add to Order!
            </button>
        </section>
    );
};
