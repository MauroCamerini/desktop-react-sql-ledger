/**
 * A module that provides a collection of editor components for building forms.
 *
 * @module Editor
 */

/**
 * A form component that integrates with React Hook Form and Yup for validation.
 *
 * @type {React.ComponentType}
 * @memberof module:Editor
 */
import EditorForm from "./EditorForm";

/**
 * An input component for use within forms, integrated with React Hook Form.
 *
 * @type {React.ComponentType}
 * @memberof module:Editor
 */
import EditorInput from "./EditorInput";

/**
 * A select dropdown component that dynamically populates options based on a list.
 *
 * @type {React.ComponentType}
 * @memberof module:Editor
 */
import ListSelect from "./ListSelect";

/**
 * An object containing EditorForm components for easy access and usage.
 *
 * @namespace Editor
 * @property {React.ComponentType} Form - The form component.
 * @property {React.ComponentType} Input - The input field component.
 * @property {React.ComponentType} ListSelect - The list select dropdown component.
 */
const Editor = Object.freeze({
  Form: EditorForm,
  Input: EditorInput,
  ListSelect: ListSelect,
});

export default Editor;