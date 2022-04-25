import React from 'react';

function onScrollList(event) {
  const scrollBottom = event.target.scrollTop + 
        event.target.offsetHeight == event.target.scrollHeight;

    if (scrollBottom) {
      loadContent(); //API method
    }
  }


function DataList() {
  return (
    <div onScroll={event => onScrollList(event)}>
      {props.children}
    </div>
  );
}

export default DataList;