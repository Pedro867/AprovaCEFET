import React, { useState, useMemo, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Feather } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

const CustomDay = ({ date, state, marking, onPress }) => {
  const isSelected = marking?.selected;
  const isDisabled = state === "disabled";

  // estilos diferentes com base no estado do dia (selecionado, desabilitado)
  const containerStyles = [
    styles.dayContainer,
    isSelected && styles.selectedDayContainer,
  ];
  const textStyles = [
    styles.dayText,
    isSelected && styles.selectedDayText,
    isDisabled && styles.disabledText,
  ];

  return (
    <Pressable
      onPress={() => onPress(date)}
      // simula o efeito de hover ao tocar
      style={({ pressed }) => [
        containerStyles,
        pressed && !isSelected && styles.dayPressed,
      ]}
      disabled={isDisabled}
    >
      <Text style={textStyles}>{date.day}</Text>
    </Pressable>
  );
};

// ´traduzindo´ o calendario pra o portugues
LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
  dayNames: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ],
  dayNamesShort: ["D", "S", "T", "Q", "Q", "S", "S"],
  today: "Hoje",
};
LocaleConfig.defaultLocale = "pt-br";

export default function TelaRegistroData() {
  const [selectedDate, setSelectedDate] = useState(""); // guarda a data selecionada no formato 'YYYY-MM-DD'
  const [currentMonth, setCurrentMonth] = useState(new Date()); // controla o mes que esta sendo exibido no calendario
  const router = useRouter();

  const onDayPress = useCallback(
    (day) => {
      // useCallback garante que a funcao seja recriada apenas quando selectedDate muda
      setSelectedDate(day.dateString === selectedDate ? "" : day.dateString);
    },
    [selectedDate]
  );

  const handleConfirm = () => {
    if (!selectedDate) {
      Alert.alert("Atenção", "Por favor, selecione uma data para a sua prova.");
      return;
    }
    router.replace('/(tabs)/secao');
    // Torres--> colocar a logica de salvar no bd a data no perfil do usuario (vai precisar pra colocar na home page)
  };

  const markedDates = useMemo(() => {
    // useMemo -> mesma finalidade do useCallback porem eh usado para evitar calculos pesados e repetitivos
    if (!selectedDate) return {};
    return {
      [selectedDate]: { selected: true },
    };
  }, [selectedDate]);

  return (
    <LinearGradient
      colors={["rgba(137, 161, 212, 0.8)", "rgba(248, 248, 248, 0.8)"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>Selecione a data da sua prova:</Text>

        <View style={styles.calendarCard}>
          <Calendar
            current={currentMonth.toISOString().split("T")[0]}
            markedDates={markedDates}
            onMonthChange={(month) =>
              setCurrentMonth(new Date(month.timestamp))
            }
            //hideExtraDays={true}
            enableSwipeMonths={true}
            dayComponent={({ date, state, marking }) => (
              <CustomDay
                date={date}
                state={state}
                marking={marking}
                onPress={onDayPress}
              />
            )}
            renderArrow={(direction) => {
              if (direction === "left") {
                return (
                  <Feather name="chevron-left" size={24} color="#000000ff" />
                );
              }
              return <Feather name="chevron-right" size={24} color="#000000ff" />;
            }}

            theme={{
              backgroundColor: "transparent",
              calendarBackground: "transparent",
              textSectionTitleColor: "#000000ff", // cor dos dias da semana (D, S, T...)
              textDayHeaderFontFamily: "Lexend_700Bold",
            }}
            renderHeader={(date) => {
              const monthName =
                LocaleConfig.locales["pt-br"].monthNames[date.getMonth()];
              const year = date.getFullYear();
              return (
                <View style={styles.customHeader}>
                  <Text style={styles.headerMonth}>{monthName}</Text>
                  <Text style={styles.headerYear}>{year}</Text>
                </View>
              );
            }}
          />
        </View>

        <TouchableOpacity style={styles.mainButton} onPress={handleConfirm}>
          <View style={styles.buttonShadow} />
          <View style={styles.buttonBody}>
            <Text style={styles.mainButtonText}>CONFIRMAR</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  //TELA//
  container: { flex: 1 },
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#003869",
    textAlign: "center",
    marginBottom: 30,
  },
  mainButton: { width: 200, height: 55, marginTop: 40 },
  buttonBody: {
    width: "100%",
    height: "100%",
    backgroundColor: "#003869",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  buttonShadow: {
    width: "100%",
    height: "100%",
    backgroundColor: "#004ef75e",
    borderRadius: 7,
    position: "absolute",
    top: 4,
  },
  mainButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },

  //CALENDARIO//
  calendarCard: {
    width: "100%",
    backgroundColor: "#F6F6F6",
    borderRadius: 13,
    paddingVertical: 18,
    paddingHorizontal: 10,
    shadowColor: "#000e33",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  customHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  headerMonth: {
    fontSize: 20,
    fontFamily: "Lexend_700Bold",
    color: "#000000ff",
    paddingHorizontal: 15,
    paddingVertical: 6,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerYear: {
    fontSize: 20,
    fontFamily: "Lexend_700Bold",
    color: "#000000ff",
    paddingHorizontal: 15,
    paddingVertical: 6,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dayContainer: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    // sombra para o container do dia
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
    elevation: 4,
  },
  dayText: {
    fontSize: 16,
    color: "black",
    fontFamily: "Lexend_700Bold",
  },
  selectedDayContainer: {
    backgroundColor: "#003869",
  },
  selectedDayText: {
    color: "white", // num branco quando selecionado
  },
  disabledText: {
    color: "#d9e1e8",
  },
  dayPressed: {
    backgroundColor: "#d6e2f0ff", // fundo azul claro ao pressionar
    transform: [{ scale: 0.95 }], // efeito de diminuir um pouco ao tocar
  },
});
