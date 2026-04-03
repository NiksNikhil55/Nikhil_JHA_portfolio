import { useEffect, useState } from "react";

const API_URL = "https://script.google.com/macros/s/AKfycbxEzq7xmb3KX4uaNXzOKQko8jeptZojMdeVOFmp-5uq8ZNv8diQGKl6R2bstJrbN8p6/exec";
const ADMIN_PASSWORD = "admin123";

export default function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({
    name: "",
    designation: "",
    company: "",
    relation: "",
    text: "",
    image: "",
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");

  const fetchFeedback = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setFeedbacks(data.reverse());
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ ...form, status: "pending" }),
    });

    alert("Feedback submitted for approval!");
    setForm({ name: "", designation: "", company: "", relation: "", text: "", image: "" });
  };

  const handleAdminLogin = () => {
    if (password === ADMIN_PASSWORD) setIsAdmin(true);
    else alert("Wrong password");
  };

  const handleAction = async (index, action) => {
    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ index, action }),
    });
    fetchFeedback();
  };

  const approvedFeedbacks = feedbacks.filter(f => f.status === "approved");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h1 className="text-3xl font-bold">Nikhil Kumar Jha</h1>
          <p className="text-gray-600">Operations Manager | Banking | Data Automation</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow text-center">
            <h3 className="text-xl font-bold">{approvedFeedbacks.length}</h3>
            <p>Approved Feedbacks</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <h3 className="text-xl font-bold">{feedbacks.length}</h3>
            <p>Total Submitted</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <h3 className="text-xl font-bold">80%</h3>
            <p>Finance Conversion Impact</p>
          </div>
        </div>

        {/* ADMIN LOGIN */}
        {!isAdmin && (
          <div className="bg-white p-4 rounded shadow">
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 mr-2"
            />
            <button onClick={handleAdminLogin} className="bg-black text-white px-3 py-1 rounded">
              Login
            </button>
          </div>
        )}

        {/* FORM */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl mb-3">Give Feedback</h2>
          <form onSubmit={handleSubmit} className="space-y-2">
            <input placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="w-full p-2 border"/>
            <input placeholder="Designation" value={form.designation} onChange={(e)=>setForm({...form,designation:e.target.value})} className="w-full p-2 border"/>
            <input placeholder="Company" value={form.company} onChange={(e)=>setForm({...form,company:e.target.value})} className="w-full p-2 border"/>
            <input placeholder="Relation" value={form.relation} onChange={(e)=>setForm({...form,relation:e.target.value})} className="w-full p-2 border"/>
            <textarea placeholder="Feedback" value={form.text} onChange={(e)=>setForm({...form,text:e.target.value})} className="w-full p-2 border"/>
            <input placeholder="Image URL" value={form.image} onChange={(e)=>setForm({...form,image:e.target.value})} className="w-full p-2 border"/>
            <button className="bg-black text-white px-4 py-2">Submit</button>
          </form>
        </div>

        {/* ADMIN PANEL */}
        {isAdmin && (
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl mb-3">Admin Panel</h2>

            {feedbacks.map((f, i) => (
              <div key={i} className="border p-3 mb-2">
                <p><b>{f.name}</b> ({f.status})</p>
                <p>{f.text}</p>

                <div className="space-x-2 mt-2">
                  <button onClick={()=>handleAction(i+2, "approve")} className="bg-green-500 text-white px-2 py-1">Approve</button>
                  <button onClick={()=>handleAction(i+2, "delete")} className="bg-red-500 text-white px-2 py-1">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* DISPLAY APPROVED */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl mb-3">What People Say</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {approvedFeedbacks.map((f, i) => (
              <div key={i} className="p-4 border rounded">
                {f.image && <img src={f.image} className="w-12 h-12 rounded-full" />}
                <p><b>{f.name}</b></p>
                <p>{f.designation} @ {f.company}</p>
                <p className="text-sm text-gray-500">{f.relation}</p>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
