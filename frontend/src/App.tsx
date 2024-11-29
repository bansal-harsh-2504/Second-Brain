import "./App.css";
import Button from "./components/Button";
import PlusIcon from "./icons/PlusIcon";

function App() {
  return (
    <>
      <Button
        variant="primary"
        size="md"
        text="Login"
        startIcon={<PlusIcon />}
        onClick={() => {
          console.log("dfs");
        }}
      />
    </>
  );
}

export default App;
