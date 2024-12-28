import * as Yup from 'yup';

const EntriesEditorSchema = Yup.object().shape({
  date: Yup.string()
    .required('La fecha es obligatoria.')
    .matches(
    /^\d{4}-\d{2}-\d{2}$/,
    'La fecha debe estar en formato YYYY-MM-DD.'
    ),
  period: Yup.string()
    .required('El período es obligatorio.')
    .matches(
    /^\d{4}-\d{2}$/,
    'El período debe estar en formato YYYY-MM'
    ),
  amount: Yup.number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .required('El monto es obligatorio.')
    .typeError("Debes ingresar un número")
    .notOneOf([0], 'El monto no puede ser 0.'),
  tag_id: Yup.number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .required('La categoría es obligatoria.')
    .integer().positive(),
  wallet_id: Yup.number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .required('La cuenta es obligatoria.')
    .integer().positive()
    ,
  contact_id: Yup.number()
  .transform((value, originalValue) => (originalValue === "" ? null : value)) // Convierte "" en null
  .nullable() // Permite valores nulos
  .integer().positive(),
})

export default EntriesEditorSchema