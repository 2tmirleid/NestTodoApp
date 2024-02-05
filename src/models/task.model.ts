import { Column, DataType, Model, Table } from "sequelize-typescript";

interface TaskCreateAttrs {
  title: string;
  description: string;
}

@Table({ tableName: 'Tasks' })
export class Tasks extends Model<Tasks, TaskCreateAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  title: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true
  })
  description: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  isDone: boolean;
}