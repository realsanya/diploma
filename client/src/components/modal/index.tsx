import React, { FC, PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '@mui/material'; 

import styles from './styles.module.scss';

type TModalProps = {
  children: PropsWithChildren
  onClose: () => void,
  isOpen: boolean,
}

const Modal: FC<TModalProps & PropsWithChildren> = (props) => {
  const theme = useTheme();

  const {
    children,
    onClose,
    isOpen,
  } = props;

  return isOpen ? createPortal(
    <>
      <div className={styles.modal} style={{ backgroundColor: theme.palette.background.alt }}>
        <button onClick={onClose} className={styles.modal__close}>&times;</button>
        {children}
      </div>
      <div className={styles.backdrop} />
    </>
  ,document.body) : null;

};

export default Modal;

