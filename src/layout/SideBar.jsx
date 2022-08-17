import React, { useState, useEffect, useCallback } from 'react';
import Panel from '../components/Panel';
import Label from '../components/Label';
import { fetchApi } from '../util/request';
import Link from '../components/Link';
import discordIcon from '../assets/images/discord-icon.svg';
import facebookIcon from '../assets/images/facebook.png';
import Image from 'next/image';

import { Box, Button, Center, Flex } from '@chakra-ui/react';
import StripedTable from '../components/StrippedTable';
import TextInput from '../components/TextInput';
import { useRouter } from 'next/router';

const SideBar = () => {
  const [state, setState] = useState({
    topPlayers: null,
    serverStatus: null,
  });
  const router = useRouter();

  const fetchData = useCallback(async () => {
    const players = await fetchApi('GET', `/api/players/top5`);
    const status = await fetchApi('GET', `/api/status`);

    if (players.success && status.success) {
      setState({
        topPlayers: players.players,
        serverStatus: status.status,
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Box minWidth="15em">
      <Panel
        header="Server Status"
        isLoading={!state.topPlayers || !state.serverStatus}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {state.serverStatus && state.serverStatus.online ? (
            <Label colorScheme="green">ONLINE</Label>
          ) : (
            <Label colorScheme="red">OFFLINE</Label>
          )}

          {state.serverStatus && (
            <Link
              href="/online"
              text={`${state.serverStatus.onlineCount} players online`}
            />
          )}
        </div>
      </Panel>

      <Panel header={'Social'}>
        <Flex flex={1} justifyContent="space-evenly">
          <Button
            backgroundColor={'transparent'}
            onClick={() =>
              window.open('https://discord.gg/ny9r3bBSXX', '_blank')
            }
          >
            <Image
              src={discordIcon}
              alt="Discord logo image"
              width={'40px'}
              height={'40px'}
            />
          </Button>
          <Image
            src={facebookIcon}
            alt="Facebook logo image"
            width={'40px'}
            height={'40px'}
          />
        </Flex>
      </Panel>

      <Panel header={'Search character'}>
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
            <TextInput name="search" placeholder="Search character..." />
          </form>
        </Box>
      </Panel>

      <Panel header="Top 5 Level" isLoading={!state.topPlayers}>
        <StripedTable
          size="sm"
          body={
            state.topPlayers
              ? state.topPlayers.map((player, index) => [
                  {
                    text: `${index + 1}. ${player.name}`,
                    href: `/character/${player.name}`,
                  },
                  {
                    text: player.level,
                  },
                ])
              : []
          }
        />
      </Panel>
    </Box>
  );
};

export default SideBar;
