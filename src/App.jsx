import useTheme from "./hooks/useTheme";

function App() {
  const { changeTheme, mode } = useTheme();
  return (
    <>
      <h1 className="text-3xl text-myrtle_green dark:text-cambridge_blue font-bold underline">
        Hello world!
      </h1>
      <button onClick={changeTheme}>
        Make {mode === "dark" ? "Light" : "Dark"}
      </button>
    </>
  );
}

export default App;
