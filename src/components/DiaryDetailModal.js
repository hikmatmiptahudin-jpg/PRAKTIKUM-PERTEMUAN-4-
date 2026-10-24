import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';

export default function DiaryDetailModal({ visible, onClose, entry }) {
  if (!entry) {
    return null;
  }

  const { title, date, body, preview, moodImage, moodUri, heroUri } = entry;
  const detailImage = heroUri
    ? { uri: heroUri }
    : moodImage || (moodUri ? { uri: moodUri } : null);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay} accessibilityViewIsModal>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {detailImage ? (
              <Image
                source={detailImage}
                style={styles.hero}
                resizeMode="cover"
                accessible={false}
              />
            ) : null}

            <View style={styles.content}>
              <Text accessibilityRole="header" style={styles.title}>
                {title}
              </Text>
              <Text style={styles.date}>{date}</Text>
              <Text style={styles.body}>{body || preview}</Text>

              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  pressed && styles.buttonPressed,
                ]}
                onPress={onClose}
                accessibilityRole="button"
                accessibilityLabel="Tutup detail diary"
                hitSlop={SPACE.xs}
              >
                <Text style={styles.buttonText}>Tutup</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: SPACE.l,
    backgroundColor: COLORS.overlay,
  },
  container: {
    maxHeight: '90%',
    overflow: 'hidden',
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
  },
  scrollContent: {
    paddingBottom: SPACE.xl,
  },
  hero: {
    width: '100%',
    height: 120,
    backgroundColor: COLORS.border,
    borderBottomLeftRadius: RADIUS.card,
    borderBottomRightRadius: RADIUS.card,
  },
  content: {
    padding: SPACE.l,
    gap: SPACE.s,
  },
  title: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    color: COLORS.text,
  },
  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginBottom: SPACE.s,
  },
  body: {
    fontSize: TYPO.body,
    color: COLORS.text,
    lineHeight: 22,
  },
  button: {
    minHeight: 48,
    marginTop: SPACE.l,
    paddingHorizontal: SPACE.l,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: COLORS.accentText,
    fontSize: TYPO.body,
    fontWeight: '700',
  },
});