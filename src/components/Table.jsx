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



    const sortByEmployeeID = () => {
        const sorted = [...data].sort((a, b) => {
            return a.employee[0]._id.localeCompare(b.employee[0]._id);
        });
        setData(sorted);
    };
    
    const sortByEmployeeName = () => {
        const sorted = [...data].sort((a, b) => {
            return a.employee[0].full_name.localeCompare(b.employee[0].full_name);
        });
        setData(sorted);
    };

    const sortByProjectName = () => {
        const sorted = [...data].sort((a, b) => {
            return a.project[0].project_name.localeCompare(b.project[0].project_name);
        });
        setData(sorted);
    };

    const sortByDate = () => {
        const sorted = [...data].sort((a, b) => {
            return new Date(a.start_date) - new Date(b.start_date);
        });
        setData(sorted);
    };


    return (
        <div>
            <h2>Project Assignments</h2>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => sortByEmployeeID('employee_id')}>Employee ID</th>
                        <th onClick={() => sortByEmployeeName('employee[0].full_name')}>Employee Name</th>
                        <th onClick={() => sortByProjectName('project[0].project_name')}>Project Name</th>
                        <th onClick={() => sortByDate('start_date')}>Start Date</th>
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
