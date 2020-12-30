import React, { useState, useEffect } from "react";

function useSubscription(selectData) {
  const [data, setData] = useState(null);

  function handleChange() {
    setData(selectData(DataSource, this.props));
  }

  useEffect(() => {
    DataSource.addChangeListener(this.handleChange);
    return () => {
      DataSource.removeChangeListener(this.handleChange);
    };
  });

  return data;
}