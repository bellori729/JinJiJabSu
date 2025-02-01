import React, { useEffect, useState } from "react";
import BodyContainer from "../../templates/BodyContainer";
import axios from "axios";
import { API_KEY, API_URL } from "../../../lib/api/apj";

const Home = () => {
  useEffect(() => {
    const data = fetchData();

    data.then((response) => {
      console.log(response);

      getListTotalCount(response);
      getList(response);
    });
  }, []);

  const fetchData = async () => {
    const data = {
      KEY: API_KEY,
      Type: "json",
      pIndex: 1,
      pSize: 10,
    };
    try {
      const response = (
        await axios.get(API_URL, {
          params: data,
        })
      ).data.OdsnFreemlsvM;

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  // 총 결과 수
  const [listTotalCount, setListTotalCount] = useState(0);

  const getListTotalCount = (data) => {
    const listTotalCount = data[0].head[0].list_total_count;

    setListTotalCount(listTotalCount);
  };

  // 리스트
  const [list, setList] = useState([]);

  const getList = (data) => {
    const list = data[1].row;

    setList(list);
  };

  return (
    <BodyContainer>
      <div>총 결과 {listTotalCount}</div>
      <ul>
        {list.map((item) => (
          <li key={item.MANAGE_INST_TELNO}>{item.FACLT_NM}</li>
        ))}
      </ul>
    </BodyContainer>
  );
};

export default Home;
