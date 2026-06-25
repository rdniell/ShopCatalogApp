**Shop Catalog App**

Aplikasi React Native (Expo) yang mengambil data produk dari REST API publik, menampilkannya dalam bentuk list dengan FlatList, lengkap dengan 3-state UI (loading, success, error) serta fitur pencarian dan pull-to-refresh.

**API yang Digunakan**

FakeStore API — endpoint produk e-commerce (gratis, tanpa API key).

**Fitur**

***Level 1 — Core***

Fetch data dari REST API dengan async/await + try/catch/finally
useEffect dengan dependency array [] (fetch sekali saat mount)
3 kondisi UI: Loading (ActivityIndicator), Error (pesan + tombol "Coba Lagi"), Success (data tampil)
FlatList dengan data, renderItem, keyExtractor
Kartu item menampilkan gambar, judul, harga, dan kategori
Tombol retry yang memanggil ulang fungsi fetch


***Level 2 — Pengembangan (dipilih 2)***

✅ Pull-to-Refresh — tarik layar ke bawah untuk fetch ulang data
✅ Search / Filter — TextInput untuk filter produk berdasarkan judul (client-side)


***Screenshot***
> Loading <
<img width="720" height="1600" alt="Loading" src="https://github.com/user-attachments/assets/e2dedf5f-ab3e-47c4-8024-697918c4f406" />

> Success <
<img width="720" height="1600" alt="Loading" src="https://github.com/user-attachments/assets/4daed499-a981-4d61-9482-19f48f5416da" />

>Error<
<img width="720" height="1600" alt="Error" src="https://github.com/user-attachments/assets/790c49c3-12ce-41f0-ad6a-6ca8aec704de" />


**Link Expo Snack**
(https://snack.expo.dev/@niell77/shopcatalogapp)

**Penulis**
Revael Daniel
