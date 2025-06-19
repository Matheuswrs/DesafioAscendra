import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const TableComponent = () => {
    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const mockData = [{'Teste1': 'joao', 'Teste2': '3', 'Teste3': 4}, 
            {'Teste1': 'joaso', 'Teste2': '23', 'Teste3': 434}];
        
        setData(mockData);
        setHeaders(Object.keys(mockData[0]));
    }, []);

    return (
        <table className="table">
            <thead>
                <tr>
                    {
                        headers.map(header => (
                            <th key={header} scope='col'>{header}</th>
                        ))
                    }
                </tr>
            </thead>
            
            <tbody className="table-group-divider">
                {
                    data.map((row, index) => (
                        <tr key={index}>
                            {headers.map(col => (
                                <td key={col}>{row[col]}</td>
                            ))}
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default TableComponent