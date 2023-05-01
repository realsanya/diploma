import React, { FC } from 'react';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

type TCollapseProps = {
  title: string;
  details: JSX.Element;
};

const Collapse: FC<TCollapseProps> = (props) => {
  const {
    title,
    details,
  } = props;

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {details}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default Collapse;