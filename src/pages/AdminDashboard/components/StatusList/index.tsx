import {
  List,
  ListItem,
  Pagination,
  Stack,
  type PaginationProps,
} from '@mui/material';
import Card, { type CardProps } from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import type { JSX } from 'react';
import { UserInfo } from '../../../../components';
import { usePagination } from '../../../../hooks';
import type { Users } from '../../../../models';

export function StatusList({
  status,
  users,
  ...restProps
}: {
  status: string;
  users: Users;
} & CardProps): JSX.Element {
  const { currentData, currentPage, totalPages, goToPage } = usePagination({
    data: users,
    itemsPerPage: 5,
  });

  const shouldShowPagination = () => totalPages > 1;

  const handlePageChange: PaginationProps['onChange'] = (_, page: number) => {
    goToPage(page);
  };

  return (
    <Card
      {...restProps}
      sx={{
        p: 2,
        ...restProps.sx,
      }}
    >
      <Typography variant="h5">{status}</Typography>
      <List>
        {currentData.map((user) => (
          <ListItem key={user.id} sx={{ padding: 0, pt: 1 }}>
            <UserInfo flex={1} showBottomDivider user={user} />
          </ListItem>
        ))}
      </List>

      {shouldShowPagination() && (
        <Stack>
          <Pagination
            sx={{ mt: '1rem', alignSelf: 'center' }}
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      )}
    </Card>
  );
}
