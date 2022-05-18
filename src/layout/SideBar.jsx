import React, { useState, useEffect, useCallback } from 'react';
import Panel from '../components/Panel';
import Label from '../components/Label';
import { fetchApi } from '../util/request';
import Link from '../components/Link';

import { Box, Center } from '@chakra-ui/react';
import StripedTable from '../components/StrippedTable';

const SideBar = () => {
  const [state, setState] = useState({
    topPlayers: null,
    serverStatus: null,
  });

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

      <Panel header="Top 5 Level" isLoading={!state.topPlayers}>
        <StripedTable
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
