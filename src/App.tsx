import "./css/common.css";
import "./css/reset.css";
import { Form, Order } from "./components/order";
import { Inventory, Delivery } from "./components/status";
import { Divider } from "./components/divider/Divider";
import data from "./data.json";
import React, { useEffect, useState, useRef } from "react";
import {
  OrderProps,
  IngredientsProps,
  BurgerProps,
  DeliveryListProps,
  filterType,
  functionType,
  Dictionary
} from "./types";

const initialOrderList: OrderProps[] = [];
const initialInventoryData: IngredientsProps = data.inventory;
const initialMenuData: BurgerProps[] = data.menu;
const initialDeliveryList: DeliveryListProps[] = [];

export default function App() {
  const [inventoryData, setInventoryData] = useState(initialInventoryData);
  const [menuData] = useState(initialMenuData);
  const [orderList, setOrderList] = useState(initialOrderList);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [deliveryList, setDeliveryList] = useState(initialDeliveryList);
  const [filteredBy, setFilteredBy] = useState<filterType>("all");
  const calculateTotalAmount = useRef(() => {});

  calculateTotalAmount.current = () => {
    let totalPrice: number = 0.0;
    if (orderList) {
      totalPrice = orderList.reduce((a, b) => a + b.price * b.count, 0);
    }

    setTotalPrice(+totalPrice.toFixed(2));
  };

  const updateInventory = (selectedObject: IngredientsProps) => {
    let newObj = Object.keys(inventoryData).reduce((temp, key) => {
      temp[key] = selectedObject[key]
          ? inventoryData[key] === 0
              ? 0
              : (inventoryData[key] as number) - (selectedObject[key] as number)
          : (inventoryData[key] as number);

      return temp;
    }, {} as IngredientsProps);

    return newObj;
  };

  const handleOrder = (selected: string[]) => {
    if (selected.length < 1) return;

    let filteredData: OrderProps[] = [];
    for (let i = 0; i < menuData.length; i++) {
      if (selected.includes(menuData[i].name)) {
        filteredData.push({
          name: menuData[i].name,
          price: menuData[i].price,
          count: 1
        });
      }
    }

    let newInventoryData = menuData
        .filter((obj) => selected.includes(obj.name))
        .map((obj) => updateInventory(obj.ingredients));

    const filterDict = filteredData.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, {} as Dictionary<OrderProps>);

    let newFilterList = orderList.map((item) => {
      if (filterDict[item.name]) {
        item.count += filterDict[item.name].count;
        filterDict[item.name].included = true;
      }
      return item;
    });

    newFilterList = [
      ...newFilterList,
      ...filteredData.filter((item) => !filterDict[item.name].included)
    ];

    setOrderList(newFilterList);

    calculateTotalAmount.current();
    setInventoryData(newInventoryData[newInventoryData.length - 1]);
  };

  const addOrder = () => {
    setDeliveryList([
      ...deliveryList,
      {
        id: Math.floor(Math.random() * 90000) + 10000,
        picked: "open",
        price: totalPrice,
        detail: orderList
      }
    ]);
    setTotalPrice(0);
    setOrderList([]);
  };

  const handlePickedUp = (id: number, type: functionType) => {
    let newDeliveryList = deliveryList.map((o) => {
      if (o.id === id) {
        return {
          ...o,
          picked:
              type === "p" ? ("picked" as filterType) : ("open" as filterType)
        };
      }
      return o;
    });

    setDeliveryList(newDeliveryList);
  };

  const handleFilter = (type: filterType) => {
    setFilteredBy(type);
  };

  useEffect(() => {
    calculateTotalAmount.current();
  }, [orderList]);

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
      <div className="App">
        <Divider sectionName="Order End" />
        <Form
            menu={menuData}
            inventoryData={inventoryData}
            handleOrder={handleOrder}
        />
        <Order
            orderList={orderList}
            addOrder={addOrder}
            totalPrice={totalPrice}
        />
        <Divider sectionName="Status End" />
        <Inventory inventory={inventoryData} />
        <Delivery
            deliveryList={deliveryList}
            filteredBy={filteredBy}
            handlePickedUp={handlePickedUp}
            handleFilter={handleFilter}
        />
      </div>
  );
}
