import Panel from 'src/components/Panel';
import { useRouter } from 'next/router';
import FormWrapper from 'src/components/FormWrapper';
import { searchCharacterSchema } from 'src/schemas/SearchCharacter';
import Button from '../../components/Button';

export default function Highscores() {
  return <Panel header="Highscores"></Panel>;
}
