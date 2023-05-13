import { UsersProvider } from "./context/UsersContext";
import Users from "./Users";

function App() {
  return (
    <UsersProvider>
      <div className="App">
        <Users />
      </div>
    </UsersProvider>
  );
}

export default App;
