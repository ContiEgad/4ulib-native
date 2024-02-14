import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import React, { useCallback, useState } from 'react';

import { useFetch, useTheme } from '../../../../../hooks';
import { sendComment } from '../../../service';
import { Button } from '../../../../Button';
import { TextField } from '../../../../TextField';

interface IUselessQuestionProps {
  onSend: (text: string) => void;
  onCancel: () => void;
  id: string;
}

const UselessQuestion: React.FC<IUselessQuestionProps> = ({
  onSend,
  id,
  onCancel,
}) => {
  const { sendRequest, loading } = useFetch(sendComment);

  const { colors } = useTheme();

  const [text, setText] = useState<string>('');

  const handleSend = useCallback(async () => {
    if (text.length > 0) {
      const { success } = await sendRequest({
        comment: text,
        faqQuestionId: id,
      });
      if (success) {
        onSend(text);
      }
    }
  }, [sendRequest, text, onSend, id]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
      keyboardVerticalOffset={40}
    >
      <View style={{ flexGrow: 1, flex: 1 }}>
        <TextField
          value={text}
          placeholder={
            'Agradecemos seu retorno, adicione um comentário aqui para ajudar a melhorar o artigo'
          }
          textInputprops={{
            multiline: true,
            numberOfLines: 5,
            style: {
              textAlignVertical: 'top',
              fontSize: 10,
            },
            textContentType: 'none',
          }}
          onChangeText={(text) => setText(text)}
        />
        <View style={styles.actions}>
          <Button
            title="Cancelar"
            variant="text"
            color={colors.primary}
            onPress={onCancel}
          />
          <Button
            title="Enviar"
            disable={text.length === 0}
            loading={loading}
            style={styles.sendButton}
            onPress={handleSend}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sendButton: {
    width: '30%',
  },
});

export default UselessQuestion;
