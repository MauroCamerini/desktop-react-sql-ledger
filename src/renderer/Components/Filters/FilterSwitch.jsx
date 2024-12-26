import React, { useCallback, useState } from 'react'
import { Form } from 'react-bootstrap';

export default function FilterSwitch ({label, children}) {

  const [isEnabled, setIsEnabled] = useState(false);

  
  const toggleSwitch = () => {
    setIsEnabled((prev) => !prev);
  };

  const renderChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        disabled: !isEnabled,
      })
    }
    return child;
  })

  return (
      <Form.Group>
        <Form.Switch
          checked={isEnabled}
          onChange={toggleSwitch}
          label={label} />
        <div>{renderChildren}</div>
      </Form.Group>
  )
}
