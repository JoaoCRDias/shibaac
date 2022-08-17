import {
  Table,
  TableCaption,
  TableContainer,
  Thead,
  Tr,
  Th,
  Td,
  Tfoot,
  Tbody,
  Highlight,
  Box,
  Text,
  Divider,
} from '@chakra-ui/react';
import React from 'react';
import Panel from '../../components/Panel';
import {
  expTable,
  skillsStages,
  magicLevelStages,
} from '../../constants/constants';

const ServerInfo = () => {
  const renderTableStages = (title, rows) => {
    return (
      <Box
        border={`solid 1px`}
        borderRadius={10}
        padding={'5px'}
        marginY={'10px'}
      >
        <Text align={'center'} fontWeight={'bold'}>
          {title}
        </Text>
        <Divider />
        <TableContainer>
          <Table variant="simple" size={'sm'}>
            <Thead>
              <Tr>
                <Th>Do level</Th>
                <Th>Ao level</Th>
                <Th isNumeric>Rate</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rows.map((element, index) => (
                <Tr key={index}>
                  <Td>{element.minLevel}</Td>
                  <Td>{element.maxLevel ? element.maxLevel : `∞`}</Td>
                  <Td isNumeric>{element.multiplier}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  return (
    <Panel header="Server Info">
      {renderTableStages('Exp rate', expTable)}
      {renderTableStages('Skill rate', skillsStages)}
      {renderTableStages('Magic rate', magicLevelStages)}
      <Box
        border={`solid 1px`}
        borderRadius={10}
        padding={'5px'}
        marginY={'10px'}
      >
        <Text align={'center'} fontWeight={'bold'}>
          Informações gerais
        </Text>
        <Divider />
        <Text>Loot: 3x</Text>
        <Text>Bestiary: 3x</Text>
        <Text>Party: 4x 100% bonus, mais que 4 players a party perde xp</Text>
        <Text>Blessings: grátis até level 200</Text>
        <Text>Level para comprar casa: 200</Text>
        <Text>Level para criar guild: 200</Text>
        <Text>Aluguel da casas cobrado semanalmentem, 10k por sqm</Text>
      </Box>
    </Panel>
  );
};

export default ServerInfo;
