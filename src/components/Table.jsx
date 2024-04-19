    import React, { useState, useEffect } from 'react';

    // Function to fetch data from the backend server
    const fetchData = async () => {
    try {
        const response = await fetch('/api'); // Fetch data from the backend server
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error for handling in the caller
    }
    };

    // Function to render the table
    const Table = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
        try {
            const fetchedData = await fetchData(); // Call fetchData function to get data
            setData(fetchedData);
        } catch (error) {
            // Handle error
        }
        };

        getData();
    }, []);

    return (
        <div>
        <h2>Project Assignments</h2>
        <table>
            <thead>
            <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Project Name</th>
                <th>Start Date</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                <td>{item.employee_id}</td>
                <td>{item.employee[0].full_name}</td> {/* Assuming employee is an array with one item */}
                <td>{item.project[0].project_name}</td> {/* Assuming project is an array with one item */}
                <td>{item.start_date}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
    };

    export default Table;
