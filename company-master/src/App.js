import "./App.css";
import CompanyForm from "./components/Form";
import Notes from "./components/Notes";
import CompanyView from "./components/ViewScreen";

function App() {
  return (
    <div className="container">
      <CompanyForm />
      <Notes />
      <CompanyView />
    </div>
  );
}

export default App;
