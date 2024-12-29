import type { FC } from 'react';
import PropTypes from 'prop-types';
import type { SxProps } from '@mui/system/styleFunctionSx';

import { usePopover } from 'src/hooks/use-popover';

import { TenantPopover } from './tenant-popover';

const tenants: string[] = ['Devias', 'Acme Corp'];

interface TenantSwitchProps {
  sx?: SxProps;
}

export const TenantSwitch: FC<TenantSwitchProps> = () => {
  const popover = usePopover<HTMLButtonElement>();

  return (
    <>
      {/* <Stack
        alignItems="center"
        direction="row"
        spacing={2}
        {...props}
      >
      </Stack> */}
      <TenantPopover
        anchorEl={popover.anchorRef.current}
        onChange={popover.handleClose}
        onClose={popover.handleClose}
        open={popover.open}
        tenants={tenants}
      />
    </>
  );
};

TenantSwitch.propTypes = {
  // @ts-ignore
  sx: PropTypes.object,
};
