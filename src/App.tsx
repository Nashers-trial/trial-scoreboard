import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import AnonHeader from "./AnonHeader.tsx";
import AnonScoreboard from "./AnonScoreboard.tsx";
import AnonFooter from "./AnonFooter.tsx";


const client = generateClient<Schema>({
  authMode: 'apiKey',
});

const [teams, setTeams] = useState<Array<Schema["Team"]["type"]>>([]);
const [trialDays, setTrialDays] = useState<Array<Schema["TrialDay"]["type"]>>([]);

useEffect(() => {
  client.models.Team.observeQuery().subscribe({
    next: (data) => setTeams([...data.items]),
  });
  client.models.TrialDay.observeQuery().subscribe({
    next: (data) => setTrialDays([...data.items]),
  });
}, []);

function App() {

  return (
    <div className="App">
      <AnonHeader />
      <AnonScoreboard 
        teams={teams}
        trialDays={trialDays}
      />
      <AnonFooter />
    </div>
  );
}

export default App;
