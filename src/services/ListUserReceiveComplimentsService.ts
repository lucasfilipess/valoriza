import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';

interface IListUserReceiveComplimentsService {
  user_id: string;
}

export class ListUserReceiveComplimentsService {
  async execute({ user_id }: IListUserReceiveComplimentsService) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );
    const compliments = await complimentsRepositories.find({
      where: {
        user_receiver: user_id,
      },
      relations: ['userSender', 'userReceiver', 'tag'],
    });
    return compliments;
  }
}
