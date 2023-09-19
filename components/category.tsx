"use client";
import styled from "@emotion/styled";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const category = [
  "전체",
  "고음괴물",
  "화음귀신",
  "힙합전사",
  "하이라이트도둑",
  "소몰이대장",
  "삑사리요정",
  "기타",
];

interface BackgroundColors {
  [key: string]: string;
}

const backgroundColors: BackgroundColors = {
  전체: "black",
  고음괴물: "#E40C0C",
  화음귀신: "#E4F0F5",
  힙합전사: "#15B28D",
  하이라이트도둑: "#2962FF",
  소몰이대장: "#795548",
  삑사리요정: "#FF5CBE",
  기타: "black",
};

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0;

  white-space: nowrap;
  overflow-x: scroll; /* This hides horizontal scroll */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer, Edge */
  ::-webkit-scrollbar {
    width: 0.5em; /* Chrome, Safari, Opera */
  }
  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  justify-content: flex-start;
`;

//여기 useref이용해서 focus 바꾸기
const CategoryButton = styled.button<{
  backgroundColor: string;
  color: string;
}>`
  padding: 0.5rem 1rem;
  margin: 24px 4px;
  border-radius: 23px;
  font-size: 16px;
  text-align: center;

  font-weight: 500;
  cursor: default;
  /* background-color: #00000080; */
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  /* transition: background-color 0.3s, color 0.3s; */
  border: none;
  &:hover {
    cursor: default;
    background-color: #706969;
  }
  /* &:active {
    cursor: default;
    background-color: #706969;
    color: black;
  } */
  &:focus {
    cursor: default;
    background-color: white;

    color: black;
  }
`;

// router.navigate('/other-page');

const Category = () => {
  // const handleChange = () => {
  //   if(colorChange.current !== undefined){
  //     colorChange.current.style = "width:300px; height:300px; background:red;"
  //     //4. 해당 ref 이름과 current 를이용해 직접 조정할 수 있다.
  //   }

  // };
  const colorChange = useRef();
  const searchParams = useSearchParams();

  const searchValue = searchParams.get("value") || "";
  const router = useRouter();
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number>(-1); // 선택된 버튼 인덱스
  return (
    <CategoryWrapper>
      {category.map((item, index) => (
        <CategoryButton
          backgroundColor={
            selectedButtonIndex === index ? "white" : "#00000080"
          }
          color={selectedButtonIndex === index ? "black" : "white"}
          key={index}
          onClick={() => {
            router.push(`/main?value=${item}`);
            setSelectedButtonIndex(index);
          }}
        >
          {item}
        </CategoryButton>
      ))}
    </CategoryWrapper>
  );
};

export default Category;
