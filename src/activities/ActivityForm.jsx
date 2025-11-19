import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { createActivity } from "../api/activities"; // Assuming you have this function

// Renamed from syncActivities to refreshActivities for clarity in usage
export default function ActivityForm({ syncActivities: refreshActivities }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const { token } = useAuth(); // Assuming token is needed for creation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("You must be logged in to create an activity.");
      return;
    }

    try {
      await createActivity({ name, description }, token);
      await refreshActivities();

      setName("");
      setDescription("");
    } catch (err) {
      setError("Failed to create activity: " + err.message);
    }
  };

  return (
    <section>
      <h2>Add a new activity</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="activity-name">Name</label>
        <input
          type="text"
          id="activity-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="activity-description">Description</label>
        <input
          type="text"
          id="activity-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <button type="submit">[Add activity]</button>
      </form>
    </section>
  );
}
