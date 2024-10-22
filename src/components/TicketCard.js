import React from 'react';

const TicketCard = ({ ticket }) => {
    return (
        <div className={`ticket-card priority-${ticket.priority}`}>
            <h4>{ticket.title}</h4>
            <p>Status: {ticket.status}</p>
            <p>Priority: {ticket.priority}</p>
            <p>Assigned User: {ticket.user}</p>
        </div>
    );
};

export default TicketCard;
