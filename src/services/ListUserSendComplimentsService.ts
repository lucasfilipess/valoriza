import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';

interface IListUserSendComplimentsService {
  user_id: string;
}

export class ListUserSendComplimentsService {
  async execute({ user_id }: IListUserSendComplimentsService) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );
    const compliments = await complimentsRepositories.find({
      where: {
        user_sender: user_id,
      },
      relations: ['userSender', 'userReceiver', 'tag'],
    });
    return compliments;
  }
}
