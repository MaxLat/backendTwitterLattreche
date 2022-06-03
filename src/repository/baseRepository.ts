import User from "../models/user.model";
// Cette import est juste pour recuperer les méthodes

export abstract class BaseRepository {
  // le model devrait être de type ModelCtor, mais sequelize-typescript n'est pas encore à jour.... (src : slack de sequelize 30/05/2022 )
  constructor(protected model: any) {}

  public async create(objectValue: object): Promise<any> {
    return await this.model.create(objectValue);
  }

  public async findOne(where: any) {
    return this.model.findOne({ where: where });
  }

  public async findAll(attributes: Array<String> | null = null) {
    if (attributes) {
      return await this.model.findAll({attributes : attributes});
    }
    return await this.model.findAll();
  }

  public async remove(where : any) : Promise<void>{
    return await this.model.destroy({where : where});
  }

  public async update(toUpdate : any , where : any) : Promise<void>{
    return await this.model.update(toUpdate,{where : where});
  }
}
