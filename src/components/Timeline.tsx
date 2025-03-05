import React from "react";
import TimelineEvent from "./TimelineEvent";

interface TimelineEventData {
  text: string;
  description: string;
  position: "top" | "bottom";
  imageUrl?: string;
  iconType: "education" | "usa" | "work" | "project";
  timelineGalleryImages?: string[];
}

const events: TimelineEventData[] = [
  {
    text: "Studia Licencjackie Socjologia",
    description:
      "Lubię analizować złożoność struktur i procesów, kształtujących społeczeństwa. Historia, technologia, politryka i kultura. Wszystkie te dzidziny łaczy moje zainteresowanie. Na studiach szczególnie zgłębiałem się we wpływ komunizmu oraz współczesnych mediów na społeczeństwo polskie.",
    position: "top",
    imageUrl: "/images/event-images/UG_Photo.jpg",
    iconType: "education",
  },
  {
    text: "Studia Magisterskie Psychologia",
    description:
      "Psychologia była kontynuacją moich wcześniejszych zainteresowań. W kontekście wpływu mediów najbardziej interesowała mnie psychologia poznawcza. Psychologia ewolucyjna, z kolei pchnęła mnie w stronę nauk ścisłych",
    position: "bottom",
    imageUrl: "/images/event-images/SWPS_Photo.jpg",
    iconType: "education",
  },
  {
    text: "Wyjazd do Stanów Zjednoczonych",
    description:
      "Ze względu na epidemię dwukrotnie odwoływano program Work and Travel. Dlatego starałem się uczynić wyjazd doświadczeniem maksymalnie intensywnym, wykraczającym poza strefę komfortu. Zdecydowałem się na zamieszkanie z obcokrajowcami a nie z Polakami. Wśród nich byli rumuńscy informatycy, którzy pokazali mi kodowanie. To był początek mojej drogi z kodem. Zanim jednak wróciłem do kraju wzbogaciłem się o bagaż doświadczeń organizując samodzielnie swoją podróż z zachodniego na wschodnie wybrzeże.",
    position: "top",
    iconType: "usa",
    timelineGalleryImages: [
      "/images/event-images/usa1.jpg",
      "/images/event-images/usa2.jpg",
      "/images/event-images/usa3.jpg",
    ],
  },
  {
    text: "Praca i nauka programowania",
    description:
      "Po powrocie zacząłem uczyć się programowania. Zauważyłem, że doświadczenia związane z pracą w HR, nie daje takiej satysfakcji, udana rekrutacja nie była porównywalna z udanie napisanym kodem. Wróciłem do pracy jako kurier, żeby w wolnym czasie się uczyć. Frontend okazał się słusznym wyborem. HTML, CSS okazał się dobrym wstępem do samodzielnej nauki, która motywowała i nie pozwalała się zrazić. Gdy poznałem Javascript i React, czułem się gotowy na dalszy krok.",
    position: "bottom",
    imageUrl: "/images/event-images/UG_Photo.jpg",
    iconType: "work",
  },
  {
    text: "Pierwszy projekt aplikacji.",
    description:
      "Gdy pierwszy raz zobaczyłem prawdziwy, złożony projekt aplikacji, byłem przerażony. Wydawało mi się, że plików jest więcej niż linijek kodu napisanych w jakimkolwiek moim projekcie. Odkrywanie, że po mału wszystko jest dla mnie zrozumiałe pchało mnie do przodu. Poznałem jak unikać magicznych liczb, jak działa code review na githubie, jakie są dobre praktyki programistyczne. Obecnie wdrażam się w Node.js przygotowując się do nauki backendu.",
    position: "top",
    imageUrl: "/images/event-images/UG_Photo.jpg",
    iconType: "project",
  },
];

const Timeline: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative flex justify-center items-center w-4/5">
        <div className="absolute w-full h-1 bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] top-1/2 transform -translate-y-1/2"></div>
        {events.map((event, index) => (
          <TimelineEvent
            key={index}
            text={event.text}
            description={event.description}
            position={event.position}
            imageUrl={event.imageUrl}
            iconType={event.iconType}
            timelineGalleryImages={event.timelineGalleryImages}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
