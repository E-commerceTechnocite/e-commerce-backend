import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class IsPositiveIntPipe implements PipeTransform {
  transform(value: number, metadata: ArgumentMetadata) {
    if (value === undefined) return value;
    if (value < 1 || !Number.isInteger(value)) {
      throw new BadRequestException(
        `${metadata.data} should be a positive integer number`,
      );
    }
    return value;
  }
}
