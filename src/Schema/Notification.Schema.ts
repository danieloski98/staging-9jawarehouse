import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {
  @ApiProperty()
  @Prop({
    default: '',
  })
  business_id: string;

  @ApiProperty()
  @Prop({
    default: false,
  })
  read: boolean;

  @ApiProperty()
  @Prop({
    default: false,
  })
  forAdmin: boolean;

  @ApiProperty()
  @Prop({
    default: '',
  })
  message: string;

  @ApiProperty()
  @Prop({
    type: String,
    default: new Date('2011-09-24T00:00:002011-09-24T00:00:00'),
  })
  created_at: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
