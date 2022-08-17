import Panel from 'src/components/Panel';
import { useRouter } from 'next/router';
import FormWrapper from 'src/components/FormWrapper';
import { searchCharacterSchema } from 'src/schemas/SearchCharacter';

import { Fragment, useCallback, useEffect, useState } from 'react';
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
  Collapse,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useToast,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  Select,
  Flex,
} from '@chakra-ui/react';
import { fetchApi } from '../../util/request';
import { rankToName, vocationIdToName } from '../../util';
import TextInput from '../../components/TextInput';
import { useUser } from '../../hooks/useUser';
import { colors } from '../../constants/constants';

export default function Guilds() {
  const [guild, setGuild] = useState([]);
  const [guildInvitations, setGuildInvitations] = useState([]);
  const [showGuildManagement, setGuildManagement] = useState(false);
  const [isLeader, setIsLeader] = useState(false);
  const [isViceLeader, setIsViceLeader] = useState(false);
  const [leaderId, setLeaderId] = useState();
  const [viceLeaderId, setViceLeaderId] = useState();
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUser();
  const toast = useToast();
  console.log('User:', user);

  const fetchGuild = useCallback(async () => {
    const response = await fetchApi('GET', `/api/guilds/${id}`);
    console.log('Guild:', response.guild);
    setGuild(response.guild);
    if (response.guild) {
      await verifyLeadership(response.guild);
      await fetchInvitations(response.guild.id);
    }
  }, []);

  useEffect(() => {
    fetchGuild();
  }, [fetchGuild]);

  const fetchInvitations = async (guildId) => {
    const { invitations } = await fetchApi(
      'GET',
      `/api/guilds/invitations?${new URLSearchParams({
        id: guildId,
      })}`
    );
    if (invitations) {
      const _invites = invitations.map((element) => ({
        name: element.players.name,
        level: element.players.level,
        vocation: element.players.vocation,
        guildId,
        playerId: element.player_id,
      }));
      setGuildInvitations(_invites);
    }
  };

  const verifyLeadership = async (currentGuild) => {
    if (user) {
      const { account } = await fetchApi('GET', `/api/accounts/${user.id}`);
      const leaderId = currentGuild.guild_ranks.find(
        (element) => element.level === 1
      )?.id;
      setLeaderId(leaderId);
      const viceLeaderId = currentGuild.guild_ranks.find(
        (element) => element.level === 2
      )?.id;
      setViceLeaderId(viceLeaderId);
      const isLeader = account.players.filter((player) => {
        return !!currentGuild.guild_membership.find(
          (member) =>
            member.player_id === player.id && member.rank_id === leaderId
        );
      });
      const isViceLeader = account.players.filter((player) => {
        return !!currentGuild.guild_membership.find(
          (member) =>
            member.player_id === player.id && member.rank_id === viceLeaderId
        );
      });
      console.log('isLeader', isLeader.length);
      if (isLeader.length > 0) {
        console.log('isLeader2', isLeader);
        setIsLeader(true);
        setGuildManagement(true);
      } else if (isViceLeader.length > 0) {
        setIsViceLeader(true);
        setGuildManagement(true);
      }
    }
  };

  const sendInvitation = async (playerName) => {
    const invite = await fetchApi('POST', `/api/guilds/invitations`, {
      data: {
        guildId: id,
        name: playerName,
      },
    });
    if (invite && invite.success) {
      await fetchInvitations(id);
      toast({
        position: 'bottom-left',
        render: () => (
          <Box color="white" p={3} bg="green.500">
            Invitated succesfully
          </Box>
        ),
      });
    } else {
      toast({
        position: 'bottom-left',
        render: () => (
          <Box color="white" p={3} bg="red.500">
            Invitation failed
          </Box>
        ),
      });
    }
  };

  const removeInvitation = async (guildId, playerId) => {
    const remove = await fetchApi('DELETE', `/api/guilds/invitations`, {
      data: {
        playerId,
        guildId,
      },
    });
    if (remove && remove.success) {
      await fetchInvitations(guildId);
      toast({
        position: 'bottom-left',
        render: () => (
          <Box color="white" p={3} bg="green.500">
            Invitation deleted succesfully
          </Box>
        ),
      });
    } else {
      toast({
        position: 'bottom-left',
        render: () => (
          <Box color="white" p={3} bg="red.500">
            Delete invitation failed
          </Box>
        ),
      });
    }
  };

  const changeRank = async (playerId, rankId) => {
    console.log(playerId, rankId);
    const response = await fetchApi(`PUT`, `/api/guilds/ranks`, {
      data: {
        playerId,
        rankId,
      },
    });

    if (response && response.success) {
      await fetchGuild();
      toast({
        position: 'bottom-left',
        render: () => (
          <Box color="white" p={3} bg="green.500">
            Success
          </Box>
        ),
      });
    } else {
      toast({
        position: 'bottom-left',
        render: () => (
          <Box color="white" p={3} bg="red.500">
            Fail
          </Box>
        ),
      });
    }
  };

  const playerIsInAccount = (playerId) => {
    return user.players.find((element) => element.id === playerId);
  };

  const acceptInvitation = async (guildId, playerId) => {
    const accept = await fetchApi(`PUT`, `/api/guilds/invitations`, {
      data: {
        guildId,
        playerId,
      },
    });
    if (accept.success) {
      await fetchInvitations(guildId);
      await fetchGuild();
      toast({
        position: 'bottom-left',
        render: () => (
          <Box color="white" p={3} bg="green.500">
            Accepted succesfully
          </Box>
        ),
      });
    } else {
      toast({
        position: 'bottom-left',
        render: () => (
          <Box color="white" p={3} bg="red.500">
            Failed to accept
          </Box>
        ),
      });
    }
  };

  const renderPossibleMembers = () => {
    if (isLeader) {
      return (
        guild.guild_membership &&
        guild.guild_membership
          .filter((element) => element.rank_id != leaderId)
          .map((member, index) => (
            <option key={index} value={member.player_id}>
              {member.players.name}
            </option>
          ))
      );
    } else if (isViceLeader) {
      return (
        guild.guild_membership &&
        guild.guild_membership
          .filter(
            (element) =>
              element.rank_id != viceLeaderId && element.guild_ranks.level > 2
          )
          .map((member, index) => (
            <option key={index} value={member.player_id}>
              {member.players.name}
            </option>
          ))
      );
    }
  };

  const renderPossibleRanks = () => {
    if (isLeader) {
      return (
        guild.guild_ranks &&
        guild.guild_ranks.map((rank, index) => (
          <option key={index} value={rank.id}>
            {rank.name}
          </option>
        ))
      );
    } else if (isViceLeader) {
      return (
        guild.guild_ranks &&
        guild.guild_ranks
          .filter((element) => element.level > 2)
          .map((op, idx) => (
            <option key={idx} value={op.id}>
              {op.name}
            </option>
          ))
      );
    }
  };

  const renderGuildMembership = (membership) => {
    const currentRankId = null;
    let strip = false;
    return membership.map((player, index) => {
      let rankLabel = null;
      if (player.rank_id !== currentRankId) {
        currentRankId = player.rank_id;
        rankLabel = rankToName[player.rank_id];
        strip = !strip;
      } else {
        rankLabel = '';
      }
      return (
        <Tr backgroundColor={strip ? '#EDF2F7' : 'white'} key={index}>
          <Td>{rankLabel}</Td>
          <Td>
            <Link href={`/character/${player.players.name}`}>
              {player.players.name}
            </Link>
          </Td>

          <Td>{vocationIdToName[player.players.vocation]}</Td>
          <Td>{player.players.level}</Td>
        </Tr>
      );
    });
  };

  const renderInvitationAction = (guildId, playerId) => {
    const actions = [];
    if (showGuildManagement) {
      actions.push(
        <Button
          key={'edit'}
          size={'sm'}
          backgroundColor={'#E53E3E'}
          textColor={'white'}
          onClick={async () => {
            await removeInvitation(guildId, playerId);
          }}
        >
          Remove
        </Button>
      );
    }
    if (playerIsInAccount(playerId)) {
      actions.push(
        <Button
          key={'accept'}
          size={'sm'}
          backgroundColor={colors.infoBlue}
          textColor={'white'}
          onClick={async () => {
            await acceptInvitation(guildId, playerId);
          }}
        >
          Accept
        </Button>
      );
    }
    return actions.map((element) => element);
  };

  return (
    <Panel header={guild.name}>
      <Tabs>
        <TabList>
          <Tab>Members</Tab>
          <Tab>Invitations</Tab>
          {showGuildManagement && <Tab>Management</Tab>}
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box>
              <TableContainer>
                <Table colorScheme="gray">
                  <Thead>
                    <Tr>
                      <Th>Rank</Th>
                      <Th>Member</Th>
                      <Th>Vocation</Th>
                      <Th>Level</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {guild.guild_membership &&
                      renderGuildMembership(guild.guild_membership)}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </TabPanel>
          <TabPanel>
            <TableContainer>
              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Vocation</Th>
                    <Th>Level</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {guildInvitations &&
                    guildInvitations.map(
                      ({ name, level, vocation, guildId, playerId }, index) => (
                        <Tr key={index}>
                          <Td>
                            <Link href={`/character/${name}`}>{name}</Link>
                          </Td>
                          <Td>{vocationIdToName[vocation]}</Td>
                          <Td>{level}</Td>
                          <Td>{renderInvitationAction(guildId, playerId)}</Td>
                        </Tr>
                      )
                    )}
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
          {showGuildManagement && (
            <TabPanel>
              <Fragment>
                <Panel header="Guild management">
                  <Accordion allowToggle allowMultiple>
                    <AccordionItem>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          <Text fontWeight={'bold'}>Character invitation</Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>

                      <AccordionPanel>
                        <Box alignSelf="center">
                          <form
                            onSubmit={(event) => {
                              event.preventDefault();

                              if (event.target.search.value) {
                                sendInvitation(event.target.search.value);
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
                                <TextInput
                                  name="search"
                                  placeholder="Search character..."
                                />
                              </label>
                              <Button
                                type="submit"
                                alignSelf={'end'}
                                marginLeft={2}
                                colorScheme="teal"
                              >
                                Invite
                              </Button>
                            </div>
                          </form>
                        </Box>
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          <Text fontWeight={'bold'}>Change rank</Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>

                      <AccordionPanel>
                        <Box alignSelf="center">
                          <form
                            onSubmit={(event) => {
                              event.preventDefault();
                              if (
                                event.target.playerId.value &&
                                event.target.rankId.value
                              ) {
                                changeRank(
                                  event.target.playerId.value,
                                  event.target.rankId.value
                                );
                                event.target.reset();
                              }
                            }}
                          >
                            <Flex direction={'column'}>
                              <Select
                                placeholder="Select character"
                                name="playerId"
                                marginBottom={'5px'}
                              >
                                {renderPossibleMembers()}
                              </Select>
                              <Select
                                placeholder="Select rank"
                                name="rankId"
                                marginBottom={'5px'}
                              >
                                {renderPossibleRanks()}
                              </Select>
                              <Button
                                type="submit"
                                alignSelf={'center'}
                                marginLeft={2}
                                colorScheme="teal"
                              >
                                Submit
                              </Button>
                            </Flex>
                          </form>
                        </Box>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Panel>
              </Fragment>
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </Panel>
  );
}
