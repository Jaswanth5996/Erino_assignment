import React, { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useNavigate } from "react-router-dom";
import "./Leads.css";
import image from '../images/bg3.jpeg'
ModuleRegistry.registerModules([AllCommunityModule]);

const Leads = () => {
   const [currentPage, setCurrentPage] = useState(1);
   const [pageSize, setPageSize] = useState(20);
   const [totalLeads, setTotalLeads] = useState(0);
   const [rowData, setRowData] = useState([]);
   const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://erino-assignment-yuf9.onrender.com/leads/${id}`, { withCredentials: true });
      setRowData(rowData.filter(row => row._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleUpdate = (id) => {navigate(`/create/${id}`);};

  const handleView = (id) => {navigate(`/view-lead/${id}`);};

  const actionCellRenderer = (params) => {
    return (
      <div className="flex space-x-2">
        <button className="bg-red-500 text-center hover:cursor-grab text-white px-2  rounded" onClick={() =>{ handleDelete(params.data._id)}}>Delete</button>
        <button className="bg-yellow-500 text-white text-center px-2 py-1 rounded" onClick={() => handleUpdate(params.data._id)}>Update</button>
        <button className="bg-blue-500 text-white px-2 py-1 text-center rounded" onClick={() => handleView(params.data._id)}>View</button>
      </div>
    );
  };

  const [colDefs] = useState([
    { field: "first_name", headerName: "First Name", sortable: true, filter: true, flex: 1, minWidth: 150 },
    { field: "last_name", headerName: "Last Name", sortable: true, filter: true, flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", sortable: true, filter: true, flex: 1.5, minWidth: 240 },
    { field: "phone", headerName: "Phone", sortable: true, filter: true, flex: 1, minWidth: 140 },
    { field: "company", headerName: "Company", sortable: true, filter: true, flex: 1, minWidth: 120 },
    { field: "city", headerName: "City", sortable: true, filter: true, flex: 1, minWidth: 150 },
    { field: "state", headerName: "State", sortable: true, filter: true, flex: 1, minWidth: 150 },
    { field: "source", headerName: "Source", sortable: true, filter: true, flex: 1, minWidth: 120 },
    { field: "status", headerName: "Status", sortable: true, filter: true, flex: 1, minWidth: 120 },
    { field: "score", headerName: "Score", sortable: true, filter: "agNumberColumnFilter", flex: 0.8, minWidth: 80 },
    { field: "lead_value", headerName: "Lead Value", sortable: true, filter: "agNumberColumnFilter", flex: 1, minWidth: 100 },
    { field: "last_activity_at", headerName: "Last Activity", sortable: true, filter: "agDateColumnFilter", flex: 1.2, minWidth: 150,
      valueFormatter: (params) => params.value ? new Date(params.value).toLocaleString() : "" 
    },
    { field: "is_qualified", headerName: "Qualified", sortable: true, filter: true, flex: 0.8, minWidth: 100,
      valueFormatter: (params) => params.value ? "Yes" : "No"
    },
    {headerName: "Actions",field: "actions",cellRenderer: actionCellRenderer,flex: 1,minWidth: 220,},
  ]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get(`https://erino-assignment-yuf9.onrender.com/leads?page=${currentPage}&limit=${pageSize}`, { withCredentials: true });
        setRowData(response.data.leads);
        setTotalLeads(response.data.total); 
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };
    fetchLeads();
  }, [currentPage, pageSize]);

  return (
    <div className="flex flex-col justify-center items-center bg-center min-h-screen bg-gray-50 p-4 bg-cover" style={{ backgroundImage: `url(${image})` }}>
      <div className="ag-theme-alpine custom-grid" style={{ width: "100%", maxWidth: 900, height: 500, boxShadow: "0 4px 12px rgba(0,0,0,0.15)", borderRadius: 8, overflow: "hidden" }}>
        <AgGridReact rowData={rowData} columnDefs={colDefs} defaultColDef={{ resizable: true, sortable: true, filter: true, flex: 1, minWidth: 100 }} animateRows={true}/>
      </div>
      <div className="flex text-white justify-center items-center space-x-4 mt-4 w-full max-w-[900px]">
        <button className="px-4 py-1 bg-gray-200 text-black rounded disabled:opacity-50" disabled={currentPage===1} onClick={()=>setCurrentPage(currentPage-1)}>Prev</button>
        <span>Page {currentPage} of {Math.ceil(totalLeads/pageSize)}</span>
        <button className="px-4 py-1 text-black bg-gray-200 rounded disabled:opacity-50" disabled={currentPage>=Math.ceil(totalLeads/pageSize)} onClick={()=>setCurrentPage(currentPage+1)}>Next</button>
    </div>
    </div>
  );
};

export default Leads;
