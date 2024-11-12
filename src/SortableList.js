import React, { useEffect, useRef, useState } from 'react';
import Sortable from 'sortablejs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandMagic } from '@fortawesome/free-solid-svg-icons'; // Changed icon to wand magic
import './SortableList.css';

const SortableList = () => {
  const [items, setItems] = useState([
    { image: "/harrypotter.jpg", name: "Harry Potter" },
    { image: "/hermoine.jpeg", name: "Hermione Granger" },
    { image: "/albus.jpeg", name: "Albus Dumbledore" },
    { image: "/snape.jpeg", name: "Severus Snape" }
  ]);

  const [droppedItem, setDroppedItem] = useState(null);
  const [removedItems, setRemovedItems] = useState([]);
  const [lastSwapped, setLastSwapped] = useState(null);
  const [showComponents, setShowComponents] = useState(true);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      const sortable = Sortable.create(listRef.current, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        onEnd: (evt) => {
          const updatedItems = [...items];
          const [movedItem] = updatedItems.splice(evt.oldIndex, 1);
          updatedItems.splice(evt.newIndex, 0, movedItem);

          setItems(updatedItems);  // This updates the order of items correctly
          setDroppedItem(movedItem);

          const swappedItems = [updatedItems[evt.oldIndex], updatedItems[evt.newIndex]];
          setLastSwapped(swappedItems);
        },
      });

      return () => {
        // Cleanup to avoid memory leaks
        sortable.destroy();
      };
    }
  }, [items]);

  const handleRemoveImage = () => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      const removedItem = updatedItems.shift();

      if (removedItem) {
        setRemovedItems((prevRemovedItems) => [removedItem, ...prevRemovedItems]);
      }

      return updatedItems;
    });
  };

  const handleExpectoPatronum = () => {
    setRemovedItems((prevRemovedItems) => {
      if (prevRemovedItems.length > 0) {
        const [restoredItem, ...remainingRemovedItems] = prevRemovedItems;
        setItems((prevItems) => [restoredItem, ...prevItems]);
        return remainingRemovedItems;
      }
      return prevRemovedItems;
    });
  };

  const handleLumus = () => {
    setShowComponents((prevShowComponents) => !prevShowComponents);
  };

  return (
    <div className="sortable-container">
      {/* Change the icon to the wand magic icon */}
      <FontAwesomeIcon
        icon={faWandMagic}  // Updated icon
        className="lumus-icon"
        onClick={handleLumus}
      />

      {showComponents && (
        <>
          <h3>Harry Potter World!!</h3>
          <div ref={listRef} className="sortable-list">
            {items.map((item, index) => (
              <div key={index} className="sortable-item">
                <img src={item.image} alt={`Image ${index + 1}`} className="sortable-image" />
                <div className="image-name">{item.name}</div>
              </div>
            ))}
          </div>
          {droppedItem && (
            <div className="dropped-item-display">
              Last Dropped Image: <img src={droppedItem.image} alt="Dropped" className="dropped-image" />
            </div>
          )}

          {lastSwapped && (
            <div className="last-swapped-display">
              Last Swapped Images:
              <div className="swapped-image-container">
                <img src={lastSwapped[0].image} alt="Swapped 1" className="swapped-image" />
                <img src={lastSwapped[1].image} alt="Swapped 2" className="swapped-image" />
              </div>
            </div>
          )}

          <div className="voldemort-container">
            <img src="/voldemort.jpg" alt="Voldemort" className="voldemort-image" />
            <button className="voldemort-button" onClick={handleRemoveImage}>
              AVADA KEDAVRA!
            </button>
          </div>

          <div className="sorcerers-stone-container">
            <img src="/sorcerers.jpeg" alt="Sorcerer's Stone" className="sorcerers-stone-image" />
            <button className="expecto-patronum-button" onClick={handleExpectoPatronum}>
              Sorcerer's Stone
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SortableList;
