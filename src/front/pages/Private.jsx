import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Private() {
    const [msg, setMsg] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        fetch("http://localhost:5000/api/private", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => {
                if (!res.ok) throw new Error("Unauthorized");
                return res.json();
            })
            .then(data => setMsg(data.logged_in_as))
            .catch(() => navigate("/login"));
    }, []);

    return <div>{msg ? `Bienvenido, ID: ${msg}` : "Cargando..."}</div>;
}
