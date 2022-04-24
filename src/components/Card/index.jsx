import React, { useState } from "react";
import "./styles.css";
import save from './img/save.svg'
import cn from 'classnames';
import { EditPostForm } from "../CreatePostForm/EditForm";
import { Modal } from "../Modal/Modal";
import { FormMod } from "../FormMod/FormMod";
import { ReactComponent as Out } from './img/Out.svg'

export const Card = ({ name, email, address, number, image }) => {
    const [modalActive, setModalActive] = useState(false);
    const [modalActiveInfo, setmodalActiveInfo] = useState(false);
    return (
        <>
            <FormMod active={modalActiveInfo} setActive={setmodalActiveInfo}>
                <div>{name}</div>
                <div>{number}</div>
                <div>{address}</div>
                <div>{email}</div>
                <button onClick={() => { setmodalActiveInfo(false) }}>Отмена</button>
            </FormMod>
            <div className="card" onClick={() => { setmodalActiveInfo(true) }}>

                {/* <a href="#" className="card__link"> */}
                <div className="card__desc">
                {/* <div className="card__image"></div> */}
                    {image ? <img src={image} className="card__image" alt="img" /> : <Out className="card__image"/>}
                    <div className="card__name ">{name}</div>
                    <div className="card__name">{number}</div>
                    <div className="card__name">{address}</div>
                    <div className="card__name">{email}</div>
                    <FormMod active={modalActive} setActive={setModalActive}>
                        <EditPostForm name={name} number={number} address={address} email={email} setActive={setModalActive} />
                    </FormMod>
                    <button className="btn" onClick={() => { setModalActive(true), setmodalActiveInfo(false) }}>редактировать</button>
                </div>
                {/* </a> */}
            </div>
        </>
    );
};
