import React from "react";
import { Box, Columns, Column } from "bloomer";

const Concept = () => {
  return (
    <Box>
      <Columns isVCentered>
        <Column isSize={6}>Le Concept</Column>
        <Column isSize={6}>
          <Columns isMultiline>
            <Column isSize={6}>a</Column>
            <Column isSize={6}>a</Column>
            <Column isSize={6}>a</Column>
            <Column isSize={6}>a</Column>
          </Columns>
        </Column>
      </Columns>
    </Box>
  );
};

export default Concept;
