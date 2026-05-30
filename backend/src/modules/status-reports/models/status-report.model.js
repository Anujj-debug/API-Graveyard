import mongoose from "mongoose";

const statusReportSchema = new mongoose.Schema(
  {
    api: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "API",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Active",
        "Stable",
        "Unstable",
        "Deprecated",
        "Dead",
        "Maintenance",
        "Acquired",
        "Rate-Limited",
      ],
      required: true,
    },

    evidenceUrl: {
      type: String,
      default: "",
    },

    note: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

statusReportSchema.index(
  { api: 1, user: 1 },
  { unique: true }
);

const StatusReport = mongoose.model(
  "StatusReport",
  statusReportSchema
);

export default StatusReport;