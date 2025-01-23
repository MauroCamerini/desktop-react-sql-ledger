import * as Yup from 'yup';

const ContactsEditorSchema = Yup.object().shape({
  
  name: Yup.string().required('El nombre es obligatorio'),
  description: Yup.string()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable(),
})

export default ContactsEditorSchema