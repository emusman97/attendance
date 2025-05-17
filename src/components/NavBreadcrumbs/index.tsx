import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Breadcrumbs,
  Stack,
  Typography,
  type SvgIconProps,
  type TypographyProps,
} from '@mui/material';
import { useMemo, type JSX } from 'react';
import { matchRoutes, useLocation, useParams } from 'react-router';
import { UserMockService } from '../../mockService';
import { makeFullName } from '../../utils';
import { routeConfig } from './config';
import type { NavBreadcrumbsProps } from './types';
import type { User } from '../../models';
import { UserInfo } from '../UserInfo';

export function NavBreadcrumbs({
  title,
  CrumbsLeftContent,
  ...restProps
}: NavBreadcrumbsProps): JSX.Element {
  const location = useLocation();
  const params = useParams<{ userId: string }>();

  const matchedRoutes = useMemo(
    () => matchRoutes(routeConfig(), location.pathname),
    [location.pathname]
  );

  const crumbs = useMemo(() => {
    const lastIndex = (matchedRoutes?.length ?? 0) - 1;
    return (
      matchedRoutes?.map(({ route }, index) => {
        const path = route.path;
        const icon = route.icon;

        let breadcrumb = '';
        let userToShow: User | null = null;

        if (typeof route.breadcrumb === 'function') {
          const userId = params?.userId ?? '';

          const user = UserMockService.findUserById(userId);
          const fullName = makeFullName(user?.fname ?? '', user?.lname ?? '');

          breadcrumb = fullName;
          userToShow = user ?? {};
        } else {
          breadcrumb = route.breadcrumb ?? '';
        }

        return {
          breadcrumb,
          path,
          icon,
          lastItem: index === lastIndex,
          userToShow,
        };
      }) ?? []
    );
  }, [matchedRoutes, params?.userId]);
  const lastIndex = useMemo(
    () => Math.max(0, crumbs.length - 1),
    [crumbs.length]
  );

  return (
    <Stack mb={4} {...restProps}>
      <Stack
        flex={1}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Breadcrumbs separator={<ChevronRightIcon />}>
          {crumbs.map((crumb, index) => {
            const focused = crumb.lastItem;

            const iconColor: SvgIconProps['color'] = focused
              ? 'inherit'
              : 'disabled';
            const textColor: TypographyProps['color'] = focused
              ? 'textPrimary'
              : 'textDisabled';

            return (
              <Stack key={`${crumb.path}-${index}`} flexDirection="row" gap={1}>
                {<crumb.icon color={iconColor} />}
                <Typography variant="body1" color={textColor}>
                  {crumb.breadcrumb}
                </Typography>
              </Stack>
            );
          })}
        </Breadcrumbs>

        {CrumbsLeftContent}
      </Stack>

      {crumbs?.[lastIndex].userToShow ? (
        <Stack pl={2} mt={4}>
          <UserInfo user={crumbs[lastIndex].userToShow} showDesignation />
        </Stack>
      ) : (
        <Typography mt={2} variant="h4">
          {title || crumbs?.[lastIndex]?.breadcrumb}
        </Typography>
      )}
    </Stack>
  );
}
