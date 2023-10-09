"use client";
import React, { useState, useEffect } from "react";
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

function CustomAudio({ music_data }: any) {
  const path = usePathname();
  const parts = path.split("/"); // 경로를 '/' 문자로 분리
  const lastPart = parts[parts.length - 1]; // 마지막 부분을 가져오기
  const [totalTime, setTotalTime] = useState(0); // 노래의 총 시간을 나타내는 상태 추가
  const [currentTime, setCurrentTime] = useState(0); // 현재 노래의 진행 시간을 나타내는 상태 추가
  const [music, setMusic] = useRecoilState(playState);
  const [play, setPlay] = useState(false); // 재생 상태를 관리하는 상태
  // console.log(music_data);
  // base64 문자열을 ArrayBuffer로 디코딩
  let blobUrl;

  if (music_data) {
    const binaryData = atob(music_data);
    // ArrayBuffer를 Uint8Array로 변환
    const uint8Array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }
    const blob = new Blob([uint8Array], { type: "audio/mpeg" });
    blobUrl = URL.createObjectURL(blob);
    // blobUrl을 사용할 수 있습니다.
  }

  // const audioSrc = music;
  const [progress, setProgress] = useState(0); // 오디오의 현재 위치를 나타내는 상태
  // 재생 버튼 클릭 시, play 상태를 토글하고 오디오 재생/일시 정지를 수행합니다.
  const togglePlay = () => {
    setPlay(!play);
  };

  // 오디오의 현재 위치를 업데이트하는 함수
  const updateProgress = () => {
    const audioElement = document.getElementById(
      "audioElement"
    ) as HTMLAudioElement;
    const currentTime = audioElement.currentTime;
    const duration = audioElement.duration;
    const calculatedProgress = (currentTime / duration) * 100;
    setProgress(calculatedProgress);
  };

  useEffect(() => {
    // play 상태가 변경될 때마다 이 효과가 실행됩니다.
    const audioElement = document.getElementById(
      "audioElement"
    ) as HTMLAudioElement; // <audio> 요소 가져오기

    if (play) {
      // 재생 중인 경우
      audioElement.play();
    } else {
      // 일시 정지 중인 경우
      audioElement.pause();
    }
  }, [play]);

  useEffect(() => {
    // 오디오 요소의 currentTime을 기반으로 프로그레스 바 값 업데이트
    const audioElement = document.getElementById(
      "audioElement"
    ) as HTMLAudioElement;
    audioElement.addEventListener("timeupdate", updateProgress);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      audioElement.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  //총 시간을 가져오는 useEffect
  useEffect(() => {
    const audioElement = document.getElementById(
      "audioElement"
    ) as HTMLAudioElement;
    audioElement.addEventListener("loadedmetadata", () => {
      // 노래의 총 시간을 가져와서 상태에 저장
      setTotalTime(audioElement.duration);
    });
  }, []);

  // 타이머 업데이트 useEffect
  useEffect(() => {
    const audioElement = document.getElementById(
      "audioElement"
    ) as HTMLAudioElement;
    audioElement.addEventListener("timeupdate", updateProgress);

    const timer = setInterval(() => {
      if (play && currentTime < totalTime) {
        // 재생 중이며, 현재 시간이 총 시간보다 작은 경우에만 타이머를 업데이트합니다.
        setCurrentTime((currentTime) => currentTime + 1); // 함수를 사용하여 업데이트
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
    <Box>
      <Center>
        {/* Slider를 사용한 프로그레스 바 */}
        {/* 재생/일시 정지 버튼 */}

        <IconButton
          mr={2}
          bg="transparent"
          aria-label="Play"
          onClick={togglePlay}
          colorScheme={play ? "transparent" : "transparent"}
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
          {play ? "일시 정지" : "재생"}
        </IconButton>

        {/* 여기서 WARNING */}
        <Slider
          mr={6}
          value={isNaN(progress) ? 0 : progress} // duration이 NaN이면 0으로 설정
          onChange={(value) => {
            const audioElement = document.getElementById(
              "audioElement"
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

        {/* </Center>
        <Center mt={4}> */}
        <Center mr={6}>
          <Box>{formatTime(currentTime)}</Box>
          <Box mx={2}>/</Box>
          <Box>{formatTime(totalTime)}</Box>
        </Center>
      </Center>

      {lastPart === "upload" ? (
        <audio id="audioElement" src={music} />
      ) : (
        <audio id="audioElement" src={blobUrl} />
      )}

      {/* 오디오 요소 */}
    </Box>
  );
}

export default CustomAudio;
