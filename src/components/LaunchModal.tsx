import type { Launch } from '../api';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Image, Text, Stack, Title, Group, ScrollArea } from '@mantine/core';

interface LaunchModalProps {
  opened: boolean;
  onClose: () => void;
  launch: Launch;
}

export default function LaunchModal({ opened, onClose, launch }: LaunchModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && opened) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [opened, onClose]);

  if (!opened) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1000,
        padding: '1rem',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          padding: '1.5rem',
          position: 'relative',
          overflow: 'auto',
        }}
      >
        <div style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1, marginBottom: '1rem' }}>
          <Group justify="space-between">
            <Title order={2}>{launch.mission_name}</Title>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '0.25rem 0.5rem',
              }}
            >
              ✕
            </button>
          </Group>
        </div>

        <Stack gap="md">
          {launch.links?.mission_patch && (
            <Image
              src={launch.links.mission_patch}
              alt={launch.mission_name}
              style={{ maxHeight: '200px', objectFit: 'contain' }}
            />
          )}

          <div>
            <Text fw={700} size="sm" c="dimmed">Mission name:</Text>
            <Text>{launch.mission_name}</Text>
          </div>

          {launch.rocket?.rocket_name && (
            <div>
              <Text fw={700} size="sm" c="dimmed">Rocket name:</Text>
              <Text>{launch.rocket.rocket_name}</Text>
            </div>
          )}

          {launch.details && (
            <div>
              <Text fw={700} size="sm" c="dimmed">Details:</Text>
              <ScrollArea style={{ maxHeight: '200px' }}>
                <Text size="sm">{launch.details}</Text>
              </ScrollArea>
            </div>
          )}
        </Stack>
      </div>
    </div>,
    document.body
  );
}