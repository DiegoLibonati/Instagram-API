import { User as UserT } from "../entities/entities";

export class User {
  constructor(
    public id: string,
    public username: string,
    public account_type: string,
    public media_count: number
  ) {}

  createUser(): UserT {
    return {
      id: this.id,
      username: this.username,
      account_type: this.account_type,
      media_count: this.media_count,
    };
  }
}
