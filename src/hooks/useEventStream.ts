'use client';

import { getSession } from '@/actions/getSession';
import { adminEvent } from '@/services/events/types';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { useEffect, useState } from 'react';

export const useEventStream = () => {
  const [events, setEvents] = useState<adminEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    const connect = async () => {
      try {
        const session = await getSession();
        const xsrfToken = document.cookie
          .split('; ')
          .find((row) => row.startsWith('XSRF-TOKEN='))
          ?.split('=')[1];

        await fetchEventSource(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/events/stream`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              Accept: 'text/event-stream',
              'Content-Type': 'application/json',
              Authorization: session?.access_token
                ? `Bearer ${session.access_token}`
                : '',
              'X-XSRF-TOKEN': xsrfToken || '',
            },
            async onopen(response) {
              if (response.ok && !isCancelled) {
                setIsLoading(false);
              } else if (!isCancelled) {
                setError(`Error: ${response.statusText}`);
              }
            },
            onmessage(event) {
              if (!isCancelled) {
                try {
                  const parsedEvents = JSON.parse(event.data);
                  setEvents(parsedEvents);
                } catch {
                  setError('Error parsing event data');
                }
              }
            },
            onerror(err) {
              console.error('SSE error:', err);
              if (!isCancelled) {
                setError('Connection error. Reconnecting...');
                setTimeout(connect, 5000);
              }
            },
            openWhenHidden: true,
          },
        );
      } catch (err) {
        if (!isCancelled) {
          setError('Failed to initialize SSE connection');
        }
      }
    };

    connect();

    return () => {
      isCancelled = true;
    };
  }, []);

  return { events, error, isLoading };
};
