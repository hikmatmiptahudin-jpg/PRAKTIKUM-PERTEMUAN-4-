import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';

export default function DiaryCard({
  entry,
  liked = false,
  onPress,
  onToggleLike,
}) {
  const { title, date, preview, moodImage } = entry;

  return (
    <View style={styles.card}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.entry,
          pressed && styles.pressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel={`Buka entri ${title}, tanggal ${date}`}
      >
        {moodImage ? (
          <Image
            source={moodImage}
            style={styles.mood}
            resizeMode="cover"
            accessible={false}
          />
        ) : null}

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.preview} numberOfLines={2}>{preview}</Text>
        </View>
      </Pressable>

      <Pressable
        onPress={onToggleLike}
        style={styles.likeButton}
        accessibilityRole="button"
        accessibilityLabel={liked ? `Batalkan suka ${title}` : `Sukai ${title}`}
        accessibilityState={{ selected: liked }}
        hitSlop={SPACE.xs}
      >
        <Text style={styles.like}>{liked ? '❤️' : '🤍'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    maxWidth: '100%',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    padding: SPACE.m,
    gap: SPACE.s,
  },
  entry: {
    flex: 1,
    minWidth: 0,
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.m,
  },
  pressed: {
    opacity: 0.85,
  },
  mood: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.avatar,
    backgroundColor: '#eef2ff',
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: TYPO.title,
    fontWeight: '700',
    color: COLORS.text,
  },
  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginBottom: 6,
  },
  preview: {
    fontSize: TYPO.body,
    color: COLORS.text,
  },
  likeButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  like: {
    fontSize: 22,
  },
});