import React, { useState, useEffect ,useMemo } from 'react';
import {COLUMNS} from './columns'
import { useTable,useSortBy,useGlobalFilter, usePagination} from 'react-table'
import axios from 'axios'
import { GlobalFilter } from './Globalfilter'
import './tables.css'
const DataTable  = (props)=>{
   
    const [posts,setPosts] = useState([])
    const [loading2, setLoading2] = useState(false);
    useEffect(() => {
        const fetchPosts = async () => {
          const res = await axios.get('https://flyworex.azurewebsites.net/api/Graphs/GetAudUsage')
          setLoading2(true)
          setPosts(res.data)
          setLoading2(false)
        };
        fetchPosts()
      },[])
      const columns = useMemo(()=>COLUMNS,[])
      const dataaa = React.useMemo(() => posts, [posts]);

      const tableinstance =   useTable({
        columns:columns,
         data:dataaa
    },useGlobalFilter,useSortBy,usePagination)   
    const {getTableProps , getTableBodyProps,headerGroups,page,nextPage,previousPage,canNextPage,canPreviousPage,pageOptions,gotoPage,pageCount,rows,prepareRow,state,setGlobalFilter} = tableinstance
    
    const {globalFilter,pageIndex} = state
        return(
          <div className="table_container">
           <h4>{props.title}</h4>
         {loading2?<h1>Loading...</h1>:<> <GlobalFilter filter={globalFilter} setfilter = {setGlobalFilter}></GlobalFilter>
            <table {...getTableProps()} className="table">
                        <thead>
                        
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    <th>#</th>
                  {headerGroup.headers.map(column => (
                    // Add the sorting props to control sorting. For this example
                    // we can add them into the header props
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      {/* Add a sort direction indicator */}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row=>{
                        prepareRow(row)
                        return(
                            <tr {...row.getRowProps()}>
                                <td>{Number(row.id)+1}</td>
                                {row.cells.map(cell=>{
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table></>}
            <div>
              <span>
                page{' '}
                <strong>
                  {pageIndex+1} of {pageOptions.length}
                </strong>{' '}
              </span>
              
              <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
              <button onClick={()=>{previousPage()}}  disabled={!canPreviousPage}>Previous</button>
              <button onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
              <button onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</button>
    
            </div>
            </div>
        )
  }

export default DataTable