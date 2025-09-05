import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig"; // Your axios instance with auth

const TodaySchedule = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch notes from backend
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/notes");
      setNotes(response.data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setError("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  const addNote = async () => {
    if (!newNote.trim()) return;

    try {
      const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      const response = await axiosInstance.post("/api/notes", {
        content: newNote,
        timestamp
      });

      setNotes([response.data.note, ...notes]);
      setNewNote("");
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding note:", error);
      setError("Failed to add note");
    }
  };

  const deleteNote = async (id) => {
    try {
      await axiosInstance.delete(`/api/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
      setError("Failed to delete note");
    }
  };

  const updateNote = async (id, newContent) => {
    try {
      const response = await axiosInstance.put(`/api/notes/${id}`, {
        content: newContent
      });
      
      setNotes(notes.map(note => 
        note._id === id ? response.data.note : note
      ));
    } catch (error) {
      console.error("Error updating note:", error);
      setError("Failed to update note");
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-3xl shadow-xl h-full">
        <h3 className="text-2xl font-bold text-blue-900 mb-6">Important Notes</h3>
        <div className="text-center py-8">Loading notes...</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-blue-100 h-full">
      <h3 className="text-2xl font-bold text-blue-900 mb-6">Important Notes</h3>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
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
            <NoteItem
              key={note._id}
              note={note}
              onDelete={deleteNote}
              onUpdate={updateNote}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Separate component for individual note with edit functionality
const NoteItem = ({ note, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(note.content);

  const handleSave = () => {
    if (editContent.trim() && editContent !== note.content) {
      onUpdate(note._id, editContent);
    }
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative group">
      {isEditing ? (
        <>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md mb-2 resize-none"
            rows="3"
            autoFocus
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">{note.timestamp}</span>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="text-green-600 hover:text-green-800 text-sm"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditContent(note.content);
                }}
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="text-gray-800 whitespace-pre-wrap">{note.content}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">{note.timestamp}</span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-700 text-sm mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(note._id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TodaySchedule;