import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TicketCard from './TicketCard';

const KanbanBoard = () => {
    const [tickets, setTickets] = useState([]);
    const [groupBy, setGroupBy] = useState('status'); // Default grouping by status
    const [sortBy, setSortBy] = useState('title'); // Default sorting by title

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
                setTickets(response.data.tickets || []);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    // Grouping logic
    const groupTickets = () => {
        if (groupBy === 'status') {
            return tickets.reduce((groups, ticket) => {
                (groups[ticket.status] = groups[ticket.status] || []).push(ticket);
                return groups;
            }, {});
        } else if (groupBy === 'user') {
            return tickets.reduce((groups, ticket) => {
                (groups[ticket.user] = groups[ticket.user] || []).push(ticket);
                return groups;
            }, {});
        } else {
            return tickets.reduce((groups, ticket) => {
                const priority = ticket.priority;
                (groups[priority] = groups[priority] || []).push(ticket);
                return groups;
            }, {});
        }
    };

    const sortTickets = (groupedTickets) => {
        const sortedGroups = {};
        for (const group in groupedTickets) {
            sortedGroups[group] = groupedTickets[group].sort((a, b) => {
                if (sortBy === 'priority') {
                    return b.priority - a.priority; // Descending order
                }
                return a.title.localeCompare(b.title); // Ascending order
            });
        }
        return sortedGroups;
    };

    const groupedTickets = groupTickets();
    const sortedGroupedTickets = sortTickets(groupedTickets);

    return (
        <div>
            <div className="controls">
                <label>Group By:</label>
                <select onChange={(e) => setGroupBy(e.target.value)}>
                    <option value="status">Status</option>
                    <option value="user">User</option>
                    <option value="priority">Priority</option>
                </select>

                <label>Sort By:</label>
                <select onChange={(e) => setSortBy(e.target.value)}>
                    <option value="title">Title</option>
                    <option value="priority">Priority</option>
                </select>
            </div>

            <div className="kanban">
                {Object.keys(sortedGroupedTickets).map((group) => (
                    <div key={group} className="kanban-group">
                        <h2>{group}</h2>
                        <div className="ticket-list">
                            {sortedGroupedTickets[group].map(ticket => (
                                <TicketCard key={ticket.id} ticket={ticket} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KanbanBoard;
