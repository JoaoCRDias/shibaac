import React from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../hooks/useUser';
import { Flex, Spacer, Box } from '@chakra-ui/react';
import DropdownButton from '../components/DropdownButton';
import TextInput from '../components/TextInput';

const Navigation = () => {
  const router = useRouter();
  const { user } = useUser();

  return (
    <Flex
      bgColor="black.800"
      height="fit-content"
      marginBottom="1.5em"
      flexDir="row"
      borderRadius="md"
    >
      <DropdownButton text="Home" href="/" />
      <DropdownButton
        hasMenu={true}
        list={[
          { text: 'Char Bazaar', url: '/highscores' },
          { text: 'Houses', url: '/highscores' },
          { text: 'Guilds', url: '/guilds' },
          { text: 'Last Deaths', url: '/guilds' },
          { text: 'Banishments', url: '/guilds' },
        ]}
        text="Community"
      />
      <DropdownButton
        hasMenu={true}
        list={[
          { text: 'Highscores', url: '/highscores' },
          { text: 'Who is online', url: '/highscores' },
          { text: 'Power Gamers', url: '/guilds' },
        ]}
        text="Statistics"
      />

      <DropdownButton
        hasMenu={true}
        list={[
          { text: 'Server Information', url: '/library/serverinfo' },
          { text: 'Raid Calendar', url: '/serverinfo' },
        ]}
        text="Library"
      />
      <DropdownButton
        hasMenu={true}
        list={[
          { text: 'Snowball', url: '/library/serverinfo' },
          { text: 'Castle', url: '/serverinfo' },
        ]}
        text="Events"
      />
      <DropdownButton text="Donate" href="/donate" />

      <Spacer />
      {user ? (
        <DropdownButton
          text={user.name}
          hasMenu={true}
          list={[
            { text: 'Account Management', url: '/account' },
            { text: 'Sign out', url: '/account/logout' },
          ]}
        />
      ) : (
        <>
          <DropdownButton text="Sign Up" href="/account/register" />
          <DropdownButton text="Sign In" href="/account/login" />
        </>
      )}
    </Flex>
  );
};

export default Navigation;
