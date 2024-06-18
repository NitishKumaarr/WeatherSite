import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URI, geoApiOptions } from "../api";

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#1e293b',
    color: 'black',
    border: '1px solid white',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#1e293b", 
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#1e293b' : '#475569',
    color: state.isSelected ? 'blue' : 'white', 
    padding: '10px', 
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'white',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'white',
  }),
};

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const loadOptions = async (inputValue) => {
        const controller = new AbortController();
        const signal = controller.signal;

        // Set timeout to 15 seconds
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        try {
            const response = await fetch(
                `${GEO_API_URI}/cities?minPopulation=1000&namePrefix=${inputValue}`,
                {
                    ...geoApiOptions,
                    signal,
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.data) {
                console.error('API response does not contain data property:', data);
                return { options: [], hasMore: false };
            }

            const options = data.data.map((city) => ({
                value: `${city.latitude} ${city.longitude}`,
                label: `${city.name}, ${city.countryCode}`,
            }));

            console.log('Mapped Options:', options);
            clearTimeout(timeoutId); // Clear the timeout if the request completes successfully
            return {
                options,
                hasMore: false,
            };
        } catch (err) {
            if (err.name === 'AbortError') {
                console.error('Request was aborted:', err);
            } else {
                console.error('Error fetching options:', err);
            }
            return {
                options: [],
                hasMore: false,
            };
        }
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    return (
        <AsyncPaginate
            placeholder="Search for City"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
            styles={customStyles}
        />
    );
};

export default Search;
