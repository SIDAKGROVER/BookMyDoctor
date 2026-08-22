import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import bcrypt from "bcrypt";
import doctorModel from "../models/doctorModel.js";

let mongoServer = null;

const seedDoctors = async () => {
    try {
        console.log("Checking and seeding missing doctors...");
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("doctor123", salt);

        const mockDoctors = [
            {
                name: 'Dr. Neelam Bansal',
                email: 'neelam.bansal@example.com',
                password: hashedPassword,
                image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=250',
                speciality: 'Gynecologist',
                degree: 'MD, MS',
                experience: '15 Years',
                about: 'Dr. Neelam Bansal is a highly experienced Obstetrics & Gynaecology specialist at Neelam Hospital Rajpura.',
                fees: 500,
                address: { line1: 'NH-07, Rajpura – Chandigarh Highway', line2: 'Opp – Chitkara University, Punjab' },
                date: Date.now()
            },
            {
                name: 'Dr. Shikha Gupta',
                email: 'shikha.gupta@example.com',
                password: hashedPassword,
                image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=250',
                speciality: 'Gynecologist',
                degree: 'MBBS, DGO',
                experience: '8 Years',
                about: 'Dr. Shikha Gupta is a dedicated Gynecologist and Obstetrician at Neelam Hospital.',
                fees: 400,
                address: { line1: 'NH-07, Rajpura – Chandigarh Highway', line2: 'Opp – Chitkara University, Punjab' },
                date: Date.now()
            },
            {
                name: 'Dr. Gaurika Aggarwal',
                email: 'gaurika.aggarwal@example.com',
                password: hashedPassword,
                image: 'https://images.unsplash.com/photo-162290204747a-757c527bd904?auto=format&fit=crop&q=80&w=250',
                speciality: 'Gynecologist',
                degree: 'MBBS, MS',
                experience: '6 Years',
                about: 'Dr. Gaurika Aggarwal is a warm and highly competent Gynecologist and Obstetrician.',
                fees: 400,
                address: { line1: 'NH-07, Rajpura – Chandigarh Highway', line2: 'Opp – Chitkara University, Punjab' },
                date: Date.now()
            },
            {
                name: 'Dr. Nitin Gupta',
                email: 'nitin.gupta@example.com',
                password: hashedPassword,
                image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=250',
                speciality: 'General physician',
                degree: 'MBBS, MS, MCh (Urology)',
                experience: '10 Years',
                about: 'Dr. Nitin Gupta is a senior consultant Urologist at Neelam Hospital Rajpura.',
                fees: 500,
                address: { line1: 'NH-07, Rajpura – Chandigarh Highway', line2: 'Opp – Chitkara University, Punjab' },
                date: Date.now()
            },
            {
                name: 'Dr. Pranav Sharma',
                email: 'pranav.sharma@example.com',
                password: hashedPassword,
                image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=250',
                speciality: 'General physician',
                degree: 'MBBS, MS, DNB',
                experience: '7 Years',
                about: 'Dr. Pranav Sharma specializes in Urology and Kidney Transplant surgery.',
                fees: 500,
                address: { line1: 'NH-07, Rajpura – Chandigarh Highway', line2: 'Opp – Chitkara University, Punjab' },
                date: Date.now()
            },
            {
                name: 'Dr. Hemant Verma',
                email: 'hemant.verma@example.com',
                password: hashedPassword,
                image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=250',
                speciality: 'General physician',
                degree: 'MBBS, MS',
                experience: '8 Years',
                about: 'Dr. Hemant Verma is a consultant in Urology and Kidney Transplant.',
                fees: 500,
                address: { line1: 'NH-07, Rajpura – Chandigarh Highway', line2: 'Opp – Chitkara University, Punjab' },
                date: Date.now()
            },
            {
                name: 'Dr. Himanshu Gupta',
                email: 'himanshu.gupta@example.com',
                password: hashedPassword,
                image: 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&q=80&w=250',
                speciality: 'General physician',
                degree: 'MBBS, MD, DM (Cardiology)',
                experience: '18 Years',
                about: 'Prof. Dr. Himanshu Gupta is a leading cardiologist and CTVS specialist at Neelam Hospital.',
                fees: 600,
                address: { line1: 'NH-07, Rajpura – Chandigarh Highway', line2: 'Opp – Chitkara University, Punjab' },
                date: Date.now()
            },
            {
                name: 'Dr. Amandeep Singh',
                email: 'amandeep.singh@example.com',
                password: hashedPassword,
                image: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=250',
                speciality: 'General physician',
                degree: 'MBBS, MD, DM (Nephrology)',
                experience: '12 Years',
                about: 'Dr. Amandeep Singh is an expert Nephrologist dedicated to kidney care and dialysis management.',
                fees: 550,
                address: { line1: 'NH-07, Rajpura – Chandigarh Highway', line2: 'Opp – Chitkara University, Punjab' },
                date: Date.now()
            },
            {
                name: 'Dr. Tinku Takia',
                email: 'tinku.takia@example.com',
                password: hashedPassword,
                image: 'https://images.unsplash.com/photo-1637059824899-a441006a6875?auto=format&fit=crop&q=80&w=250',
                speciality: 'General physician',
                degree: 'MBBS, MD (Oncology)',
                experience: '10 Years',
                about: 'Dr. Tinku Takia is an expert oncologist offering comprehensive medical and radiation cancer therapies.',
                fees: 600,
                address: { line1: 'NH-07, Rajpura – Chandigarh Highway', line2: 'Opp – Chitkara University, Punjab' },
                date: Date.now()
            },
            {
                name: 'Dr. Siddhant Arora',
                email: 'siddhant.arora@example.com',
                password: hashedPassword,
                image: 'https://images.unsplash.com/photo-1603415802181-641f71594831?auto=format&fit=crop&q=80&w=250',
                speciality: 'General physician',
                degree: 'MBBS, MS',
                experience: '9 Years',
                about: 'Dr. Siddhant Arora is an experienced Cardiac Surgeon at Neelam Hospital Rajpura.',
                fees: 500,
                address: { line1: 'NH-07, Rajpura – Chandigarh Highway', line2: 'Opp – Chitkara University, Punjab' },
                date: Date.now()
            },
            {
                name: 'Dr. Navreet Singh',
                email: 'navreet.singh@example.com',
                password: hashedPassword,
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
                speciality: 'General physician',
                degree: 'MBBS, MD',
                experience: '25 Years',
                about: 'Brig (Dr.) Navreet Singh is a very senior cardiology and CTVS expert at Neelam Hospital.',
                fees: 700,
                address: { line1: 'NH-07, Rajpura – Chandigarh Highway', line2: 'Opp – Chitkara University, Punjab' },
                date: Date.now()
            },
            {
                name: 'Dr. Abhinav Nayyar',
                email: 'abhinav.nayyar@example.com',
                password: hashedPassword,
                image: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=250',
                speciality: 'General physician',
                degree: 'MBBS, MD',
                experience: '8 Years',
                about: 'Dr. Abhinav Nayyar is a dedicated cardiac care specialist.',
                fees: 500,
                address: { line1: 'NH-07, Rajpura – Chandigarh Highway', line2: 'Opp – Chitkara University, Punjab' },
                date: Date.now()
            },
            {
                name: 'Dr. Vidhi Singla',
                email: 'vidhi.singla@example.com',
                password: hashedPassword,
                image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=250',
                speciality: 'General physician',
                degree: 'MBBS, MD',
                experience: '6 Years',
                about: 'Dr. Vidhi Singla is a specialist in Nephrology and kidney health.',
                fees: 450,
                address: { line1: 'NH-07, Rajpura – Chandigarh Highway', line2: 'Opp – Chitkara University, Punjab' },
                date: Date.now()
            },
            {
                name: 'Dr. Abhishek Bhatia',
                email: 'abhishek.bhatia@example.com',
                password: hashedPassword,
                image: 'https://images.unsplash.com/photo-1634926878768-2a5b3c40f139?auto=format&fit=crop&q=80&w=250',
                speciality: 'General physician',
                degree: 'MBBS, MD (Medicine)',
                experience: '7 Years',
                about: 'Dr. Abhishek Bhatia is a general medicine consultant at Neelam Hospital Patiala/Rajpura.',
                fees: 350,
                address: { line1: 'NH-07, Rajpura – Chandigarh Highway', line2: 'Opp – Chitkara University, Punjab' },
                date: Date.now()
            },
            {
                name: 'Dr. Ram Dayal',
                email: 'ram.dayal@example.com',
                password: hashedPassword,
                image: 'https://images.unsplash.com/photo-1651008011912-b3296b653d36?auto=format&fit=crop&q=80&w=250',
                speciality: 'General physician',
                degree: 'MBBS',
                experience: '10 Years',
                about: 'Dr. Ram Dayal provides comprehensive medical consultations for general ailments.',
                fees: 300,
                address: { line1: 'NH-07, Rajpura – Chandigarh Highway', line2: 'Opp – Chitkara University, Punjab' },
                date: Date.now()
            },
            {
                name: 'Dr. Parul Sarwalia',
                email: 'parul.sarwalia@example.com',
                password: hashedPassword,
                image: 'https://images.unsplash.com/photo-1605684954278-9f17d26c6274?auto=format&fit=crop&q=80&w=250',
                speciality: 'Pediatricians',
                degree: 'MBBS, DCH',
                experience: '8 Years',
                about: 'Dr. Parul Sarwalia is a child specialist offering comprehensive pediatric care.',
                fees: 400,
                address: { line1: 'NH-07, Rajpura – Chandigarh Highway', line2: 'Opp – Chitkara University, Punjab' },
                date: Date.now()
            },
            {
                name: 'Dr. Sandeep Bansal',
                email: 'sandeep.bansal@example.com',
                password: hashedPassword,
                image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
                speciality: 'General physician',
                degree: 'MBBS, MS',
                experience: '15 Years',
                about: 'Dr. Sandeep Bansal is a senior consultant general and laparoscopic surgeon.',
                fees: 500,
                address: { line1: 'NH-07, Rajpura – Chandigarh Highway', line2: 'Opp – Chitkara University, Punjab' },
                date: Date.now()
            },
            {
                name: 'Dr. Gaurav Garg',
                email: 'gaurav.garg@example.com',
                password: hashedPassword,
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
                speciality: 'Dermatologist',
                degree: 'MBBS, MD',
                experience: '9 Years',
                about: 'Dr. Gaurav Garg is a dermatologist specializing in clinical skin disorders and cosmetics.',
                fees: 400,
                address: { line1: 'NH-07, Rajpura – Chandigarh Highway', line2: 'Opp – Chitkara University, Punjab' },
                date: Date.now()
            },
            {
                name: 'Dr. Siddharth Kaushik',
                email: 'siddharth.kaushik@example.com',
                password: hashedPassword,
                image: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=250',
                speciality: 'Gastroenterologist',
                degree: 'MBBS, MD, DM',
                experience: '10 Years',
                about: 'Dr. Siddharth Kaushik is a specialist in gastrointestinal and liver care.',
                fees: 600,
                address: { line1: 'NH-07, Rajpura – Chandigarh Highway', line2: 'Opp – Chitkara University, Punjab' },
                date: Date.now()
            }
        ];

        let seededCount = 0;
        for (const doc of mockDoctors) {
            const exists = await doctorModel.findOne({ email: doc.email });
            if (!exists) {
                const newDoc = new doctorModel(doc);
                await newDoc.save();
                seededCount++;
            } else {
                await doctorModel.updateOne({ email: doc.email }, {
                    $set: {
                        image: doc.image,
                        degree: doc.degree,
                        experience: doc.experience,
                        about: doc.about,
                        fees: doc.fees,
                        speciality: doc.speciality
                    }
                });
            }
        }

        if (seededCount > 0) {
            console.log(`Seeded ${seededCount} new doctors successfully.`);
        } else {
            console.log("All doctors are updated/seeded successfully.");
        }
    } catch (err) {
        console.error("Failed to seed doctors:", err.message);
    }
};

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("Database Connected");
    });

    try {
        console.log("Connecting to MongoDB Atlas...");
        const uri = process.env.MONGODB_URI.replace(/\/+$/, '');
        await mongoose.connect(`${uri}/prescripto`, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("Connected to MongoDB Atlas successfully.");
        await seedDoctors();
    } catch (error) {
        console.error("MongoDB Atlas connection failed:", error.message);
        console.log("Starting local in-memory MongoDB server...");

        try {
            mongoServer = await MongoMemoryServer.create();
            const mongoUri = mongoServer.getUri();
            await mongoose.connect(mongoUri, {
                dbName: "prescripto"
            });
            console.log("Connected to local in-memory MongoDB at:", mongoUri);
            await seedDoctors();
        } catch (innerError) {
            console.error("Failed to start in-memory MongoDB:", innerError.message);
            throw innerError;
        }
    }
};

export default connectDB;