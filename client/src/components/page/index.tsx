import { FC, HTMLAttributes, PropsWithChildren, CSSProperties } from 'react';
import styles from './styles.module.scss';

type TPage<P> = FC<P> & {
  Header: FC<PropsWithChildren<{
    title?: string;
    back?: [string, string]
  } & Pick<HTMLAttributes<HTMLElement>, 'className'>>>;
  Title: FC<PropsWithChildren<{
    subtitle?: string;
    style?: CSSProperties,
  }>>;
  Section: FC<PropsWithChildren<{}>>;
  SectionTitle: FC<PropsWithChildren<{}>>;
  Body: FC<PropsWithChildren<{}>>;
  Footer: FC<PropsWithChildren<{}>>;
}

const Page: TPage<PropsWithChildren<{}>> = ({ children }) => (
  <div className={styles.page}>
    {children}
  </div>
);

Page.Header = function({ children, className }) {
  return (
    <div className={`
      ${styles.page_header}
      ${className}
    `}
    >
      {children}
    </div>
  );
};

Page.Title = function({ children, subtitle, style }) {
  return (
    <div>
      <h1 className={styles.page_header__title} style={style}>
        {children}
      </h1>
      {subtitle && <p className={styles.page_header__subtitle}>{subtitle}</p>}
    </div>
  );
};

Page.Section = function({ children }) {
  return (
    <div className={styles.page_body__section}>
        {children}
    </div>
  );
};

Page.SectionTitle = function({ children }) {
  return (
    <h2 className={styles.page_body__section_title}>
      {children}
    </h2>
  );
};

Page.Body = function({ children }) {
  return (
    <div className={styles.page_body}>
      {children}
    </div>
  );
};

Page.Footer = function({ children }) {
  return (
    <div className={styles.page_footer}>
      {children}
    </div>
  );
};

Page.displayName = 'Page';

export default Page;
