import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { type JSX } from 'react';
import { NavBreadcrumbs } from '../../components';
import { AppStrings } from '../../constants';

export function AdminDashboardPage(): JSX.Element {
  return (
    <Stack flex={1}>
      <Container>
        <NavBreadcrumbs title={AppStrings.TodaysAvailability} />
      </Container>
    </Stack>
  );
}
