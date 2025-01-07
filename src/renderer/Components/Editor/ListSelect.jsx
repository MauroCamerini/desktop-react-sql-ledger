import React from "react";
import Form from "react-bootstrap/Form";

import { useList } from "../../Hooks/useList";

/**
 * A dropdown component that dynamically populates its options based on a list.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.label - The label for the dropdown. It is aplied to <label> when EditorForm renders the component.
 * @param {string} props.listName - The name of the list to get data from.
 * @param {function} [props.itemFilter] - A function to filter items. Should return `true` for items to include.
 * @param {function} [props.getItemLabel] - A function to determine the label for each dropdown item. Defaults to `item.name` if not provided.
 * @param {string} [props.keyField="id"] - The field in each item object to use as the key and value for options.
 * @param {boolean} [props.nullable=false] - Whether to include a `''` option for null selection (Form validation transforms `''` into null)
 * @param {boolean} [props.update=false] - If `true` reloads the list when it is modified.
 * @param {string} props.name - The name of the form field, used with React Hook Form.
 * @param {Object} props.methods - React Hook Form methods, including `watch` to observe field changes.
 * @param {...Object} rest - Additional props to pass to the underlying `<Form.Select>` component.
 *
 *
 * @example
 * <ListSelect
 *   label="Select an option"
 *   listName="categories"
 *   itemFilter={(item) => item.isActive}
 *   getItemLabel={(item) => `${item.id} - ${item.name}`}
 *   keyField="path"
 *   nullable
 *   update
 *   name="categorySelect"
 *   methods={formMethods}
 * />
 */
export default function ListSelect({label, listName, itemFilter, getItemLabel, keyField, nullable, update, name, methods, ...rest}) {
  
  // The value is watched so the component shows the default value set in the useForm
  const { watch } = methods
  const selectedValue = watch(name)

  const {loading, items, error} = useList(listName, update)

  return (
    <Form.Select value={selectedValue} name={name} {...rest}>
      { // 'null' options (used on TagsEditor parent_id select for example)
        nullable && <option value=''>-- Ninguno --</option>
      }
      {items && items.map((item) => {
          
          if(itemFilter && !itemFilter(item)) { 
            return null;
          } else {
            return (<option 
              key={item[keyField || 'id']} 
              value={item[keyField || 'id']}>
              {getItemLabel ? getItemLabel(item) : item.name}
            </option>)
          }
        }
      )}
    </Form.Select>
  )
}