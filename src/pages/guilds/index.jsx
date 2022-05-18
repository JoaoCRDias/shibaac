import Panel from 'src/components/Panel';
import { useRouter } from 'next/router';
import FormWrapper from 'src/components/FormWrapper';
import { searchCharacterSchema } from 'src/schemas/SearchCharacter';
import Button from '../../components/Button';
import { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Link,
} from '@chakra-ui/react';
import { fetchApi } from '../../util/request';

export default function Guilds() {
  const [guilds, setGuilds] = useState([]);
  const router = useRouter();
  useEffect(() => {
    fetchGuilds();
  }, []);

  const fetchGuilds = async () => {
    const response = await fetchApi('GET', `/api/guilds`);
    console.log(response.guilds);
    setGuilds(response.guilds);
  };

  return (
    <Panel header="Guilds">
      <Box>
        <TableContainer>
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Guild name</Th>
                <Th>Members</Th>
              </Tr>
            </Thead>
            <Tbody>
              {guilds.map((guild, index) => (
                <Tr
                  key={index}
                  onClick={() => {
                    router.push(`/guilds/${guild.id}`);
                  }}
                >
                  <Td>
                    <Link href={`/guilds/${guild.id}`}>{guild.name}</Link>
                  </Td>
                  <Td>{guild._count.guild_membership}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Button href={'/guilds/createguild'} value="Create guild" />
    </Panel>
  );
}
