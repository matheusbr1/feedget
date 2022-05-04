import bugImageURL from '../../assets/bug.svg'
import ideaImageURL from '../../assets/idea.svg'
import thoughtImageURL from '../../assets/thought.svg'
import { useState } from "react"
import { FeedbackTypeStep } from "./steps/FeedbackTypeStep"
import { FeedbackContentStep } from "./steps/FeedbackContentStep"
import { FeedbackSuccessStep } from './steps/FeedbackSuccessStep'

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageURL,
      alt: 'Imagem de um inseto'
    }
  },
  IDEA: {
    title: 'Idéia',
    image: {
      source: ideaImageURL,
      alt: 'Imagem de uma lâmpada'
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImageURL,
      alt: 'Imagem de um balão de pensamento'
    }
  },
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm () {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleRestartFeedback () {
    setFeedbackSent(false)
    setFeedbackType(null)
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto" >
      {
        feedbackSent ? (
          <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback}  />
        ) : (
          <>
            {!feedbackType ? (
              <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}  />
            ) : (
              <FeedbackContentStep
                onFeedbackSent={() => setFeedbackSent(true)}
                feedbackType={feedbackType}
                onFeedbackRestartRequested={handleRestartFeedback}
              />
            )}
          </>
        )
      }

      <footer>
        Feito com ♥ pela <a className="underline underline-offset-2" href="https://www.rocketseat.com.br">Rocketseat</a> 
      </footer>
    </div>
  )
}