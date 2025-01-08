import packageJson from "../../package.json";
const { name, version } = packageJson;

export default function App() {
  return (
    <>
      {name}
      <br />v{version}
    </>
  );
}
