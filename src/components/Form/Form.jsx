import React, { useEffect, useState } from 'react';
import './Form.css';
import { YMaps, Map, GeolocationControl, ListBox, ListBoxItem } from '@pbe/react-yandex-maps';
import { useTelegram } from '../../hooks/useTelegram';

const Form = () => {
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('physical');
    const {tg} = useTelegram();

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Malumotlarni Yuborish'
        })
    }, [])

    useEffect(() =>{
        if (!street || !city) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [city, street])

    const onChangeCity = (e) => {
        setCity(e.target.value);
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value);
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value);
    }


    return (
        <div className={"form"}>
            <h3>Malumotlarni Kiriting!</h3>
            <input 
                className={'input'}
                type="text"
                placeholder='Shahar'
                value={city}
                onChange={onChangeCity}
            />
            <input 
                className={'input'}
                type="text"
                placeholder='Kocha'
                value={street}
                onChange={onChangeStreet}
            />
            <select value={subject} onChange={onChangeSubject } className={'select'}>
                <option value={'physical'}>Yuridi Shaxs</option>
                <option value={'legal'}>Jismoniy Shaxs</option>
            </select>
            <YMaps>
                <div className={'map'}>
                   <Map
                        defaultState={{
                            center: [41.311151, 69.279737],
                            zoom: 10,
                            controls: [],
                        }}
                    >
                        <GeolocationControl options={{ float: "right" }} />
                        <ListBox data={{content: "Shaharni Tanlang"}}>
                            <ListBoxItem data={{ content: "Toshkent"}}/>
                            <ListBoxItem data={{ content: "Samarqand"}}/>
                        </ListBox>
                    </Map>
                </div>
            </YMaps>
        </div>
    )
}

export default Form; 