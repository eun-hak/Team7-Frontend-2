"use client";
import styled from "@emotion/styled";
import BackgroundAll from "@/public/background-all.svg";
import Background1 from "@/public/background-1.svg";
import Background2 from "@/public/background-2.svg";
import Background3 from "@/public/background-3.svg";
import Background4 from "@/public/background-4.svg";
import Background5 from "@/public/background-5.svg";
import Background6 from "@/public/background-6.svg";
import { useQuery } from "@tanstack/react-query";
import Feed from "@/api/Feed";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getStorage } from "@/util/loginStorage";
import Interection from "@/api/Interection";
import Notification from "@/api/Notification";
interface BackgroundColors {
  [key: string]: string;
}

interface BackgroundImages {
  [key: string]: string;
}

const Body = () => {
  const interection = Interection();
  const { notification_get } = Notification();
  const feed = Feed();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("value") || "";
  const memberId = getStorage("member")?.replace(/\"/gi, "");
  const [refetchcache, setRefetchcache] = useState();
  const clapfeed = 1;
  // const value = "고음괴물";

  const { data: all } = useQuery(
    ["feed", searchValue],
    () => feed.all(searchValue),
    {}
  );

  // refetchOnMount: true, // 처음 마운트될 때 자동으로 다시 불러오기
  const { data: myfeed } = useQuery(
    ["myfeed", memberId],
    () => feed.myfeed(memberId),
    { staleTime: 0, cacheTime: 0 }
  );

  const { data: myclapfeed } = useQuery(
    ["myclapfeed", clapfeed],
    () => interection.Interection_check(),
    { staleTime: 0, cacheTime: 0 }
  );
  const { data: notice } = useQuery(["notice"], () => notification_get(), {
    staleTime: 0,
    cacheTime: 0,
  });
  return { all, myfeed, myclapfeed, notice };
};

export default Body;
