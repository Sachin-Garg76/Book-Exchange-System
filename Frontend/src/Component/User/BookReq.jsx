import React, { useEffect, useState } from "react";
import UserNavbar from "./userNav";

const BookReq = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  // 🔹 FETCH REQUESTS (FIXED)
  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        setRequests([]);
        return;
      }

      const res = await fetch("http://localhost:5000/api/exchange/received", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (res.ok && Array.isArray(data)) {
        setRequests(data);
      } else {
        console.error("Error:", data);
        setRequests([]); 
      }
    } catch (err) {
      console.error(err);
      setRequests([]);
    }
  };

  // 🔹 UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/api/exchange/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      fetchRequests(); // refresh
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <UserNavbar />

      <div style={{ padding: "20px" }}>
        <h2>Book Requests 📚</h2>

        {requests.length === 0 ? (
          <p>No Requests</p>
        ) : (
          requests.map((req) => (
            <div key={req._id} style={{
              border: "1px solid #ccc",
              padding: "12px",
              margin: "10px 0",
              borderRadius: "10px",
              background: "#fafafa"
            }}>
              <p><b>Book:</b> {req.book?.bookName}</p>
              <p><b>Requested By:</b> {req.sender?.name}</p>
              <p><b>Status:</b> {req.status}</p>

              {req.status === "pending" && (
                <>
                  <button
                    style={{
                      marginRight: "10px",
                      background: "green",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      cursor: "pointer"
                    }}
                    onClick={() => updateStatus(req._id, "accepted")}
                  >
                    Accept
                  </button>

                  <button
                    style={{
                      background: "red",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      cursor: "pointer"
                    }}
                    onClick={() => updateStatus(req._id, "rejected")}
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default BookReq;
