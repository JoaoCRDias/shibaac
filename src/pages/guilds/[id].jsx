import Panel from 'src/components/Panel';
import { useRouter } from 'next/router';
import FormWrapper from 'src/components/FormWrapper';
import { searchCharacterSchema } from 'src/schemas/SearchCharacter';

import { useCallback, useEffect, useState } from 'react';
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
  Button,
} from '@chakra-ui/react';
import { fetchApi } from '../../util/request';
import { vocationIdToName } from 'src/util';
import TextInput from '../../components/TextInput';
import { useUser } from '../../hooks/useUser';

export default function Guilds() {
  const [guild, setGuild] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const user = useUser();
  console.log(user);

  useEffect(() => {
    fetchGuild();
  }, [fetchGuild]);

  const fetchGuild = useCallback(async () => {
    const response = await fetchApi('GET', `/api/guilds/${id}`);
    console.log(response);
    setGuild(response.guild);
  }, [id]);

  return (
    <Panel header={guild.name}>
      <Panel header={'Character invitation'} margin={10}>
        <Box alignSelf="center">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (event.target.search.value) {
                router.push(`/character/${event.target.search.value}`);
                event.target.reset();
              }
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <label>
                Character name
                <TextInput name="search" placeholder="Search character..." />
              </label>
              <Button alignSelf={'end'} marginLeft={2} colorScheme="teal">
                Invite
              </Button>
            </div>
          </form>
        </Box>
      </Panel>
      <Box>
        <TableContainer>
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Member</Th>
                <Th>Vocation</Th>
                <Th>Level</Th>
              </Tr>
            </Thead>
            <Tbody>
              {guild.guild_membership &&
                guild.guild_membership.map((player, index) => (
                  <Tr key={index}>
                    <Td>
                      <Link href={`/character/${player.players.name}`}>
                        {player.players.name}
                      </Link>
                    </Td>

                    <Td>{vocationIdToName[player.players.vocation]}</Td>
                    <Td>{player.players.level}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      {/* <Button href={'/guilds/createguild'} value="Create guild" /> */}
    </Panel>
  );
}
