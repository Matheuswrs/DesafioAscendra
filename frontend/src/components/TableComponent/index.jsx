import React from 'react'

const TableComponent = ({ data, columns, columnsLabel, onPageChange, customRender }) => {

    if (!data || data.length === 0) {
        return <p>Nenhum dado disponível</p>;
    }

    const rows = data.data
    const totalPages = data.last_page
    const currentPage = data.current_page

    return (
        <>
            {data.data && data.data.length === 0 ? (
                <div className="alert alert-warning mt-3" role="alert">
                    Nenhum dado encontrado!
                </div>
            ) : (
                <div className='container'>
                    <table className="table">
                        <thead>
                            <tr>
                                {
                                    columns.map(column => (
                                        <th key={column} scope='col'>{columnsLabel[column] || column}</th>
                                    ))
                                }
                            </tr>
                        </thead>

                        <tbody className="table-group-divider">
                            {
                                rows.map((row, index) => (
                                    <tr key={index}>
                                        {columns.map(column => (
                                            <td key={column}>
                                                {customRender?.[column]
                                                    ? customRender[column](row)
                                                    : row[column]
                                                }
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    {onPageChange && totalPages >= 1 && (
                        <nav className='d-grid gap-2 d-md-flex justify-content-md-end'>
                            <ul className="pagination">
                                {[...Array(totalPages)].map((arr, index) => {
                                    const page = index + 1;
                                    return (
                                        <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => onPageChange(page)}>
                                                {page}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    )}
                </div>
            )}
        </>
    )
}

export default TableComponent
