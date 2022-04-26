import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import s from "./styles.module.css"
import cn from "classnames";
import { ReactComponent as Out } from './img/Out1.svg'
import { FormMod } from '../FormMod/FormMod';
export function CreatePostForm({ active, handleCreateNewPhone, cards }) {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur"
    });
    const [modalActive, setModalActive] = useState(false);
    const [image, setImage] = useState(cards.image);


    function onSubmit(data) {
        handleCreateNewPhone(data, image)
        console.log(data, image);
    }

    function onSubmitImg(data) {
    //    dataImg.push({...data})
        // console.log(data);
        setImage(data)
    }

    // console.log(image);
    

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
            <h3 className={s.title}>Добавить пользователя</h3>
            {image ? <img src={image} className={s.imagee} /> : <Out className={s.imagee} onClick={() => { setModalActive(true) }} />}
            <FormMod active={modalActive} setActive={setModalActive}>
                <ImageUpload/>
                <button onClick={() => { setModalActive(false) }}>Отмена</button>
            </FormMod>

            {/* <Image/> */}
            <form className={s.form_title} onSubmit={handleSubmit(onSubmit)}>
                <input className={s.formd}
                    type="text"
                    {...register('name', {
                        required: 'Это поле обязательно'
                    })}
                    placeholder="Имя"
                />
                <div>
                    {errors?.name && <p className={s.errorMessage}>{errors?.name?.message}</p>}
                </div>
                <input className={cn(s.formd)}
                    type="text"
                    {...register('number', {
                        required: 'Это поле обязательно'
                    })}
                    placeholder="Номер"
                />
                <div>
                    {errors?.number && <p className={s.errorMessage}>{errors?.number?.message}</p>}
                </div>
                <input className={s.formd}
                    type="text"
                    {...register('email', {
                        pattern: {
                            value:  /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/,
                            message: "Email не соответствует формату электронной почты",
                        }
                    })}
                    placeholder="Электронная почта"
                />
                {errors?.email && <p className={s.errorMessage}>{errors?.email?.message}</p>}
                <input className={s.formd}
                    type="text"
                    {...register('address', {

                    })}
                    placeholder="Адрес"
                />
                <button className={s.button_com} onClick={() => { active(false) }}>Сохранить</button>
                <button type='reset' className={s.button_com} onClick={() => { active(false) }}>Отмена</button>
            </form>
        </>
    )
}