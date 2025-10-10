import React, { useState, useCallback, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import YoutubeIframe from "react-native-youtube-iframe";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { Colors, Fonts } from "@/constants/Colors";
import { playlistEquacoes, Video } from "@/constants/dadosVideos";
import * as ScreenOrientation from "expo-screen-orientation";

export default function VideoAulasConjuntosScreen() {
  const router = useRouter();
  const playerRef = useRef(null);

  const [currentVideoId, setCurrentVideoId] = useState(
    playlistEquacoes.videos[0].id
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(new Set());

  // Função para mudar o vídeo no player
  const handleSelectVideo = (video: Video) => {
    setCurrentVideoId(video.id);
  };

  const onFullScreenChange = useCallback((isFullScreen: boolean) => {
    //muda orientação da tela
    if (isFullScreen) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, []);

  const onStateChange = useCallback(
    (state: string) => {
      //monitora estado do player
      if (state === "ended") {
        setIsPlaying(false);

        setWatchedVideos((prev) => new Set(prev).add(currentVideoId)); //adiciona a lista de assistidos (salvar no bd dps torres)
        //Alert.alert('Vídeo Concluído!');
      }
    },
    [currentVideoId]
  );

  const currentVideoDetails = playlistEquacoes.videos.find(
    (v) => v.id === currentVideoId
  ); //infos do video atual

  return (
    <LinearGradient
      style={styles.container}
      colors={[Colors.gradientStart, Colors.gradientEnd]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/(matematica)/(equacoes)/equacoes")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>VIDEOAULAS</Text>
          <Text style={styles.headerSubtitle}>EQUAÇÕES DO 2º GRAU</Text>
        </View>
        <View style={{ width: 48 }} />
      </View>

      <View style={styles.playerContainer}>
        <YoutubeIframe
          ref={playerRef}
          height={205}
          videoId={currentVideoId}
          play={isPlaying}
          onChangeState={onStateChange}
          onFullScreenChange={onFullScreenChange}
        />
      </View>

      <View style={styles.videoInfoContainer}>
        <Text style={styles.playlistTitle}>
          {currentVideoDetails?.title || playlistEquacoes.title}
        </Text>
        <Text style={styles.playlistCreator}>
          Criado por {playlistEquacoes.creator}
        </Text>
        <View style={styles.durationContainer}>
          <Feather name="clock" size={14} color="#555" />
          <Text style={styles.durationText}>
            {playlistEquacoes.totalDuration}
          </Text>
        </View>
      </View>

      <View style={styles.playlistButton}>
        <Text style={styles.playlistButtonText}>
          Playlist ({playlistEquacoes.videos.length})
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.videoListContainer}>
          {playlistEquacoes.videos.map((video, index) => (
            <TouchableOpacity
              key={video.id}
              style={styles.videoItem}
              onPress={() => handleSelectVideo(video)}
            >
              <Feather name="play-circle" size={32} color={Colors.primary} />
              <View style={styles.videoItemText}>
                <Text style={styles.videoTitle}>{video.title}</Text>
                <Text style={styles.videoDuration}>{video.duration}</Text>
              </View>
              {watchedVideos.has(video.id) ? (
                <Feather name="check-circle" size={24} color="#28a745" />
              ) : (
                <View style={{ width: 24 }} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: "white",
    borderTopColor: "white",
  },
  backButton: { right: 50 },
  headerTitles: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.kumbhSans,
    color: Colors.white,
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.family.kumbhSans,
    color: Colors.white,
    opacity: 0.8,
  },
  scrollViewContent: {
    paddingBottom: 40,
  },
  playerContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 8,
    backgroundColor: "black",
  },
  videoInfoContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  playlistTitle: {
    fontSize: 22,
    fontFamily: Fonts.family.bold,
    color: Colors.primary,
  },
  playlistCreator: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  durationText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#555",
  },
  playlistButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: "flex-start",
    marginHorizontal: 20,
    marginTop: 20,
    elevation: 3,
  },
  playlistButtonText: {
    color: "white",
    fontFamily: Fonts.family.bold,
    fontSize: 16,
  },
  videoListContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    gap: 15,
  },
  videoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  videoItemText: {
    flex: 1,
    marginLeft: 15,
  },
  videoTitle: {
    fontSize: 16,
    fontFamily: Fonts.family.kumbhSans,
    color: "#333",
  },
  videoDuration: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
});
