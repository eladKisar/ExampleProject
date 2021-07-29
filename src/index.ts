import "reflect-metadata";
import { createConnection } from "typeorm";
import  User  from "./entity/User";
import express = require('express');
import  Post  from "./entity/Post";
import { validate } from "class-validator";

const app = express();
app.use(express.json());

//CREATE
app.post('/users', async (req: any, res: any) => {
  const { userName, userEmail, userRole } = req.body;

  try {
    const user = new User({ userName, userEmail, userRole });

    const errors = await validate(user);
    if(errors.length>0) throw errors;

    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);

  }
})
//READ
app.get('/users', async (_, res: any) => {

  try {
    const users = await User.find({relations: ['posts']});

    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);

  }
})
//UPDATE
app.put('/users/:uuid', async (req: any, res: any) => {
  const uuid = req.params.uuid;
  const { userName, userEmail, userRole } = req.body

  try {
    const user = await User.findOneOrFail({ uuid });

    user.userName = userName || user.userName;
    user.userEmail = userEmail || user.userEmail;
    user.userRole = userRole || user.userRole;

    await user.save();
    return res.status(200).json(user);

  } catch (err) {
    console.log(err);
    return res.staus(500).json(err)
  }
})
//DELETE
app.delete('/users/:uuid', async (req: any, res: any) => {
  const uuid = req.params.uuid;

  try {
    const user = await User.findOneOrFail({ uuid });

    await user.remove();

    return res.status(200).json('user deleted successfully');

  } catch (err) {
    console.log(err);
    return res.staus(500).json(err)
  }
})
//FIND
app.get('/users/:uuid', async (req: any, res: any) => {
  const uuid = req.params.uuid;

  try {
    const user = await User.findOneOrFail({ uuid });

    return res.status(200).json(user);

  } catch (err) {
    console.log(err);
    return res.staus(404).json('user not found')
  }
})

//Create a Post

app.post('/posts', async (req: any, res: any) => {
  const { userUuid, title, body } = req.body;

  try {
    const user = await User.findOneOrFail({ uuid: userUuid });

    const post = new Post({ title, body, user });

    await post.save()
    return res.status(200).json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);

  }
})

//Read a Post

app.get('/posts', async (req: any, res: any) => {
  const { userUuid, title, body } = req.body;

  try {
    const user = await User.find({ uuid: userUuid });

    const posts = await Post.find({ relations: ['user'] });

    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);

  }
})


createConnection()
  .then(async connection => {
    var port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`listening on port ${port}`));

  }).catch(error => console.log(error));
