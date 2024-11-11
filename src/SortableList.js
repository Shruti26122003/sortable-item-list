// SortableList.js
import React, { useEffect, useRef, useState } from 'react';
import Sortable from 'sortablejs';
import './SortableList.css';

const SortableList = () => {
  const [items, setItems] = useState([
    { image: "/harrypotter.jpg", name: "Harry Potter" },
    { image: "/hermoine.jpeg", name: "Hermione Granger" },
    { image: "/albus.jpeg", name: "Albus Dumbledore" },
    { image: "/snape.jpeg", name: "Severus Snape" }
  ]);

  const [droppedItem, setDroppedItem] = useState(null);
  const [removedItems, setRemovedItems] = useState([]); // State to store removed items
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      Sortable.create(listRef.current, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        onEnd: (evt) => {
          const updatedItems = [...items];
          const [movedItem] = updatedItems.splice(evt.oldIndex, 1);
          updatedItems.splice(evt.newIndex, 0, movedItem);

          setItems(updatedItems);
          setDroppedItem(movedItem);
        },
      });
    }
  }, [items]);

  // Function to remove the first image from the list when the button is clicked
  const handleRemoveImage = () => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      const removedItem = updatedItems.shift(); // Removes the first item

      if (removedItem) {
        setRemovedItems((prevRemovedItems) => [removedItem, ...prevRemovedItems]); // Add to removedItems
      }

      return updatedItems;
    });
  };

  // Function for restoring the last removed image
  const handleExpectoPatronum = () => {
    setRemovedItems((prevRemovedItems) => {
      if (prevRemovedItems.length > 0) {
        const [restoredItem, ...remainingRemovedItems] = prevRemovedItems;
        setItems((prevItems) => [restoredItem, ...prevItems]); // Add to top of items
        return remainingRemovedItems; // Update removedItems without restored item
      }
      return prevRemovedItems;
    });
  };

  return (
    <div className="sortable-container">
      <h3>Harry Potter World!!</h3>
      <div ref={listRef} className="sortable-list">
        {items.map((item, index) => (
          <div key={index} className="sortable-item">
            <img src={item.image} alt={`Image ${index + 1}`} className="sortable-image" />
            <div className="image-name">{item.name}</div> {/* Display name below image */}
          </div>
        ))}
      </div>
      {droppedItem && (
        <div className="dropped-item-display">
          Last Dropped Image: <img src={droppedItem.image} alt="Dropped" className="dropped-image" />
        </div>
      )}

      {/* Voldemort image positioned on the right side */}
      <div className="voldemort-container">
        <img src="/voldemort.jpg" alt="Voldemort" className="voldemort-image" />
        <button className="voldemort-button" onClick={handleRemoveImage}>
          AVADA KEDAVRA!
        </button>
      </div>

      {/* Sorcerer's Stone image and button positioned on the left side */}
      <div className="sorcerers-stone-container">
        <img src="/sorcerers.jpeg" alt="Sorcerer's Stone" className="sorcerers-stone-image" />
        <button className="expecto-patronum-button" onClick={handleExpectoPatronum}>
          Sorcerer's Stone
        </button>
      </div>
    </div>
  );
};

export default SortableList;
