import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbacksRepository } from "../feedbacksRepositories";

class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create ({ type, comment, screenshot }: FeedbackCreateData): Promise<void> {
    await prisma.feedback.create({
      data: {
        type, 
        comment,
        screenshot
      }
    })
  }
}

export { PrismaFeedbacksRepository }