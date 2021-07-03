import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
    DUMMY_INVENTORY,
    DUMMY_DELIVERY_LIST,
    DUMMY_MENU,
    DUMMY_ORDER_LIST
} from "../mock/service-mock";
import { Inventory, Delivery } from "../../components/status";
import { Order, Form } from "../../components/order";
import React from "react";

const handleOrder = jest.fn();


    it("should render a form", () => {
        const { getByTestId } = render(
            <Form
                menu={DUMMY_MENU}
                inventoryData={DUMMY_INVENTORY}
                handleOrder={handleOrder}
            />
        );

        const component = getByTestId("form");
        expect(component).toBeInTheDocument();
    });

    it('should render a text', () => {
        const { getByText } = render(
            <Form
                menu={DUMMY_MENU}
                inventoryData={DUMMY_INVENTORY}
                handleOrder={handleOrder}
            />
        );

        const menu_comp = getByText("Vegetarian");
        const menu_price = getByText(/\$8\.99/i);
        expect(menu_comp).toBeInTheDocument();
        expect(menu_price).toBeInTheDocument();
    });

    it("should click the sandwiches to add to card", async () => {
        const { container } = render(
            <Form
                menu={DUMMY_MENU}
                inventoryData={DUMMY_INVENTORY}
                handleOrder={handleOrder}
            />
        );

        const menu_comp = container.querySelector(
            "#root > div > section:nth-child(2) > form > div:nth-child(1)"
        );
        const add_btn = screen.getByRole("button", {
            name: /add\-to\-order/i
        });

        if (menu_comp) {
            fireEvent.click(menu_comp);
            await waitFor(() => expect(menu_comp).toHaveClass("active"));
            await waitFor(() => expect(add_btn).toHaveClass("button-active"));
        }
    });

    const addOrder = jest.fn();
    const totalPrice = 16.99;

    it("should be rendered", () => {
        const { getByTestId, getByText } = render(
            <Order
                orderList={DUMMY_ORDER_LIST}
                addOrder={addOrder}
                totalPrice={totalPrice}
            />
        );

        const component = getByTestId("order");
        const cell = getByText(/\$8\.99/i);
        const totalCost = getByText(/total value/i);
        expect(component).toBeInTheDocument();
        expect(cell).toBeInTheDocument();
        expect(totalCost).toBeInTheDocument();

        const button = screen.getByRole("button", {
            name: /confirm/i
        });
        fireEvent.click(button);
        expect(addOrder).toHaveBeenCalledTimes(1);
    });

    it("should be rendered", () => {
        const { getByTestId } = render(<Inventory inventory={DUMMY_INVENTORY} />);

        const component = getByTestId("inventory");
        expect(component).toBeInTheDocument();
    });

    const handlePickedUp = jest.fn();
    const handleFilter = jest.fn();
    it("should be render a delivery component", () => {
        const { getByTestId } = render(
            <Delivery
                deliveryList={DUMMY_DELIVERY_LIST}
                filteredBy={"all"}
                handlePickedUp={handlePickedUp}
                handleFilter={handleFilter}
            />
        );

        const component = getByTestId("delivery");
        expect(component).toBeInTheDocument();
    });

    it("should able to trigger the function", () => {
        render(
            <Delivery
                deliveryList={DUMMY_DELIVERY_LIST}
                filteredBy={"all"}
                handlePickedUp={handlePickedUp}
                handleFilter={handleFilter}
            />
        );

        const button = screen.getByRole("button", {
            name: /button\-close\-delivery/i
        });

        fireEvent.click(button);

        expect(button).toHaveAttribute("disabled");

        fireEvent.click(screen.getByText("Open"));
        expect(handleFilter).toHaveBeenCalledTimes(1);
    });
