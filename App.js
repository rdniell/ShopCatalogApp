import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const API_URL = "https://fakestoreapi.com/products";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [products, setProducts] = useState([]); // data asli dari API
  const [filtered, setFiltered] = useState([]); // data hasil search
  const [loading, setLoading] = useState(true); // state loading awal
  const [refreshing, setRefreshing] = useState(false); // state pull-to-refresh
  const [error, setError] = useState(null); // pesan error
  const [search, setSearch] = useState(""); // teks pencarian

  // Fungsi fetch data dari API
  const fetchProducts = async () => {
    try {
      setError(null);
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Gagal mengambil data (status ${response.status})`);
      }

      const data = await response.json();
      setProducts(data);
      setFiltered(data);
    } catch (err) {
      console.log("Fetch error:", err);
      setError(err.message || "Terjadi kesalahan saat mengambil data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // useEffect dengan dependency array [] -> fetch sekali saat mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fitur Level 2: Pull-to-Refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
  }, []);

  // Fitur Level 2: Search / Filter (client-side, berdasarkan judul)
  const handleSearch = (text) => {
    setSearch(text);
    if (text.trim() === "") {
      setFiltered(products);
    } else {
      const result = products.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase()),
      );
      setFiltered(result);
    }
  };

  // Tombol retry saat error
  const handleRetry = () => {
    setLoading(true);
    fetchProducts();
  };

  // Render satu kartu produk (FlatList renderItem)
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardInfo}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
    </View>
  );

  // ---------- KONDISI LOADING ----------
  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Memuat produk...</Text>
      </SafeAreaView>
    );
  }

  // ---------- KONDISI ERROR ----------
  if (error) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>Coba Lagi</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // ---------- KONDISI SUCCESS ----------
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🛒 Shop Catalog</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Cari produk..."
        value={search}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>😕 Produk tidak ditemukan</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: Platform.OS === "android" ? 8 : 0,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 14,
    color: "#1a1a1a",
  },
  searchInput: {
    marginHorizontal: 16,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  price: {
    fontSize: 14,
    color: "#2563eb",
    marginTop: 4,
    fontWeight: "bold",
  },
  category: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
    textTransform: "capitalize",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#555",
  },
  errorText: {
    fontSize: 15,
    color: "#dc2626",
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyContainer: {
    marginTop: 60,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#888",
  },
});
