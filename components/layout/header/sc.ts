import styled from 'styled-components';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Drawer,
  List,
  ListItemText,
  IconButton,
  Theme,
} from '@material-ui/core';

const HeaderSC = {
  AppBar: styled(AppBar)`
    ${({ theme }: { theme: Theme }) => `
        background-color: ${theme.palette.secondary.main} !important;
    `}
  `,
  ToolBar: styled(Toolbar)`
    display: flex;
    justify-content: space-between;
  `,
  BoardName: styled(Typography)`
    color: #fcf1c2;
  `,
  NavButton: styled(Button)`
    ${({ theme }: { theme: Theme }) => `
      background-color: #fcf1c2 !important;
      color: ${theme.palette.secondary.main} !important;
      &:hover {
        background-color: rgba(252, 241, 194, 0.8) !important;
      }
    `}
  `,
  BurgerButton: styled(IconButton)`
    color: rgba(252, 241, 194, 0.8) !important;
    &:hover {
      color: #fcf1c2 !important;
    }
  `,
  Drawer: styled(Drawer)`
    & .MuiDrawer-paper {
      background-color: #ebecf0;
    }
  `,
  List: styled(List)`
    width: 165px;
  `,
  ListItemText: styled(ListItemText)`
    text-overflow: ellipsis;
    overflow: hidden;
  `,
};

export { HeaderSC };
