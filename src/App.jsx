import React, { useState, useMemo } from 'react';
import { Layout } from './components/Layout';
import { DropZone } from './components/DropZone';
import { SmartWidget } from './components/SmartWidget';
import { TaskList } from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('snapdo-tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeFilter, setActiveFilter] = useState('all');

  React.useEffect(() => {
    localStorage.setItem('snapdo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskGenerated = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleTask = (taskId) => {
    setTasks((prev) => {
      const newTasks = prev.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      );
      // Move completed to bottom
      return newTasks.sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
      });
    });
  };

  const filteredTasks = useMemo(() => {
    let filtered = tasks;
    if (activeFilter === 'urgent') {
      filtered = tasks.filter(t => t.priority === 'Urgent' || t.priority === 'High');
    } else if (activeFilter === 'scheduled') {
      // Mock scheduled filter
      filtered = tasks.filter(t => t.effort === 'Deep Work');
    }
    return filtered;
  }, [tasks, activeFilter]);

  return (
    <Layout activeFilter={activeFilter} onFilterChange={setActiveFilter}>
      <div className="max-w-2xl mx-auto">
        <DropZone onTaskGenerated={handleTaskGenerated} />

        {activeFilter === 'all' && tasks.some(t => !t.completed) && (
          <SmartWidget tasks={tasks} />
        )}

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-text mb-4">
            {activeFilter === 'all' ? 'My Tasks' :
              activeFilter === 'urgent' ? 'Urgent & High Priority' : 'Scheduled'}
          </h2>
          <TaskList tasks={filteredTasks} onToggleTask={handleToggleTask} />
        </div>
      </div>
    </Layout>
  );
}

export default App;
