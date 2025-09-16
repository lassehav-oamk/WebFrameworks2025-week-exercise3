import { useState, ChangeEvent } from "react";

type Props = {
  priceOfSingleVMPerHour: number;
};

function formatNumber(n: number): string {
  // Avoid floating point artifacts and strip unnecessary trailing zeros
  const rounded = Number(n.toFixed(10));
  return rounded.toString();
}

export default function CostCalculator({ priceOfSingleVMPerHour }: Props) {
  const [vmInput, setVmInput] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVmInput(e.target.value);
  };

  const vmCount = Number(vmInput);
  const count = Number.isFinite(vmCount) && vmCount > 0 ? vmCount : 0;

  const costPerHour = count * priceOfSingleVMPerHour;
  const costPerDay = costPerHour * 24;
  const costPerMonth = costPerDay * 30;
  const costPerYear = costPerHour * 8760; // 365 days

  return (
    <div>
      <h1>VM Cost Calculator</h1>
      <label htmlFor="vmNumber">Number of VMs</label>
      <input
        type="text"
        id="vmNumber"
        placeholder="Number of VMs"
        value={vmInput}
        onChange={handleChange}
      />
      <div>
        <p>Cost per hour: {formatNumber(costPerHour)}</p>
        <p>Cost per day: {formatNumber(costPerDay)}</p>
        <p>Cost per month: {formatNumber(costPerMonth)}</p>
        <p>Cost per year: {formatNumber(costPerYear)}</p>
      </div>
    </div>
  );
}
