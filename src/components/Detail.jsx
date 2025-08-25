import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import image from '../images/bg3.jpeg'

const Detail = () =>{
    const { leadId } = useParams(); 
    const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    state: "",
    source: "website",
    status: "new",
    score: 0,
    lead_value: 0,
    is_qualified: false,
  });
 useEffect(() => {
    if (leadId) {
      axios.get(`http://localhost:5000/leads/${leadId}`,{ withCredentials: true })
      .then((res) => setFormData(res.data.lead))
        .catch((err) => console.error(err));
    }
  }, [leadId]);
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-cover" style={{ backgroundImage: `url(${image})` }}>
    <div className="p-[50px] flex flex-col bg-white text-purple-500  justify-center items-center space-y-2 border rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-2xl pb-6 font-bold">Lead Details</h2>
      <div><strong>First Name:</strong> {formData.first_name}</div>
      <div><strong>Last Name:</strong> {formData.last_name}</div>
      <div><strong>Email:</strong> {formData.email}</div>
      <div><strong>Phone:</strong> {formData.phone}</div>
      <div><strong>Company:</strong> {formData.company}</div>
      <div><strong>City:</strong> {formData.city}</div>
      <div><strong>State:</strong> {formData.state}</div>
      <div><strong>Source:</strong> {formData.source}</div>
      <div><strong>Status:</strong> {formData.status}</div>
      <div><strong>Score:</strong> {formData.score}</div>
      <div><strong>Lead Value:</strong> {formData.lead_value}</div>
      <div><strong>Qualified:</strong> {formData.is_qualified ? "Yes" : "No"}</div>
    </div>
    </div>

    )
}

export default Detail