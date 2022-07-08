import { merge } from 'lodash';
import Alert from './Alert';
import Avatar from './Avatar';
import Backdrop from './Backdrop';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import Card from './Card';
import Drawer from './Drawer';
import Lists from './Lists';
import LoadingButton from './LoadingButton';
import Menu from './Menu';
import Paper from './Paper';
import Table from './Table';
import Timeline from './Timeline';

export default function ComponentsOverrides(theme) {
  return merge(
    Alert(theme),
    Avatar(theme),
    Backdrop(theme),
    Button(theme),
    ButtonGroup(theme),
    Card(theme),
    Drawer(theme),
    Lists(theme),
    LoadingButton(theme),
    Menu(theme),
    Paper(theme),
    Table(theme),
    Timeline(theme)
  );
}
