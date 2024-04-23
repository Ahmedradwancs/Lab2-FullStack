import React, { useState, useEffect } from 'react';

// Function to fetch data from the backend server
const fetchData = async () => {
    try {
        const response = await fetch('http://localhost:3000/api');
        const jsonData = await response.json();
        console.log('Fetched data:', jsonData); // Log fetched data
        return jsonData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// Function to render the table
const Table = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const fetchedData = await fetchData();
                setData(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getData();
    }, []); // Empty dependency array ensures the effect runs only once

    console.log('Data:', data); // Log data state

    // const sortBy = (field) => {
    //     const sortedData = [...data].sort((a, b) => {
    //         if (a[field] < b[field]) return -1;
    //         if (a[field] > b[field]) return 1;
    //         return 0;
    //     });
    //     setData(sortedData);
    // };

    const sortBy = (field) => {
        const sortedData = [...data].sort((a, b) => {
            const valueA = getFieldNestedValue(a, field);
            const valueB = getFieldNestedValue(b, field);
            
            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
            return 0;
        });
        setData(sortedData);
    };
    
    const getFieldNestedValue = (obj, path) => {
        const keys = path.split('.');
        return keys.reduce((acc, key) => acc && acc[key], obj);
    };
    

    return (
        <div>
            <h2>Project Assignments</h2>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => sortBy('employee_id')}>Employee ID</th>
                        <th onClick={() => sortBy('employee[0].full_name')}>Employee Name</th>
                        <th onClick={() => sortBy('project[0].project_name')}>Project Name</th>
                        <th onClick={() => sortBy('start_date')}>Start Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item._id}>
                            <td>{item.employee_id}</td>
                            <td>{item.employee && item.employee[0] && item.employee[0].full_name}</td>
                            <td>{item.project && item.project[0] && item.project[0].project_name}</td>
                            <td>{item.start_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
