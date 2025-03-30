import React from "react";
import TimelineEvent from "./TimelineEvent";

interface GalleryImage {
  url: string;
  caption?: string;
  captionPosition?: "top" | "bottom";
}

interface TimelineEventData {
  text: string;
  description: string;
  position: "top" | "bottom";
  imageUrl?: string;
  iconType: "education" | "usa" | "work" | "project";
  timelineGalleryImages?: GalleryImage[];
}

const events: TimelineEventData[] = [
  {
    text: "Studia Licencjackie Socjologia",
    description:
      "Lubię analizować złożoność struktur i procesów kształtujących społeczeństwa. Historia, technologia, polityka i kultura. To dziedziny, którymi się interesuję, a wszystkie one podlegają analizie socjologicznej. Na studiach szczególnie zgłębiałem się we wpływ komunizmu oraz współczesnych mediów na społeczeństwo polskie. Od ich ukończenia zmieniło się moje postrzeganie otaczającej rzeczywistości, dostrzegając w niej więcej szczegółów, struktur, przepływów i zależności.",
    position: "top",
    imageUrl: "/images/event-images/UG_Photo.jpg",
    iconType: "education",
  },
  {
    text: "Studia Magisterskie Psychologia",
    description:
      "Podczas studiów socjologicznych podczas zajęć z psychologii społecznej, profesor zasugerowała mi ten kierunek. Stanowiła ona kontynuacje i dalsze pogłębianie moich zainteresowań. Psychologia poznawcza pozwoliła mi lepiej zrozumieć, jak ludzie odbierają i przetwarzają informacje pochodzące z zewnątrz i jak wpływa to na złożone struktury. O myśleniu szybkim i wolnym noblisty Daniela Kahnemana stała się moją najważniejszą lekturą, która pozwala mi kalibrować błędy poznawcze wpływające na logikę mojego myślenia.",
    position: "bottom",
    imageUrl: "/images/event-images/SWPS_Photo.jpg",
    iconType: "education",
  },
  {
    text: "Wyjazd do Stanów Zjednoczonych",
    description:
      "Ze względu na epidemię dwukrotnie odwoływano program Work and Travel. Dlatego starałem się uczynić wyjazd doświadczeniem maksymalnie intensywnym, wykraczającym poza strefę komfortu. Zdecydowałem się na zamieszkanie z obcokrajowcami, zamiast z Polakami. Wśród nich byli rumuńscy informatycy, którzy pokazali mi kodowanie. To był początek mojej drogi z kodem. Zanim jednak wróciłem do kraju, wzbogaciłem się o bagaż doświadczeń organizując samodzielnie podróż z zachodniego na wschodnie wybrzeże.",
    position: "top",
    iconType: "usa",
    timelineGalleryImages: [
      {
        url: "/images/event-images/usa1.jpg",
        caption:
          "Wahadłowiec i ślady po wejściu w atmosferę... Wywołuje dreszcze i wzbudza wyobraźnię.",
        captionPosition: "bottom",
      },
      {
        url: "/images/event-images/usa2.jpg",
        caption:
          "Doiwiedzieć sie jak powstawały ulubione filmy to pobudza kreatywnosć.",
        captionPosition: "top",
      },
      {
        url: "/images/event-images/usa3.jpg",
        caption: "100 mil rowerem przez góry i pustynię - Wyzwanie! Przygoda!",
        captionPosition: "top",
      },
      {
        url: "/images/event-images/usa4.jpg",
        caption:
          "Potrzeba było trochę szaleństwa i odwagi pracując z niedźwiedziami.",
        captionPosition: "bottom",
      },
      {
        url: "/images/event-images/usa5.jpg",
        caption:
          "Dworzec kolejowy Salt Lake City - logistyka przejazdu na wschód była czasem wymagająca.",
        captionPosition: "bottom",
      },
    ],
  },
  {
    text: "Praca i nauka programowania",
    description:
      "Po powrocie zacząłem uczyć się programowania. Zauważyłem, że doświadczenia w HR, udana rekrutacja nie dawała w najmniejszym stopniu takiej satysfakcji jak dobrze napisany kod. Wróciłem do pracy jako kurier, żeby w wolnym czasie się uczyć. Frontend okazał się słusznym wyborem na start. HTML, CSS okazał się dobrym wstępem do samodzielnej nauki, która motywowała i nie pozwoliła mi się zrazić. Gdy poznałem Javascript i React, czułem się gotowy na dalszy krok.",
    position: "bottom",
    iconType: "work",
    timelineGalleryImages: [
      {
        url: "/images/event-images/work1.webp",
        caption: "Początki... dzisiaj react, zaraz backend.",
        captionPosition: "bottom",
      },
      {
        url: "/images/event-images/work2.jpg",
        caption: "Czasem trzeba było koordynować pracę w zespole.",
        captionPosition: "bottom",
      },
      {
        url: "/images/event-images/work3.jpg",
        caption: "Czasem trzeba było być wytrwałym.",
        captionPosition: "top",
      },
    ],
  },
  {
    text: "Pierwszy projekt aplikacji.",
    description:
      "Gdy pierwszy raz zobaczyłem prawdziwy, złożony projekt aplikacji, byłem przerażony. Wydawało mi się, że plików jest więcej niż linijek kodu napisanych w jakimkolwiek moim projekcie. Odkrywanie, że pomału wszystko jest dla mnie zrozumiałe pchało mnie do przodu. Poznałem, jak unikać magicznych liczb, jak działa code review na githubie i jakie są dobre praktyki programistyczne. Obecnie wdrażam się w Node.js przygotowując się do nauki backendu.",
    position: "top",
    imageUrl: "/images/event-images/Project_Photo.jpg",
    iconType: "project",
  },
];

const Timeline: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen overflow-x-hidden overflow-y-hidden">
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
