// import { useLanguage } from "@/context/LanguageContext";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { useFonts } from "expo-font";
// import * as Haptics from "expo-haptics";
// import React, { useEffect, useState } from "react";
// import {
//   Animated,
//   Dimensions,
//   Image,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";

// interface Card {
//   month: string; // e.g., "Jan", "Feb", etc.
//   rank: string;
//   id: string; // optional, unique identifier
//   img: string;
//   rotation: number;
//   title: { en: string; ko: string };
//   meaning: { en: string; ko: string };
// }

// type Props = {
//   setOpenInfo: (value: boolean) => void;
//   deck: Card[];
//   imageSet: Record<string, any>;
// };

// const instructions = {
//   en: {
//     intro1:
//       "- A Hwatu deck contains 48 cards, made up of 12 different kinds with four cards each.",
//     intro2: "- Pair matching cards until the spread is cleared.",
//     intro3:
//       "- Collecting all four cards of a kind in one pile adds that kind to your daily reading.",
//     intro4: "- Some spreads may end up being impossible to clear.",
//     intro5: "- When that happens, simply try again.",
//     intro6:
//       "- Your reading can be revealed once per day, so each play represents a single day’s reading.",
//   },
//   ko: {
//     intro1:
//       "- 화투는 총 48장의 패로 이루어져 있으며, 12가지 종류가 각각 4장씩 구성되어 있습니다.",
//     intro2: "- 같은 종류의 카드를 짝지어 펼쳐진 판을 모두 정리하면 됩니다.",
//     intro3:
//       "- 한 종류의 카드 4 장을 하나의 더미로 모두 모으면, 그 종류는 오늘의 운세에 포함 됩니다.",
//     intro4: "- 일부 판은 정리가 불가능할 수도 있습니다.",
//     intro5: "- 그런 경우에는 다시 시도하세요.",
//     intro6:
//       "- 운세는 하루에 한 번씩 볼 수 있으며, 한 번의 플레이는 하루의 운세를 의미합니다.",
//   },
// };

// const infoTitle = { en: "HWATU TAROT", ko: "화투점" };
// const language = { en: "EN/KO", ko: "한/영" };
// const close = { en: "Close", ko: "닫기" };

// const InfoOverlay = ({ setOpenInfo, deck, imageSet }: Props) => {
//   const { width: vw, height: vh } = Dimensions.get("window");

//   const { lang, setLang } = useLanguage();

//   const [fontsLoaded] = useFonts({
//     // Point directly to your local asset
//     "GowunDodum-Regular": require("../assets/fonts/GowunDodum-Regular.ttf"),
//     "Gugi-Regular": require("../assets/fonts/Gugi-Regular.ttf"),
//   });

//   const [translateClose, setTranslateClose] = useState(0);
//   const [translateLang, setTranslateLang] = useState(0);
//   const [opacity] = useState(new Animated.Value(0));

//   useEffect(() => {
//     Animated.timing(opacity, {
//       toValue: 1,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const handleClose = () => {
//     Animated.timing(opacity, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => setOpenInfo(false));
//   };

//   const [grouped, setGrouped] = useState<Card[][]>([]);

//   const groupByMonths = (arr: Card[]): Card[][] => {
//     const byMonths: Card[][] = [];

//     for (let i = 0; i < arr.length; i += 4) {
//       byMonths.push(arr.slice(i, i + 4));
//     }

//     return byMonths;
//   };

//   useEffect(() => {
//     setGrouped(groupByMonths(deck));
//   }, []);

//   const toggleLang = () => setLang(lang === "en" ? "ko" : "en");

//   const [english, setEnglish] = useState(true);

