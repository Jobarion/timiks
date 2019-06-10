import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import SettingsContainer from '../containers/SettingsContainer';
import KeyboardShortcuts from './KeyboardShortcuts';
import AccountContainer from '../containers/AccountContainer';
import { getBreakpoint, getZIndex, getColor } from '../helpers/theme';

const Header = () => (
  <HeaderBar>
    <Title>Timiks</Title>
    <nav>
      <StyledNavLink activeClassName="selected" exact to="/">
        Timer
      </StyledNavLink>
      <StyledNavLink activeClassName="selected" to="/archive">
        Archive
      </StyledNavLink>
      <KeyboardShortcutsIconContainer>
        <KeyboardShortcuts />
      </KeyboardShortcutsIconContainer>
      <IconContainer>
        <SettingsContainer />
      </IconContainer>
      <AccountContainer />
    </nav>
  </HeaderBar>
);

const HeaderBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  position: relative;
  z-index: ${getZIndex('onFullScreenMask')};
`;

const IconContainer = styled.span`
  margin-right: 1rem;
`;

const KeyboardShortcutsIconContainer = IconContainer.extend`
  display: none;

  @media screen and (min-width: ${getBreakpoint('sm')}) {
    display: inline;
  }
`;

const StyledNavLink = styled(NavLink)`
  margin-right: 1.2rem;
  color: ${getColor('fg')};
  font-weight: bold;
  text-decoration: none;
  padding-bottom: 1px;

  &:hover,
  &:focus,
  &:visited {
    color: ${getColor('fg')};
    text-decoration: none;
  }

  &:hover,
  &:focus {
    border-bottom: 2px solid ${getColor('grey')};
  }

  &.selected {
    border-bottom: 2px solid ${getColor('fg')};
  }
`;

export default Header;
