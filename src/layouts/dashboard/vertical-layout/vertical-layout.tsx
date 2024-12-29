import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import type { NavColor } from 'src/types/settings';
import type { Section } from '../config';
import { TopNav } from './top-nav';
import { Container } from '@mui/material';
import Footer from '../footer';

interface VerticalLayoutProps {
  children?: ReactNode;
  navColor?: NavColor;
  sections?: Section[];
}

export const VerticalLayout: FC<VerticalLayoutProps> = (props) => {
  const { children } = props;

  return (
    <>
      <TopNav />

      <Container
        maxWidth="xl"
        sx={{ paddingTop: 4, paddingBottom: 4, flex: 1 }}
      >
        {children}
      </Container>
      <Footer />
    </>
  );
};

VerticalLayout.propTypes = {
  children: PropTypes.node,
  navColor: PropTypes.oneOf<NavColor>(['blend-in', 'discrete', 'evident']),
  sections: PropTypes.array,
};
