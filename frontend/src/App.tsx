import "./App.css";
import Button from "./components/Button";

function App() {
  return (
    <>
      <Button variant="primary" size="md" text="Login" startIcon={""} onClick={()=>{console.log("dfs")}} />
    </>
  );
}

export default App;
