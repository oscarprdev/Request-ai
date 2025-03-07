import User, { UserInput } from '@/models/User';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(userData: UserInput): Promise<User>;
  update(id: number, userData: Partial<UserInput>): Promise<User | null>;
  delete(id: number): Promise<boolean>;
  assignRuleToUser(userId: number, ruleId: number): Promise<boolean>;
  removeRuleFromUser(userId: number, ruleId: number): Promise<boolean>;
}
