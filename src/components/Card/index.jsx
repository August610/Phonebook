import React, { useState } from "react";
import "./styles.css";
import { EditPostForm } from "../CreatePostForm/EditForm";
import { FormMod } from "../FormMod/FormMod";
import { ReactComponent as Out } from './img/Out.svg'

export const Card = ({ name, lastname, patronymic, email, address, number, image, handleUpdateNewPhone, id, toggle, handleDeletePhone, cards }) => {
    const [modalActive, setModalActive] = useState(false);
    const [modalActiveInfo, setmodalActiveInfo] = useState(false);

    function deleteCard() {
        const confirmm = confirm("Удалить контакт?")
        if (confirmm == true) {
            handleDeletePhone(id);
        }
    }

    // console.log(cards.filter(e => e.id === id)); 
    // console.log(Object.keys(cards.filter(e => e.id === id)).map((e) =>e));
    console.log(cards.filter(e => e.id === id).map(e => Object.values(e).filter(e => typeof e === "string")));
    const infoArr = cards.filter(e => e.id === id).map(e => Object.values(e).filter(e => typeof e === "string"))
    // infoArr.map(e => e.map(e => console.log(e)));

    return (
        <>
            <FormMod active={modalActiveInfo} setActive={setmodalActiveInfo}>
                {infoArr.map(e => e.map((e, i) =>
                    <div
                        key={i}
                        className="info"
                    >
                        {e.includes(".jpg" || ".png" || "https") ? <img src={e} className="image_info"></img> : e}
                    </div>
                ))}

                {/* <div className="info">
                    {image ? <img src={image} className="image_info" alt="img" /> : <Out className="image_info" />}
                    <div className="info">Имя: {name.last} {name.first} </div>
                    <div className="info">Телефон: {number}</div>
                    <div className="info">Адрес: {address}</div>
                    <div className="info">E-mail: {email}</div>
                    <button onClick={() => { setmodalActiveInfo(false) }}>Отмена</button>
                </div> */}
            </FormMod>
            <div className="card" onClick={() => { setmodalActiveInfo(true) }}>
                <div className="card__desc">
                    {image ? <img src={image} className="card__image" alt="img" /> : <Out className="card__image" />}
                    <div className="card__name ">{name.last} {name.first && name.first} </div>
                    <div className="card__name">{number}</div>
                    <div className="card__name">{address}</div>
                    <div className="card__name">{email}</div>
                    <button className="btn" onClick={(e) => { e.stopPropagation(setModalActive(true)) }}>редактировать</button>
                    <button className={toggle ? "btn_del_ac" : "btn_del"} onClick={(e) =>  e.stopPropagation(deleteCard()) }>удалить</button>
                </div>
            </div>
            <FormMod active={modalActive} setActive={setModalActive}>
                <EditPostForm name={name} number={number} address={address} email={email} image={image} id={id} setActive={setModalActive} handleUpdateNewPhone={handleUpdateNewPhone} />
            </FormMod>
        </>
    );
};
