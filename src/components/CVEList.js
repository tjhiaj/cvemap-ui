import React, { useState, useEffect } from 'react';
import { getCves } from '../services/cvemapApi';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const CVEList = ({ filters, onSelectCve }) => {
  const [cves, setCves] = useState([]);

  useEffect(() => {
    const fetchCves = async () => {
      const data = await getCves(filters);
      console.log("Fetched CVEs:", data); // Debugging line
      setCves(data);
    };
    fetchCves();
  }, [filters]);

  return (
    <Box p={2}>
      <Typography variant="h6">CVE Results</Typography>
      <List>
        {cves.map((cve) => (
          <ListItem button key={cve.id} onClick={() => onSelectCve(cve.id)}>
            <ListItemText primary={cve.id} secondary={cve.description} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CVEList;