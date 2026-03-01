import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  { date: '2022-11', 'GPT-5.3 Codex': 9 },
  { date: '2023-03', 'GPT-5.3 Codex': 13, 'Claude Opus 4.6 Adaptive': 7 },
  { date: '2023-05', 'Gemini 3.1 Pro Preview': 9 },
  { date: '2023-07', 'Claude Opus 4.6 Adaptive': 9 },
  { date: '2023-09', 'GLM-5': 7 },
  { date: '2023-11', 'GPT-5.3 Codex': 14, 'Grok 4.1 Fast Reasoning': 8 },
  { date: '2023-12', 'Gemini 3.1 Pro Preview': 10, 'DeepSeek-R1': 8 },
  { date: '2024-03', 'Claude Opus 4.6 Adaptive': 12 },
  { date: '2024-05', 'GPT-5.3 Codex': 15, 'Gemini 3.1 Pro Preview': 12, 'DeepSeek-V3.2 Reasoning': 10, 'DeepSeek-R1': 9, 'GLM-5': 9 },
  { date: '2024-06', 'Claude Opus 4.6 Adaptive': 14, 'GLM-5': 11 },
  { date: '2024-07', 'Grok 4.1 Fast Reasoning': 10 },
  { date: '2024-08', 'DeepSeek-R1': 12 },
  { date: '2024-09', 'GPT-5.3 Codex': 19, 'Gemini 3.1 Pro Preview': 16, 'GLM-5': 15, 'Grok 4.1 Fast Reasoning': 12 },
  { date: '2024-10', 'GPT-5.3 Codex': 24, 'Claude Opus 4.6 Adaptive': 19 },
  { date: '2024-11', 'DeepSeek-V3.2 Reasoning': 16 },
  { date: '2024-12', 'GPT-5.3 Codex': 31 },
  { date: '2025-01', 'Gemini 3.1 Pro Preview': 20, 'DeepSeek-R1': 16, 'GLM-5': 16 },
  { date: '2025-02', 'Claude Opus 4.6 Adaptive': 30 },
  { date: '2025-03', 'DeepSeek-R1': 22, 'GLM-5': 20, 'Grok 4.1 Fast Reasoning': 19, 'Kimi k2.5': 19, 'DeepSeek-V3.2 Reasoning': 19 },
  { date: '2025-05', 'GPT-5.3 Codex': 38, 'Claude Opus 4.6 Adaptive': 39, 'Gemini 3.1 Pro Preview': 25, 'Grok 4.1 Fast Reasoning': 22, 'DeepSeek-V3.2 Reasoning': 22 },
  { date: '2025-06', 'GPT-5.3 Codex': 41, 'DeepSeek-R1': 27, 'MiniMax-m2.5': 24 },
  { date: '2025-07', 'Gemini 3.1 Pro Preview': 35, 'GLM-5': 25, 'Grok 4.1 Fast Reasoning': 27, 'Kimi k2.5': 22 },
  { date: '2025-08', 'GPT-5.3 Codex': 45 },
  { date: '2025-09', 'DeepSeek-R1': 29, 'Grok 4.1 Fast Reasoning': 34, 'Kimi k2.5': 31, 'DeepSeek-V3.2 Reasoning': 25 },
  { date: '2025-10', 'Claude Opus 4.6 Adaptive': 43, 'Kimi k2.5': 41, 'MiniMax-m2.5': 26, 'GLM-5': 28 },
  { date: '2025-11', 'GPT-5.3 Codex': 48, 'Gemini 3.1 Pro Preview': 48, 'DeepSeek-R1': 33, 'MiniMax-m2.5': 36, 'GLM-5': 33, 'Grok 4.1 Fast Reasoning': 41 },
  { date: '2025-12', 'GPT-5.3 Codex': 51, 'Claude Opus 4.6 Adaptive': 49, 'DeepSeek-R1': 42, 'Kimi k2.5': 42 },
  { date: '2026-01', 'MiniMax-m2.5': 40, 'GLM-5': 40, 'DeepSeek-V3.2 Reasoning': 42 },
  { date: '2026-02', 'Kimi k2.5': 47, 'Gemini 3 Pro': 45 },
  { date: '2026-03', 'GPT-5.3 Codex': 54, 'Gemini 3.1 Pro Preview': 57, 'Gemini 3 Pro': 52, 'DeepSeek-R1': 50, 'Kimi k2.5': 50, 'MiniMax-m2.5': 43, 'GLM-5': 45, 'DeepSeek-V3.2 Reasoning': 48 },
];

