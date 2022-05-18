import Panel from 'src/components/Panel';
import { useRouter } from 'next/router';
import FormWrapper from 'src/components/FormWrapper';
import { withSessionSsr } from 'src/util/session';
import { searchCharacterSchema } from 'src/schemas/SearchCharacter';
import Button from '../../components/Button';
import { Select } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { createGuildSchema } from 'src/schemas/CreateGuild';
import { useUser } from '../../hooks/useUser';
import { fetchApi } from '../../util/request';

const fields = [
  {
    type: 'text',
    name: 'name',
    placeholder: '3 to 29 characters',
    label: { text: 'Guild name', size: 3 },
    size: 9,
  },
];

const buttons = [
  { type: 'submit', btnType: 'primary', value: 'Submit' },
  { href: '/guilds', value: 'Back' },
];

export default function CreateGuild() {
  const [response, setResponse] = useState(null);
  const [formFields, setFormFields] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    fetchData();
  }, []);

  const verifyPlayerInGuild = async (id) => {
    const response = await fetchApi(
      'GET',
      `/api/guilds/getplayerguild?${new URLSearchParams({
        id,
      })}`
    );
    if (response.success) {
      return true;
    }
    return false;
  };

  const verifyAccountHasGuildLeader = async () => {
    const response = await fetchApi(
      'GET',
      `/api/guilds/accounthasguildleader?${new URLSearchParams({
        id: user.id,
      })}`
    );
    if (response.success) {
      return true;
    }
    return false;
  };

  const fetchData = async () => {
    const response = await fetchApi(
      'GET',
      `/api/accounts/getcharactersbyaccountid?${new URLSearchParams({
        id: user.id,
      })}`
    );
    const selectOptions = [
      {
        key: -1,
        value: '',
        text: 'Select character',
      },
      ...response.characters.map((char, index) => ({
        key: index,
        value: char.id,
        text: char.name,
      })),
    ];
    setFormFields([
      ...fields,
      {
        as: Select,
        name: 'ownerid',
        label: { text: 'Character', size: 3 },
        size: 9,
        options: selectOptions,
      },
    ]);
  };

  const onSubmit = async (values, { resetForm }) => {
    console.log(values);
    const inGuild = await verifyPlayerInGuild(values.ownerid);
    const hasLeader = await verifyAccountHasGuildLeader();

    if (inGuild) {
      setResponse({ success: false, message: 'Character already in guild' });
    }
    if (hasLeader) {
      setResponse({
        success: false,
        message: 'Account already has one guild leader',
      });
    }
    console.log({
      name: values.name,
      ownerid: values.ownerid,
      creationdata: 0,
    });
    const response = await fetchApi('POST', '/api/guilds/create', {
      data: {
        name: values.name,
        ownerid: values.ownerid,
        creationdata: Math.floor(Date.now() / 1000),
      },
    });

    setResponse(response);
    resetForm();
  };

  const initialValues = {
    name: '',
    ownerid: '',
  };

  return (
    <Panel header="Create guild">
      <FormWrapper
        validationSchema={createGuildSchema}
        onSubmit={onSubmit}
        fields={formFields}
        buttons={buttons}
        response={response}
        initialValues={initialValues}
      />
    </Panel>
  );
}

export const getServerSideProps = withSessionSsr(async function ({ req }) {
  const { user } = req.session;
  if (!user) {
    return {
      redirect: {
        destination: '/account/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
});
