import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class GetCheckDeleteEntityIdService {


    async getEntity<T>(repo : Repository<T>, dto : any, id : string):Promise<T>{
        const entity = await repo.findOne(dto[id]);
        if (!entity) {
          throw new BadRequestException(`Not found at id ${dto[id]}`);
        }
        delete dto[id];
        return entity;
      }
}