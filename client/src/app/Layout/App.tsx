import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))
  }, []);

  // Function within a function...
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if (id) {
      handleSelectActivity(id);
    } else {
      handleCancelSelectActivity();
    }
    setEditMode(true);
  }

  const handleFormclose = () => {
    setEditMode(false);
  }

  const handleSubmitForm = (activity: Activity) => {
    // Are we updating an existing activity...
    if (activity.id) {
      setActivities(activities.map(x => x.id === activity.id ? activity : x));
    } else {
      // It's a new one!!!
      const newActivity = {...activity, id: activities.length.toString()};
      setSelectedActivity(activity);
      setActivities([...activities, newActivity]);
    }
    setEditMode(false);
  }
  
  const handleDelete = (id: string) => {
    setActivities(activities.filter(x => x.id !== id));

  }

  return (
    <Box sx={{bgcolor: '#eeeeee'}}>
    <CssBaseline />
    <NavBar openForm={handleOpenForm} />
      <Container maxWidth='xl' sx={{mt: 3}}>
        <ActivityDashboard 
          activities={activities} 
          selectActivity={handleSelectActivity} 
          cancelSelectactivity={handleCancelSelectActivity} 
          selectedActivity={selectedActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleFormclose}
          submitForm={handleSubmitForm}
          deleteActivity={handleDelete}
        />
      </Container>
    </Box>
  )
}

export default App
