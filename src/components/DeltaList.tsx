import { useState } from "react";
import { DeltaResponseObject } from "../model/dashboardApiModel";

interface DeltaListProps {
  delta: DeltaResponseObject | undefined;
  onSelectItem: (item: string) => void;
}

const sanitiseStoreName = (name: string) => {
  return name.replace(/\s/g, "");
};

function DeltaList({ delta, onSelectItem }: DeltaListProps) {
  const [selectedIndex, setSelectedIndex] = useState<string>();
  const stores = delta?.stores;

  const message = stores && stores.length == 0 && <p>No items found</p>;

  return (
    <>
      {message}
      {stores?.map((store, index) => (
        <div key={index}>
          <h3 className="" key={index}>
            <a
              href={`#${sanitiseStoreName(store.name)}`}
              data-bs-toggle="collapse"
            >
              {store.name}
            </a>
          </h3>

          <ul
            className="list-group collapse show"
            id={sanitiseStoreName(store.name)}
          >
            {store.categories.map((category) => (
              <div
                key={
                  sanitiseStoreName(store.name) +
                  sanitiseStoreName(category.name)
                }
              >
                {category.newGames.length === 0 ? (
                  <></>
                ) : (
                  <li
                    className={
                      selectedIndex === category.name
                        ? "list-group-item active"
                        : "list-group-item"
                    }
                  >
                    <h4>
                      <a
                        data-bs-toggle="collapse"
                        href={`#${sanitiseStoreName(store.name) + sanitiseStoreName(category.name)}`}
                      >
                        {category.name}
                      </a>
                    </h4>
                    <ul
                      className="list-group collapse show"
                      onMouseLeave={() => setSelectedIndex(undefined)}
                      id={
                        sanitiseStoreName(store.name) +
                        sanitiseStoreName(category.name)
                      }
                    >
                      {category.newGames.map((game) => (
                        <li
                          className={
                            selectedIndex ===
                            sanitiseStoreName(store.name) + game.id
                              ? "list-group-item active"
                              : "list-group-item"
                          }
                          onClick={() => {
                            setSelectedIndex(
                              sanitiseStoreName(store.name) + game.id,
                            );
                            onSelectItem(
                              sanitiseStoreName(store.name) + game.id,
                            );
                          }}
                          onMouseEnter={() =>
                            setSelectedIndex(
                              sanitiseStoreName(store.name) + game.id,
                            )
                          }
                          key={sanitiseStoreName(store.name) + game.id}
                        >
                          {game.boxName} - £{game.sellPrice}
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
              </div>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export default DeltaList;
