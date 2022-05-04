import { MailAdapter } from "../adapters/mailAdapter"
import { FeedbacksRepository } from "../repositories/feedbacksRepositories"

interface SubmitFeedbackUseCaseRequest {
  type: string
  comment: string
  screenshot?: string
}

class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(data: SubmitFeedbackUseCaseRequest): Promise<void> {
    const { type, comment, screenshot } = data

    if(!type) {
      throw new Error ('Type is required')
    }

    if(!comment) {
      throw new Error ('Comment is required')
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format')
    }

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style='font-family: sans-serif; font-size: 16px; color: #111;' >`,
          `<p>Tipo do feedback: ${type}</p>`,
          `<p>Comentário: ${comment}</p>`,
        `</div>`,
      ].join('\n')
    })

    await this.feedbacksRepository.create({ type, comment, screenshot })
  }
}

export { SubmitFeedbackUseCase }