import React, { useState } from 'react';
import { Box, Button, Slider, Typography, Checkbox, FormControlLabel } from '@mui/material';

const FilterSidebar = ({ onApplyFilters }) => {
  const [severity, setSeverity] = useState([0, 10]);
  const [patchAvailable, setPatchAvailable] = useState(false);

  const handleSeverityChange = (event, newValue) => {
    setSeverity(newValue);
  };

  const handleFilterApply = () => {
    onApplyFilters({ severity, patchAvailable });
  };

  return (
    <Box p={2} width={250}>
      <Typography variant="h6">Filters</Typography>
      <Typography variant="body1">Severity</Typography>
      <Slider
        value={severity}
        onChange={handleSeverityChange}
        valueLabelDisplay="auto"
        min={0}
        max={10}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={patchAvailable}
            onChange={() => setPatchAvailable(!patchAvailable)}
          />
        }
        label="Patch Available"
      />
      <Button variant="contained" onClick={handleFilterApply} fullWidth>
        Apply Filters
      </Button>
    </Box>
  );
};

export default FilterSidebar;