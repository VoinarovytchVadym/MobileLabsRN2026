import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { newsData } from "../../data/newsData";

export default function MainScreen({ navigation }) {
  const [news, setNews] = useState(newsData);
  const [refreshing, setRefreshing] = useState(false);
  const MAX_POSTS = 40;

  const generateUniqueId = () =>
    `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      const newItem = {
        id: generateUniqueId(),
        title: "Оновлена новина",
        description: "Ця новина була додана після оновлення списку.",
        image: `https://picsum.photos/300/200?random=${Date.now()}`,
      };

      setNews((prevNews) => [newItem, ...prevNews]);
      setRefreshing(false);
    }, 1500);
  };

  const loadMore = () => {
    if (news.length >= MAX_POSTS) return;

    const remaining = MAX_POSTS - news.length;
    const amountToAdd = Math.min(5, remaining);

    const moreNews = Array.from({ length: amountToAdd }, (_, index) => ({
      id: generateUniqueId(),
      title: `Додаткова новина ${news.length + index + 1}`,
      description: `Опис для додаткової новини ${news.length + index + 1}.`,
      image: `https://picsum.photos/300/200?random=${Date.now() + index}`,
    }));

    setNews((prevNews) => [...prevNews, ...moreNews]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("Details", {
          title: item.title,
          description: item.description,
          image: item.image,
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.header}>Список новин</Text>}
        ListFooterComponent={<Text style={styles.footer}>Кінець списку</Text>}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingTop: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  footer: {
    textAlign: "center",
    padding: 15,
    fontSize: 16,
    color: "gray",
  },
  separator: {
    height: 10,
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#444",
  },
});
