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
interface BackgroundColors {
  [key: string]: string;
}

interface BackgroundImages {
  [key: string]: string;
}

const Body = () => {
  const interection = Interection();
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

  // useEffect(() => {
  //   refetch();
  // }, [memberId, searchValue]);
  return { all, myfeed, myclapfeed };
};

export default Body;

// const FeedList = ({ filteredData, selectedBackgroundColor, interaction, handleInteraction, clicked, SelectedBackgroundImage }) => {
//   return (
//     <FeedListContainer backgroundColor={selectedBackgroundColor}>
//       <FeedListWrapper>
//         <ul className="grid gird gap-3 pt-3 overflow-y-hidden h-[50vh]" style={{overflow: 'scroll', scrollSnapType: 'y mandatory', gridTemplateRows: '1fr auto'}}>
//           {filteredData.map((item) => (
//             <FeedListItem style={{scrollSnapAlign: 'start'}}>
//               <FeedItemContainer key={item.feedId}>
//                 <div className="flex justify-between items-center mb-2">
//                   <div className="block sm:flex">
//                     <div className="text-lg font-bold">{item.feedName}</div>
//                   </div>
//                   <InteractionButtonContainer>
//                     <InteractionButton clicked={clicked} onClick={handleInteraction}>👏🏻</InteractionButton>
//                   </InteractionButtonContainer>
//                 </div>
//                 {/* Other feed details */}
//               </FeedItemContainer>
//             </FeedListItem>
//           ))}
//         </ul>
//         <StyledBackgroundImage />
//       </FeedListWrapper>
//     </FeedListContainer>
//   );
// };

// export default FeedList;

// const FeedListContainer = styled.div<{backgroundColor : string}>`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   height: 100%;
//   padding-top: 2rem;
//   z-index: 1;
//   background-color: ${props => props.backgroundColor};
// `;

// const FeedListWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   height: 100%;
//   margin-top: 1rem;
//   position: relative;
// `;

// const FeedListItem = styled.li`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   height: 175px;
//   scroll-snap-align: start;
// `;

// const FeedItemContainer = styled.div`
//   background-color: white;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   border-radius: 10px;
//   padding: 1rem;
//   width: 80%;
// `;

// const InteractionButtonContainer = styled.div`
//   border: 2px solid gray;
//   border-radius: 10px;
//   transition: all 0.3s;
//   &:hover {
//     cursor: pointer;
//     background-color: #651FFF;
//     border-color: #651FFF;
//   }
// `;

// const InteractionButton = styled.button`
//   padding: 0.5rem 1rem;
//   ${props => props.clicked ? 'animation: ping 1s infinite;' : ''}
// `;

// const StyledBackgroundImage = styled.div`
//   position: absolute;
//   inset: 0;
//   width: 100%;
//   height: 100%;
//   z-index: -1;
//   /* Add background image styles here */
// `;
