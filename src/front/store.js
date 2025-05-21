const getState = ({ getStore, setStore }) => {
    return {
        store: {
            token: localStorage.getItem("token") || null
        },
        actions: {
            login: async (email, password) => {
                const res = await fetch("/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });
                if (res.ok) {
                    const data = await res.json();
                    localStorage.setItem("token", data.token);
                    setStore({ token: data.token });
                    return true;
                }
                return false;
            },
            logout: () => {
                localStorage.removeItem("token");
                setStore({ token: null });
            },
            signup: async (email, password) => {
                const res = await fetch("/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });
                return res.ok;
            }
        }
    };
};

export default getState;
