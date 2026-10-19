import { useState } from "react";
import { ItemObject } from "../model/dashboardApiModel";

interface ItemListProps {
  items?: ItemObject[];
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, onSelectItem }: ItemListProps) {
  const [selectedIndex, setSelectedIndex] = useState<string>();

  const message = items && items?.length === 0 && <p>No items found</p>;

  return (
    <>
      {message}
      <ul
        className="list-group"
        onMouseLeave={() => setSelectedIndex(undefined)}
      >
        {items?.map((item, index) => (
          <li
            className={
              selectedIndex === item.id
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item.id}
            onClick={() => {
              setSelectedIndex(item.id);
              onSelectItem(item.boxName);
            }}
            onMouseEnter={() => setSelectedIndex(item.id)}
          >
            {item.boxName}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
