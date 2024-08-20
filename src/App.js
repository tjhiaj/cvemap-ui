import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import Header from './components/Header';
import FilterSidebar from './components/FilterSidebar';
import CVEList from './components/CVEList';
import CVEDetail from './components/CVEDetail';

const App = () => {
  const [filters, setFilters] = useState({});
  const [selectedCve, setSelectedCve] = useState(null);

  const handleApplyFilters = (newFilters) => {
    console.log('Applying Filters:', newFilters);  // Debugging line
    setFilters(newFilters);
  };

  const handleSelectCve = (cveId) => {
    console.log('Selected CVE:', cveId);  // Debugging line
    setSelectedCve(cveId);
  };

  return (
    <Box>
      <Header />
      <Grid container>
        <Grid item>
          <FilterSidebar onApplyFilters={handleApplyFilters} />
        </Grid>
        <Grid item xs={6}>
          <CVEList filters={filters} onSelectCve={handleSelectCve} />
        </Grid>
        <Grid item xs={4}>
          {selectedCve && <CVEDetail cveId={selectedCve} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const BASE_URL = 'https://cve.projectdiscovery.io/api/v1';
// const API_KEY = process.env.REACT_APP_CVEMAP_API_KEY;

// const apiClient = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'X-PDCP-Key': API_KEY,
//   },
// });

// const App = () => {
//   const [cves, setCves] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCves = async () => {
//       try {
//         const response = await apiClient.get('/cves', { params: { limit: 1 } });
//         setCves(response.data);
//       } catch (error) {
//         console.error('Error fetching CVEs:', error.response ? error.response.data : error.message);
//         setError('Error fetching CVEs');
//       }
//     };

//     fetchCves();
//   }, []);

//   return (
//     <div>
//       <h1>CVE Data</h1>
//       {error && <p>{error}</p>}
//       <pre>{JSON.stringify(cves, null, 2)}</pre>
//     </div>
//   );
// };

// export default App;
