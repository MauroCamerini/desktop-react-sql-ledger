import * as Yup from 'yup';

const WalletsEditorSchema = Yup.object().shape({
  
  name: Yup.string().required('El nombre es obligatorio'),
  description: Yup.string()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable(),
  starting_balance: Yup.number()
      .transform((value, originalValue) => (originalValue === "" ? null : value))
      .nullable()
      .required('El monto es obligatorio.')
      .typeError("Debes ingresar un número")
})

export default WalletsEditorSchema