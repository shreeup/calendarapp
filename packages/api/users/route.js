// import clientPromise from "../../lib/mongodb";

// export default async function handler(req, res) {
//   try {
//     const client = await clientPromise;
//     const db = client.db("calendarapp");

//     const users = await db.collection("users").find({}).limit(10).toArray();

//     res.json(users);
//   } catch (e) {
//     console.error(e);
//   }
// }

export async function GET(request, { params }) {
  // we will use params to access the data passed to the dynamic route
  try {
    const client = await clientPromise;
    const db = client.db("calendarapp");

    const users = await db.collection("users").find({}).limit(10).toArray();

    return NextResponse.json({ users });
  } catch (e) {
    console.error(e);
  }
}
