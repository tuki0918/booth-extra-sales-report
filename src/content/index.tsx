import { createRoot } from "react-dom/client";

function main() {
  // deprecated: depended on DOM element
  const table = document.querySelector("table.sales-report.daily");
  const parentElement = table?.parentElement;

  if (!parentElement) {
    chrome.runtime.sendMessage({ badgeText: "ERR" });
    return;
  }

  const App = ({ totalAmount }: { totalAmount: number }) => {
    return (
      <table className="condensed sales-report daily">
        <thead>
          <tr>
            <th />
            <th className="number">計（合計）</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td />
            <td className="number">
              ¥ {Intl.NumberFormat().format(totalAmount)}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  let totalAmount = 0;
  // deprecated: depended on DOM element
  const rows = table.querySelectorAll("tbody tr");
  for (const row of rows) {
    const cells = row.querySelectorAll("td");
    const amountCell = cells[cells.length - 1];

    if (amountCell) {
      const text = amountCell.textContent?.replace(/[¥,]/g, "").trim();
      const amount = Number.parseInt(text || "0", 10);
      totalAmount += amount;
    }
  }

  const container = document.createElement("div");
  parentElement.appendChild(container);

  const root = createRoot(container);
  root.render(<App totalAmount={totalAmount} />);

  chrome.runtime.sendMessage({ badgeText: "" });
}

main();
