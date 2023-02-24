import { NavLink, useLocation, useParams } from 'react-router-dom';
import { FC, useMemo } from 'react';
import { useTheme } from '@mui/material'; 

import styles from './styles.module.scss';

type TStepNavigationProps = {
  links: { title: string; href: string; disabled: boolean; }[];
  state: any;
};

const StepNavigation: FC<TStepNavigationProps> = ({ links, state }) => {
  const location = useLocation();
  const { id } = useParams();
  const theme = useTheme();

  const last = useMemo(() => 
    location.pathname.split('/').filter(item => item !== id).splice(-1)[0],
    [location, id]
  );

  return (
    <nav role="form" className={styles.step_navigation}>
    {links.map(link => {
      let isActive = link.href === ''
        ? last === 'create' || last === 'update'
        : last === link.href;

      console.log(isActive);

      return (
        <NavLink 
          key={link.title}
          to={!link.disabled ? link.href : '#'}
          state={state}
          className={`
            ${styles.step_navigation__item}
            ${link.disabled ? styles['step_navigation__item--disabled'] : ''}
            ${isActive ? styles['step_navigation__item--active'] : ''}
          `}
          style={{
            backgroundColor: !link.disabled && !isActive ? theme.palette.primary.main : 'inherit',
            color: !link.disabled && !isActive ? theme.palette.background.alt : '#636975',
          }}>
          {link.title}
        </NavLink>
      );
    })}
  </nav>
  );
};

export default StepNavigation;