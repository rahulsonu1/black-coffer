
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [insights, setInsights] = useState([]);
  const [filters, setFilters] = useState({
    end_year: '',
    topic: '',
    sector: '',
    region: '',
    source:'',
  });
  const [filterOptions, setFilterOptions] = useState({
    end_years: [],
    topics: [],
    sectors: [],
    regions: [],
    source:[]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/insights', {
          params: filters,
        });
        setInsights(response.data);
      } catch (error) {
        console.error("Error fetching insights data:", error);
      }
    };
    fetchData();
  }, [filters]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/filters');
        setFilterOptions(response.data);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };
    fetchFilterOptions();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };


  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8000/api/insights', {
        params: filters,
      });
      setInsights(response.data);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const data = {
    labels: insights.map((insight) => insight.topic),
    datasets: [
      {
        label: 'Intensity',
        data: insights.map((insight) => insight.intensity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Likelihood',
        data: insights.map((insight) => insight.likelihood),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h1>Data Visualization Dashboard</h1>
      <form onSubmit={handleFilterSubmit}>
        <label>
          End Year:
          <select name="end_year" value={filters.end_year} onChange={handleFilterChange}>
            <option value="">All</option>
            {filterOptions.end_years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>
        <label>
          Topic:
          <select name="topic" value={filters.topic} onChange={handleFilterChange}>
            <option value="">All</option>
            {filterOptions.topics.map((topic) => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </label>
        <label>
          Sector:
          <select name="sector" value={filters.sector} onChange={handleFilterChange}>
            <option value="">All</option>
            {filterOptions.sectors.map((sector) => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
        </label>
        <label>
          Region:
          <select name="region" value={filters.region} onChange={handleFilterChange}>
            <option value="">All</option>
            {filterOptions.regions.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </label>
        <label>
          Source:
          <select name="region" value={filters.source} onChange={handleFilterChange}>
            <option value="">All</option>
            {filterOptions.source.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <button type="submit">Apply Filters</button>
      </form>
      <Bar
        data={data}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default Dashboard;

