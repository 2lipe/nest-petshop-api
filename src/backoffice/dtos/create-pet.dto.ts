export class CreatePetDto {
  constructor(
    public name: string,
    public gender: string,
    public kind: string,
    public brand: string,
  ) {}
}
