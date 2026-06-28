import type { Launch } from '../api';
import { Card, Image, Text, Group, Badge, Button } from '@mantine/core';
import { useState } from 'react';
import LaunchModal from './LaunchModal';

interface LaunchCardProps {
  launch: Launch;
}

export default function LaunchCard({ launch }: LaunchCardProps) {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <>
      <Card shadow="sm" padding="md" radius="md" withBorder>
        <Card.Section>
          {launch.links?.mission_patch_small ? (
            <Image
              src={launch.links.mission_patch_small}
              alt={launch.mission_name}
              height={160}
              fit="contain"
              p="sm"
            />
          ) : (
            <div style={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Text size="sm" c="dimmed">No image</Text>
            </div>
          )}
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{launch.mission_name}</Text>
          {launch.rocket?.rocket_name && (
            <Badge color="blue" variant="light">
              {launch.rocket.rocket_name}
            </Badge>
          )}
        </Group>

        <Button
          variant="light"
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          onClick={() => setModalOpened(true)}
        >
          See more
        </Button>
      </Card>

      <LaunchModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        launch={launch}
      />
    </>
  );
}