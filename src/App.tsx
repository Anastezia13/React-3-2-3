import { Container, Title, SimpleGrid, Loader, Center } from '@mantine/core';
import { useReducer, useEffect } from 'react';
import LaunchCard from './components/LaunchCard';
import { fetchLaunches } from './api';
import { launchReducer, initialState } from './reducers/launchReducer';

export default function App() {
  const [state, dispatch] = useReducer(launchReducer, initialState);

  useEffect(() => {
    const loadLaunches = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const data = await fetchLaunches();
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        console.error('Ошибка загрузки:', error);
        dispatch({ type: 'FETCH_ERROR' });
      }
    };
    loadLaunches();
  }, []);

  if (state.loading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="xl" />
      </Center>
    );
  }

  if (state.error) {
    return (
      <Center style={{ height: '100vh' }}>
        <Title order={2}>Ошибка загрузки данных</Title>
      </Center>
    );
  }

  return (
    <Container size="sm" py="xl">
      <Title order={1} ta="center" mb="lg">
        SpaceX Launches
      </Title>
      <SimpleGrid cols={1} spacing="lg">
        {state.launches.map((launch) => (
          <LaunchCard key={launch.flight_number} launch={launch} />
        ))}
      </SimpleGrid>
    </Container>
  );
}