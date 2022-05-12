import React, { useState } from 'react';
import { ArrowLeft } from 'phosphor-react-native';
import * as fileSystem from 'expo-file-system'
import { 
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

import { theme } from '../../theme';
import { styles } from './styles';
import { FeedbackType } from '../Widget'
import { feedbackTypes } from '../../utils/feedbackTypes'
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';
import { captureScreen } from 'react-native-view-shot'
import { api } from '../../libs/api';

interface Props {
  feedbackType: FeedbackType
  onFeedbackCanceled: () => void
  onFeedbackSent: () => void
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props) {
  const feedbackTypeInfo = feedbackTypes[feedbackType]

  const [screenshot, setScreenchot] = useState<string | null>(null)

  const [comment, setComment] = useState('')

  const [isSending, setIsSending] = useState(false)

  function handleScreenshot () {
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
      .then(uri => setScreenchot(uri))
      .catch(err => console.log(err))
  }

  function handleScreenshotRemove () {
    setScreenchot(null)
  }

  async function handleSendFeedback () {
    try {
      if(isSending) {
        return
      }

      setIsSending(true)

      const screenshotBase64 = screenshot && await fileSystem.readAsStringAsync(screenshot, {
        encoding: 'base64'
      })

      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
        comment
      })

      onFeedbackSent()

    } catch (error) {
      console.log(error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <TouchableOpacity onPress={onFeedbackCanceled} >
          <ArrowLeft 
            size={24}
            weight='bold'
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer} >
          <Image 
            source={feedbackTypeInfo.image}
            style={styles.image}
          />

          <Text style={styles.titleText} >
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>

      <TextInput
        multiline
        value={comment}
        onChangeText={setComment}
        autoCorrect={false}
        style={styles.input}
        placeholder='Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo...'
        placeholderTextColor={theme.colors.text_secondary}
      />

      <View style={styles.footer} >
        <ScreenshotButton 
          screenshot={screenshot}
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
        />

        <Button 
          isLoading={isSending} 
          onPress={handleSendFeedback}
        />
      </View>
    </View>
  );
}