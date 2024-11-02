import mongoose, { Document, Schema } from "mongoose";

interface EmployeeDocument extends Document {
  username: string;
  email: string;
  password: string;
  employeeId: mongoose.Types.ObjectId | any;
  id: mongoose.Types.ObjectId | any;
  locationId: string;
  organizationId: string;
  partnerId: string;
  payrollId: string;
  employerPayrollId: string;
  accessRole: {
    name: string;
    permissions: string[];
  };
  role: {
    name: string;
  };
  deleted_at?: Date | null;
}

const EmployeeSchema = new Schema<EmployeeDocument>(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: { type: String, required: true },
    employeeId: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
    },
    id: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
    },
    locationId: {
      type: String,
      required: true,
    },
    organizationId: {
      type: String,
      required: true,
    },
    partnerId: {
      type: String,
      required: true,
    },
    payrollId: {
      type: String,
      required: true,
    },
    employerPayrollId: {
      type: String,
      required: true,
    },
    accessRole: {
      name: { type: String, required: true },
      permissions: [{ type: String, required: true }],
    },
    role: {
      name: { type: String, required: true },
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

EmployeeSchema.pre<EmployeeDocument>("save", function (next) {
  const employeeDoc = this as EmployeeDocument;

  employeeDoc.employeeId = employeeDoc.employeeId || employeeDoc._id;
  employeeDoc.id = employeeDoc.id || employeeDoc._id;

  next();
});

const Employee = mongoose.model<EmployeeDocument>("Employee", EmployeeSchema);
export default Employee;
