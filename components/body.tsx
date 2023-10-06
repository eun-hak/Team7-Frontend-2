"use client";
import { useQuery } from "@tanstack/react-query";
import Feed from "@/api/Feed";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { getStorage } from "@/util/loginStorage";
import Interection from "@/api/Interection";
import Notification from "@/api/Notification";
const Body = () => {
  const interection = Interection();
  const notification = Notification();
  const feed = Feed();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("value") || "";
  const memberId = getStorage("member")?.replace(/\"/gi, "");
  const [refetchcache, setRefetchcache] = useState();
  const clapfeed = 1;
  const noticefeed = 1;
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

  const { data: notice } = useQuery(
    ["notice", noticefeed],
    () => notification.notification_get(),
    {
      staleTime: 0,
      cacheTime: 0,
    }
  );
  return { all, myfeed, myclapfeed, notice };
};

export default Body;
