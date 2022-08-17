import Link from 'next/link';
import React from 'react';

import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
} from '@chakra-ui/react';

const DropdownButton = ({ hasMenu, text, href, list }) => {
  if (hasMenu) {
    return (
      <Menu>
        <MenuButton
          color="white"
          bg="transparent"
          as={Button}
          pt="25px"
          pb="25px"
          rightIcon={<ChevronDownIcon />}
          fontWeight="normal"
          _hover={{ bgColor: 'rgba(255, 255, 255, 0.3)' }}
          _active={{ bgColor: ' rgba(255, 255, 255, 0.3)' }}
          _focus={{ outline: 0 }}
        >
          <Text>{text}</Text>
        </MenuButton>
        <MenuList padding={0}>
          {list.map((item) => (
            <Link key={item.text} href={item.url} passHref>
              <MenuItem
                borderRadius="sm"
                _hover={{ bgColor: 'violet.50' }}
                _focus={{ bgColor: 'violet.50' }}
              >
                <Text>{item.text}</Text>
              </MenuItem>
            </Link>
          ))}
        </MenuList>
      </Menu>
    );
  } else {
    return (
      <Link href={href} passHref>
        <Button
          color="white"
          bg="transparent"
          pt="25px"
          pb="25px"
          fontWeight="normal"
          _hover={{ bgColor: 'rgba(255, 255, 255, 0.3)' }}
          _active={{ bgColor: ' rgba(255, 255, 255, 0.3)' }}
          _focus={{ outline: '0' }}
          alignSelf="self-end"
        >
          <Text>{text}</Text>
        </Button>
      </Link>
    );
  }
};

DropdownButton.defaultProps = {
  hasMenu: false,
};

export default DropdownButton;
