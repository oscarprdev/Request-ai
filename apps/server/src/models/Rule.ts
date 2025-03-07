import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '@/config/database';
import { z } from 'zod';

// Define Zod schema for validation
export const RuleSchema = z.object({
  id: z.number().optional(),
  priority: z.number().int().positive(),
  urlFilter: z.string().min(1),
  resourceTypes: z.array(z.string()).min(1),
  requestMethods: z.array(z.string()),
  actionType: z.string().min(1),
  redirectUrl: z.string().nullable().optional(),
  isEnabled: z.boolean(),
});

// Extract TypeScript type from Zod schema
export type RuleInput = z.infer<typeof RuleSchema>;

// Define the attributes interface
interface RuleAttributes {
  id: number;
  priority: number;
  urlFilter: string;
  resourceTypes: string[];
  requestMethods: string[];
  actionType: string;
  redirectUrl?: string | null;
  isEnabled: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Define which attributes are optional for creation
interface RuleCreationAttributes
  extends Optional<RuleAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Extend the Model with proper typing
class Rule extends Model<RuleAttributes, RuleCreationAttributes> {
  public id!: number;
  public priority!: number;
  public urlFilter!: string;
  public resourceTypes!: string[];
  public requestMethods!: string[];
  public actionType!: string;
  public redirectUrl!: string | null;
  public isEnabled!: boolean;
  public readonly createdAt!: string;
  public readonly updatedAt!: string;

  // Static method to create a Rule instance from raw data
  static fromRawData(data: {
    id: number;
    priority: number;
    urlFilter: string;
    resourceTypes: string[];
    requestMethods: string[];
    actionType: string;
    redirectUrl?: string | null;
    isEnabled: boolean;
    createdAt: string;
    updatedAt: string;
  }): Rule {
    return Rule.build(data);
  }

  // Static method to create a validated Rule
  static createValidated(input: unknown): Rule {
    // Validate input with Zod
    const validatedData = RuleSchema.parse(input);

    // Build the Rule instance
    return Rule.build({
      ...validatedData,
      id: validatedData.id || 0, // Sequelize will replace this with auto-increment if it's a new record
    });
  }

  // Convert to a plain object (useful for API responses)
  toJSON(): RuleAttributes {
    return {
      id: this.id,
      priority: this.priority,
      urlFilter: this.urlFilter,
      resourceTypes: this.resourceTypes,
      requestMethods: this.requestMethods,
      actionType: this.actionType,
      redirectUrl: this.redirectUrl,
      isEnabled: this.isEnabled,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

Rule.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    urlFilter: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resourceTypes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    requestMethods: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    actionType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    redirectUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'rules',
    timestamps: true,
  }
);

export default Rule;
