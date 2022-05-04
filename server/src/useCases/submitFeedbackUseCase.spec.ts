import { SubmitFeedbackUseCase } from "./submitFeedbackUseCase"

const createFeedbackSpy = jest.fn()
const sendMailbackSpy = jest.fn()

const submitFeedbackUseCase = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailbackSpy },
)

describe('Submit Feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedbackUseCase.execute({
      type: 'Type',
      comment: 'Comment',
      screenshot: 'data:image/png;base64;dasdsadsa'
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailbackSpy).toHaveBeenCalled()
  })

  it('should not be able to submit a feedback without type', async () => {
    await expect(submitFeedbackUseCase.execute({
      type: '',
      comment: 'Comment',
      screenshot: 'data:image/png;base64;dasdsadsa'
    })).rejects.toThrow()
  })

  it('should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedbackUseCase.execute({
      type: 'Type',
      comment: '',
      screenshot: 'data:image/png;base64;dasdsadsa'
    })).rejects.toThrow()
  })

  it('should not be able to submit a feedback with a invalid screenshot', async () => {
    await expect(submitFeedbackUseCase.execute({
      type: 'Type',
      comment: 'Comment',
      screenshot: 'image.png'
    })).rejects.toThrow()
  })
})