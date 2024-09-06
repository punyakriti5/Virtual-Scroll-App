import React, { useState, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
const axios = require("axios");

const VirtualScroll = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async (start, stop) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://virtual-scroll-app-1.onrender.com/api/items?start=${start}&stop=${stop}`
      );
      // `http://localhost:3001/api/items?start=${start}&stop=${stop}`
      setItems((prevItems) => {
        const newItems = [...prevItems];
        response.data.forEach((item, index) => {
          //placing each fetched item into its correct position in the newItems array.
          newItems[start + index] = item;
        });
        console.log("newItems", newItems);
        return newItems;
      });
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(0, 100);
  }, []);

  const Row = ({ index, style }) => {
    const item = items[index];
    return (
      <div
        style={style}
        className="list-item"
        role="listitem"
        aria-label={item ? `Item ${item.name}` : "Loading item"}
        tabIndex={0} // Makes the row focusable by keyboard
      >
        {item ? (
          <div className="item-content">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="item-image"
              onError={(e) => (e.target.src = "https://via.placeholder.com/50")} // Fallback image
            />
            <span>{item.name}</span>
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    );
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            itemCount={10000}
            itemSize={50}
            width={width}
            outerElementType="ul" // Adds semantic meaning as a list
            role="list" // ARIA role indicating this is a list
            onItemsRendered={({ visibleStartIndex, visibleStopIndex }) => {
              if (!loading) {
                fetchItems(visibleStartIndex, visibleStopIndex);
              }
            }}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
      {loading && (
        <div className="loading-indicator" aria-live="polite">
          Loading...
        </div>
      )}
    </div>
  );
};
export default VirtualScroll;
