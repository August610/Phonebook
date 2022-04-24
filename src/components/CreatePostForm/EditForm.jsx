import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
// import { UpdatePostContext } from '../../context/updatePostContext';
import { Button } from '../Button/Button';

import s from "./styles.module.css"

export function EditPostForm({ name, number, address, email, setActive }) {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur"
    });

    const [info, setinfo] = useState({
        name: name,
        number: number,
        address: address,
        email: email,
    })

    // const onUpdatePost = useContext(UpdatePostContext);

    function onSubmit(data) {
        console.log(data);
    }

    function handleChange(event) {
        setinfo({ ...info, [event.target.name]: event.target.value })
    }

    return (
        <>
            <form className={s.form_title} onSubmit={handleSubmit(onSubmit)}>
                <h3>Редактировать пользователя</h3>
                <input className={s.formd}
                    type="text"
                    {...register('name', {
                        required: 'Это поле обязательно'
                    })}
                    placeholder="Имя"
                    value={info.name}
                    onChange={handleChange}
                />
                <div>
                    {errors?.title && <p className={s.errorMessage}>{errors?.title?.message}</p>}
                </div>
                <input className={s.formd}
                    type="text"
                    {...register('number', {
                        required: 'Это поле обязательно'
                    })}
                    placeholder="Телефон"
                    value={info.number}
                    onChange={handleChange}
                />
                <div>
                    {errors?.text && <p className={s.errorMessage}>{errors?.text?.message}</p>}
                </div>
                <input className={s.formd}
                    type="text"
                    {...register('address', {

                    })}
                    placeholder="Адрес"
                    value={info.address}
                    onChange={handleChange}
                />
                <input className={s.formd}
                    type="text"
                    {...register('email', {

                    })}
                    placeholder="Электронный адрес"
                    value={info.email}
                    onChange={handleChange}
                />
                <button className={s.button_com} onClick={() => { setActive(false)}}>Сохранить</button> <button type='reset' className={s.button_com} onClick={() => { setActive(false) }}>Отмена</button>
            </form>
            
        </>
    )
}