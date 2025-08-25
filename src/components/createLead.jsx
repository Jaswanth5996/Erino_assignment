import { useState,useEffect } from "react";
import axios from "axios";
import image from "../images/bg3.jpeg"; 
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CreateLead = () => {
  const navigate = useNavigate()
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
      axios.get(`https://erino-assignment-yuf9.onrender.com/leads/${leadId}`,{ withCredentials: true })
      .then((res) => setFormData(res.data.lead))
        .catch((err) => console.error(err));
    }
  }, [leadId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({...prev,[name]: type === "checkbox" ? checked : value,}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    if (leadId) {
      const res = await axios.put(`https://erino-assignment-yuf9.onrender.com/leads/${leadId}`, formData, { withCredentials: true });
      console.log("Lead updated:", res.data);
      alert("Lead updated successfully!");
      navigate('/leads')
    } else {
      const res = await axios.post("https://erino-assignment-yuf9.onrender.com/leads", formData, { withCredentials: true });
      console.log("Lead created:", res.data);
      alert("Lead created successfully!");
      navigate('/leads')
    }
    } catch (err) {
      console.error("Error creating lead:", err);
      alert("Failed to create lead");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 bg-cover bg-center justify-center items-center" style={{ backgroundImage: `url(${image})` }}>
      <form onSubmit={handleSubmit} className="flex flex-col bg-white space-y-3 border-gray-400 lg:w-[600px] px-6 py-8 shadow-2xl rounded-xl">
        <div className="text-3xl font-bold text-purple-600 text-center mb-5">
          {leadId ? "Update Lead" : "Create Lead"}
        </div>
        <div className="flex space-x-3">
          <input type="text" name="first_name" required value={formData.first_name} onChange={handleChange} placeholder="First Name" className="flex-1 p-3 border border-gray-300 rounded bg-gray-100"/>
          <input type="text" name="last_name" required value={formData.last_name} onChange={handleChange} placeholder="Last Name" className="flex-1 p-3 border border-gray-300 rounded bg-gray-100"/>
        </div>
        <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Email" className="p-3 border border-gray-300 rounded bg-gray-100"/>

        <input type="text" name="phone" required value={formData.phone} onChange={handleChange} placeholder="Phone" className="p-3 border border-gray-300 rounded bg-gray-100"/>

        <input type="text" name="company" required value={formData.company} onChange={handleChange} placeholder="Company" className="p-3 border border-gray-300 rounded bg-gray-100"/>
        <div className="flex space-x-3">
          <input type="text" name="city" required value={formData.city} onChange={handleChange} placeholder="City" className="flex-1 p-3 border border-gray-300 rounded bg-gray-100"/>
          <input type="text" name="state" required value={formData.state} onChange={handleChange} placeholder="State" className="flex-1 p-3 border border-gray-300 rounded bg-gray-100"/>
        </div>
        <div className="flex space-x-3">
          <select name="source" required value={formData.source} onChange={handleChange} className="flex-1 p-3 border border-gray-300 rounded bg-gray-100">
            <option value="website">Website</option>
            <option value="facebook_ads">Facebook Ads</option>
            <option value="google_ads">Google Ads</option>
            <option value="referral">Referral</option>
            <option value="events">Events</option>
            <option value="other">Other</option>
          </select>
          <select name="status" required value={formData.status} onChange={handleChange} className="flex-1 p-3 border border-gray-300 rounded bg-gray-100">
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="lost">Lost</option>
            <option value="won">Won</option>
          </select>
        </div>
        
        <input type="number" name="score" required value={formData.score} onChange={handleChange} placeholder="Score (0-100)" min="0" max="100" className="p-3 border border-gray-300 rounded bg-gray-100"/>
        <input type="number" name="lead_value" required value={formData.lead_value} onChange={handleChange} placeholder="Lead Value" className="p-3 border border-gray-300 rounded bg-gray-100"/>
        <input type="datetime-local" name="last_activity_at" value={formData.last_activity_at} onChange={handleChange} className="p-3 border border-gray-300 rounded bg-gray-100"/>
        <div className="flex items-center space-x-2">
          <input type="checkbox" name="is_qualified" checked={formData.is_qualified} onChange={handleChange} id="isQualified" className="accent-purple-500"/>
          <label htmlFor="isQualified">Is Qualified</label>
        </div>
        <button type="submit" className="p-3 mt-2 rounded bg-purple-500 text-white hover:bg-purple-600 transition">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateLead;
