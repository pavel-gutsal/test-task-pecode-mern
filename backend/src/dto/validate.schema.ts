import * as yup from 'yup';

export const postValidation = yup.object().shape({
  userName: yup
    .string()
    .trim()
    .required('enter your user name')
    .min(3, 'name is too short')
    .max(30,'name is way too long'),
  text: yup
    .string()
    .trim()
    .required('enter text')
    .min(3, 'text too short')
    .max(2000,'text too long'),
  userAvatar: yup
    .string()
    .trim()
    .required('enter link to your avatar')
});
