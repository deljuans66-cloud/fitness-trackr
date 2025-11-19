// Inside /components/DeleteButton.jsx
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { deleteActivity } from "../api/activities";

export default function DeleteButton({
  activityId,
  ownerId,
  refreshActivities,
}) {
  const { token, user } = useAuth();
  const [error, setError] = useState(null);

  async function handleDelete() {
    setError(null);

    if (!token) {
      setError("You must be logged in to delete this activity.");
      return;
    }

    if (!user || user.id !== ownerId) {
      setError("You are not authorized to delete this activity.");
      return;
    }

    try {
      await deleteActivity(activityId, token);
      await refreshActivities();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
