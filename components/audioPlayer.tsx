"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Center,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { playState } from "@/recoil/recoilstore";
import { usePathname } from "next/navigation";
import Interection from "@/api/Interection";
import Reactquery from "../util/reactquery";

function CustomAudio({ music_data, index, feedId }: any) {
  // const audioRef = useRef(null);
  const path = usePathname();
  const parts = path.split("/"); // 경로를 '/' 문자로 분리
  const lastPart = parts[parts.length - 1]; // 마지막 부분을 가져오기
  const [totalTime, setTotalTime] = useState(0); // 노래의 총 시간을 나타내는 상태 추가
  const [currentTime, setCurrentTime] = useState(0); // 현재 노래의 진행 시간을 나타내는 상태 추가
  const [music, setMusic] = useRecoilState(playState);
  const [play, setPlay] = useState(false); // 재생 상태를 관리하는 상태
  const { Interection_plus } = Interection();
  const { all } = Reactquery();
  const [blobUrl, setBlobUrl] = useState<any>(null);
  const [progress, setProgress] = useState(0); // 오디오의 현재 위치를 나타내는 상태

  // 재생 버튼 클릭 시, play 상태를 토글하고 오디오 재생/일시 정지를 수행합니다.
  const togglePlay = () => {
    setPlay(!play);
  };

  // 다른 오디오 실행시 기존 오디오 멈추기
  const music_play_data = () =>
    all?.map((data: any, index) => {
      const stop_music = document.getElementById(
        `audioElement${data.feedId}`
      ) as HTMLAudioElement;
      stop_music.pause();
    });

  //음악데이터 가져오기
  useEffect(() => {
    if (music_data) {
      const binaryData = atob(music_data);
      const uint8Array = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }
      const blob = new Blob([uint8Array], { type: "audio/mpeg" });
      const newBlobUrl = URL.createObjectURL(blob);
      setBlobUrl(newBlobUrl);
    }
  }, [music_data]);

  // 오디오의 현재 위치를 업데이트하는 함수
  const updateProgress = () => {
    const audioElement = document.getElementById(
      `audioElement${index}`
    ) as HTMLAudioElement;
    const currentTime = audioElement.currentTime;
    const duration = audioElement.duration;
    const calculatedProgress = (currentTime / duration) * 100;
    setProgress(calculatedProgress);
  };

  //조회수 증가
  useEffect(() => {
    if (feedId && totalTime * 0.001 < currentTime) {
      Interection_plus(feedId);
    }
  }, [play]);

  // play 상태가 변경
  useEffect(() => {
    const audioElement = document.getElementById(
      `audioElement${index}`
    ) as HTMLAudioElement;
    if (play) {
      music_play_data();
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }, [play]);

  // 오디오 요소의 currentTime을 기반으로 프로그레스 바 값 업데이트
  useEffect(() => {
    const audioElement = document.getElementById(
      `audioElement${index}`
    ) as HTMLAudioElement;
    audioElement.addEventListener("timeupdate", updateProgress);
    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      audioElement.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  //총 시간
  useEffect(() => {
    const audioElement = document.getElementById(
      `audioElement${index}`
    ) as HTMLAudioElement;
    audioElement.addEventListener("loadedmetadata", () => {
      // 노래의 총 시간을 가져와서 상태에 저장
      setTotalTime(audioElement.duration);
    });
  }, []);

  // 타이머 업데이트
  useEffect(() => {
    const audioElement = document.getElementById(
      `audioElement${index}`
    ) as HTMLAudioElement;
    audioElement.addEventListener("timeupdate", updateProgress);
    const timer = setInterval(() => {
      if (play && currentTime < totalTime) {
        // 재생 중이며, 현재 시간이 총 시간보다 작은 경우에만 타이머를 업데이트
        setCurrentTime(audioElement.currentTime);
      }
    }, 1000); // 1초마다 타이머 업데이트

    // 컴포넌트가 언마운트될 때 이벤트 리스너 및 타이머 정리
    return () => {
      audioElement.removeEventListener("timeupdate", updateProgress);
      clearInterval(timer);
    };
  }, [play, currentTime, totalTime]);
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    //오디오 UI
    <Box>
      <Center>
        {/* Slider를 사용한 프로그레스 바 */}

        <IconButton
          mr={2}
          bg="transparent"
          aria-label="Play"
          onClick={togglePlay}
          colorScheme={play ? "transparent" : "transparent"}
          id={`playButton${index}`} // ID 추가
          icon={
            play ? (
              <img
                src="/stop-arrow.png"
                alt="Stop"
                width="12px"
                height="12px"
              />
            ) : (
              <img
                src="/play-arrow.png"
                alt="Play"
                width="34px"
                height="34px"
              />
            )
          }
        >
          {/* {play ? "일시 정지" : "재생"} */}
        </IconButton>

        {/* 여기서 WARNING */}
        <Slider
          mr={6}
          value={isNaN(progress) ? 0 : progress} // duration이 NaN이면 0으로 설정
          onChange={(value) => {
            const audioElement = document.getElementById(
              `audioElement${index}`
            ) as HTMLAudioElement;
            const duration = audioElement.duration;
            if (!isNaN(duration)) {
              // duration이 NaN이 아닌 경우에만 업데이트
              const newTime = (value / 100) * duration;
              audioElement.currentTime = newTime;
            }
            setProgress(value);
          }}
          w="70%"
        >
          <SliderTrack>
            <SliderFilledTrack bg="#651FFF" />
          </SliderTrack>
          <SliderThumb bg="#651FFF" />
        </Slider>
        <Center mr={6}>
          <Box>{formatTime(currentTime)}</Box>
          <Box mx={2}>/</Box>
          <Box>{formatTime(totalTime)}</Box>
        </Center>
      </Center>

      {lastPart === "upload" ? (
        <audio id={`audioElement${index}`} src={music} />
      ) : (
        <audio id={`audioElement${index}`} src={blobUrl} />
      )}

      {/* 오디오 요소 */}
    </Box>
  );
}

export default CustomAudio;
