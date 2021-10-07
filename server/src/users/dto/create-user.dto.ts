export class CreateUserDto {
  name: string;
  password?: string;
  email?: string;
  role: string;
  origin: string;
  ltiid?: number;
  isActive?: boolean;
}
