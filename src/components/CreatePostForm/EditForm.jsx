import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FormMod } from '../FormMod/FormMod';
import { ReactComponent as Out } from './img/Out1.svg'

import s from "./styles.module.css"

export function EditPostForm({ name, number, address, email, image, setActive, handleUpdateNewPhone, id }) {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur"
    });

    const [info, setinfo] = useState({
        name: name.first,
        number: number,
        address: address,
        email: email,
    })
    const [imageEdit, setimageEdit] = useState(image);
    const [modalActive, setModalActive] = useState(false);

    function onSubmit(data) {
        handleUpdateNewPhone(data, id)
        console.log(data);
    }

    function onSubmitImg(data) {
        setimageEdit(data)
    }

    function handleChange(event) {
        setinfo({ ...info, [event.target.name]: event.target.value })
    }

    class ImageUpload extends React.Component {
        constructor(props) {
            super(props);
            this.state = { file: '', imagePreviewUrl: '' };
        }

        _handleSubmit(e) {
            e.preventDefault();
            console.log('handle uploading-', this.state.file);
            onSubmitImg(this.state.imagePreviewUrl)
        }

        _handleImageChange(e) {
            e.preventDefault();

            let reader = new FileReader();
            let file = e.target.files[0];

            reader.onloadend = () => {
                this.setState({
                    file: file,
                    imagePreviewUrl: reader.result
                });
            }

            reader.readAsDataURL(file)
        }

        render() {
            let { imagePreviewUrl } = this.state;
            let $imagePreview = null;
            if (imagePreviewUrl) {
                $imagePreview = (<img src={imagePreviewUrl} />);
            } else {
                $imagePreview = (<div className={s.previewText}>Пожалуйста, загрузите изображение</div>);
            }

            return (
                <div className={s.previewComponent}>
                    <form onSubmit={(e) => this._handleSubmit(e)}>
                        <input className={s.fileInput}
                            type="file"
                            onChange={(e) => this._handleImageChange(e)} />
                        <button className={s.submitButton}
                            type="submit"
                            onClick={(e) => this._handleSubmit(e)}>Загрузить изображение</button>
                    </form>
                    {/* <div className={s.imgPreview}>
                        {$imagePreview}
                    </div> */}
                </div>
            )
        }
    }

    return (
        <>
            <FormMod active={modalActive} setActive={setModalActive}>
                <ImageUpload />
                <button onClick={() => { setModalActive(false) }}>Отмена</button>
            </FormMod>
            <h3>Редактировать пользователя</h3>
            <div onClick={() => { setModalActive(true) }}> {imageEdit ? <img src={imageEdit} className={s.imagee} alt="img" /> : <Out className={s.image} />}</div>
            <form className={s.form_title} onSubmit={handleSubmit(onSubmit)}>
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
                <button className={s.button_com} onClick={() => { setActive(false) }}>Сохранить</button> <button type='reset' className={s.button_com} onClick={() => { setActive(false) }}>Отмена</button>
            </form>

        </>
    )
}