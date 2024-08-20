document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'https://cve.projectdiscovery.io/api/v1';
    const API_KEY = 'fbbb1f70-12d4-46d9-a47d-ac2389529f8e'; // Replace with your API key

    const filterSidebar = document.getElementById('filter-sidebar');
    const cveList = document.getElementById('cve-list');
    const cveDetail = document.getElementById('cve-detail');
    const applyFiltersButton = document.getElementById('apply-filters');
    const severityRange = document.getElementById('severity-range');
    const severityLabel = document.getElementById('severity-label');
    const patchAvailableCheckbox = document.getElementById('patch-available');

    function getCves(filters) {
        const params = new URLSearchParams(filters).toString();
        return fetch(`${API_BASE_URL}/cves?${params}`, {
            headers: {
                'X-PDCP-Key': API_KEY
            }
        }).then(response => response.json());
    }

    function getCveDetail(cveId) {
        return fetch(`${API_BASE_URL}/cves/${cveId}`, {
            headers: {
                'X-PDCP-Key': API_KEY
            }
        }).then(response => response.json());
    }

    function updateSeverityLabel() {
        const [min, max] = severityRange.value.split(',').map(Number);
        severityLabel.textContent = `${min} - ${max}`;
    }

    async function applyFilters() {
        const severityRangeValue = severityRange.value.split(',').map(Number);
        const filters = {
            severity_min: severityRangeValue[0],
            severity_max: severityRangeValue[1],
            patch_available: patchAvailableCheckbox.checked
        };

        const cves = await getCves(filters);
        displayCveList(cves);
    }

    function displayCveList(cves) {
        cveList.innerHTML = '';
        cves.forEach(cve => {
            const li = document.createElement('li');
            li.textContent = cve.id;
            li.addEventListener('click', () => showCveDetail(cve.id));
            cveList.appendChild(li);
        });
    }

    async function showCveDetail(cveId) {
        const detail = await getCveDetail(cveId);
        cveDetail.innerHTML = `
            <h3>${detail.id}</h3>
            <p><strong>Severity:</strong> ${detail.severity}</p>
            <p><strong>Description:</strong> ${detail.description}</p>
        `;
    }

    // Event Listeners
    applyFiltersButton.addEventListener('click', applyFilters);
    severityRange.addEventListener('input', updateSeverityLabel);

    // Initialize
    applyFilters(); // Load initial CVEs
});