//   return (
//     <Animated.View
//       style={{
//         position: "absolute",
//         width: "100%",
//         height: "100%",
//         zIndex: 20,
//         backgroundColor: "rgba(255, 255, 255, 0.3)",
//         opacity,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <View
//         style={{
//           backgroundColor: "rgba(235, 235, 235, 0.8)",
//           borderRadius: 15,
//           overflow: "visible",
//           padding: 10,
//           width: "90%",
//           height: "70%",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//           alignItems: "center",
//           gap: 10,
//           boxShadow: "inset 1px 2px 3px 3px white, 1px 3px 3px 2px black",
//         }}
//       >
//         <View
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             gap: 0,
//             padding: 0,
//             borderRadius: 10,
//             overflow: "hidden",
//             width: "100%",
//             height: vh * 0.06,
//             backgroundColor: "rgb(42, 83, 60)",
//           }}
//         >
//           <Text
//             style={{
//               fontSize: vw * 0.075,
//               fontFamily: "Gugi-Regular",
//               color: "rgba(255, 217, 0, 1)",
//               width: "100%",
//               textAlign: "center",
//               textAlignVertical: "center",
//             }}
//             allowFontScaling={false}
//           >
//             {infoTitle[lang]}
//           </Text>
//         </View>
//         <ScrollView
//           style={{
//             height: "30%",
//             boxShadow: "inset 1px 1px 4px black",
//             padding: 15,
//             borderRadius: 10,
//             overflow: "scroll",
//             backgroundColor: "rgba(235, 235, 235, 0.8)",
//           }}
//           contentContainerStyle={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "flex-start",
//             gap: 10,
//             paddingBottom: 30,
//             overflow: "scroll",
//           }}
//         >
//           <Text
//             style={{ fontSize: vw * 0.035, fontFamily: "GowunDodum-Regular" }}
//             allowFontScaling={true}
//           >
//             {instructions[lang].intro1}
//           </Text>
//           <Text
//             style={{ fontSize: vw * 0.035, fontFamily: "GowunDodum-Regular" }}
//             allowFontScaling={true}
//           >
//             {instructions[lang].intro2}
//           </Text>
//           <Text
//             style={{ fontSize: vw * 0.035, fontFamily: "GowunDodum-Regular" }}
//             allowFontScaling={true}
//           >
//             {instructions[lang].intro3}
//           </Text>
//           <Text
//             style={{ fontSize: vw * 0.035, fontFamily: "GowunDodum-Regular" }}
//             allowFontScaling={true}
//           >
//             {instructions[lang].intro4}
//           </Text>
//           <Text
//             style={{ fontSize: vw * 0.035, fontFamily: "GowunDodum-Regular" }}
//             allowFontScaling={true}
//           >
//             {instructions[lang].intro5}
//           </Text>
//           {/* <Text
//             style={{ fontSize: vw * 0.035, fontFamily: "GowunDodum-Regular" }}
//             allowFontScaling={false}
//           >
//             {instructions[lang].intro6}
//           </Text> */}
//         </ScrollView>
//         <ScrollView
//           style={{
//             height: "50%",
//             boxShadow: "inset 1px 1px 4px black",
//             borderRadius: 10,
//             overflow: "scroll",
//             padding: 15,
//             backgroundColor: "rgba(235, 235, 235, 0.8)",
//           }}
//           contentContainerStyle={{
//             display: "flex",
//             flexDirection: "column",
//             flexWrap: "nowrap",
//             paddingBottom: 30,
//             gap: 5,
//           }}
//         >
//           {grouped.map((x, i) => (
//             <View
//               key={i}
//               style={{
//                 height: 80,
//                 display: "flex",
//                 flexDirection: "row",
//                 flexWrap: "nowrap",
//                 justifyContent: "space-between",
//                 alignItems: "flex-start",

