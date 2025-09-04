import React, { useState } from "react";

const TodaySchedule = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, { 
        id: Date.now(), 
        content: newNote, 
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }]);
      setNewNote("");
      setIsAdding(false);
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-blue-100 h-full">
      <h3 className="text-2xl font-bold text-blue-900 mb-6">Important Notes</h3>
      
      {/* Add Note Button */}
      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mb-4 hover:bg-blue-700 transition-colors font-semibold"
        >
          + Add New Note
        </button>
      )}
      
      {/* Add Note Form */}
      {isAdding && (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Type your important note here..."
            className="w-full border border-gray-300 p-3 rounded-md mb-3 resize-none"
            rows="3"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={addNote}
              className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewNote("");
              }}
              className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {/* Notes List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No notes yet. Click "Add New Note" to create your first note.
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative group"
            >
              <p className="text-gray-800 whitespace-pre-wrap">{note.content}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">{note.timestamp}</span>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-red-500 hover:text-red-700 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodaySchedule;