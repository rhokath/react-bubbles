import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth} from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, getData }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };
  //shared state solution for put request, otherwise can just make another get request with getData
  const newestColor = editedColor => {
    updateColors(colors.map(color => (
      color.id === editedColor.id ? editedColor : color
    )));
  }

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      console.log(res)
      // getData()
      newestColor(res.data)
      setColorToEdit(initialColor)
    })
    .catch(err => console.log("there was an error in put", err))
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };
  
  const addColor = (newColor)=> {
    axiosWithAuth().post("http://localhost:5000/api/colors/", newColor)
    .then(res => {
      console.log("res in the post", res)
      updateColors(res.data)
    })
    .catch(err => console.log("there was an err in post", err))
  }
  const handleSubmit = e => {
    e.preventDefault()
    addColor(newColor);
    
  
    
  }

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res => {
      console.log(res)
      const updatedArray = colors.filter(color => color.id !== res.data)
      updateColors(updatedArray)
    })
    .catch(err => console.log("there was an error in delete", err.response))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e => {console.log(e.target.value)
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }}
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <form onSubmit={handleSubmit}>
        <legend>add new color</legend>
        <label>
          new color
        <input 
        type="text"
        name="name"
        onChange={ e => { e.preventDefault()
          setNewColor({ ...newColor, color: e.target.value })}}
        value={newColor.color}
        />
        </label>
        <label>
          hex code:
          <input 
          type="text"
          name="hex"
          onChange={e => { e.preventDefault()
            setNewColor({...newColor, code: { hex: e.target.value}})}}
          value={newColor.code.hex}
          />
        </label>
        <button>add new color</button>
      </form>
    </div>
  );
};

export default ColorList;