//                 // borderWidth: 1,
//                 // borderColor: "blue",
//               }}
//             >
//               <View style={{ width: "40%" }}>
//                 {grouped[i].map((card, index) => (
//                   <View
//                     key={index}
//                     style={{
//                       width: 40,
//                       height: "auto",
//                       aspectRatio: "230/360",
//                       borderWidth: 1,
//                       borderRadius: 3,
//                       overflow: "hidden",
//                       borderColor: "indianred",
//                       position: "absolute",
//                       transform: [
//                         { translateX: index * 25 },
//                         { rotate: `${card.rotation}deg` },
//                       ],
//                       zIndex: 4 - index,
//                       boxShadow: "3px 3px 4px black",
//                     }}
//                   >
//                     <Image
//                       key={card.id}
//                       source={imageSet[card.img]}
//                       style={{ width: "100%", height: "100%" }}
//                       resizeMode="stretch"
//                     />
//                   </View>
//                 ))}
//               </View>
//               <View
//                 style={{
//                   width: "60%",
//                   height: "auto",
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                   justifyContent: "center",
//                   gap: 0,
//                 }}
//               >
//                 <View
//                   style={{
//                     width: "100%",
//                     display: "flex",
//                     flexDirection: lang === "en" ? "row" : "row-reverse",
//                     justifyContent: "space-between",
//                     alignItems: "flex-end",
//                   }}
//                 >
//                   <Text
//                     style={{
//                       fontSize: vw * 0.035,
//                       fontWeight: "bold",
//                       fontFamily: "GowunDodum-Regular",
//                       textAlign: "right",
//                     }}
//                     allowFontScaling={true}
//                   >
//                     {grouped[i][1].title.en}
//                   </Text>
//                   <Text
//                     style={{
//                       fontSize: vw * 0.035,
//                       fontWeight: "bold",
//                       fontFamily: "GowunDodum-Regular",
//                     }}
//                     allowFontScaling={true}
//                   >
//                     {grouped[i][1].title.ko}
//                   </Text>
//                 </View>
//                 <View
//                   style={{
//                     width: "100%",
//                     height: 1,
//                     backgroundColor: "black",
//                   }}
//                 ></View>
//                 <Text
//                   style={{
//                     fontSize: vw * 0.035,
//                     paddingTop: 4,
//                     fontFamily: "GowunDodum-Regular",
//                   }}
//                   allowFontScaling={true}
//                 >
//                   {grouped[i][1].meaning[lang]}
//                 </Text>
//               </View>
//             </View>
//           ))}
//         </ScrollView>
//         <View
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//             width: "100%",
//             height: vh * 0.05,
//             gap: 10,
//           }}
//         >
//           <Pressable
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               flex: 3,
//             }}
//             onPress={() => handleClose()}
//             onPressIn={() => {
//               Haptics.selectionAsync();
//               setTranslateClose(2);
//             }}
//             onPressOut={() => setTranslateClose(0)}
//           >
//             <Animated.View
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 backgroundColor: "rgb(219, 0, 0)",
//                 paddingVertical: 0,
//                 height: "100%",
//                 width: "100%",
//                 borderRadius: 10,
//                 overflow: "hidden",
//                 boxShadow: "inset 2px 2px 2px white, 2px 2px 2px 1px black",
//                 transform: [{ translateY: translateClose }],
//               }}
//             >
//               <Text
//                 style={{
//                   color: "white",
//                   fontWeight: "500",
//                   fontSize: vw * 0.05,
//                 }}
//                 allowFontScaling={false}
//               >
//                 {close[lang]}
//               </Text>
//             </Animated.View>
//           </Pressable>
//           <Pressable
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "center",
//               alignItems: "center",
//               alignSelf: "flex-start",
//               flex: 1,
//               height: "100%",
//             }}
//             onPressIn={() => {
//               Haptics.selectionAsync();
//               setTranslateLang(2);
//               setEnglish(false);
//             }}
//             onPressOut={() => {
//               setTranslateLang(0);
//               setEnglish(true);
//               toggleLang();
//             }}
//           >
//             <Animated.View
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: "100%",
//                 width: "100%",
//                 gap: 2,
//                 borderRadius: 10,
//                 overflow: "hidden",
//                 boxShadow: "inset 2px 2px 2px white, 2px 2px 2px 1px black",
//                 backgroundColor: "rgb(88, 88, 88)",
//                 transform: [{ translateY: translateLang }],
//               }}
//             >
//               <Ionicons
//                 name="globe-outline"
//                 size={vw * 0.04}
//                 color={english ? "white" : "rgba(255,255,255,0.5)"}
//                 allowFontScaling={false}
//               />
//               <Text
//                 style={{
//                   color: english ? "white" : "rgba(255,255,255,0.5)",
//                   fontSize: vw * 0.035,
//                   fontWeight: "500",
//                 }}
//                 allowFontScaling={false}
//               >
//                 {language[lang]}
//               </Text>
//             </Animated.View>
//           </Pressable>
//         </View>
//       </View>
//     </Animated.View>
//   );
// };

// export default InfoOverlay;

// const styles = StyleSheet.create({});

