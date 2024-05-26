import mongoose from "mongoose";
import 'dotenv/config'

const password = process.env.CLUSTER_PASSWORD
const initConnection =() => {
mongoose.connect(`mongodb+srv://ehab16354444:${password}@mohamedehab.eyeheqo.mongodb.net/Pharmacy?retryWrites=true&w=majority&appName=MohamedEhab`)
  .then(() => console.log('Connected!'))
  .catch((err) => console.log('Error connecting to Mongo',err));
}
export default initConnection ;