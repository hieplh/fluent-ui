import { Typography } from '@material-ui/core';
import { Card } from 'mystique/components/Card';
import { CardContent } from 'mystique/components/CardContent';
import { OperationResult } from 'mystique/hooks/getQuery';
import { useQuery } from 'mystique/hooks/useQuery';
import { useEffect, useState } from 'react';

// Tip: add comments to your component props so that they automatically appear as documentation in Storybook
export interface Props {
  /**
  The text to appear in the component
  */
  content: string;
  optional?: any;
}

const meQuery = `
  query {
    me{
      id
      username
    }
  }
`;

interface User {
  id: string
  ref: string
  username: string
}
interface MeQueryResponse extends OperationResult {
  me: User
}

export const Hello: React.FC<Props> = (props: Props) => {
  const [catFact, setCatFact] = useState([]);
  const getCatFact = async () => {
    const response = await fetch('https://catfact.ninja/fact')
      .then(res => res.json())
      .catch(error => console.error('Error', error));
  
    console.log('response', response);
    setCatFact(response);
  };

  useEffect(() => {
    getCatFact();
  }, []);

  const [response] = useQuery<MeQueryResponse>(meQuery);
  const cardContent = response.data !== undefined ? `${props.content} ${response.data?.me.username}` : 'Loading...';

  return <HelloCard content={cardContent} optional={catFact}/>;
};

export const HelloCard: React.FC<Props> = (props: Props) =>
  <Card title={'Demo Fluent'}>
    <CardContent>
      <p data-testid='hello-content'>{props.content}</p>
      <Typography variant='h4'>Cat Fact: {JSON.stringify(props.optional)}</Typography>
    </CardContent>
  </Card>;