import { HttpException, HttpStatus } from '@nestjs/common';
import { V4Options } from 'uuid';

const UUID_V4_REGEXP =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isUuidV4 = (value: V4Options): boolean =>
  ((value as string).match(UUID_V4_REGEXP) || []).length > 0;

export const validateUuid = (id: V4Options) => {
  if (!isUuidV4(id)) {
    throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
  }
};

export const cloneObject = (value: Record<string, any>): Record<string, any> =>
  JSON.parse(JSON.stringify(value));
