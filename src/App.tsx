import Github from "./assets/github-mark.svg";
const { name, version } = chrome.runtime
  ? chrome.runtime.getManifest()
  : { name: "[DEV] MY-APP", version: "0.0.0" };

export default function App() {
  return (
    <div className="w-[300px] bg-white p-2">
      <div className="flex items-center mb-2 border-b pb-2">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">{name}</h1>
          <p className="text-sm text-gray-500">v{version}</p>
        </div>
      </div>

      <a
        href="https://github.com/tuki0918/booth-extra-sales-report/issues"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
      >
        <img src={Github} className="h-4 w-4" alt="github" />
        <span>Report an Issue</span>
      </a>
    </div>
  );
}
