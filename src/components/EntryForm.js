import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';

const getToday = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${today.getFullYear()}-${month}-${day}`;
};

export default function EntryForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(getToday);
  const [preview, setPreview] = useState('');

  const canSubmit =
    title.trim().length > 0 &&
    preview.trim().length > 0;

  const submit = () => {
    if (!canSubmit) return;

    onSubmit({
      title: title.trim(),
      date: date.trim(),
      preview: preview.trim(),
      body: preview.trim(),
    });

    setTitle('');
    setDate(getToday());
    setPreview('');
  };

  return (
    <View style={styles.form}>
      <Text style={styles.heading}>Tambah Entri</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Judul"
        style={styles.input}
        accessibilityLabel="Judul entri"
      />

      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
        style={styles.input}
        accessibilityLabel="Tanggal entri"
        keyboardType="numbers-and-punctuation"
      />

      <TextInput
        value={preview}
        onChangeText={setPreview}
        placeholder="Ringkasan..."
        style={[styles.input, styles.multiline]}
        multiline
        accessibilityLabel="Ringkasan entri"
      />

      <Pressable
        onPress={submit}
        disabled={!canSubmit}
        style={[styles.button, !canSubmit && styles.buttonDisabled]}
        accessibilityRole="button"
        accessibilityState={{ disabled: !canSubmit }}
      >
        <Text style={styles.buttonText}>Simpan</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { padding: SPACE.l, gap: SPACE.s },
  heading: {
    fontSize: TYPO.title,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACE.s,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    paddingHorizontal: SPACE.m,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: SPACE.s,
    padding: SPACE.m,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#fff', fontWeight: '700' },
});