import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("https://rentnow-fylj.onrender.com/profile", {
          method: "GET",
          credentials: "include", // Ensures cookies (if any) are sent
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Profile</h2>

      {error && <p className="text-red-500">{error}</p>}

      {user ? (
        <div className="space-y-2">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
          <p><strong>ID:</strong> {user.id}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}


