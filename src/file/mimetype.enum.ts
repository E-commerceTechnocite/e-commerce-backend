export enum MimetypeEnum {
  IMAGE = 'image',
}

export class MimetypeEnumUtil {
  static matchMimetype(file: Express.Multer.File): boolean {
    const mimetype = file.mimetype.split('/')[0];
    let result = false;
    for (const [key] of Object.entries(MimetypeEnum)) {
      result = result || mimetype === MimetypeEnum[key];
    }
    return result;
  }
}
