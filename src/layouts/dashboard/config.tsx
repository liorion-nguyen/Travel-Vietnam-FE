import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SvgIcon } from '@mui/material';
import HomeSmileIcon from 'src/icons/untitled-ui/duocolor/home-smile';
import { paths } from 'src/paths';
import { Person, AssignmentInd } from '@mui/icons-material';

export interface Item {
  disabled?: boolean;
  external?: boolean;
  icon?: ReactNode;
  items?: Item[];
  label?: ReactNode;
  path?: string;
  title: string;
}

export interface Section {
  items: Item[];
  subheader?: string;
}

export const useSections = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    return [
      {
        items: [
          {
            title: '',
            path: paths.dashboard.index,
            icon: (
              <SvgIcon fontSize="small">
                <HomeSmileIcon />
              </SvgIcon>
            ),
          },
          {
            title: 'Human resources',
            icon: (
              <SvgIcon fontSize="small">
                <AssignmentInd />
              </SvgIcon>
            ),
            items: [],
          },

          {
            title: 'User Management',
            icon: (
              <SvgIcon fontSize="small">
                <Person />
              </SvgIcon>
            ),
            items: [
              {
                title: 'Members',
                path: paths.member,
              },
              {
                title: 'Roles',
                path: paths.roles,
              },
              {
                title: 'Permissions',
                path: paths.permissions,
              },
            ],
          },
        ],
      },
    ];
  }, [t]);
};
