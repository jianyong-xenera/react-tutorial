import React, { useState, useEffect } from "react";

//DataSource数据源

function useSubscription(props) {
    const [data, setData] = useState(null);
    function handleChange(status) {
        setData(DataSource, status);
      }
    useEffect(() => {
        DataSource.addChangeListener(setData,handleChange);
        return () => {
            DataSource.removeChangeListener(setData,handleChange);
        };
    });
    return data
  }