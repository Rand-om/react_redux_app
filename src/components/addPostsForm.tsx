import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../redux/slices/postSlice';
import { AppDispatch } from '../redux/store';

import '../App.css'
import { RootState } from '@reduxjs/toolkit/query';

const ErrorMessage = ({ status }: { status: string }) => {
    return (status === 'rejected' || status === 'failed') && (
        <div className="text-red">A ocurrido un error con el servidor</div>
    )
}

export const AddPostForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { status } = useSelector((state: RootState) => state.posts);

    const validationSchemaAddPost = Yup.object({
        name: Yup.string().required('El nombre es obligatorio'),
        description: Yup.string().required('La descripción es obligatoria'),
    });

    const formikAddPost = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: validationSchemaAddPost, // Usando el esquema de validación de Yup
        onSubmit: (values) => {
            const { name, description } = values;

            const addPostData = {
                name,
                description,
            }

            dispatch(addPost(addPostData))
        },
    });

    return (
        <form onSubmit={formikAddPost.handleSubmit} id="formAddPost">
            <div className="container">
                <div className="item">
                    <div className="container-column">
                        <div className="item">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Nombre"
                                value={formikAddPost.values.name}
                                onChange={formikAddPost.handleChange}
                                onBlur={formikAddPost.handleBlur}
                            />
                        </div>
                        <div className="item">
                            {formikAddPost.touched.name && formikAddPost.errors.name && (
                                <span style={{ color: 'red' }}>{formikAddPost.errors.name}</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="container-colum">
                        <div className="item">
                            <input
                                type="text"
                                id="description"
                                name="description"
                                placeholder="Descripción"
                                value={formikAddPost.values.description}
                                onChange={formikAddPost.handleChange}
                                onBlur={formikAddPost.handleBlur}
                            />
                        </div>
                        <div className="item">
                            {formikAddPost.touched.description && formikAddPost.errors.description && (
                                <span style={{ color: 'red' }}>{formikAddPost.errors.description}</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="item">
                    <button type="submit">Enviar</button>
                </div>
            </div>
            <div className='container'>
                <div className="item">
                    <ErrorMessage status={status} />
                </div>
            </div>
        </form>
    )
}