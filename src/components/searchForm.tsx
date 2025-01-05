import { useFormik } from 'formik';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { filterPostsByName } from '../redux/slices/postSlice';

export const SearchForm = () => {
    const dispatch = useDispatch<AppDispatch>();
  
    const formikSearchPost = useFormik({
      initialValues: {
        name: '',
      },
      onSubmit: (values) => {
        const { name } = values
  
        dispatch(filterPostsByName(name))
      },
    });
  
    return (
      <form onSubmit={formikSearchPost.handleSubmit}>
        <div className='container bg-gray'>
          <div className='item'>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Ingresa un nombre!"
              value={formikSearchPost.values.name}
              onChange={formikSearchPost.handleChange}
              onBlur={formikSearchPost.handleBlur}
            />
          </div>
          <div className="item">
            <button type="submit">Buscar</button>
          </div>
        </div>
      </form>
    )
}