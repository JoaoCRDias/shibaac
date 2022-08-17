import React from 'react';

import { Input } from '@chakra-ui/react';

const TextInput = (props) => {
  return (
    <Input {...props} variant="filled" borderColor="black.100" bg="white" />
  );
};

TextInput.defaultProps = {
  placeholder: '',
  type: 'text',
  name: '',
};

export default TextInput;
