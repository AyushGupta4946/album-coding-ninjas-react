import  { useState, useEffect } from "react";
import axios from "axios";
import './AlbumManager.css'

const AlbumManager = () => {
  const [albums, setAlbums] = useState([]);
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [updateAlbumId, setUpdateAlbumId] = useState("");
  const [updateAlbumTitle, setUpdateAlbumTitle] = useState("");

  useEffect(() => {
    // Fetch albums from the API
    axios.get("https://jsonplaceholder.typicode.com/albums")
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error("Error fetching albums:", error);
      });
  }, []);

  const addAlbum = () => {
    // Make a POST request to add a new album (dummy request)
    axios
      .post("https://jsonplaceholder.typicode.com/albums", {
        title: newAlbumTitle,
        userId: 1, // You can set a user ID as needed
      })
      .then((response) => {
        setAlbums([...albums, response.data]);
        setNewAlbumTitle("");
      })
      .catch((error) => {
        console.error("Error adding album:", error);
      });
  };

  const updateAlbum = () => {
    axios
      .put(`https://jsonplaceholder.typicode.com/albums/${updateAlbumId}`, {
        id: parseInt(updateAlbumId),
        title: updateAlbumTitle,
        userId: 1,
      })
      .then(() => {
        const updatedAlbums = albums.map((album) =>
          album.id === parseInt(updateAlbumId)
            ? { ...album, title: updateAlbumTitle }
            : album
        );
        setAlbums(updatedAlbums);
        setUpdateAlbumId("");
        setUpdateAlbumTitle("");
      })
      .catch((error) => {
        console.error("Error updating album:", error);
      });
  };

  const deleteAlbum = (id) => {
    // Make a DELETE request to delete an album (dummy request)
    axios
      .delete(`https://jsonplaceholder.typicode.com/albums/${id}`)
      .then(() => {
        const updatedAlbums = albums.filter((album) => album.id !== id);
        setAlbums(updatedAlbums);
      })
      .catch((error) => {
        console.error("Error deleting album:", error);
      });
  };

  return (
    <div className="container">
      <h1>Album Manager</h1>
      <div className="albums">
        <h2>Albums</h2>
        <ul>
          {albums.map((album) => (
            <li key={album.id} className="album">
                <div>
                <span>{album.id} </span>    
              {album.title}
              </div>
              <button onClick={() => deleteAlbum(album.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="add-album">
        <h2>Add Album</h2>
        <input
          type="text"
          placeholder="Album Title"
          value={newAlbumTitle}
          onChange={(e) => setNewAlbumTitle(e.target.value)}
        />
        <button onClick={addAlbum}>Add Album</button>
      </div>
      <div className="update-album">
        <h2>Update Album</h2>
        <input
          type="number"
          placeholder="Album ID"
          value={updateAlbumId}
          onChange={(e) => setUpdateAlbumId(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Title"
          value={updateAlbumTitle}
          onChange={(e) => setUpdateAlbumTitle(e.target.value)}
        />
        <button onClick={updateAlbum}>Update Album</button>
      </div>
    </div>
  );
};

export default AlbumManager;
