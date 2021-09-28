import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/Schema/User.schema';
import { Vacination, VacinationDocument } from 'src/Schema/Vacination.Schema';
import { Return } from 'src/utils/Returnfunctions';
import { IReturnObject } from 'src/utils/ReturnObject';

@Injectable()
export class VacinationService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Vacination.name)
    private vacineModel: Model<VacinationDocument>,
  ) {}

  public async createVacination(record: Vacination): Promise<IReturnObject> {
    try {
      const user = await this.userModel.findById(record.user_id);
      const vacineRecords = await this.vacineModel.find({
        user_id: record.user_id,
      });

      if (user === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User record not found',
        });
      }

      if (vacineRecords.length < 1) {
        // create a new vacine record
        const update = await this.vacineModel.create(record);
        console.log(update);
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Record created',
          data: update,
        });
      } else {
        // push to the new array
        for (let i = 0; i < record.vacinations.length; i++) {
          const update = await this.vacineModel.updateOne(
            { user_id: record.user_id },
            {
              $push: { vacinations: record.vacinations[i] },
            },
          );
          console.log(update);
        }
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Record created',
        });
      }
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server Error',
        trace: error,
      });
    }
  }
}
