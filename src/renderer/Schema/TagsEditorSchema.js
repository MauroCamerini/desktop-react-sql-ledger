import * as Yup from 'yup';

const TagsEditorSchema = Yup.object().shape({
  
  name: Yup.string().required('El nombre es obligatorio'),
  description: Yup.string()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable(),
  parent_id: Yup.number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .integer().positive(),
  tag_type: Yup.string().oneOf(['FIX', 'ORD', 'EXT'], "Tipo de categoría no válido")
})

export default TagsEditorSchema