import { useLanguage } from "@/context/LanguageContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image"; // Optimized for performance
import React, { memo, useEffect, useMemo, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Card {
  month: string;
  rank: string;
  id: string;
  img: string;
  rotation: number;
  title: { en: string; ko: string };
  meaning: { en: string; ko: string };
}

type Props = {
  setOpenInfo: (value: boolean) => void;
  deck: Card[];
  imageSet: Record<string, any>;
};

const { width: vw, height: vh } = Dimensions.get("window");

const instructions = {
  en: {
    intro1:
      "- A Hwatu deck contains 48 cards, made up of 12 different kinds with four cards each.",
    intro2: "- Pair matching cards until the spread is cleared.",
    intro3:
      "- Collecting all four cards of a kind in one pile adds that kind to your daily reading.",
    intro4: "- Some spreads may end up being impossible to clear.",
    intro5: "- When that happens, simply try again.",
  },
  ko: {
    intro1:
      "- 화투는 총 48장의 패로 이루어져 있으며, 12가지 종류가 각각 4장씩 구성되어 있습니다.",
    intro2: "- 같은 종류의 카드를 짝지어 펼쳐진 판을 모두 정리하면 됩니다.",
    intro3:
      "- 한 종류의 카드 4 장을 하나의 더미로 모두 모으면, 그 종류는 오늘의 운세에 포함 됩니다.",
    intro4: "- 일부 판은 정리가 불가능할 수도 있습니다.",
    intro5: "- 그런 경우에는 다시 시도하세요.",
  },
};

const infoStrings = {
  title: { en: "HWATU TAROT", ko: "화투점" },
  langToggle: { en: "EN/KO", ko: "한/영" },
  close: { en: "Close", ko: "닫기" },
};

// 1. Helper function moved outside to avoid re-allocation
const groupByMonths = (arr: Card[]): Card[][] => {
  const byMonths: Card[][] = [];
  for (let i = 0; i < arr.length; i += 4) {
    byMonths.push(arr.slice(i, i + 4));
  }
  return byMonths;
};

// 2. Memoized Sub-component for individual rows
const CardRow = memo(
  ({
    group,
    lang,
    imageSet,
  }: {
    group: Card[];
    lang: "en" | "ko";
    imageSet: any;
  }) => {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.cardStackContainer}>
          {group.map((card, index) => (
            <View
              key={card.id}
              style={[
                styles.cardBase,
                {
                  transform: [
                    { translateX: index * 25 },
                    { rotate: `${card.rotation}deg` },
                  ],
                  zIndex: 4 - index,
                },
              ]}
            >
              <Image
                source={imageSet[card.img]}
                style={styles.fullImage}
                contentFit="fill"
                cachePolicy="memory-disk"
              />
            </View>
          ))}
        </View>
        <View style={styles.meaningContainer}>
          <View
            style={[
              styles.titleRow,
              { flexDirection: lang === "en" ? "row" : "row-reverse" },
            ]}
          >
            <Text style={styles.boldText} allowFontScaling={true}>
              {group[0].title.en}
            </Text>
            <Text style={styles.boldText} allowFontScaling={true}>
              {group[0].title.ko}
            </Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.meaningText} allowFontScaling={true}>
            {group[0].meaning[lang]}
          </Text>
        </View>
      </View>
    );
  },
);

const InfoOverlay = ({ setOpenInfo, deck, imageSet }: Props) => {
  const { lang, setLang } = useLanguage();
  const [fontsLoaded] = useFonts({
    "GowunDodum-Regular": require("../assets/fonts/GowunDodum-Regular.ttf"),
    "Gugi-Regular": require("../assets/fonts/Gugi-Regular.ttf"),
  });

  const [translateClose] = useState(new Animated.Value(0));
  const [translateLang] = useState(new Animated.Value(0));
  const [opacity] = useState(new Animated.Value(0));
  const [english, setEnglish] = useState(true);

  // 3. Memoize grouped data to prevent re-calculating on every lang toggle
  const grouped = useMemo(() => groupByMonths(deck), [deck]);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleClose = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setOpenInfo(false));
  };

  const toggleLang = () => {
    Haptics.selectionAsync();
    setLang(lang === "en" ? "ko" : "en");
  };

  const onPressIn = (animVar: Animated.Value) => {
    Haptics.selectionAsync();
    Animated.spring(animVar, { toValue: 2, useNativeDriver: true }).start();
  };

  const onPressOut = (animVar: Animated.Value) => {
    Animated.spring(animVar, { toValue: 0, useNativeDriver: true }).start();
  };

  if (!fontsLoaded) return null;

  return (
    <Animated.View style={[styles.fullOverlay, { opacity }]}>
      <View style={styles.modalContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText} allowFontScaling={false}>
            {infoStrings.title[lang]}
          </Text>
        </View>

        {/* Instructions */}
        <ScrollView
          style={styles.instructionScroll}
          contentContainerStyle={styles.instructionContent}
        >
          {Object.values(instructions[lang]).map((text, idx) => (
            <Text key={idx} style={styles.instructionText}>
              {text}
            </Text>
          ))}
        </ScrollView>

        {/* Card Reference List */}
        <ScrollView
          style={styles.cardListScroll}
          contentContainerStyle={styles.cardListContent}
          removeClippedSubviews={true} // Performance optimization
        >
          {grouped.map((group, i) => (
            <CardRow key={i} group={group} lang={lang} imageSet={imageSet} />
          ))}
        </ScrollView>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <Pressable
            style={{ flex: 3 }}
            onPress={handleClose}
            onPressIn={() => onPressIn(translateClose)}
            onPressOut={() => onPressOut(translateClose)}
          >
            <Animated.View
              style={[
                styles.closeBtn,
                { transform: [{ translateY: translateClose }] },
              ]}
            >
              <Text style={styles.closeBtnText} allowFontScaling={false}>
                {infoStrings.close[lang]}
              </Text>
            </Animated.View>
          </Pressable>

          <Pressable
            style={{ flex: 1 }}
            onPress={toggleLang}
            onPressIn={() => {
              onPressIn(translateLang);
              setEnglish(false);
            }}
            onPressOut={() => {
              onPressOut(translateLang);
              setEnglish(true);
            }}
          >
            <Animated.View
              style={[
                styles.langBtn,
                { transform: [{ translateY: translateLang }] },
              ]}
            >
              <Ionicons
                name="globe-outline"
                size={vw * 0.04}
                color={english ? "white" : "rgba(255,255,255,0.5)"}
              />
              <Text
                style={[
                  styles.langBtnText,
                  { color: english ? "white" : "rgba(255,255,255,0.5)" },
                ]}
                allowFontScaling={false}
              >
                {infoStrings.langToggle[lang]}
              </Text>
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
};

