import DeleteButton from "../components/DeleteButton";
import { useAuth } from "../auth/AuthContext";

export default function ActivityList({ activities, setActivities }) {
  const { token } = useAuth();

  return (
    <ul>
      {activities.map((activity) => (
        <li key={activity.id}>
          {activity.name}

          {token && (
            <DeleteButton
              activityId={activity.id}
              ownerId={activity.creatorId}
              refreshActivities={setActivities}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