const formatXAxis = (tickItem: string) => {
  const [year, month] = tickItem.split('-');
  const shortYear = year.slice(2);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month) - 1]} '${shortYear}`;
};

export default function IntelligenceChart() {
  const [hiddenLines, setHiddenLines] = useState<Record<string, boolean>>({});

  const toggleLine = (dataKey: string) => {
    setHiddenLines(prev => ({
      ...prev,
      [dataKey]: !prev[dataKey]
    }));
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
        {payload.map((entry: any, index: number) => {
          const isHidden = hiddenLines[entry.dataKey];
          return (
            <li 
              key={`item-${index}`} 
              style={{ 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                opacity: isHidden ? 0.4 : 1,
                transition: 'opacity 0.2s ease'
              }}
              onClick={() => toggleLine(entry.dataKey)}
            >
              <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: entry.color, borderRadius: '2px' }}></span>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px' }}>{entry.value}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="w-full h-full min-h-[500px] bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 40, left: 10, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={true} />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatXAxis}
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
            dy={15}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            domain={[0, 65]} 
            ticks={[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65]}
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
            label={{ value: 'Artificial Analysis Intelligence Index', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.7)', dy: 100 }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0a0f1c', borderColor: 'rgba(0,255,204,0.3)', borderRadius: '8px' }}
            itemStyle={{ color: '#fff' }}
            labelFormatter={formatXAxis}
          />
          <Legend 
            verticalAlign="top" 
            content={renderLegend}
          />
          
          <Line hide={hiddenLines['Claude Opus 4.6 Adaptive']} type="stepAfter" dataKey="Claude Opus 4.6 Adaptive" stroke="#d97757" strokeWidth={3} dot={{ r: 4, fill: '#d97757' }} connectNulls />
          <Line hide={hiddenLines['DeepSeek-R1']} type="stepAfter" dataKey="DeepSeek-R1" stroke="#1d4ed8" strokeWidth={3} dot={{ r: 4, fill: '#1d4ed8' }} connectNulls />
          <Line hide={hiddenLines['DeepSeek-V3.2 Reasoning']} type="stepAfter" dataKey="DeepSeek-V3.2 Reasoning" stroke="#60a5fa" strokeWidth={3} dot={{ r: 4, fill: '#60a5fa' }} connectNulls />
          <Line hide={hiddenLines['Gemini 3.1 Pro Preview']} type="stepAfter" dataKey="Gemini 3.1 Pro Preview" stroke="#34a853" strokeWidth={3} dot={{ r: 4, fill: '#34a853' }} connectNulls />
          <Line hide={hiddenLines['Gemini 3 Pro']} type="stepAfter" dataKey="Gemini 3 Pro" stroke="#a8d08d" strokeWidth={3} dot={{ r: 4, fill: '#a8d08d' }} connectNulls />
          <Line hide={hiddenLines['GLM-5']} type="stepAfter" dataKey="GLM-5" stroke="#ff6600" strokeWidth={3} dot={{ r: 4, fill: '#ff6600' }} connectNulls />
          <Line hide={hiddenLines['GPT-5.3 Codex']} type="stepAfter" dataKey="GPT-5.3 Codex" stroke="#ffffff" strokeWidth={3} dot={{ r: 4, fill: '#000', stroke: '#fff', strokeWidth: 2 }} connectNulls />
          <Line hide={hiddenLines['Grok 4.1 Fast Reasoning']} type="stepAfter" dataKey="Grok 4.1 Fast Reasoning" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} connectNulls />
          <Line hide={hiddenLines['Kimi k2.5']} type="stepAfter" dataKey="Kimi k2.5" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, fill: '#0ea5e9' }} connectNulls />
          <Line hide={hiddenLines['MiniMax-m2.5']} type="stepAfter" dataKey="MiniMax-m2.5" stroke="#ff00aa" strokeWidth={3} dot={{ r: 4, fill: '#ff00aa' }} connectNulls />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
