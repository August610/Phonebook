import React, { useState } from "react";
import "./styles.css";
import { EditPostForm } from "../CreatePostForm/EditForm";
import { Modal } from "../Modal/Modal";
import { FormMod } from "../FormMod/FormMod";
import { ReactComponent as Out } from './img/Out.svg'

export const Card = ({ name, email, address, number, image, handleUpdateNewPhone, id, toggle }) => {
    const [modalActive, setModalActive] = useState(false);
    const [modalActiveInfo, setmodalActiveInfo] = useState(false);
    // const [toggleDel, setToggleDel] = useState(toggle)
    // setToggleDel(toggle)
    console.log(toggle);
    return (
        <>
            <FormMod active={modalActiveInfo} setActive={setmodalActiveInfo}>
                <div className="info">
                    <img src={image} className="image_info" alt="img" />
                    <div className="info">Имя: {name}</div>
                    <div className="info">Телефон: {number}</div>
                    <div className="info">Адрес: {address}</div>
                    <div className="info">E-mail: {email}</div>
                    <button onClick={() => { setmodalActiveInfo(false) }}>Отмена</button>
                </div>
            </FormMod>
            <div className="card" onClick={() => { setmodalActiveInfo(true) }}>
                <div className="card__desc">
                    {/* <div className="card__image"></div> */}
                    {image ? <img src={image} className="card__image" alt="img" /> : <Out className="card__image" />}
                    <div className="card__name ">{name}</div>
                    <div className="card__name">{number}</div>
                    <div className="card__name">{address}</div>
                    <div className="card__name">{email}</div>
                    <FormMod active={modalActive} setActive={setModalActive}>
                        <EditPostForm name={name} number={number} address={address} email={email} image={image} id={id} setActive={setModalActive} handleUpdateNewPhone={handleUpdateNewPhone} />
                    </FormMod>
                    <button className="btn" onClick={() => { setModalActive(true), setmodalActiveInfo(false) }}>редактировать</button>
                    <button className={toggle ? "btn_del_ac" : "btn_del"} onClick={() => { setModalActive(true), setmodalActiveInfo(false) }}>удалить</button>
                </div>
            </div>
        </>
    );
};
