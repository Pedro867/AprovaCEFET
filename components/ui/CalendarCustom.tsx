import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig, type DateData } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import { Colors, Fonts, Spacing } from '@/constants/Colors';

interface CustomDayProps {
  date?: DateData;
  state?: 'disabled' | 'today' | 'selected' | 'inactive' | ''; 
  marking?: any; 
  onPress?: (date: DateData) => void;
}

// componente interno para renderizar cada dia do calendário.
const CustomDay = ({ date, state, marking, onPress }: CustomDayProps) => {
  if (!date) {
    return <View style={styles.dayContainer} />;
  }
  const isSelected = marking?.selected;
  const isDisabled = state === "disabled";
  const containerStyles = [ styles.dayContainer, isSelected && styles.selectedDayContainer, ];
  const textStyles = [ styles.dayText, isSelected && styles.selectedDayText, isDisabled && styles.disabledText, ];

  return (
    <Pressable
      onPress={() => onPress && onPress(date)}
      style={({ pressed }) => [ containerStyles, pressed && !isSelected && styles.dayPressed, ]}
      disabled={isDisabled}
    >
      <Text style={textStyles}>{date.day}</Text>
    </Pressable>
  );
};

interface CalendarioCustomizadoProps {
  onDateSelect: (date: string) => void;
}

export function CalendarioCustomizado({ onDateSelect }: CalendarioCustomizadoProps) {
  const [selected, setSelected] = useState('');

  const onDayPress = useCallback((day: DateData) => {
      const newSelectedDate = day.dateString === selected ? '' : day.dateString;
      setSelected(newSelectedDate);
      onDateSelect(newSelectedDate);
    }, [selected, onDateSelect]);
  
  const markedDates = useMemo(() => {
    if (!selected) return {};
    return { [selected]: { selected: true } };
  }, [selected]);

  return (
    <View style={styles.calendarCard}>
      <Calendar
        markedDates={markedDates}
        dayComponent={(props) => <CustomDay {...props} onPress={onDayPress} />}
        renderArrow={(direction) => (
            <Feather name={direction === 'left' ? 'chevron-left' : 'chevron-right'} size={24} color={Colors.black} />
        )}
        renderHeader={(date: Date) => { 
            const monthName = LocaleConfig.locales['pt-br'].monthNames[date.getMonth()];
            const year = date.getFullYear();
            return (
              <View style={styles.customHeader}>
                <Text style={styles.headerMonth}>{monthName}</Text>
                <Text style={styles.headerYear}>{year}</Text>
              </View>
            );
        }}
        enableSwipeMonths={true}
        theme={{
            backgroundColor: "transparent",
            calendarBackground: "transparent",
            textSectionTitleColor: Colors.black,
            textDayHeaderFontFamily: Fonts.family.bold as any,
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
    calendarCard: {
        width: "100%",
        backgroundColor: "#F6F6F6",
        borderRadius: 13,
        paddingVertical: 10,
        paddingHorizontal: 20,
        shadowColor: "#000e33",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5,
        marginBottom: Spacing.small
      },
      customHeader: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        marginBottom: 20,
      },
      headerMonth: {
        fontSize: Fonts.size.large,
        fontFamily: Fonts.family.bold,
        color: Colors.black,
        paddingHorizontal: 15,
        paddingVertical: 6,
        backgroundColor: "white",
        borderRadius: 5,
        elevation: 2,
      },
      headerYear: {
        fontSize: Fonts.size.large,
        fontFamily: Fonts.family.bold,
        color: Colors.black,
        paddingHorizontal: 15,
        paddingVertical: 6,
        backgroundColor: "white",
        borderRadius: 5,
        elevation: 2,
      },
      dayContainer: {
        width: 42,
        height: 42,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 4,
      },
      dayText: {
        fontSize: Fonts.size.medium,
        color: Colors.black,
        fontFamily: Fonts.family.bold,
      },
      selectedDayContainer: {
        backgroundColor: Colors.primary,
      },
      selectedDayText: {
        color: Colors.white,
      },
      disabledText: {
        color: "#d9e1e8",
      },
      dayPressed: {
        backgroundColor: "#d6e2f0ff",
        transform: [{ scale: 0.95 }],
      },
});