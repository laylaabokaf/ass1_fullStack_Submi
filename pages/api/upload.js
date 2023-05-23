import cloudinary from "cloudinary";
import { IncomingForm } from "formidable";


// Configuration 
cloudinary.config({
    cloud_name: "dmwugmqp8",
    api_key: "167275973647871",
    api_secret: "7RUVv4V3NeHmFjmCFrXtCOa2diY"
  });

export const config = {
  api: {
    bodyParser: false
  }
};

export default async (req, res) => {
    console.log("start the cloundery connect");
    const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
  console.log("data we get at uplod.js");

  console.log(data);

  const file = data?.files?.inputFile.filepath;
  console.log(file);
  try {
    const response = await cloudinary.v2.uploader.upload(file, {
      resource_type: "video",
      public_id: "my_video"
    });
    return res.json(response);
  } catch (error) {
    console.log("Error", error);
    return res.json(error);
  }
};


// const res = cloudinary.uploader.upload('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg', {public_id: "olympic_flag"})

// res.then((data) => {
//   console.log(data);
//   console.log(data.secure_url);
// }).catch((err) => {
//   console.log(err);
// });


// // Generate 
// const url = cloudinary.url("olympic_flag", {
//   width: 100,
//   height: 150,
//   Crop: 'fill'
// });

// // The output url
// console.log(url);