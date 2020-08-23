import React from "react";
import { PieChart, Pie, Cell, Label } from "recharts";

interface MedicationCost {
  id: string;
  name: string;
  cost: number;
}

interface MedicationCostChartProps {
  data?: MedicationCost[];
}

const COLORS = ["#003f5c", "#58508d", "#bc5090", "#ff6361", "#ffa600"];

export const MedicationCostChart: React.FC<MedicationCostChartProps> = ({
  data,
}) => {
  const renderLabel = (entry: MedicationCost) =>
    `${entry.name} (${entry.cost})`;
  const total = data.reduce((starter, item) => (starter += item.cost), 0);
  return (
    <PieChart width={730} height={250}>
      <Pie
        data={data}
        dataKey="cost"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        innerRadius={50}
        label={true}
        renderLabel={renderLabel}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
            renderLabel={renderLabel}
          />
        ))}
        <Label value={`Total: $${total}`} position="center" />
      </Pie>
    </PieChart>
  );
};

export default MedicationCostChart;
