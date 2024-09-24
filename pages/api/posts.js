import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("student_platform");

  switch (req.method) {
    case 'POST':
      const newPost = req.body;
      await db.collection('posts').insertOne(newPost);
      res.json({ message: 'Post added successfully!' });
      break;

    case 'GET':
      const posts = await db.collection('posts').find({}).toArray();
      res.json(posts);
      break;

    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
