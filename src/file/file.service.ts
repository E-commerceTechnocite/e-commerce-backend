import { Injectable } from '@nestjs/common';
import { Picture } from '@app/file/entities/picture.entity';

@Injectable()
export class FileService {
  add(...files: Express.Multer.File[]) {
    const pics: Picture[] = [];
    files.forEach((file) => {
      pics.push({
        title: file.filename,
        caption: file.filename,
        uri: '/public/' + file.filename,
      });
    });
  }
}
