import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { COLORS, SPACE, TYPO } from '../styles/tokens';
import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import SearchBar from '../components/SearchBar';
import EntryForm from '../components/EntryForm';

const INITIAL_ENTRIES = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2026-10-18',
    preview: 'Jalan pagi 20 menit dan menikmati udara segar.',
    body: 'Hari ini aku bangun lebih pagi dan berjalan kaki selama 20 menit.',
    moodImage: require('../../assets/moods/happy.png'),
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2026-10-17',
    preview: 'Menyelesaikan modul praktikum dan berdiskusi dengan tim.',
    body: 'Hari ini cukup produktif karena beberapa target perkuliahan selesai.',
    moodImage: require('../../assets/moods/focus.png'),
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2026-10-16',
    preview: 'Membaca buku sambil menikmati suasana senja.',
    body: 'Sore ini saya menikmati waktu di taman sambil membaca buku.',
    moodImage: require('../../assets/moods/calm.png'),
  },
  {
    id: 4,
    title: 'Haul Naruto',
    date: '2026-10-16',
    preview: 'Menonton ulang episode favorit setelah menyelesaikan tugas.',
    body: 'Saya menonton ulang episode Naruto favorit setelah menyelesaikan tugas.',
    moodImage: require('../../assets/moods/default.png'),
  },
  {
    id: 5,
    title: 'Perjuangan Cinta Naruto',
    date: '2026-10-24',
    preview: 'perjuangan cinta naruto ketika hinata di culik oleh toneri otsutsuki',
    body: 'Setelah Hinata terpaksa "menerima" lamaran Toneri demi menyelamatkan adiknya (Hanabi) dan menghancurkan Tenseigan, Naruto mengalami depresi berat. Cakra Naruto sempat terkuras habis akibat serangan Toneri, membuatnya pingsan selama tiga hari dan kehilangan semangat bertarung karena mengira Hinata telah mengkhianatinya.',
    moodImage: require('../../assets/moods/hinata.png'),
  },
];

export default function DiaryListScreen() {
  const [entries, setEntries] = useState(INITIAL_ENTRIES);
  const [query, setQuery] = useState('');
  const [likedIds, setLikedIds] = useState(new Set());
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return entries;

    const normalizedQuery = query.trim().toLocaleLowerCase();

    return entries.filter((entry) =>
      entry.title.toLocaleLowerCase().includes(normalizedQuery) ||
      entry.preview.toLocaleLowerCase().includes(normalizedQuery) ||
      entry.body.toLocaleLowerCase().includes(normalizedQuery) ||
      entry.date.includes(normalizedQuery)
    );
  }, [entries, query]);

  const toggleLike = (id) => {
    setLikedIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const addEntry = (entry) => {
    setEntries((previousEntries) => {
      const id = previousEntries.reduce(
        (maximumId, previousEntry) => Math.max(maximumId, previousEntry.id),
        0,
      ) + 1;

      return [
        {
          ...entry,
          id,
          moodImage: require('../../assets/moods/default.png'),
        },
        ...previousEntries,
      ];
    });
  };

  const renderItem = ({ item }) => (
    <DiaryCard
      entry={item}
      liked={likedIds.has(item.id)}
      onToggleLike={() => toggleLike(item.id)}
      onPress={() => setSelected(item)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <Text style={styles.header}>Buku Harian</Text>
            <SearchBar onChange={setQuery} />
            <EntryForm onSubmit={addEntry} />
          </View>
        }
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada entri.</Text>
        }
      />

      <DiaryDetailModal
        entry={selected}
        visible={!!selected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: '100%',
    minWidth: 0,
    backgroundColor: COLORS.surface,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    color: COLORS.text,
    marginBottom: SPACE.s,
  },
  list: {
    flex: 1,
    width: '100%',
    maxWidth: '100%',
    minWidth: 0,
  },
  listContent: {
    padding: SPACE.l,
    gap: SPACE.m,
    paddingTop: 0,
    flexGrow: 1,
  },
  empty: {
    textAlign: 'center',
    color: COLORS.muted,
    marginTop: 40,
  },
});