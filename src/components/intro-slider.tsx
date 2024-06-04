import AppIntroSlider from "react-native-app-intro-slider";
import { View, Text, Image } from "react-native";
import { router } from "expo-router";
import { COLORS, SIZES } from "../constants/theme";
import React from "react";

const slides = [
  {
    id: 1,
    title: "Solusi Manajemen Acaramu!",
    description:
      "Jelajahi kecanggihan teknologi manajemen tamu yang inovatif dan nikmati pengalaman acara yang mulus bersama Guestify",
    image: require("../assets/onboard-1.png"),
  },
  {
    id: 2,
    title: "Solusi Praktis!",
    description:
      "Dengan Guestify, nikmati kemudahan mengelola RSVP dan Digital Guest Book. Jadikan setiap acara penuh kenangan!",
    image: require("../assets/onboard-2.png"),
  },
  {
    id: 3,
    title: "Solusi Ekonomis!",
    description:
      "Berkumpul, merayakan, dan mengelola acara dengan mudah. Guestify hadir untuk memastikan setiap detik acaramu berjalan dengan sempurna",
    image: require("../assets/onboard-3.png"),
  },
];

type IntroSlideProps = {
  setShowHomePage: (value: boolean) => void;
};

export default function IntroSlider({ setShowHomePage }: IntroSlideProps) {
  const buttonLabel = (label: string) => {
    return (
      <View className="p-3">
        <Text className="text-lg font-semibold text-primary-1 font-jos_bold">{label}</Text>
      </View>
    );
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={({ item }) => {
        return (
          <View className="flex-1 items-center p-8 pt-20">
            <Image
              source={item.image}
              className={`w-[${SIZES.width - 80}] h-[400]`}
              resizeMode="contain"
            />
            <Text className="text-2xl text-secondary-2 font-jos_bold text-center">
              {item.title}
            </Text>
            <Text className="text-sm text-gray-500 text-center pt-2 font-pop_light mt-4">
              {item.description}
            </Text>
          </View>
        );
      }}
      activeDotStyle={{
        backgroundColor: COLORS.primary_2,
        width: 30,
      }}
      showSkipButton
      renderNextButton={() => buttonLabel("Next")}
      renderSkipButton={() => buttonLabel("Skip")}
      renderDoneButton={() => buttonLabel("Done")}
      onDone={() => {
        setShowHomePage(true);
        router.replace("login");
      }}
    />
  );
}
