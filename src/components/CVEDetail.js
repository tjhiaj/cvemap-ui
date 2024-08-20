import React, { useState, useEffect } from 'react';
import { getCveDetail } from '../services/cvemapApi';
import { Box, Typography } from '@mui/material';

const CVEDetail = ({ cveId }) => {
  const [cve, setCve] = useState(null);

  useEffect(() => {
    const fetchCveDetail = async () => {
      const data = await getCveDetail(cveId);
      console.log("Fetched CVE Detail:", data); // Debugging line
      setCve(data);
    };
    fetchCveDetail();
  }, [cveId]);

  if (!cve) return null;

  return (
    <Box p={2}>
      <Typography variant="h4">{cve.id}</Typography>
      <Typography variant="h6">Severity: {cve.severity}</Typography>
      <Typography variant="body1">{cve.description}</Typography>
      {/* Add more detailed sections here */}
    </Box>
  );
};

export default CVEDetail;