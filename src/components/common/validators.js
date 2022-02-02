import * as Yup from 'yup';

export const validateEmail = (value) => {
    let error;
    if (!value) {
        error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address';
    }
    return error;
}

export const validatePost = Yup.object().shape({
    newPost: Yup.string()
        .min(2, 'Too Short!')
        .max(300, 'Too Long!, only 300 symbols allowed.'),
    message: Yup.string()
        .min(2, 'Too Short!')
        .max(1000, 'Too Long!, only 1000 symbols allowed.')

});