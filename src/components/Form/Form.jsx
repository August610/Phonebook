import React, { useState } from "react";
import s from "./styles.module.css";
import { Modal } from "../Modal/Modal";
import { ReactComponent as Add } from './img/add.svg'
import { ReactComponent as Edit } from './img/Edit.svg'
import { ReactComponent as Import } from './img/Import.svg'
import { ReactComponent as Export } from './img/Export.svg'
import { ReactComponent as Circle } from './img/circle.svg'
import { CreatePostForm } from "../CreatePostForm/CreatePostForm";
import { FormMod } from "../FormMod/FormMod";
import { Sort } from "../Sort";

const tabs = [
    {
        id: "name",
        title: "Имя",
    }
];

export const Form = ({ handleCreateNewPhone, onSortData, cards, toggle, changeToggle }) => {
    const [modalActive, setModalActive] = useState(false);
    const [modalActiveForm, setModalActiveForm] = useState(false);
    const handleClickSort = (data) => {
        onSortData(data);
    };

    return (
        <div className={s.form}>
            <Circle className={s.circle} onClick={() => setModalActive(true)} />
            <Sort tabs={tabs} onChageSort={handleClickSort} />
            <div className={s.col}>Телефон</div>
            <div className={s.col}>Адрес</div>
            <div className={s.col}>Электронная почта</div>
            <Modal active={modalActive} setActive={setModalActive}>
                <div className={s.wrapper}>
                    <div className={s.item} onClick={() => { setModalActiveForm(true); setModalActive(false) }}>
                        <span><Add className={s.icon} /><br />Добавить<br /> пользователя</span>
                    </div>
                    <div className={s.item}>
                        <span><Export className={s.icon} /><br />Экспортировать<br />контакты</span>
                    </div>
                    <div className={s.item}>
                        <span><Import className={s.icon} /><br />Импортировать<br />контакты</span>
                    </div>
                    <div className={s.item} onClick={() => { toggle ? changeToggle(false) : changeToggle(true); setModalActive(false) }}>
                        <span><Edit className={s.icon} /><br />Редактировать<br />список</span>
                    </div>
                </div>
            </Modal>
            <FormMod active={modalActiveForm} setActive={setModalActiveForm} >
                <CreatePostForm active={setModalActiveForm} handleCreateNewPhone={handleCreateNewPhone} cards={cards}></CreatePostForm>
            </FormMod>
        </div>

    )
}