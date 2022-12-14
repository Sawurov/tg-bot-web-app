import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const products = [
    {id: '1', title: 'Jinsi', price: 500000, description: 'Kok Rangli, uzun'},
    {id: '2', title: 'Kurtka', price: 1200000, description: 'Yashil Rangli, issiq'},
    {id: '3', title: 'Jinsi 2', price: 500000, description: 'Qora Rangli, uzun',},
    {id: '4', title: 'Kurtka 8', price: 122, description: 'Yashil Rangli, issiq'},
    {id: '5', title: 'Jinsi 3', price: 5000, description: 'Kok Rangli, tor'},
    {id: '6', title: 'Kurtka 7', price: 600, description: 'Yashil Rangli, issiq'},
    {id: '7', title: 'Jinsi 4', price: 5500, description: 'Kok Rangli, tor'},
    {id: '8', title: 'Kurtka 5', price: 12000, description: 'Oq Rangli, issiq'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://3.75.129.153:3000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `???????????? ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;