export default InfoOverlay;

const styles = StyleSheet.create({
  fullOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "rgba(235, 235, 235, 0.8)",
    borderRadius: 15,
    padding: 10,
    width: "90%",
    height: "70%",
    gap: 10,
    boxShadow: "inset 1px 2px 3px 3px white, 1px 3px 3px 2px black",
  },
  header: {
    height: vh * 0.06,
    backgroundColor: "rgb(42, 83, 60)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: vw * 0.075,
    fontFamily: "Gugi-Regular",
    color: "rgba(255, 217, 0, 1)",
    textAlign: "center",
  },
  instructionScroll: {
    height: "30%",
    backgroundColor: "rgba(235, 235, 235, 0.8)",
    borderRadius: 10,
    padding: 15,
    boxShadow: "inset 1px 1px 4px black",
  },
  instructionContent: {
    gap: 10,
    paddingBottom: 20,
  },
  instructionText: {
    fontSize: vw * 0.035,
    fontFamily: "GowunDodum-Regular",
  },
  cardListScroll: {
    height: "50%",
    backgroundColor: "rgba(235, 235, 235, 0.8)",
    borderRadius: 10,
    padding: 15,
    boxShadow: "inset 1px 1px 4px black",
  },
  cardListContent: {
    gap: 5,
    paddingBottom: 30,
  },
  rowContainer: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardStackContainer: {
    width: "40%",
  },
  cardBase: {
    width: 40,
    height: "auto",
    aspectRatio: 230 / 360,
    borderWidth: 1,
    borderRadius: 3,
    overflow: "hidden",
    borderColor: "indianred",
    position: "absolute",
    backgroundColor: "white",
    boxShadow: "3px 3px 4px black",
  },
  fullImage: {
    width: "100%",
    height: "100%",
  },
  meaningContainer: {
    width: "60%",
    justifyContent: "center",
  },
  titleRow: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  boldText: {
    fontSize: vw * 0.035,
    fontWeight: "bold",
    fontFamily: "GowunDodum-Regular",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "black",
    marginVertical: 2,
  },
  meaningText: {
    fontSize: vw * 0.032,
    fontFamily: "GowunDodum-Regular",
    paddingTop: 2,
  },
  footer: {
    flexDirection: "row",
    height: vh * 0.05,
    width: "100%",
    gap: 10,
  },
  closeBtn: {
    backgroundColor: "rgb(219, 0, 0)",
    height: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "inset 2px 2px 2px white, 2px 2px 2px 1px black",
  },
  closeBtnText: {
    color: "white",
    fontWeight: "500",
    fontSize: vw * 0.05,
  },
  langBtn: {
    flexDirection: "row",
    backgroundColor: "rgb(88, 88, 88)",
    height: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    boxShadow: "inset 2px 2px 2px white, 2px 2px 2px 1px black",
  },
  langBtnText: {
    fontSize: vw * 0.035,
    fontWeight: "500",
  },
});
