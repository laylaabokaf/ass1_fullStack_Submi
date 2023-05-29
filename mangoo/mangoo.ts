
import mongoose from 'mongoose';


// //connect to mangoos
console.log("coneect to mangoos");
//const mongoose = require('mongoose');

const password = "layla123";
const url = `mongodb+srv://abokafl:${password}@cluster0.4b1hyrr.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery',false);
mongoose.connect(url)
console.log(url);

// Required metadata: user, date uploaded, id of post (sqlite), link to video (cloudinary)
const videoSchema = new mongoose.Schema({
       user: Number,
       dateUpload: Date,
       postId: Number,
       videoUrl: String
  })


 let Video: any = undefined; 
try {
    Video = mongoose.model('Video'); // Try to retrieve an existing model
} catch {
    Video = mongoose.model('Video', videoSchema); // Create a new model if it doesn't exist
}

export function sendData(videoUrl: string, date: Date, postId: number, userId: number) {
    console.log(`start sending data to mangoos , video with Url ${videoUrl} for user ${userId}`);
    const video = new Video({
      user : userId,
      dateUpload: date,
      postId: postId,
      videoUrl: videoUrl
    })

    video.save().then((_result: any) => {
        console.log('video saved!')
    })
}

export async function findData(postIds:number[]):Promise<{ [key: number]: string }> {
    const result: { [key: number]: string } = {};
    const videos = await Video.find({ postId: { $in: postIds } }).exec();

    videos.forEach((v:any)=>result[v.postId]= v.videoUrl);
    //console.log(result);
    return result;
}

export async function deleteData(postId:number) {
    try {
        const deletedVideo = await Video.findOneAndRemove({ postId: postId }).exec();
      } catch (error) {
        console.error('Error deleting video metadata:', error);
       
      }
}
// export async function getVideosUrl(): Promise<Map<number, string>> {
//     let urls = await Video.find({}).then((result: any) => {
//         let urlsMap = new Map<number, string>();

//         result.forEach((video: any) => {
//             urlsMap.set(video.postId, video.videoUrl)

//         });

//         return urlsMap;


//     })
//     return urls;
// }