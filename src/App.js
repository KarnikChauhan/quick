import React from 'react';
import KanbanBoard from './components/KanbanBoard';

const App = () => {
    return (
        <div className="app">
            <h1>Kanban Board</h1>
            <KanbanBoard />
        </div>
    );
};

export default App;
