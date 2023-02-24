import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { useTheme } from '@mui/material';
import styles from './styles.module.scss';

const Toolbar: FC<PropsWithChildren<Pick<HTMLAttributes<HTMLElement>, 'className'>>> = ({ children, className }) => {
  const classes = [styles.toolbar, className].filter((el) => el).join(' ');
  const theme = useTheme();

  return (
    <div className={classes} style={{ backgroundColor: theme.palette.neutral.light }}>
      {children}
    </div>
  );
};

Toolbar.displayName = 'Toolbar';

export default Toolbar;