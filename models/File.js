import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
  {
    name: String,
    url: String,
  },
  { timestamps: true }
);

export default mongoose.model("File", FileSchema);




// import mongoose from "mongoose";

// const fileSchema = new mongoose.Schema({
//   name: String,
//   url: String,
//   uploadedAt: { type: Date, default: Date.now },
// });

// export default mongoose.model("File", fileSchema);
