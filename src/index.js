import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Notes() {
  // State variables for the note input and the list of notes
  const [note, setNote] = useState('');
  const [notesList, setNotesList] = useState([]);

  // Function to add a new note to the list
  function addList(event) {
    event.preventDefault();
    // Adding a new note object to the notesList array with default properties
    setNotesList([...notesList, { note, isChecked: false, isDeleted: false }]);
    setNote('');
  }

  // Function to delete a note from the list
  function deleteItem(index) {
    setNotesList(prevList => {
      const updatedList = [...prevList];
      // Marking the note as deleted by setting the 'isDeleted' property to true
      updatedList[index].isDeleted = true;
      setTimeout(() => {
        // Removing the deleted notes from the list after a delay of 1 second
        setNotesList(updatedList.filter(item => !item.isDeleted));
      }, 1000); // Delay the removal for 1 second
      return updatedList;
    });
  }

  // Function to handle checkbox toggle
  function handleBoxChange(index) {
    setNotesList(prevList => {
      const updatedList = [...prevList];
      // Toggling the 'isChecked' property of the note
      updatedList[index].isChecked = !updatedList[index].isChecked;
      return updatedList;
    });
  }

  return (
    <div style={{ margin: '20px', alignItems: 'center' }}>
      {/* Navigation */}
      <nav style={{ backgroundColor: 'black', color: 'white', padding: '10px', alignItems: 'center', textAlign: 'center' }}>
        <a style={{ color: 'white', textDecoration: 'none', alignItems: 'center' }} href="#"><b>To - Do - List</b></a>
      </nav>
      <div style={{ marginTop: '20px' }}>
        {/* Form to add new notes */}
        <form onSubmit={addList}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your tasks"
              style={{ width: '300px' }}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <button className="btn btn-primary" style={{ marginLeft: '10px' }} type="submit">(+) Add New Note</button>
          </div>
        </form>
        <br />
        <br />
        {/* List of notes */}
        <ul className="list-group" style={{ listStyle: 'none', padding: '0' }}>
          {notesList.map((item, index) => (
            <li className="list-group-item" key={index} style={{ backgroundColor: item.isDeleted ? 'red' : item.isChecked ? 'green' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={() => handleBoxChange(index)}
                  style={{ marginRight: '20px' }}
                />
                <p style={{ color: item.isDeleted ? 'white' : item.isChecked ? 'white' : 'black' }}>{item.note}</p>
              </div>
              <span className="badge">
                <button className="btn btn-danger" style={{ backgroundColor: 'red', color: 'white', border: 'none' }} onClick={() => deleteItem(index)}>Delete</button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Notes />);
