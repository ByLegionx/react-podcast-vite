import React, { useEffect, useState } from 'react';

import { useFetchSongs } from '../../podcast/helpers/useFetchSongs';
import { useAppContext } from '../../context/ContextProvider';

import { PodCastCard } from '../../songs/components/PodCastCard';
import { PodCaster } from '../../songs/components/PodCaster';

export const ActualView = () => {
  const { contextState, setContextState } = useAppContext();
  const { allSongsList } = useFetchSongs();
  const [searchText, setSearchText] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    setContextState({
      ...contextState,
      AllPodCasts: allSongsList,
      Loading: false
    });
  }, [allSongsList]);

  const onHandleInputChange = event => {
    const { value } = event.target;
    setSearchText(value.toLowerCase());
  };

  useEffect(() => {
    const filteredList = allSongsList.filter(podcast => {
      const label = podcast['im:name']['label'].toLowerCase();
      const author = podcast['im:artist']['label'].toLowerCase();
      return label.includes(searchText) || author.includes(searchText);
    });
    setFilteredList(filteredList);
  }, [allSongsList, searchText]);

  return (
    <>
      <div className="container">
        <PodCaster />
        <div className="search-container">
          <div className="number-search">
            <div className="both-entries">
              <div className="search-result-count">{filteredList.length}</div>
              <div>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Filter podcast..."
                  value={searchText}
                  onChange={onHandleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fourSongs">
          <div data-testid="songs-container" className="songs-container">
            {filteredList.map(song => (
              <PodCastCard key={song['id']['attributes']['im:id']} {...song} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
